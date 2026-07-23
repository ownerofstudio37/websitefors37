/**
 * Unified AI Client for Studio37
 * 
 * Provides consistent Gemini integration across all features:
 * - Chatbot conversations
 * - Blog post generation
 * - Image analysis & alt text
 * - Lead scoring & prioritization
 * - SEO content suggestions
 * - Visual content understanding
 */

import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { createLogger } from "./logger";

const log = createLogger("lib/ai-client");

// Resolve default model from env with safe fallbacks.
// IMPORTANT: if GOOGLE_GENAI_MODEL is set to a deprecated/invalid ID the
// fallback chain below is tried automatically.
const ENV_MODEL =
  process.env.GOOGLE_GENAI_MODEL ||
  process.env.GEMINI_MODEL ||
  process.env.AI_MODEL ||
  "gemini-3.5-flash";

// Current live models as of June 2026 (from Google AI Studio).
// Fast production models first, with latest aliases and older stable fallbacks after them.
export const MODEL_FALLBACKS = [
  "gemini-3.5-flash",       // Gemini 3.5 Flash — latest fast default
  "gemini-flash-latest",    // Latest Flash alias — useful when a specific endpoint is saturated
  "gemini-3.1-flash-lite",  // Gemini 3.1 Flash-Lite — lower latency fallback
  "gemini-2.5-flash",       // Gemini 2.5 Flash — stable fallback
  "gemini-2.5-flash-lite",  // Gemini 2.5 Flash-Lite — fastest / cheapest fallback
  "gemini-3.1-pro-preview", // Gemini 3.1 Pro Preview — complex-task fallback
  "gemini-2.5-pro",         // Gemini 2.5 Pro — stable complex-task fallback
];

const BLOG_MODEL_FALLBACKS = [
  "gemini-3.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-flash-latest",
];

// Model configurations for different use cases
export const AI_MODELS = {
  // Default multimodal model
  FLASH: MODEL_FALLBACKS[0],
  // For deep reasoning / long-form generation
  PRO: MODEL_FALLBACKS[1],
  // For vision/complex tasks
  VISION: MODEL_FALLBACKS[0],
} as const;

export type AIModel = string;

interface GenerationConfig {
  temperature?: number;
  topP?: number;
  topK?: number;
  maxOutputTokens?: number;
  responseMimeType?: string;
  thinkingLevel?: unknown;
  mediaResolution?: unknown;
  thoughtSignature?: unknown;
}

// Preset configs for common scenarios
export const AI_CONFIGS = {
  // Creative content generation (blog posts, marketing copy)
  creative: {
    temperature: 0.9,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 4096,
  },
  // Precise, factual responses (chatbot, support)
  precise: {
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 2048,
  },
  // Structured data extraction (lead scoring, intent detection)
  structured: {
    temperature: 0.3,
    topP: 0.8,
    topK: 20,
    maxOutputTokens: 1024,
    responseMimeType: "application/json",
  },
  // Short, concise responses (alt text, titles, summaries)
  concise: {
    temperature: 0.5,
    topP: 0.8,
    topK: 30,
    maxOutputTokens: 512,
  },
} as const;

export type AIConfigPreset = keyof typeof AI_CONFIGS;

interface AIClientOptions {
  model?: AIModel;
  config?: GenerationConfig | AIConfigPreset;
  systemInstruction?: string;
  retries?: number;
  retryDelayMs?: number;
  timeoutMs?: number;
  fallbackModels?: AIModel[];
  maxFallbackModels?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
  maxOutputTokens?: number;
  responseMimeType?: string;
  thinkingLevel?: unknown;
  mediaResolution?: unknown;
  thoughtSignature?: unknown;
}

/**
 * Initialize AI client with custom options
 */
