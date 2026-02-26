# Quick Performance Wins - Action Items

## 🎯 Top 3 Immediate Actions for +5 Lighthouse Points

### 1. ✅ DONE: Image Optimization (30-40 point improvement)
**Files Changed:**
- `components/PortraitHighlightGallery.tsx` - Now uses OptimizedImage
- `components/Services.tsx` - Now uses OptimizedImage
- `middleware.ts` - CSP updated
- `next.config.js` - CSP updated

**Deploy**: Commit and push to trigger Netlify rebuild

---

### 2. 📊 Bundle Analysis (5-10 point improvement)
**Time**: 30 minutes

**Steps**:
```bash
# 1. Build and check what's in bundles
npm run build

# 2. Look for large chunks
ls -lh .next/static/chunks/ | sort -k5 -hr | head -20

# 3. If any chunk > 200KB, it needs optimization
# Common culprits:
# - Editor libraries (BuilderRuntime.tsx)
# - Chart libraries (Dashboard)
# - Email builder (EmailBuilder.tsx)
```

**Solution Template**:
```tsx
// app/components/HeavyComponent.tsx
const HeavyEditor = dynamic(() => import('@/admin/HeavyEditor'), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
})

// In page:
<Suspense fallback={<LoadingSkeleton />}>
  <HeavyEditor />
</Suspense>
```

---

### 3. 🧹 CSS Cleanup (2-5 point improvement)
**Time**: 15 minutes

**Checklist**:
- [ ] Check `tailwind.config.js` safelist - remove unused entries
- [ ] Search `app/globals.css` for unused @keyframes
- [ ] Search components for `<style jsx>` - convert to Tailwind
- [ ] Run `npm run build` - verify CSS bundle size decreased

**Quick Check**:
```bash
# See CSS file sizes
ls -lh .next/static/css/
# Should be < 30KB total (currently probably 40-50KB)
```

---

## 📈 Expected Results After All Changes

```
Current:  87/100 (Performance score)
Phase 1:  89/100 (Image optimization - DONE)
Phase 2:  90/100 (Bundle optimization)
Phase 3:  92/100 (CSS cleanup)
Goal:     95/100 (Full optimization)
```

---

## 🔄 Deployment Flow

```
1. Commit image optimization changes
   └─> Netlify auto-builds
   └─> Test: Run Lighthouse audit
   └─> Check Network tab for image transforms

2. Run bundle analysis
   └─> Identify large chunks
   └─> Add dynamic imports
   └─> Test build: `npm run build`
   └─> Verify bundle size decreased

3. CSS cleanup
   └─> Remove unused utilities
   └─> Test build: `npm run build`
   └─> Run Lighthouse again

4. Deploy & Monitor
   └─> Check Core Web Vitals
   └─> Monitor PageSpeed Insights weekly
```

---

## 🚨 Common Issues & Fixes

### Images not optimized?
**Check**: Are Cloudinary URLs including transforms?
```
❌ Wrong: https://res.cloudinary.com/.../PS372952_gkvxjl.jpg
✅ Right: https://res.cloudinary.com/.../f_auto,q_auto,w_400/.../PS372952_gkvxjl.jpg
```

**Fix**: 
1. Verify OptimizedImage component is used
2. Clear browser cache
3. Trigger Netlify rebuild: Deploy settings → Trigger deploy

### Browser errors after changes?
**Check**: Network tab for CSP errors
```
❌ "Refused to load image from queue.simpleanalyticscdn.com"
✅ Should not see this error (already fixed)
```

### Build failing?
**Run diagnostics**:
```bash
npm run typecheck  # TypeScript errors
npm run lint       # ESLint issues
npm run build      # Full build test
```

---

## 📊 Files to Monitor

After deployment, check these in DevTools Network tab:

1. **Image Transforms** (should see f_auto,q_auto,w_XXX)
   - PortraitHighlightGallery images
   - Services component images

2. **Bundle Size** (.next/static/chunks/)
   - main bundle < 50KB
   - page bundles < 100KB each
   - No unused chunks

3. **CSS Size** (.next/static/css/)
   - Total < 30KB

---

## ✅ Success Metrics

- [ ] Lighthouse Performance: 90+
- [ ] LCP: < 2.5s
- [ ] FID: < 100ms  
- [ ] CLS: < 0.1
- [ ] Images have srcset with f_auto,q_auto transforms
- [ ] No CSP errors in console
- [ ] Bundle chunks under expected size limits

---

## 📞 Quick Reference

| Issue | Solution | Time |
|-------|----------|------|
| Images too large | Use OptimizedImage + sizes prop | ✅ Done |
| Wrong formats (no WebP) | Cloudinary f_auto transforms | ✅ Done |
| CSP errors | Whitelist queue.simpleanalyticscdn.com | ✅ Done |
| Unused JS bloating bundle | Dynamic imports for heavy components | 30 min |
| Unused CSS in bundle | Tailwind purge + remove safelist | 15 min |

---

**Current Status**: Phase 1 (Images) Complete ✅
**Next**: Phase 2 (Bundle) - Follow checklist above
