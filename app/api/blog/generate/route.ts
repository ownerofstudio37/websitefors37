import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateBlogPost } from "@/lib/ai-client";
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

    // Parse keywords
    const keywordArray = typeof keywords === "string" 
      ? keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
      : Array.isArray(keywords) 
      ? keywords 
      : ["photography", "Studio37", "Pinehurst TX"];

    // Use unified AI client - generateBlogPost handles retries and fallbacks
    log.info("Generating blog post", { topic, tone, wordCount });
    
    try {
      const blogPost = await generateBlogPost(
        topic,
        keywordArray,
        wordCount || 800,
        tone || "professional and friendly"
      );

      log.info("Blog post generated successfully", { title: blogPost.title });

      // Post-process content to ensure proper links
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

      // Return with processed content
      return NextResponse.json({
        title: blogPost.title,
        metaDescription: blogPost.metaDescription,
        content: ensureLinks(blogPost.content),
        excerpt: blogPost.excerpt,
        suggestedTags: blogPost.tags || keywordArray,
        category: blogPost.category || "Photography Tips",
      });
    } catch (aiError: any) {
      log.error("AI generation failed", undefined, aiError);
      
      // Provide helpful error messages
      if (aiError.message?.includes("API key")) {
        return NextResponse.json(
          { error: "AI service not configured. Missing API key." },
          { status: 503 }
        );
      }
      
      if (aiError.message?.includes("quota")) {
        return NextResponse.json(
          { error: "AI service quota exceeded. Please try again later." },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: aiError.message || "Failed to generate blog post" },
        { status: 502 }
      );
    }
  } catch (err: any) {
    log.error("Blog post generation failed", undefined, err);
    return NextResponse.json(
      { error: err?.message || "Blog post generation failed" },
      { status: 500 }
    );
  }
}