export function createAIClient(options: AIClientOptions = {}): GenerativeModel {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GOOGLE_API_KEY or GEMINI_API_KEY environment variable");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Resolve config preset or use custom config
  let config: GenerationConfig = typeof options.config === "string"
    ? AI_CONFIGS[options.config]
    : options.config || AI_CONFIGS.precise;

  const optionConfig: GenerationConfig = {};
  if (options.temperature !== undefined) optionConfig.temperature = options.temperature;
  if (options.topP !== undefined) optionConfig.topP = options.topP;
  if (options.topK !== undefined) optionConfig.topK = options.topK;
  if (options.maxOutputTokens !== undefined) optionConfig.maxOutputTokens = options.maxOutputTokens;
  if (options.responseMimeType !== undefined) optionConfig.responseMimeType = options.responseMimeType;
  if (options.thinkingLevel !== undefined) optionConfig.thinkingLevel = options.thinkingLevel;
  if (options.mediaResolution !== undefined) optionConfig.mediaResolution = options.mediaResolution;
  if (options.thoughtSignature !== undefined) optionConfig.thoughtSignature = options.thoughtSignature;
  config = { ...config, ...optionConfig };

  const modelParams: any = {
    model: options.model || ENV_MODEL || AI_MODELS.FLASH,
    generationConfig: config,
  };

  if (options.systemInstruction) {
    modelParams.systemInstruction = options.systemInstruction;
  }

  return genAI.getGenerativeModel(modelParams);
}

function getRequestTimeoutMs(options: AIClientOptions) {
  const configured = Number(options.timeoutMs ?? process.env.GOOGLE_GENAI_TIMEOUT_MS ?? process.env.GEMINI_TIMEOUT_MS);
  return Number.isFinite(configured) && configured >= 5000 ? configured : 18000;
}

function isTransientProviderError(statusCode: number, errorMsg: string) {
  return (
    statusCode === 408 ||
    statusCode === 429 ||
    statusCode >= 500 ||
    /timeout|timed out|temporarily unavailable|high demand|overloaded|service unavailable|rate limit/i.test(errorMsg)
  );
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timeout = setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs);
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

/**
 * Generate text with automatic retry and error handling
 */
export async function generateText(
  prompt: string,
  options: AIClientOptions = {}
): Promise<string> {
  const maxRetries = options.retries || 3;
  const retryDelay = options.retryDelayMs || 1000;
  const requestTimeoutMs = getRequestTimeoutMs(options);
  
  let lastError: Error | null = null;
  
  // Try with progressive model fallbacks if the preferred model is overloaded or unavailable.
  const preferredModel = options.model || ENV_MODEL || AI_MODELS.FLASH;
  const fallbackModels = options.fallbackModels?.length ? options.fallbackModels : MODEL_FALLBACKS;
  const allCandidates = [preferredModel, ...fallbackModels].filter((v, i, arr) => !!v && arr.indexOf(v) === i);
  const candidates = options.maxFallbackModels ? allCandidates.slice(0, options.maxFallbackModels) : allCandidates;

  for (const candidate of candidates) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const model = createAIClient({ ...options, model: candidate });
        const result = await withTimeout(model.generateContent(prompt), requestTimeoutMs, `AI request to ${candidate}`);
        
        // Handle different response formats (text vs JSON mode)
        let text: string;
        try {
          text = result.response.text().trim();
        } catch (textError: any) {
          // If text() fails, try getting candidates directly (JSON mode behavior)
          log.warn("Failed to get text(), trying candidates", { error: textError?.message });
          const candidates = result.response.candidates;
          if (candidates && candidates[0]?.content?.parts?.[0]?.text) {
            text = candidates[0].content.parts[0].text.trim();
          } else {
            throw new Error("Could not extract text from response");
          }
        }
        
        if (!text) throw new Error("Empty response from AI");
        if (candidate !== preferredModel) {
          log.info("Model fallback used", { candidate });
        }
        return text;
      } catch (error: any) {
        lastError = error;
        const errorMsg = String(error?.message || error || "");

        // If model not found/unsupported, break to next candidate immediately.
        // Cast status to number to handle both numeric and string representations.
        const statusCode = Number(error?.status ?? error?.code ?? error?.httpErrorCode ?? 0);
        const isModelUnavailable =
          statusCode === 404 ||
          statusCode === 400 ||
          /model(.+)?(not found|does not exist|not available|not supported|invalid|deprecated)/i.test(errorMsg) ||
          /is not found/i.test(errorMsg) ||
          /unknown model/i.test(errorMsg) ||
          /models\/.+is not/i.test(errorMsg);

        if (isModelUnavailable) {
          log.warn("Model unavailable, trying next fallback", { candidate, statusCode, error: errorMsg });
          break; // move to next candidate
        }

        // Don't retry on certain errors
        if (
          errorMsg.includes("reported as leaked") ||
          errorMsg.includes("API key") ||
          (error.status === 403 && errorMsg.includes("Forbidden"))
        ) {
          log.error("API key issue detected", { error: errorMsg });
          throw new Error("API key configuration error. Please check Netlify environment variables.");
        }

        // Rate limit errors - wait longer
        if (statusCode === 429 || errorMsg.includes("rate limit")) {
          const waitTime = retryDelay * Math.pow(2, attempt - 1);
          log.warn(`Rate limited, waiting ${waitTime}ms before retry ${attempt}/${maxRetries}`, { candidate });
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }

        // Transient provider errors get retries, then move to the next model.
        if (isTransientProviderError(statusCode, errorMsg)) {
          if (attempt < maxRetries) {
            const waitTime = retryDelay * Math.pow(2, attempt - 1);
            log.warn(`Transient AI provider error, retrying in ${waitTime}ms (${attempt}/${maxRetries})`, {
              candidate,
              statusCode,
              error: errorMsg,
            });
            await new Promise((resolve) => setTimeout(resolve, waitTime));
            continue;
          }

          log.warn("AI provider still overloaded, trying next fallback model", {
            candidate,
            statusCode,
            error: errorMsg,
          });
          break;
        }

        // Other errors - fail immediately
        log.error("AI generation failed", { attempt, model: candidate, error: errorMsg });
        throw error;
      }
    }
  }

  throw lastError || new Error("AI generation failed after retries and fallbacks");
}

