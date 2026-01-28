# Thumbtack Reviews - Visual Implementation Guide

## Component #1: Testimonials Grid (Homepage)

**Location:** Homepage "What Our Clients Say" section  
**Component:** `<Testimonials />`  
**File:** `components/Testimonials.tsx`

### Desktop Layout (3 Columns)
```
┌─────────────────────────────────────────────────────────────┐
│           "What Our Clients Say"                            │
│  Don't just take our word for it. Here's what our...       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  ❝ Quote     │  │  ❝ Quote     │  │  ❝ Quote     │     │
│  │              │  │              │  │              │     │
│  │  ⭐⭐⭐⭐⭐│  │  ⭐⭐⭐⭐⭐│  │  ⭐⭐⭐⭐⭐│     │
│  │              │  │              │  │              │     │
│  │  "Working    │  │  "Christian  │  │  "Very       │     │
│  │  with Catie  │  │  and Caitie  │  │  impressive  │     │
│  │  and         │  │  were        │  │  team work.  │     │
│  │  Christian   │  │  incredible  │  │  They guided │     │
│  │  was such a  │  │  to work     │  │  us through  │     │
│  │  wonderful   │  │  with!..."   │  │  the session │     │
│  │  experience" │  │              │  │  and it felt │     │
│  │              │  │  [Avatar]    │  │  flawless."  │     │
│  │  [Avatar]    │  │  Kelsi R.    │  │              │     │
│  │  Astini S.   │  │  Portrait    │  │  [Avatar]    │     │
│  │  Portrait    │  │  Photography │  │  Deborah B.  │     │
│  │  Photography │  │              │  │  Portrait    │     │
│  │              │  │  [Thumbtack]◆│  │  Photography │     │
│  │  [Thumbtack]◆│  └──────────────┘  │              │     │
│  └──────────────┘                     │  [Thumbtack]◆│     │
│                                       └──────────────┘     │
│  ... (Cards continue with remaining testimonials)          │
└─────────────────────────────────────────────────────────────┘

Legend:
❝ = Quote icon (primary color)
⭐ = Yellow stars (5 per review)
[Avatar] = Profile image (48x48px)
[Thumbtack]◆ = Clickable blue badge
```

### Individual Card Detail
```
┌─────────────────────────────────┐
│  ❝ (Primary Color Icon)         │
│                                 │
│  ⭐⭐⭐⭐⭐               │
│  (Yellow/Yellow/Yellow...)      │
│                                 │
│  "Working with Catie and        │
│   Christian was such a          │
│   wonderful experience. They     │
│   are the kindest couple..."    │
│                                 │
│  ┌──────────────────────┐       │
│  │ [Avatar] Astini S.   │Thumbtack◆
│  │           Portrait   │       │
│  │           Photography│       │
│  └──────────────────────┘       │
│                                 │
└─────────────────────────────────┘

Card styling:
- Background: Light gray (#F9FAFB)
- Border radius: 8px
- Padding: 32px
- Hover: Subtle shadow
- Transitions: Smooth fade-in on scroll
```

### Mobile Layout (1 Column)
```
┌──────────────────────┐
│  "What Our Clients   │
│   Say"               │
│  Don't just take...  │
├──────────────────────┤
│ ┌──────────────────┐ │
│ │ ❝                │ │
│ │ ⭐⭐⭐⭐⭐   │ │
│ │ "Working with... │ │
│ │ ...experience"   │ │
│ │ [Avatar]         │ │
│ │ Astini S.        │ │
│ │ Portrait         │ │
│ │ Photography      │ │
│ │          [Thumbtack]│
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ ❝                │ │
│ │ ⭐⭐⭐⭐⭐   │ │
│ │ "Christian and.. │ │
│ │ ...Recommend!"   │ │
│ │ [Avatar]         │ │
│ │ Kelsi R.         │ │
│ │ Portrait         │ │
│ │ Photography      │ │
│ │          [Thumbtack]│
│ └──────────────────┘ │
└──────────────────────┘
```

---

## Component #2: Testimonials Carousel (Visual Builder)

**Location:** Any page using TestimonialsBlock  
**Component:** `<TestimonialsClient />`  
**File:** `components/blocks/TestimonialsClient.tsx`  
**Auto-rotate:** 5 seconds per testimonial

