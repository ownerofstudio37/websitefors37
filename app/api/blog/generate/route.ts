import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { expandBlogPostChunk, generateBlogPost, type BlogPost } from "@/lib/ai-client";
import { applyBlogWriterGuardrails, buildBlogWriterWarningBanner, type BlogWriterBrief } from "@/lib/blog-writer-guardrails";
import { createLogger } from "@/lib/logger";

const log = createLogger("api/blog/generate");

export const dynamic = "force-dynamic";
export const maxDuration = 25;

function countWords(value: string) {
  return (value.match(/\b[\w'-]+\b/g) || []).length;
}

function parseKeywords(keywords: unknown) {
  return typeof keywords === "string"
    ? keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
    : Array.isArray(keywords)
    ? keywords.map((k) => String(k).trim()).filter(Boolean)
    : ["photography", "Studio37", "Pinehurst TX"];
}

function parseLocalSpecifics(localSpecifics: unknown) {
  return Array.isArray(localSpecifics)
    ? localSpecifics.map((item) => String(item).trim()).filter(Boolean)
    : typeof localSpecifics === "string"
      ? localSpecifics.split(",").map((item: string) => item.trim()).filter(Boolean)
      : undefined;
}

function ensureLinks(md: string): string {
  let out = md || "";
  out = out.replace(/www\.studio37photography\.com/gi, "www.studio37.cc");
  out = out.replace(/studio37photography\.com/gi, "www.studio37.cc");
  out = out.replace(/\[([^\]]+)\]\(https?:\/\/(?!www\.studio37\.cc)[^)]+\)/gi, "$1");
  out = out.replace(/\]\(https?:\/\/(?:www\.)?studio37\.cc\//gi, "](/");
  return out;
}

function jsonDraftResponse(blogPost: BlogPost, targetWords: number, pass: number, doneOverride?: boolean) {
  const cleanContent = ensureLinks(blogPost.content);
  const wordCount = countWords(cleanContent);
  const done = doneOverride ?? wordCount >= targetWords;
  const contentWithBanner = `${buildBlogWriterWarningBanner(blogPost.warnings)}${cleanContent}`;

  return NextResponse.json({
    draft: {
      title: blogPost.title,
      seoTitle: blogPost.seoTitle,
      metaDescription: blogPost.metaDescription,
      content: cleanContent,
      excerpt: blogPost.excerpt,
      suggestedTags: blogPost.tags,
      category: blogPost.category,
      warnings: blogPost.warnings || [],
    },
    wordCount,
    done,
    pass,
    title: blogPost.title,
    seoTitle: blogPost.seoTitle,
    metaDescription: blogPost.metaDescription,
    content: contentWithBanner,
    excerpt: blogPost.excerpt,
    suggestedTags: blogPost.tags,
    category: blogPost.category,
    warnings: blogPost.warnings || [],
  });
}

function buildStarterDraft(brief: BlogWriterBrief, warning: string): BlogPost {
  const primaryKeyword = brief.keywords.find(Boolean) || brief.topic || "Studio37 photography";
  const title = primaryKeyword.length <= 72 ? primaryKeyword : primaryKeyword.slice(0, 69).trim() + "...";
  const linkTarget = brief.linkTarget || "/book-consultation";
  const localSpecifics = brief.localSpecifics?.length ? brief.localSpecifics.slice(0, 3).join(", ") : "Pinehurst, The Woodlands, Greater Houston";
  const content = `# ${title}

If you are comparing ${primaryKeyword}, start with the season, the city, and the kind of images you actually need.

## ${primaryKeyword}: what to know first

This is a guarded starter draft because the AI writing pass could not finish cleanly. It keeps the SEO structure in place, but it still needs a human edit before publishing.

We would build this post around the reader's real decision: ${brief.reader || "choosing the right Studio37 session"}. The useful version should explain what the client needs to know before booking, what details affect the plan, and how Studio37 helps make the session feel calm.

For local planning, we usually think about ${localSpecifics} because light, parking, walking distance, and weather can change the session plan fast.

## Planning notes to expand

- Name the service clearly.
- Explain who this session is for.
- Add two or three approved local details from the brief.
- Keep one contextual link to [${primaryKeyword}](${linkTarget}).
- Avoid invented dates, prices, venue names, availability, and stats.
- Use first-person "we" and plain language.

## Studio37 approach

We plan around direction, light, timing, and how the final gallery will actually be used. That keeps the session practical without making it stiff. Hands are weird. We plan for that.

## Next step

Use this starter as a safe base, then add real examples, local proof, and a topic-tied CTA before publishing.`;

  return applyBlogWriterGuardrails(
    {
      title,
      seoTitle: title,
      metaDescription: `Studio37 planning notes for ${primaryKeyword}, including local context, session fit, and practical next steps.`,
      content,
      tags: Array.from(new Set([primaryKeyword, ...brief.keywords, "Studio37"].filter(Boolean))).slice(0, 8),
      category: "guides",
      excerpt: `A guarded Studio37 starter draft for ${primaryKeyword}.`,
      warnings: [warning],
    },
    brief
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const brief = body.brief || body;
    const {
      topic,
      keywords,
      tone,
      wordCount,
      outline,
      reader,
      linkTarget,
      localSpecifics,
    } = brief;
    const pass = Math.max(1, Math.round(Number(body.pass) || 1));
    const previousDraft = body.previousDraft as BlogPost | undefined;
    const targetWords = Math.min(Math.max(Math.round(Number(body.targetWords || wordCount) || 900), 400), 1900);

    log.info("Blog generation request received", { topic, keywords, tone, wordCount });

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

    const keywordArray = parseKeywords(keywords);

    const requestedWordCount = Number(wordCount) || targetWords || 900;
    const boundedWordCount = Math.min(Math.max(Math.round(requestedWordCount), 400), 1900);
    const writerBrief = {
      topic,
      keywords: keywordArray,
      wordCount: targetWords,
      tone: tone || "professional and friendly",
      outline,
      reader,
      linkTarget,
      localSpecifics: parseLocalSpecifics(localSpecifics),
    };

    const hasApiKey = !!(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY);
    if (!hasApiKey) {
      log.error("API key not found in environment");
      if (pass === 1) {
        return jsonDraftResponse(
          buildStarterDraft(writerBrief, "AI pass 1 could not run because the server API key is missing. Starter draft returned for review."),
          targetWords,
          pass
        );
      }
      if (previousDraft?.content) {
        return jsonDraftResponse(
          {
            ...previousDraft,
            warnings: [
              ...(previousDraft.warnings || []),
              `Expansion pass ${pass} could not run because the server API key is missing. Draft-so-far kept for review.`,
            ],
          },
          targetWords,
          pass,
          true
        );
      }
      return NextResponse.json(
        { error: "AI service not configured. Missing API key in server environment." },
        { status: 503 }
      );
    }

    log.info("Calling generateBlogPost with bounded AI budget", {
      topic, 
      keywordCount: keywordArray.length,
      wordCount: boundedWordCount,
      tone: tone || "professional and friendly"
    });

    try {
      const blogPost = pass > 1 && previousDraft?.content
        ? await expandBlogPostChunk(previousDraft, writerBrief, pass)
        : await generateBlogPost(
            topic,
            keywordArray,
            Math.min(boundedWordCount, targetWords >= 1600 ? 1050 : boundedWordCount),
            tone || "professional and friendly",
            {
              outline,
              reader,
              linkTarget,
              localSpecifics: writerBrief.localSpecifics,
            }
          );

      if (!blogPost || !blogPost.content) {
        log.error("Generated blog post is empty or missing content", { blogPost });
        return NextResponse.json(
          { error: "AI returned empty content. Please try again." },
          { status: 502 }
        );
      }

      log.info("Blog post generated successfully", { 
        title: blogPost.title,
        contentLength: blogPost.content?.length || 0
      });

      const wordCountAfterPass = countWords(blogPost.content || "");
      const noMeaningfulGrowth = pass > 1 && previousDraft?.content
        ? wordCountAfterPass <= countWords(previousDraft.content) + 60
        : false;
      return jsonDraftResponse(blogPost, targetWords, pass, noMeaningfulGrowth ? true : undefined);
    } catch (aiError: any) {
      log.error("AI generation failed with error", { 
        error: aiError.message,
        stack: aiError.stack,
        name: aiError.name
      });
      
      if (pass === 1) {
        return jsonDraftResponse(
          buildStarterDraft(writerBrief, `AI pass 1 failed: ${aiError.message || "Unknown error"}. Starter draft returned for review.`),
          targetWords,
          pass
        );
      }

      if (previousDraft?.content) {
        return jsonDraftResponse(
          {
            ...previousDraft,
            warnings: [
              ...(previousDraft.warnings || []),
              `Expansion pass ${pass} failed: ${aiError.message || "Unknown error"}. Draft-so-far kept for review.`,
            ],
          },
          targetWords,
          pass,
          true
        );
      }

      // Provide helpful error messages
      if (aiError.message?.includes("API key")) {
        return NextResponse.json(
          { error: "AI service not configured. Check server API key configuration." },
          { status: 503 }
        );
      }
      
      if (aiError.message?.includes("quota") || aiError.message?.includes("rate limit")) {
        return NextResponse.json(
          { error: "AI service quota exceeded. Please try again later." },
          { status: 429 }
        );
      }

      if (/high demand|overloaded|service unavailable|timed out|timeout|temporarily busy/i.test(aiError.message || "")) {
        return NextResponse.json(
          { error: "AI blog writer is temporarily busy. Please try again in a moment, or choose a shorter word count." },
          { status: 503 }
        );
      }

      if (aiError.message?.includes("Empty response")) {
        return NextResponse.json(
          { error: "AI service returned empty response. The model may be unavailable. Try again in a moment." },
          { status: 502 }
        );
      }
      
      return NextResponse.json(
        { error: aiError.message || "Failed to generate blog post" },
        { status: 502 }
      );
    }
  } catch (err: any) {
    log.error("Blog post generation failed", { 
      error: err.message,
      stack: err.stack
    });
    return NextResponse.json(
      { error: err?.message || "Blog post generation failed" },
      { status: 500 }
    );
  }
}