function parseJsonFromModelResponse<T = any>(raw: string): T {
  const trimmed = (raw || '').trim();

  const directCandidates = [
    trimmed,
    trimmed.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim(),
  ].filter(Boolean);

  for (const candidate of directCandidates) {
    try {
      return JSON.parse(candidate) as T;
    } catch {
      // continue to extraction attempts
    }
  }

  // Try object extraction
  const objStart = trimmed.indexOf('{');
  const objEnd = trimmed.lastIndexOf('}');
  if (objStart !== -1 && objEnd !== -1 && objEnd > objStart) {
    const objectCandidate = trimmed.slice(objStart, objEnd + 1).trim();
    try {
      return JSON.parse(objectCandidate) as T;
    } catch {
      // continue to array extraction
    }
  }

  // Try array extraction
  const arrStart = trimmed.indexOf('[');
  const arrEnd = trimmed.lastIndexOf(']');
  if (arrStart !== -1 && arrEnd !== -1 && arrEnd > arrStart) {
    const arrayCandidate = trimmed.slice(arrStart, arrEnd + 1).trim();
    return JSON.parse(arrayCandidate) as T;
  }

  throw new Error('Invalid JSON response from AI');
}

/**
 * Generate structured JSON output
 */
export async function generateJSON<T = any>(
  prompt: string,
  options: AIClientOptions = {}
): Promise<T> {
  const text = await generateText(prompt, {
    ...options,
    config: options.config || AI_CONFIGS.structured,
  });
  
  try {
    return parseJsonFromModelResponse<T>(text);
  } catch (error) {
    log.error("Failed to parse JSON response", { text, error });
    throw new Error("Invalid JSON response from AI");
  }
}

/**
 * Analyze image and generate description
 */
export async function analyzeImage(
  imageData: string | Buffer,
  prompt: string,
  options: AIClientOptions = {}
): Promise<string> {
  const model = createAIClient({
    ...options,
    model: AI_MODELS.VISION,
    config: options.config || AI_CONFIGS.concise,
  });
  
  const imagePart = {
    inlineData: {
      data: Buffer.isBuffer(imageData) 
        ? imageData.toString('base64')
        : imageData,
      mimeType: "image/jpeg", // Default, can be overridden
    },
  };
  
  try {
    const result = await model.generateContent([prompt, imagePart]);
    return result.response.text().trim();
  } catch (error: any) {
    log.error("Image analysis failed", { error: error?.message });
    throw error;
  }
}

/**
 * Extract structured data from conversation
 */
export interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  eventDate?: string;
  intent?: string;
  urgency?: "low" | "medium" | "high";
  score?: number; // 0-100
}

export async function extractLeadData(
  conversationHistory: string,
  options: AIClientOptions = {}
): Promise<LeadData> {
  const prompt = `Analyze this customer conversation and extract structured lead information.

Conversation:
${conversationHistory}

Extract and return ONLY valid JSON with these fields (omit any you can't determine):
{
  "name": "customer's full name if mentioned",
  "email": "email address if provided",
  "phone": "phone number if provided",
  "service": "wedding|portrait|event|commercial|headshot",
  "budget": "mentioned budget or range",
  "eventDate": "mentioned date or timeline",
  "intent": "browsing|interested|ready-to-book",
  "urgency": "low|medium|high based on timeline and language",
  "score": 0-100 based on qualification (has contact info, clear intent, budget mentioned, etc)
}`;

  return generateJSON<LeadData>(prompt, options);
}

/**
 * Generate SEO-optimized content suggestions
 */
export interface SEOSuggestions {
  title: string;
  metaDescription: string;
  keywords: string[];
  headings: string[];
  improvements: string[];
}

export async function generateSEOSuggestions(
  content: string,
  targetKeyword: string,
  options: AIClientOptions = {}
): Promise<SEOSuggestions> {
  const prompt = `Analyze this content and provide SEO optimization suggestions for the target keyword: "${targetKeyword}"

Content:
${content.slice(0, 3000)}

Generate SEO suggestions as JSON:
{
  "title": "optimized title (50-60 chars, includes keyword)",
  "metaDescription": "compelling meta description (150-160 chars, includes keyword)",
  "keywords": ["primary keyword", "related keyword 1", "related keyword 2"],
  "headings": ["suggested H2 heading 1", "suggested H2 heading 2"],
  "improvements": ["specific improvement 1", "specific improvement 2", "specific improvement 3"]
}`;

  return generateJSON<SEOSuggestions>(prompt, options);
}

/**
 * Generate blog post with structured output
 */
export interface BlogPost {
  title: string;
  metaDescription: string;
  content: string;
  tags: string[];
  category: string;
  excerpt: string;
}