### Carousel View
```
┌─────────────────────────────────────────────────┐
│                                                 │
│         ⭐⭐⭐⭐⭐             │
│         (5-star rating)                        │
│                                                 │
│    "Working with Catie and Christian was       │
│     such a wonderful experience. They are       │
│     the kindest couple, and we clicked with     │
│     them right away..."                         │
│                                                 │
│         [Avatar]                               │
│         Astini S.                              │
│         Portrait Photography                  │
│                                                 │
│         ┌─────────────────────────────┐        │
│         │ From Thumbtack ▲ (Link)     │        │
│         └─────────────────────────────┘        │
│                                                 │
│         ● ○ ○ ○ ○ ○ ○ ○ ○ ○ ○       │
│         (Navigation dots)                       │
│                                                 │
└─────────────────────────────────────────────────┘

Timer: Automatically advances to next testimonial
Manual: Click dots to jump to specific testimonial
Transition: Smooth fade effect (500ms)
```

### Multi-State View
```
Initial State                After 5 sec                After 10 sec
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ ⭐⭐⭐⭐⭐   │    │ ⭐⭐⭐⭐⭐   │    │ ⭐⭐⭐⭐⭐   │
│                  │    │                  │    │                  │
│ "Working with    │    │ "Christian and   │    │ "Very impressive │
│ Catie and        │    │ Caitie were      │    │ team work. They  │
│ Christian..."    │    │ incredible to    │    │ guided us through │
│                  │    │ work with!..."   │    │ the session..."  │
│ Astini S.        │    │ Kelsi R.         │    │ Deborah B.       │
│                  │    │                  │    │                  │
│ ● ○ ○ ○ ○ ○ ○ │    │ ○ ● ○ ○ ○ ○ ○ │    │ ○ ○ ● ○ ○ ○ ○ │
└──────────────────┘    └──────────────────┘    └──────────────────┘

Carousel loops through all 11 testimonials continuously
Each testimonial displays for 5 seconds
Users can manually navigate with dots anytime
Clicking a dot stops auto-rotation momentarily
```

---

## Visual Elements Breakdown

### Star Rating System
```
Rating: 5/5

Display:  ⭐⭐⭐⭐⭐
Colors:   YELLOW YELLOW YELLOW YELLOW YELLOW

For 4/5:  ⭐⭐⭐⭐ ☆
Colors:   YELLOW YELLOW YELLOW YELLOW GRAY

For 3/5:  ⭐⭐⭐ ☆ ☆
Colors:   YELLOW YELLOW YELLOW GRAY GRAY

All testimonials in this set are: 5/5 ⭐⭐⭐⭐⭐
```

### Source Badge
```
Desktop View:
┌─────────────────────────┐
│ From Thumbtack ▶        │  (Blue pill, clickable)
└─────────────────────────┘

Styling:
- Background: #DBEAFE (Light Blue)
- Text: #0369A1 (Dark Blue)
- Padding: 6px 12px
- Border radius: 999px (fully rounded)
- Font: 12px, Semibold, sans-serif

On Hover:
- Background: #BFDBFE (Darker Blue)
- Cursor: pointer
- Slight scale up

On Click:
- Opens: https://www.thumbtack.com/tx/pinehurst/...
- Target: New tab (target="_blank")
- Preserves: Site traffic (rel="noopener noreferrer")
```

### Avatar Images
```
Size: 48x48 pixels (CSS: w-12 h-12)
Shape: Perfectly circular (border-radius: 100%)
Fallback: Unsplash portrait photos
Loading: Lazy-loaded for performance
Alt text: Client name provided
```

---

## Color Palette

```
Primary Elements:
├─ Quote Icon: Primary Color (from theme)
├─ Star Rating (Filled): #FDE047 (Yellow)
├─ Star Rating (Empty): #D1D5DB (Gray)
├─ Source Badge BG: #DBEAFE (Light Blue)
├─ Source Badge Text: #0369A1 (Dark Blue)
└─ Active Carousel Dot: Primary Color

Text Colors:
├─ Testimonial Quote: #111827 (Dark Gray)
├─ Client Name: #111827 (Dark Gray, semibold)
├─ Service Type: #374151 (Medium Gray)
└─ Secondary Text: #6B7280 (Light Gray)

Backgrounds:
├─ Card BG: #F9FAFB (Light Gray)
├─ Hover State: Subtle shadow
└─ Page BG: White

Badge States:
├─ Normal: #DBEAFE → #0369A1 text
├─ Hover: #BFDBFE → #0369A1 text (darker)
└─ Active: Maintains #0369A1 text
```

---

## Typography

