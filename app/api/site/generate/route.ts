import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type PageComponent = any; // We validate minimally and let the client editor enforce full typing

export async function POST(req: Request) {
  try {
    const { prompt, style, wordCount } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    // Check AI enabled setting (best-effort)
    try {
      const { data } = await supabase.from("settings").select("ai_enabled").single();
      if (data && data.ai_enabled === false) {
        return NextResponse.json(
          { error: "AI is disabled in settings" },
          { status: 403 }
        );
      }
    } catch {}

    const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GOOGLE_API_KEY" },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const preferredModel =
      process.env.GOOGLE_GENAI_MODEL ||
      process.env.GEMINI_MODEL ||
      process.env.AI_MODEL ||
      "gemini-3-pro";
    const model = genAI.getGenerativeModel({
      model: preferredModel,
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.7,
      },
    });

    const allowedTypes = [
      "hero",
      "text",
      "servicesGrid",
      "galleryHighlights",
      "testimonials",
      "faq",
      "pricingTable",
      "ctaBanner",
      "mapEmbed",
      "blogCards",
      "contactForm",
      "seoFooter",
    ];

    const sysPrompt = `You are an expert UX/UI landing page architect and professional copywriter.
Your task is to design a high-converting, beautifully structured page based on the user's brief.

CRITICAL: Return ONLY valid JSON (no markdown code fences, no commentary).

━━━ READ THE BRIEF FIRST ━━━
The PAGE TOPIC and ALL CONTENT must be driven entirely by the user's brief.
- If the brief says "SEO services" → write an SEO landing page
- If the brief says "restaurant marketing" → write a restaurant marketing page
- If the brief says "wedding photography" → write a wedding photography page
- NEVER default to photography content unless the brief explicitly asks for it
- The topic in the brief IS the product/service being promoted on this page

PUBLISHER CONTEXT (separate from topic):
- This page lives on Studio37's website (studio37.cc), a photography & marketing agency in Pinehurst, TX
- Use Studio37's brand tone: ${style || "friendly, premium, trustworthy"}
- Match CTAs to the topic (e.g. "Get an SEO Audit", "Start Your Campaign", "Request a Quote")
- Internal link options: "/services", "/book-consultation", "/contact", "/gallery", "/about"

JSON Schema:
{
  "title": "string - SEO optimized page title matching the brief topic",
  "suggestedSlug": "kebab-case-url-slug",
  "notes": "string - brief internal note about the page purpose",
  "components": [
    // Build a complete, well-structured page with rich content
    // HERO - Always start with a compelling hero
    { 
      "id": "unique-id", 
      "type": "hero", 
      "data": { 
        "title": "Compelling headline (5-8 words) SPECIFIC TO BRIEF TOPIC", 
        "subtitle": "Supporting subheadline that expands on the promise (15-25 words)", 
        "backgroundImage": "https://images.unsplash.com/photo-[relevant-to-topic-not-just-photography]", 
        "buttonText": "CTA matching the brief topic", 
        "buttonLink": "/contact", 
        "alignment": "left|center|right", 
        "overlay": 50-70 
      } 
    },
    
    // TEXT - Rich introductory content (ALWAYS USE HTML TAGS)
    { 
      "id": "unique-id", 
      "type": "text", 
      "data": { 
        "content": "<h2>Section Heading</h2><p>Write engaging, benefit-focused copy. Use 2-3 paragraphs. Include emotional appeal and value props. ALWAYS wrap text in proper HTML tags: <p> for paragraphs, <h2>/<h3> for headings, <strong> for emphasis, <ul><li> for lists.</p><p>Second paragraph builds credibility and shows expertise. Never use plain text or markdown - ONLY HTML.</p>", 
        "alignment": "center", 
        "size": "md" 
      } 
    },
    
    // SERVICES GRID - Showcase offerings with detail
    { 
      "id": "unique-id", 
      "type": "servicesGrid", 
      "data": { 
        "heading": "Descriptive heading for services section", 
        "subheading": "Supporting text explaining value proposition", 
        "services": [
          { 
            "image": "https://images.unsplash.com/photo-[id]", 
            "title": "Service Name", 
            "description": "2-3 sentences explaining this service, benefits, ideal clients, and outcomes. Be specific and compelling.", 
            "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"], 
            "link": "/services" 
          }
          // Include 3-6 services based on brief
        ], 
        "columns": 3 
      } 
    },
    
    // GALLERY HIGHLIGHTS - If relevant to brief
    { 
      "id": "unique-id", 
      "type": "galleryHighlights", 
      "data": { 
        "heading": "Recent Work", 
        "subheading": "Browse our portfolio" 
      } 
    },
    
    // TESTIMONIALS - Social proof
    { 
      "id": "unique-id", 
      "type": "testimonials", 
      "data": { 
        "testimonials": [
          { 
            "quote": "Write realistic, detailed testimonial highlighting specific benefits and emotional outcomes (30-60 words)", 
            "author": "Client Name", 
            "subtext": "Session Type or Location" 
          }
          // Include 3-5 testimonials
        ] 
      } 
    },
    
    // FAQ - Address objections
    { 
      "id": "unique-id", 
      "type": "faq", 
      "data": { 
        "heading": "Frequently Asked Questions", 
        "items": [
          { 
            "question": "Common question about booking, pricing, or process", 
            "answer": "Detailed, helpful answer that removes friction and builds confidence. 2-4 sentences." 
          }
          // Include 5-8 relevant FAQs based on brief
        ] 
      } 
    },
    
    // PRICING TABLE - Clear investment info
    { 
      "id": "unique-id", 
      "type": "pricingTable", 
      "data": { 
        "heading": "Session Investment", 
        "subheading": "Transparent pricing with exceptional value", 
        "plans": [
          { 
            "title": "Package Name", 
            "price": "$XXX", 
            "features": [
              "Specific deliverable 1", 
              "Specific deliverable 2", 
              "Specific deliverable 3", 
              "Specific deliverable 4", 
              "Specific deliverable 5"
            ], 
            "ctaText": "Book [Package Name]", 
            "ctaLink": "/book-a-session" 
          }
          // Include 3-4 pricing tiers if mentioned in brief
        ], 
        "columns": 3 
      } 
    },
    
    // TEXT - Additional value/trust section (ALWAYS USE HTML)
    { 
      "id": "unique-id", 
      "type": "text", 
      "data": { 
        "content": "<h2>Why Choose Studio37?</h2><p>Write compelling reasons, unique differentiators, awards, experience, or guarantees. Use proper HTML formatting with <p> tags for paragraphs, <strong> for emphasis, and <ul><li> for bullet lists if needed.</p>", 
        "alignment": "left", 
        "size": "md" 
      } 
    },
    
    // MAP EMBED - Location context
    { 
      "id": "unique-id", 
      "type": "mapEmbed", 
      "data": { 
        "address": "Pinehurst, TX", 
        "lat": 30.1737, 
        "lng": -95.6886, 
        "zoom": 11, 
        "height": "md" 
      } 
    },
    
    // CTA BANNER - Final conversion push
    { 
      "id": "unique-id", 
      "type": "ctaBanner", 
      "data": { 
        "heading": "Compelling final CTA headline with urgency or value", 
        "primaryButtonText": "Clear action verb + benefit", 
        "primaryButtonLink": "/book-a-session" 
      } 
    },
    
    // SEO FOOTER - Local SEO boost (HTML FORMATTED)
    { 
      "id": "unique-id", 
      "type": "seoFooter", 
      "data": { 
        "content": "<p><strong>Studio37 Photography – Pinehurst, TX</strong></p><p>Write 2-3 paragraphs with local keywords, service areas, specialties. Include nearby cities served. Use HTML tags: <p> for paragraphs, <strong> for business name/location, <a href='/contact'> for links if relevant.</p>", 
        "includeSchema": true 
      } 
    }
  ]
}

CONTENT WRITING GUIDELINES:
- Writing tone: ${style || "friendly, premium, trustworthy"}
- Target total word count: ${wordCount || 650}-1000 words across all text/description fields
- **CRITICAL: ALL text content MUST use proper HTML formatting**
  - Use <p> tags for paragraphs
  - Use <h2>, <h3>, <h4> for headings
  - Use <strong> or <em> for emphasis
  - Use <ul><li> for unordered lists, <ol><li> for ordered lists
  - Use <a href="/link"> for internal links
  - NEVER use markdown syntax (**, ##, -, etc.)
  - NEVER use plain text without HTML tags
- Use benefit-focused language, not feature lists
- Include specific details, numbers, and outcomes
- Write for the target audience mentioned in the brief
- Use power words and emotional triggers appropriate for THE TOPIC
- Every service/pricing tier should have 4-6 specific features/deliverables
- Testimonials should feel authentic and detailed (not generic)
- FAQs should address real objections specific to the topic
- All copy should support the conversion goal

BRIEF TOPIC RULES (CRITICAL):
- The user's brief defines WHAT this page is about
- Services, pricing, FAQs, testimonials — all must be relevant to THAT TOPIC
- Only include photography/Studio37 services if the brief mentions them
- For non-photography topics: write SEO/marketing/branding/etc. services and pricing

PUBLISHER SITE CONTEXT:
- Website: studio37.cc, Pinehurst, TX — a photography & marketing agency
- Serves: Montgomery County, The Woodlands, Houston area
- Available internal links: "/services", "/book-consultation", "/contact", "/gallery", "/about"
- Adapt these links to the specific page context

IMAGE SELECTION:
- Choose high-quality Unsplash photography URLs
- Match images to THE SPECIFIC TOPIC in the brief (not generic photography)
- Hero images should be dramatic and engaging for the topic

STRUCTURE RULES:
1. ALWAYS include: hero → intro text → services/offerings → social proof → pricing → final CTA
2. Include 8-15 total components for a complete page
3. Vary component types to maintain engagement
4. Place testimonials BEFORE pricing to build trust
5. Use text components to break up visual sections with storytelling
6. End with map (local context) + CTA + SEO footer

RESPOND WITH ONLY THE COMPLETE JSON - NO OTHER TEXT.`;

    let aiText = "";
    try {
      const result = await model.generateContent(`${sysPrompt}\n\nUser brief: ${prompt}`);
      const response = result.response;
      aiText = response?.text?.().trim?.() || "";
    } catch (aiError: any) {
      const msg = String(aiError?.message || aiError || "");
      if (msg.includes("reported as leaked") || msg.includes("403")) {
        return NextResponse.json(
          { error: "API key was reported as leaked. Please rotate the key in Netlify and redeploy.", code: "API_KEY_LEAKED" },
          { status: 403 }
        );
      }
      return NextResponse.json({ error: `Gemini API error: ${aiError?.message || aiError}` }, { status: 502 });
    }

    if (!aiText) {
      return NextResponse.json({ error: "No response from AI model" }, { status: 500 });
    }

    // Strip code fences if present
    aiText = aiText.replace(/^```json\n?/i, "").replace(/\n?```$/i, "").trim();

    // Normalize components list to safe subset
    const normalize = (raw: any) => {
      const makeId = (p: string) => `${p}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
      const components: PageComponent[] = [];
      const push = (c: any) => {
        if (!c || typeof c !== "object") return;
        if (!allowedTypes.includes(c.type)) return;
        c.id = c.id || makeId(c.type);
        c.visibility = c.visibility || { desktop: true, tablet: true, mobile: true };
        c.data = c.data || {};
        // defaults by type
        switch (c.type) {
          case "hero":
            c.data.title = c.data.title || "Your Headline Here";
            c.data.subtitle = c.data.subtitle || "Supporting text that expands on your value proposition";
            c.data.backgroundImage = c.data.backgroundImage || "https://images.unsplash.com/photo-1557804506-669a67965ba0";
            c.data.buttonText = c.data.buttonText || "Get Started";
            c.data.buttonLink = c.data.buttonLink || "/contact";
            c.data.alignment = c.data.alignment || "center";
            c.data.overlay = typeof c.data.overlay === "number" ? c.data.overlay : 55;
            break;
          case "text":
            c.data.content = c.data.content || "<p>We combine expertise with a client-first approach to deliver exceptional results.</p>";
            c.data.alignment = c.data.alignment || "left";
            c.data.size = c.data.size || "md";
            break;
          case "servicesGrid":
            c.data.heading = c.data.heading || "Our Services";
            c.data.subheading = c.data.subheading || "Tailored solutions for your goals";
            c.data.columns = c.data.columns || 2;
            c.data.services = Array.isArray(c.data.services) && c.data.services.length ? c.data.services : [
              { image: "https://images.unsplash.com/photo-1557804506-669a67965ba0", title: "Service One", description: "Description of this service and its benefits.", features: ["Key feature 1", "Key feature 2"], link: "/services" },
              { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f", title: "Service Two", description: "Description of this service and its benefits.", features: ["Key feature 1", "Key feature 2"], link: "/services" },
            ];
            break;
          case "testimonials":
            c.data.testimonials = Array.isArray(c.data.testimonials) && c.data.testimonials.length ? c.data.testimonials : [
              { quote: "Working with Studio37 exceeded every expectation. Highly recommend!", author: "Satisfied Client", subtext: "Google Review" },
            ];
            break;
          case "faq":
            c.data.heading = c.data.heading || "Frequently Asked Questions";
            c.data.items = Array.isArray(c.data.items) && c.data.items.length ? c.data.items : [
              { question: "How do I get started?", answer: "Simply reach out via our contact page and we'll schedule a consultation." },
              { question: "What does the process look like?", answer: "We start with a discovery call, then create a tailored plan for your specific needs." },
            ];
            break;
          case "pricingTable":
            c.data.heading = c.data.heading || "Pricing & Packages";
            c.data.plans = Array.isArray(c.data.plans) && c.data.plans.length ? c.data.plans : [
              { title: "Starter", price: "$499", features: ["Feature 1", "Feature 2", "Feature 3"], ctaText: "Get Started", ctaLink: "/contact" },
              { title: "Professional", price: "$999", features: ["Everything in Starter", "Feature 4", "Feature 5", "Priority support"], ctaText: "Go Pro", ctaLink: "/contact" },
            ];
            c.data.columns = c.data.columns || 3;
            break;
          case "ctaBanner":
            c.data.heading = c.data.heading || "Ready to get started?";
            c.data.primaryButtonText = c.data.primaryButtonText || "Contact Us Today";
            c.data.primaryButtonLink = c.data.primaryButtonLink || "/contact";
            break;
          case "mapEmbed":
            c.data.address = c.data.address || "Pinehurst, TX";
            c.data.lat = c.data.lat ?? 30.1737;
            c.data.lng = c.data.lng ?? -95.6886;
            c.data.zoom = c.data.zoom || 11;
            c.data.height = c.data.height || "md";
            c.data.showMarker = c.data.showMarker ?? true;
            c.data.mapType = c.data.mapType || "roadmap";
            break;
          case "seoFooter":
            c.data.content = c.data.content || "<p><strong>Studio37 – Pinehurst, TX</strong></p><p>Professional services for businesses and individuals across Montgomery County and the Houston area.</p>";
            c.data.includeSchema = !!c.data.includeSchema;
            break;
        }
        components.push(c);
      };

      let parsed: any;
      try { parsed = JSON.parse(aiText); } catch {}

      const title = (parsed?.title as string) || "AI Generated Page";
      const suggestedSlug = (parsed?.suggestedSlug as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "ai-page";
      const notes = (parsed?.notes as string) || "Generated from prompt.";
      const rawComponents = Array.isArray(parsed?.components) ? parsed.components : [];
      if (rawComponents.length) {
        rawComponents.forEach(push);
      }

      // If nothing came through, provide a sensible default structure
      if (components.length === 0) {
        push({ type: "hero" });
        push({ type: "text" });
        push({ type: "servicesGrid" });
        push({ type: "faq" });
        push({ type: "pricingTable" });
        push({ type: "mapEmbed" });
        push({ type: "ctaBanner" });
        push({ type: "seoFooter" });
      }

      return { title, suggestedSlug, notes, components };
    };

    try {
      const normalized = normalize(aiText);
      return NextResponse.json(normalized);
    } catch (e) {
      return NextResponse.json({ error: "Failed to normalize AI output" }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Site generation failed" }, { status: 500 });
  }
}