export async function generateBlogPost(
  topic: string,
  keywords: string[],
  wordCount: number = 1000,
  tone: string = "professional",
  options: AIClientOptions = {}
): Promise<BlogPost> {
  const targetWordCount = Math.min(Math.max(Math.round(Number(wordCount) || 700), 400), 750);
  const maxOutputTokens = targetWordCount <= 550 ? 4096 : 5120;
  const prompt = `Write a comprehensive, SEO-optimized blog post about: ${topic}

Requirements:
- Target keywords: ${keywords.join(", ")}
- Word count: approximately ${targetWordCount} words
- Tone: ${tone}
- Include H2 and H3 headings for structure
- Write in an engaging, natural style
- Focus on photography business context (Studio37)
- Include actionable tips and insights

IMPORTANT: Respond with ONLY a valid JSON object. No markdown, no code blocks, no extra text.

JSON structure:
{
  "title": "compelling SEO title (50-60 chars)",
  "metaDescription": "meta description (150-160 chars)",
  "content": "full blog post content with markdown formatting",
  "tags": ["relevant", "tags", "for", "categorization"],
  "category": "wedding|portrait|business|tips|guides",
  "excerpt": "brief 2-sentence summary for preview"
}`;

  const MAX_PARSE_ATTEMPTS = 1;

  for (let attempt = 1; attempt <= MAX_PARSE_ATTEMPTS; attempt++) {
    try {
      log.info("Generating blog post (attempt)", { attempt, topic, wordCount: targetWordCount, keywordsCount: keywords.length });

      const response = await generateText(prompt, {
        model: BLOG_MODEL_FALLBACKS[0],
        config: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens,
          responseMimeType: "application/json",
        },
        retries: 1,
        retryDelayMs: 500,
        timeoutMs: 3500,
        fallbackModels: BLOG_MODEL_FALLBACKS,
        maxFallbackModels: 4,
        ...options,
      });

      log.info("Blog post response received", {
        attempt,
        responseLength: response?.length || 0,
        responsePreview: response?.substring(0, 150),
      });

      // Delegate all JSON extraction/cleanup to the shared helper which handles:
      // markdown code fences, leading/trailing text, first-{ last-} extraction, etc.
      let blogPost: BlogPost;
      try {
        blogPost = parseJsonFromModelResponse<BlogPost>(response);
      } catch (parseError: any) {
        log.warn("JSON parse failed on attempt, will retry if attempts remain", {
          attempt,
          error: parseError?.message,
          responsePreview: response?.substring(0, 300),
        });
        if (attempt < MAX_PARSE_ATTEMPTS) {
          await new Promise((r) => setTimeout(r, 500 * attempt));
          continue;
        }
        log.warn("Gemini returned invalid blog JSON, returning starter draft", { topic, targetWordCount });
        return buildFallbackBlogPost(topic, keywords, targetWordCount, tone);
      }

      log.info("Blog post JSON parsed", {
        attempt,
        hasTitle: !!blogPost?.title,
        hasContent: !!blogPost?.content,
        titlePreview: blogPost?.title?.substring(0, 50),
        contentLength: blogPost?.content?.length || 0,
      });

      // Validate required fields
      if (!blogPost || !blogPost.title || !blogPost.content) {
        log.warn("Blog post missing required fields, retrying", {
          attempt,
          blogPostKeys: Object.keys(blogPost || {}),
        });
        if (attempt < MAX_PARSE_ATTEMPTS) {
          await new Promise((r) => setTimeout(r, 500 * attempt));
          continue;
        }
        throw new Error("Generated blog post missing required fields (title or content)");
      }

      log.info("Blog post generated successfully", {
        attempt,
        title: blogPost.title?.substring(0, 50),
        contentLength: blogPost.content?.length || 0,
      });

      return blogPost;
    } catch (error: any) {
      // If this is already our own "out of attempts" error, or a hard API error,
      // stop retrying and surface it immediately.
      const isHard =
        error?.message?.includes("API key") ||
        error?.message?.includes("Invalid JSON response") ||
        error?.status === 403 ||
        error?.status === 400;

      log.error("Blog post generation error on attempt", {
        attempt,
        error: error?.message,
        isHard,
      });

      if (isHard || attempt >= MAX_PARSE_ATTEMPTS) {
        if (error?.message?.includes("Empty response")) {
          log.warn("Gemini returned empty blog response, returning starter draft", { topic, targetWordCount });
          return buildFallbackBlogPost(topic, keywords, targetWordCount, tone);
        }
        if (/high demand|overloaded|service unavailable|timed out|timeout/i.test(error?.message || "")) {
          log.warn("All Gemini blog models busy, returning starter draft", { topic, targetWordCount });
          return buildFallbackBlogPost(topic, keywords, targetWordCount, tone);
        }
        throw error;
      }

      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }

  // Should never reach here, but TypeScript needs a return
  throw new Error("Blog post generation failed after all attempts");
}