```
Testimonial Quote
├─ Font: System sans-serif (Tailwind default)
├─ Size: 18px (md base)
├─ Weight: 400 (italic style)
├─ Color: #111827 (Dark Gray)
├─ Line Height: 1.5
└─ Max Width: 42rem (672px)

Client Name
├─ Font: System sans-serif
├─ Size: 14px (sm base)
├─ Weight: 600 (semibold)
├─ Color: #111827 (Dark Gray)
└─ Margin Top: 0.75rem

Service Type
├─ Font: System sans-serif
├─ Size: 14px (sm base)
├─ Weight: 400 (normal)
├─ Color: #374151 (Medium Gray)
├─ Opacity: 0.8
└─ Margin Top: 0.25rem

Badge Text
├─ Font: System sans-serif
├─ Size: 12px (xs)
├─ Weight: 600 (semibold)
├─ Color: #0369A1 (Dark Blue)
└─ Text Transform: Capitalize
```

---

## Animation & Transitions

```
Fade-in on Scroll (Grid view):
├─ Initial: opacity: 0, transform: translateY(32px)
├─ Final: opacity: 1, transform: translateY(0)
├─ Duration: 500ms
├─ Easing: ease-in-out
└─ Stagger: 100ms per item

Carousel Transition:
├─ Type: Cross-fade
├─ Duration: 500ms
├─ Auto-rotate: 5000ms (5 seconds)
└─ Loop: Infinite

Hover Effects:
├─ Badge: 200ms color transition
├─ Card: Subtle shadow on hover
├─ Dot: 200ms color transition
└─ Link: Pointer cursor + color change
```

---

## Responsive Behavior

```
Desktop (1024px+)
├─ Grid: 3 columns
├─ Card Padding: 32px
├─ Avatar: 48x48px
├─ Font sizes: Full
└─ Spacing: Generous

Tablet (768px - 1023px)
├─ Grid: 2 columns
├─ Card Padding: 24px
├─ Avatar: 48x48px
├─ Font sizes: Slightly reduced
└─ Spacing: Moderate

Mobile (< 768px)
├─ Grid: 1 column
├─ Card Padding: 16px-24px
├─ Avatar: 40x40px (scaled)
├─ Font sizes: Reduced by 1-2px
├─ Spacing: Minimal
└─ Width: Full width - 16px margins
```

---

## User Interactions

### Clicking Testimonial Card
```
Grid View:
- Doesn't navigate (static content)
- Badge link only: Opens Thumbtack profile

Carousel View:
- Click dot: Jump to testimonial
- Click badge: Open Thumbtack profile
- Auto-rotate pauses briefly after click
```

### Keyboard Navigation
```
Tab Navigation:
- Source badges are focusable links
- Carousel dots are focusable buttons
- Visual focus indicator shown

Enter/Space:
- Activate badge links (new tab)
- Activate carousel dots

Screen Reader Support:
- Quote: Read as italic text
- Rating: "Rated 5 out of 5"
- Name/Service: Read sequentially
- Badge: "From Thumbtack, link, external"
```

---

## Performance Specifications

```
Image Loading:
├─ Lazy loading enabled
├─ Size: 48x48px actual, ~2-3KB each
├─ Format: JPEG/WebP
└─ Cache: Browser cache + CDN

CSS:
├─ Inline Tailwind classes (no additional CSS)
├─ No heavy animations
├─ GPU accelerated transforms
└─ Minimal repaints

JavaScript:
├─ React hooks (useState, useEffect)
├─ 5-second interval timer (light)
├─ No external dependencies
└─ Client component only
```

---

## Sample Testimonial Snapshot

```
Complete Card Example:

┌────────────────────────────────────────────┐
│                                            │
│  ❝                                        │
│                                            │
│  ⭐⭐⭐⭐⭐                           │
│                                            │
│  "Working with Catie and Christian was     │
│   such a wonderful experience. They are     │
│   the kindest couple, and we clicked       │
│   with them right away. Despite our shoot   │
│   being very last minute, they were        │
│   incredibly flexible and accommodating.   │
│   They truly listened to what we wanted    │
│   and made the whole experience relaxed    │
│   and fun. We're so excited to see the     │
│   final photos."                           │
│                                            │
│  [👤]  Astini S.                          │
│        Portrait Photography                │
│                              [Thumbtack]   │
│                                            │
└────────────────────────────────────────────┘
```

---

**Visual Implementation Complete** ✅

All visual specifications are implemented in:
- `components/Testimonials.tsx` (Grid view)
- `components/blocks/TestimonialsClient.tsx` (Carousel view)
