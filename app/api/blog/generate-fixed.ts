import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { createAIClient } from "@/lib/ai-client";
import { createLogger } from "@/lib/logger";

const log = createLogger("api/blog/generate");

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { topic, keywords, tone, wordCount } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // Check if AI is enabled in settings
    try {
      const { data } = await supabase
        .from("settings")
        .select("ai_enabled")
        .single();
      if (data && data.ai_enabled === false) {
        return NextResponse.json(
          { error: "AI is disabled in settings" },
          { status: 403 }
        );
      }
    } catch {
      // ignore settings read errors
    }

    // Fetch site context
    let siteContext = "";
    try {
      const { data: aboutPage } = await supabase
        .from("content_pages")
        .select("content")
        .eq("slug", "about")
        .maybeSingle();
      
      const { data: servicesPages } = await supabase
        .from("content_pages")
        .select("title, content")
        .in("slug", [
          "services",
          "wedding-photography",
          "portrait-photography",
          "commercial-photography",
          "event-photography",
          "family-photography",
          "senior-portraits",
          "professional-headshots",
          "maternity-sessions"
        ]);

      const { data: existingPosts } = await supabase
        .from("blog_posts")
        .select("title, excerpt, content")
        .eq("published", true)
        .limit(3);

      if (aboutPage?.content) {
        siteContext += `\n\nAbout Studio37:\n${aboutPage.content.substring(0, 500)}`;
      }

      if (servicesPages && servicesPages.length > 0) {
        siteContext += "\n\nOur Services:\n";
        servicesPages.forEach((page: any) => {
          const excerpt = page.content?.substring(0, 200) || "";
          siteContext += `- ${page.title}: ${excerpt}\n`;
        });
      }

      if (existingPosts && existingPosts.length > 0) {
        siteContext += "\n\nExisting Blog Style Reference:\n";
        existingPosts.forEach((post: any) => {
          siteContext += `- ${post.title}: ${post.excerpt || post.content?.substring(0, 150)}\n`;
        });
      }
    } catch (contextError) {
      log.warn("Error fetching site context", undefined, contextError as Error);
    }

    // Use unified AI client
    const aiClient = createAIClient();
    if (!aiClient) {
      log.error("AI client initialization failed - check GOOGLE_API_KEY or GEMINI_API_KEY");
      return NextResponse.json(
        { error: "AI service not configured. Missing API key." },
        { status: 503 }
      );
    }

    const prompt = `You are an expert content strategist and senior copywriter for Studio37 Photography, a professional photography studio in Pinehurst, TX.

CRITICAL LINKING RULES - YOU MUST FOLLOW THESE:
1. ONLY use links to www.studio37.cc domain (our website)
2. NEVER link to www.studio37photography.com or any external photography sites
3. NEVER mention or reference competitor websites
4. Use these internal links ONLY:
   - /services (general services page)
   - /wedding-photography
   - /portrait-photography
   - /commercial-photography
   - /event-photography
   - /family-photography
   - /senior-portraits
   - /professional-headshots
   - /maternity-sessions
   - /book-a-session (booking page)
   - /contact (contact page)
   - /about (about us)
   - /blog (blog home)
   - /gallery (portfolio)

SITE CONTEXT (use this real information - DO NOT make up information):
${siteContext || "Studio37 Photography is a professional photography studio based in Pinehurst, TX, offering wedding, portrait, commercial, and event photography services."}

Write a complete, SEO-optimized blog post about: ${topic}

STRICT STRUCTURE REQUIREMENTS (must appear exactly as H2 headings in this order):
## 🎯 Vision & Purpose
## 🎨 Style & Aesthetic
## 🤝 Client Experience & Collaboration
## 💰 Investment & Value
## 📍 Local Advantage (Pinehurst, TX)

Under each required H2 heading include 1-2 H3 subsections with concise, keyword-relevant titles.

Additional Requirements:
- Tone: ${tone || "professional and friendly"}
- Target length: ${wordCount || 800}-${(wordCount || 800) + 200} words
- Target keywords: ${keywords || "photography, Studio37, Pinehurst TX"}
- Write in Markdown format (no HTML tags except inline code if needed)
- Be engaging, informative, and actionable
- Include relevant photography tips and insights based on the site context provided
- Mention Studio37 Photography and Pinehurst, TX naturally (brand mention at least twice)
- Use internal linking opportunities from the approved list above
- End with a clear call-to-action linking to /book-a-session
- Use short paragraphs (2-3 sentences max)
- Avoid fluff, maintain clarity and professionalism
- Base recommendations on actual Studio37 services mentioned in the context

REMINDER: Only link to pages on www.studio37.cc. Do NOT reference external websites or competitors.

Return the response in this exact JSON format (no markdown code blocks):
{
  "title": "Blog post title here",
  "metaDescription": "Meta description here",
  "content": "Full markdown content here including required emoji section headings in order",
  "excerpt": "Brief 1-2 sentence summary",
  "suggestedTags": ["tag1", "tag2", "tag3"],
  "category": "suggested category"
}`;

    // Generate content with unified AI client
    log.info("Generating blog post", { topic, tone, wordCount });
    
    const result = await aiClient.generateStructuredContent(
      prompt,
      {
        title: "string",
        metaDescription: "string",
        content: "string",
        excerpt: "string",
        suggestedTags: "array",
        category: "string"
      },
      {
        temperature: 0.7,
        maxOutputTokens: 4096,
      }
    );

    if (!result.success || !result.data) {
      log.error("AI generation failed", { error: result.error });
      return NextResponse.json(
        { error: result.error || "Failed to generate content" },
        { status: 502 }
      );
    }

    const blogPost = result.data;
    log.info("Blog post generated successfully", { title: blogPost.title });

    // Post-process content
    const ensureLinks = (md: string): string => {
      let out = md || "";
      
      // Remove competitor refs
      out = out.replace(/www\.studio37photography\.com/gi, "www.studio37.cc");
      out = out.replace(/studio37photography\.com/gi, "www.studio37.cc");
      out = out.replace(/\[([^\]]+)\]\(https?:\/\/(?!www\.studio37\.cc)[^)]+\)/gi, "$1");
      
      // Link brand mention
      if (!/\[Studio37 Photography\]\(/.test(out) && out.includes("Studio37 Photography")) {
        out = out.replace(/(Studio37 Photography)(?![\]\)])/, "[Studio37 Photography](https://www.studio37.cc/services)");
      }
      
      // Add CTA if missing
      if (!/book-a-session/.test(out) && !/\/contact/.test(out)) {
        out += "\n\n---\n\n**Ready to create something beautiful?** [Book a session with Studio37](https://www.studio37.cc/book-a-session) or [contact us](https://www.studio37.cc/contact) to discuss your photography needs.";
      }
      
      return out;
    };

    blogPost.content = ensureLinks(blogPost.content || "");

    return NextResponse.json(blogPost);
  } catch (err: any) {
    log.error("Blog post generation failed", undefined, err);
    return NextResponse.json(
      { error: err?.message || "Blog post generation failed" },
      { status: 500 }
    );
  }
}