function buildFallbackBlogPost(topic: string, keywords: string[], wordCount: number, tone: string): BlogPost {
  const cleanTopic = topic.trim() || "Photography Planning Tips";
  const primaryKeyword = keywords.find(Boolean) || "professional photography";
  const title = cleanTopic.length > 58 ? `${cleanTopic.slice(0, 55).trim()}...` : cleanTopic;
  const tagSet = Array.from(new Set([primaryKeyword, ...keywords, "Studio37", "photography tips"].filter(Boolean))).slice(0, 8);
  const category = /wedding|bride|groom|venue|luminaire/i.test(cleanTopic) ? "wedding" : /brand|business|headshot/i.test(cleanTopic) ? "business" : "tips";

  const content = `# ${title}

When clients search for ${primaryKeyword}, they are usually looking for practical advice, confidence, and a clear reason to trust the photographer they choose. This starter draft is designed to give you a strong editing base while the AI provider is temporarily busy.

## Why This Topic Matters

${cleanTopic} is a helpful subject for clients because it connects planning decisions to better final images. For Studio37 Photography, this is also a chance to educate readers before they book and show the kind of detail-oriented guidance they can expect during a session.

## Practical Tips for Better Results

- Start with the client goal: what should these photos help them remember, announce, sell, or celebrate?
- Plan around light quality, not just the clock. Indoor venues, shaded spaces, and mixed lighting all need a clear strategy.
- Keep the shot list focused so the session feels calm instead of rushed.
- Build in a few flexible minutes for transitions, outfit adjustments, and natural moments.
- Communicate expectations before the session so clients arrive prepared.

## Studio37's Approach

Studio37 Photography focuses on clean planning, natural direction, and images that feel polished without losing personality. Whether the session is for a wedding, brand, family, or event, the best results come from matching the location, lighting, and timeline to the story the client wants to tell.

## Final Takeaway

The right preparation turns a good photo session into a smooth experience and a stronger gallery. Use this draft as a foundation, then add venue-specific details, client examples, and your own voice before publishing.

---

**Ready to create something beautiful?** [Book a session with Studio37](https://www.studio37.cc/book-a-session) or [contact us](https://www.studio37.cc/contact) to discuss your photography needs.`;

  return {
    title,
    metaDescription: `Learn ${cleanTopic.toLowerCase()} tips from Studio37 Photography, including planning, lighting, and preparation advice for stronger photos.`,
    content,
    tags: tagSet,
    category,
    excerpt: `A practical Studio37 guide to ${cleanTopic.toLowerCase()}, with planning tips you can use before your next session.`,
  };
}

/**
 * Generate image alt text
 */
export async function generateAltText(
  imageUrl: string,
  context: {
    title?: string;
    category?: string;
    keywords?: string[];
  } = {},
  options: AIClientOptions = {}
): Promise<string> {
  const prompt = `Generate a descriptive, SEO-optimized alt text for this photography image.

Context:
${context.title ? `Title: ${context.title}` : ''}
${context.category ? `Category: ${context.category}` : ''}
${context.keywords?.length ? `Keywords: ${context.keywords.join(', ')}` : ''}

Requirements:
- Describe the image clearly and accurately
- Include relevant photography terms
- Optimize for SEO without keyword stuffing
- Keep under 125 characters
- Be specific and descriptive

Generate ONLY the alt text, no JSON or extra formatting.`;

  try {
    // Fetch image and convert to base64
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    
    return await analyzeImage(base64, prompt, options);
  } catch (error) {
    log.warn("Image fetch failed, generating from context only", { imageUrl });
    // Fallback to text-only generation
    return await generateText(prompt, options);
  }
}

/**
 * Email block type used by EmailBuilder
 */
export interface EmailContentBlock {
  type: 'logo' | 'hero' | 'text' | 'image' | 'button' | 'columns' | 'social' | 'footer' | 'spacer' | 'divider'
  content: Record<string, any>
}

/**
 * Generate a complete email template as EmailBuilder blocks using AI.
 * Returns an array of EmailContentBlock objects ready for the visual builder.
 */
