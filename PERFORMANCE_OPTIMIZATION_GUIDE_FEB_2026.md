# Performance Optimization Guide - February 2026

## Current Lighthouse Score: 87 (Need to reach 90+)

Based on the Lighthouse audit, this guide addresses performance bottlenecks and provides implementation steps.

---

## 🎯 Issues Fixed (Completed)

### 1. ✅ Image Sizing & Optimization (108.2s waste → addressed)
**Status**: Fixed

**What was wrong**: Components using raw `<img>` tags without proper sizing, hardcoded Cloudinary URLs without transformations.

**Changes made**:
- Updated `PortraitHighlightGallery.tsx` to use `OptimizedImage` component
- Updated `Services.tsx` to use `OptimizedImage` with proper `fill` prop
- Added responsive `sizes` prop: `"(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`
- Set explicit width/height attributes on all images

**Result**: Next.js can now properly calculate responsive image srcsets. Cloudinary will generate optimized variants for each breakpoint.

### 2. ✅ Next-Gen Image Formats (32.69s waste → addressed)
**Status**: Fixed

**How it works**:
- `OptimizedImage` component calls `optimizeCloudinaryUrl()` which adds `f_auto` transform
- Cloudinary automatically serves WebP/AVIF based on browser support
- `next.config.js` prioritizes `["image/avif", "image/webp"]` formats
- Falls back to original format for older browsers

**Cloudinary transforms applied**:
```
f_auto          # Auto-select best format (AVIF/WebP/JPG)
q_auto:good     # Auto quality tuning
c_limit         # Limit transformations to content bounds
w_[width]       # Responsive width sizing
```

### 3. ✅ CSP Compliance (Browser errors resolved)
**Status**: Fixed

