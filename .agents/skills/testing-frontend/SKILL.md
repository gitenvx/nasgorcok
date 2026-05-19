---
name: testing-nasgorcok-frontend
description: Test the nasgorcok Next.js frontend end-to-end. Use when verifying CSS visual effects, animations, layout, or component changes.
---

# Testing Nasgorcok Frontend

## Dev Server Setup

```bash
cd /home/ubuntu/repos/nasgorcok
npm install
npx next dev --port 3000
```

The app runs at `http://localhost:3000`. No environment variables or secrets are needed for local dev.

If port 3000 is occupied, kill existing processes first:
```bash
pkill -f "next dev" 2>/dev/null
# or use a different port:
npx next dev --port 3001
```

## Key Pages & Features

- **Main page** (`/`): Single-page menu with header, 3 columns (Nasi Goreng, Mie, Kontak), QRIS frame, footer ticker
- **CSS overlays**: pixel-snow (flicker animation), bg-grid, crack-overlay (SVG scratches), scanline effect
- **Audio**: Background music with lyrics sync (requires user click to play)
- **Opening animation**: Glitch text entry, box reveal, fade-up columns — runs on page load

## Testing CSS Visual Effects

CSS animations (like pixel snow) use `@keyframes` with opacity changes, so particles may not be visible at every moment. Tips:

1. **Pause animations** to inspect static state:
   ```js
   // In browser console
   const style = document.createElement('style');
   style.textContent = '.pixel-snow::before, .pixel-snow::after { animation-play-state: paused !important; opacity: 1 !important; }';
   document.head.appendChild(style);
   ```

2. **Verify computed CSS** via console:
   ```js
   const el = document.querySelector('.pixel-snow');
   const s = getComputedStyle(el, '::before');
   console.log(s.width, s.height, s.borderRadius);
   ```

3. **Before/After comparison**: Override styles in the browser to simulate original values, take screenshots, then remove override.

4. **Zoom into dark areas** of the page to inspect particle size and blur — particles are most visible on the dark background between menu columns.

## Testing Animation

To verify flicker/fade animations are working, take two screenshots a few seconds apart and compare particle opacity. The `::before` layer runs at 3.2s and `::after` at 4.7s with a 1.6s delay, so they animate asynchronously.

## Layout Regression Check

Verify these elements render correctly after CSS changes:
- Header with "NASIGORENG" title and grunge font
- 3 menu columns in a row (PC) or stacked (mobile)
- QRIS payment frame with polaroid border
- Footer ticker scrolling text
- Snow overlay has `pointer-events: none` and doesn't block interaction

## Build Check

```bash
npm run build
```

No lint or typecheck scripts are configured — only `dev`, `build`, `start`.

## Deployment

The repo uses Vercel for preview deployments. Vercel previews may fail if the commit author email doesn't match a GitHub account linked to the Vercel team — this is not a code issue.

## Devin Secrets Needed

None required for local development and testing.