export async function generateEmailContent(
  prompt: string,
  context: {
    templateName?: string
    category?: string
  } = {},
  options: AIClientOptions = {}
): Promise<EmailContentBlock[]> {
  const allowedTypes = new Set<EmailContentBlock['type']>([
    'logo',
    'hero',
    'text',
    'image',
    'button',
    'columns',
    'social',
    'footer',
    'spacer',
    'divider',
  ])

  const sanitizeUrl = (url: unknown, fallback: string): string => {
    if (typeof url !== 'string' || !url.trim()) return fallback
    const trimmed = url.trim()
    if (/^javascript:/i.test(trimmed) || /^data:/i.test(trimmed)) return fallback
    if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('/')) return trimmed
    return fallback
  }

  const sanitizeBlocks = (blocks: EmailContentBlock[]): EmailContentBlock[] => {
    // Keep only known block types and cap length
    const filtered = blocks
      .filter((b) => b && allowedTypes.has(b.type))
      .slice(0, 20)
      .map((block) => {
        const content = { ...(block.content || {}) }

        if (block.type === 'button') {
          content.url = sanitizeUrl(content.url, 'https://www.studio37.cc/book-a-session')
        }

        if (block.type === 'hero' && content.buttonUrl) {
          content.buttonUrl = sanitizeUrl(content.buttonUrl, 'https://www.studio37.cc/book-a-session')
        }

        if (block.type === 'image') {
          content.url = sanitizeUrl(content.url, 'https://www.studio37.cc/images/placeholder.jpg')
        }

        return { ...block, content }
      })

    const hasLogo = filtered.some((b) => b.type === 'logo')
    const hasFooter = filtered.some((b) => b.type === 'footer')
    const hasCTA = filtered.some((b) => b.type === 'button' || (b.type === 'hero' && !!b.content?.buttonText))

    const guarded: EmailContentBlock[] = [...filtered]

    if (!hasLogo) {
      guarded.unshift({ type: 'logo', content: { tagline: 'Studio37 Photography' } })
    }

    if (!hasCTA) {
      guarded.push({
        type: 'button',
        content: {
          text: 'Book Your Session',
          url: 'https://www.studio37.cc/book-a-session',
          backgroundColor: '#b46e14',
          textColor: '#ffffff',
          align: 'center',
        },
      })
    }

    if (!hasFooter) {
      guarded.push({ type: 'footer', content: {} })
    }

    return guarded.slice(0, 24)
  }

  const systemPrompt = `You are an expert email copywriter and designer for Studio37 Photography, a professional photography studio in Houston, TX.
Studio37 specializes in weddings, portraits, events, and commercial photography.
Brand voice: warm, professional, creative, results-driven.
Brand colors: dark headers (#1a1a1a), gold accents (#fbbf24), warm bronze CTAs (#b46e14).
Always include a logo block first and a footer block last.
Always use {{firstName}} for personalization, {{email}} in the footer unsubscribe link.`

  const generationPrompt = `${systemPrompt}

Generate a complete email template for: ${prompt}

Template context:
- Name: ${context.templateName || 'Email Template'}
- Category: ${context.category || 'general'}

You MUST respond with ONLY a valid JSON array of email blocks. No markdown, no code blocks, no explanation.

Available block types and their content fields:
- logo: { tagline?: string }
- hero: { title: string, subtitle?: string, backgroundColor?: string, textColor?: string, buttonText?: string, buttonUrl?: string, buttonColor?: string }
- text: { text: string } (use \\n\\n for paragraph breaks, {{firstName}} for personalization)
- image: { url?: string, alt: string, align?: 'left'|'center'|'right', caption?: string }
- button: { text: string, url: string, backgroundColor?: string, textColor?: string, align?: 'left'|'center'|'right' }
- columns: { col1Title?: string, col1Text: string, col2Title?: string, col2Text: string }
- social: {} (no editable content — auto-renders Studio37 social links)
- footer: {} (no editable content — auto-renders Studio37 address/contact)
- spacer: { height?: number }
- divider: {}

Example response format:
[
  {"type":"logo","content":{"tagline":"Studio37 Photography"}},
  {"type":"hero","content":{"title":"Your Headline","subtitle":"Supporting text","backgroundColor":"#1a1a1a","textColor":"#ffffff","buttonText":"Book Now","buttonUrl":"https://www.studio37.cc/book-a-session","buttonColor":"#b46e14"}},
  {"type":"text","content":{"text":"Hi {{firstName}},\\n\\nYour message here."}},
  {"type":"button","content":{"text":"Take Action","url":"https://www.studio37.cc/book-a-session","backgroundColor":"#b46e14","textColor":"#ffffff","align":"center"}},
  {"type":"social","content":{}},
  {"type":"footer","content":{}}
]

Generate a compelling, on-brand email template now:`

  const raw = await generateText(generationPrompt, {
    ...options,
    config: AI_CONFIGS.creative,
  })

  try {
    const blocks = parseJsonFromModelResponse<EmailContentBlock[]>(raw)
    // Validate it's an array
    if (!Array.isArray(blocks)) throw new Error('Expected array')
    return sanitizeBlocks(blocks)
  } catch (err) {
    log.error('Failed to parse AI email blocks', { raw, err })
    throw new Error('AI returned invalid email block format')
  }
}

export default {
  createAIClient,
  generateText,
  generateJSON,
  analyzeImage,
  extractLeadData,
  generateSEOSuggestions,
  generateBlogPost,
  generateAltText,
  generateEmailContent,
  AI_MODELS,
  AI_CONFIGS,
};