Added `https://queue.simpleanalyticscdn.com` to CSP `img-src` directive in:
- [middleware.ts](middleware.ts#L30)
- [next.config.js](next.config.js#L158)

---

## 📋 Remaining Optimizations (High Impact)

### 4. Reduce Unused JavaScript (0.76s waste)

**Current state**: Heavy libraries (Twilio, googleapis, bcryptjs) are properly server-only, but we can trim more.

**Action items**:

#### 4.1 Audit Bundle Splits
Run production build analysis:
```bash
npm run build
# Check .next/static/chunks/ for large files > 100KB
```

**Common issues to check**:
- Are markdown editors (for blog) being lazy-loaded?
- Are admin-only components in `/admin/**` properly code-split?
- Are animation libraries only loaded on pages that use them?

#### 4.2 Implement Dynamic Imports (Quick Win)
Add dynamic imports for heavy components:

```tsx
// app/components/HeavyComponent.tsx example
const DashboardChart = dynamic(() => import('@/components/DashboardChart'), {
  ssr: false,
  loading: () => <SkeletonLoader />,
})

// Only import when needed
const EmailBuilder = dynamic(() => import('@/components/EmailBuilder'), {
  ssr: true, // keep true for admin pages
})
```

#### 4.3 Remove Dead Code
Search for unused exports:
```bash
# Find potentially unused imports
grep -r "import.*from" app/ components/ --include="*.tsx" | \
  grep -v "use\|export\|children\|props" | head -20
```

**Files to audit**:
- `app/admin/layout.tsx` - may import unused widgets
- `components/EmailBuilder.tsx` - check for unused sub-components
- `components/BuilderRuntime.tsx` - verify all block types are used

#### 4.4 Optimize React Query Config
Check `QueryProvider.tsx` for unnecessary default options:
```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min (good)
      gcTime: 10 * 60 * 1000,   // 10 min cache (good)
      // Remove retry on client-side if not needed
      retry: false, // Set to false if errors handled elsewhere
    },
  },
})
```

---

### 5. Reduce Unused CSS (0.3s waste)

**Current state**: Tailwind configured with proper content paths. CSS should be well-purged.

**Action items**:

#### 5.1 Verify Tailwind Purging
Check that all template files are in `tailwind.config.js` content:

```javascript
// tailwind.config.js
content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',    // ✅ Root pages
  './components/**/*.{js,ts,jsx,tsx,mdx}', // ✅ All components
  './app/**/*.{js,ts,jsx,tsx,mdx}',       // ✅ App directory
  './packages/shared/**/*.{js,ts,jsx,tsx}', // ✅ Shared code (if used)
],
```

#### 5.2 Remove Unused Safelist Entries
Current safelist in `tailwind.config.js`:
```javascript
safelist: [
  'animate-fadeIn',
  'animate-slideUp',
  'animate-zoom',
  'film-grain-bg',
  'vintage-card',
  'retro-shadow',
  'retro-border',
  'font-serif',
  'font-sans',
  'font-lora',
  'font-montserrat',
]
```

**Action**: Remove entries not actually used in components. Verify each is referenced.

#### 5.3 Optimize Global CSS
Review `app/globals.css` for:
- ❌ Unused `@keyframe` animations
- ❌ Duplicate utility definitions
- ✅ Reuse Tailwind utilities instead of custom CSS where possible

#### 5.4 Use CSS-in-JS Sparingly
Check for inline `<style jsx>` blocks that could be Tailwind classes:

Example in `components/Services.tsx`:
```tsx
// BEFORE: Inline CSS
<style jsx>{`
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>

// AFTER: Use Tailwind animation
<div className="animate-fade-in-up" />
// Define in tailwind.config.js
```

---

## 🚀 Additional Performance Wins

### 6. Enable Compression (0.3s saving)

Already configured in `next.config.js`:
```javascript
compress: true,
```

Verify in Netlify build logs that compression is active.

### 7. Eliminate Render-Blocking Resources (0.16s)

**Currently good**:
- ✅ Fonts use `display: "swap"` in `layout.tsx`
- ✅ Analytics scripts loaded async
- ✅ Third-party scripts in `<head>` use `async` attribute

**To verify**:
```bash
# Check that scripts are async
grep -n "script" app/layout.tsx | head -10
```

### 8. Remove Duplicate Modules (0.15s)

**Action**: Run bundle analysis after implementing dynamic imports:
```bash
# Add to package.json scripts
"build:analyze": "ANALYZE=true npm run build"
```

Then check for duplicate module IDs in Webpack output.

---

## 📊 Testing & Verification

### Run Lighthouse Locally
```bash
npm run build
npm run start
# Open Chrome DevTools → Lighthouse → Analyze page load
```

### Check Production Performance
```bash
# Test on Netlify preview
# Go to: https://699d3c925f973800080db941--studio37.netlify.app
# Chrome DevTools → Network → Throttle to "Slow 4G"
```

### Monitor Metrics
Track these Core Web Vitals:
- **LCP** (Largest Contentful Paint) - Should be < 2.5s ✅ (Image preload helps)
- **FID** (First Input Delay) - Should be < 100ms ✅ (Already optimized)
- **CLS** (Cumulative Layout Shift) - Should be < 0.1 ✅ (Need to verify)

---

## 🔧 Implementation Checklist

- [x] Fix image sizing in `PortraitHighlightGallery.tsx`
- [x] Fix image sizing in `Services.tsx`
- [x] Ensure Cloudinary transforms are applied (`f_auto,q_auto`)
- [x] Add Simple Analytics CDN to CSP
- [ ] Run production build and analyze bundle
- [ ] Identify and dynamically import heavy components
- [ ] Remove unused Tailwind safelist entries
- [ ] Audit `app/globals.css` for dead CSS
- [ ] Test Lighthouse score after each change
- [ ] Monitor Core Web Vitals in production

---

## 📈 Expected Impact

| Optimization | Potential Gain |
|---|---|
| Image optimization (sizes) | 20-30s |
| Next-gen formats (AVIF/WebP) | 20-30s |
| Dynamic imports (heavy components) | 5-10s |
| Tailwind CSS purging | 2-5s |
| Remove unused JavaScript | 3-8s |
| **Total estimated** | **50-83s (5-10 point Lighthouse gain)** |

---

## 🐛 Troubleshooting

### Images still not optimized?
- Verify `OptimizedImage` component is imported correctly
- Check browser Network tab: Images should have `f_auto,q_auto,w_XXX` in URL
- Clear Netlify cache: Settings → Deployments → Trigger deploy

### Lighthouse still showing errors?
- Run audit in incognito mode to avoid extensions
- Check that Cloudinary URLs include transforms
- Verify CSP header allows all image sources

### Build failing after changes?
- Run `npm run typecheck` to catch TypeScript errors
- Run `npm run lint` to catch ESLint issues
- Check `next.config.js` syntax for typos

---

## 📚 Reference

- [Cloudinary URL transformations](https://cloudinary.com/documentation/transformation_reference)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Tailwind CSS Optimization](https://tailwindcss.com/docs/optimizing-for-production)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Lighthouse Scoring](https://developers.google.com/web/tools/lighthouse/v3/scoring)
