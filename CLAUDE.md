# Nasgorcok — Nasi Goreng Mamas Ucok Web Menu

Tech: **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4** · **next-themes**

Theme: dark/light, Resident Evil-inspired (grunge, scanlines, film grain, static noise).

## Directory Structure

```
app/
├── layout.tsx            — Root layout: fonts, SEO head, ThemeProvider, Analytics, global loader
├── page.tsx              — Home page: menu grid, about, story, location, blog-preview, ticker
├── not-found.tsx         — 404 page
├── globals.css           — All CSS: variables, animations, component styles
├── robots.ts             — SEO: robots.txt
├── sitemap.ts            — SEO: sitemap.xml
├── privacy-policy/page.tsx
├── blog/
│   ├── layout.tsx        — Blog layout (logo, bg, nav)
│   ├── page.tsx          — Blog list (paginated, cards)
│   └── [slug]/page.tsx   — Blog post detail
└── api/
    ├── posts/route.ts    — JSON endpoint for all blog posts
    └── github/route.ts   — Latest commit from private repo (gitenvx/nasgorcok)

components/       — 22 client components (see conventions below)
lib/              — menu-data.ts, blog.ts, self-ping.ts
content/blog/     — .md files, parsed by gray-matter
public/
├── audio/        — bg.mp3 + lyrics.json (Whisper-generated)
├── img/          — logo, story, bg, qris, favicon, icons
└── fonts/        — re9_big.ttf (GrungeDisplay), re9_small.ttf (MenuMono)
```

## Data Config

All editable content lives in [`lib/menu-data.ts`](lib/menu-data.ts):
- `NAMA_WARUNG`, `KATA`, `NASI_GORENG`, `MIE_CAPCAY` — menu items
- `KONTAK` — WhatsApp, Instagram, Telegram, Website, Email
- `ABOUT` — tagline, description, videoSrc
- `STORY` — carousel slides + desc paragraphs
- `TICKER_ITEMS` — scrolling footer text
- `LOCATION_DATA` — coordinates, images

Edit menu-data.ts to change what displays on the site. Do not hard-code menu text in components.

## Component Conventions

All components in `components/` are **early-return, no-nested-ternary**. Every component:
- Exports a default function
- Uses `interface` for props at the top of the file (not `type`)
- Imports `"use client"` when using hooks or browser APIs
- Heavy overlays (DustOverlay, CookieConsent, RightNav, LyricsDisplay, AudioAutoplay) use `dynamic(() => import(...), { ssr: false })` in page files
- Fetching components (LatestCommit, BlogPreviewSection) fetch from Next.js API routes (`/api/*`), not external URLs directly

### All Components

| Component | Client? | Purpose |
|-----------|---------|---------|
| `AboutSection` | Yes | Video bg + tagline + description overlay |
| `AudioAutoplay` | Yes | Fetches mp3 as blob → creates ObjectURL → auto-plays on user gesture |
| `AudioProvider` | Yes | Wrapper that owns audioRef, provides to AudioAutoplay + LyricsDisplay |
| `BackToTop` | Yes | Floating up-arrow, only visible when scrolled past 300px + near bottom |
| `BlogPreviewSection` | Yes | Fetches `/api/posts` → shows 3 latest posts as cards |
| `CookieConsent` | Yes | Typewriter-style terminal banner, stores consent in localStorage |
| `DustOverlay` | Yes | SVG static noise (4-frame animation) with mix-blend-difference |
| `JitterTitle` | No | Renders heading with last-character glitch animation |
| `KontakColumn` | Yes | Contact links (WA, TG, IG, Email) + QRIS polaroid frame |
| `LatestCommit` | Yes | Fetches `/api/github` → terminal-styled commit card |
| `LocationSection` | Yes | Horizontal image gallery + scroll progress + Google Maps iframe |
| `LoveAnimation` | Yes | 100 floating "i love nasgor" text instances |
| `LyricsDisplay` | Yes | Karaoke sync: fetches lyrics.json, tracks audio time via rAF, highlights active word |
| `MarkdownRenderer` | Yes | react-markdown + Prism syntax highlighter (dark/light themes) |
| `MenuColumn` | No | Renders a menu column with title + bullet items |
| `RightNav` | Yes | Desktop right nav + mobile hamburger + theme toggle (2 instances: one mobile, one desktop grid-snapped) |
| `ScrollReveal` | Yes | IntersectionObserver wrapper — adds `.is-visible` when element enters viewport |
| `ShareButtons` | Yes | WhatsApp, Telegram, X, Threads, FB, native share; visible on blog post pages |
| `StorySection` | Yes | IG-style story carousel with progress bar + circular SVG timer + stacked deck images |
| `ThemeProvider` | Yes | Thin wrapper around next-themes' ThemeProvider |
| `ThemeToggle` | Yes | Fixed bottom-left theme toggle button |
| `TickerBar` | No | Scrolling footer text (4× duplication for seamless loop) |

## CSS Patterns

All styles in [`app/globals.css`](app/globals.css):
- CSS variables under `:root` / `[data-theme='light']`: `--c-void` (bg), `--c-ash` (text), `--c-red` (accent), `--c-border`, `--c-dim`, `--c-box`, `--c-footer-bg`, `--c-heading`
- 3 custom fonts: `GrungeDisplay` (titles), `MenuMono` (menu/code), Roboto Condensed (body, via next/font)
- Animations: `dotPulse`/`dotGlow` (menu dots), `scanSweep`/`scanLine` (h1 sweep), `scratchReveal` (crack lines), `grainNoise` (film grain), `ticker`, `staticBlink`, `jitter-anim`, `loveHorig`/`loveVorig`
- Tailwind CSS v4 syntax: `bg-(--c-red)` not `bg-[custom]`, `text-(--c-ash)`, `font-(--font-submenu)`, `border-(--c-border)`
- Light theme inverts background images and adjusts variables

## Key Architecture Decisions

1. **Audio as Blob**: mp3 fetched via `fetch()` → `blob()` → `URL.createObjectURL()` — avoids IDM detection.
2. **Self-pinging**: [`lib/self-ping.ts`](lib/self-ping.ts) pings `BASE_URL` every 5 min in production to keep the free-tier server warm.
3. **GitHub API**: Private repo `gitenvx/nasgorcok` — token from `GITHUB_TOKEN` env var, fetched server-side via `/api/github` route.
4. **Blog**: Static markdown files in `content/blog/`, parsed by `gray-matter` at build/request time. Pagination: 3 posts per page.
5. **Output**: `next.config.ts` sets `output: "standalone"` for Docker deployment.

## Deploy

- Docker multi-stage build (node:20-alpine), pushed to `yourtulloh/nasgorcok` on Docker Hub.
- `docker-compose.yml` includes Traefik reverse proxy with Let's Encrypt auto-SSL.
- `heroku.yml` also configured for Heroku deployment.
- GitHub Actions builds and pushes on push to `master` (see `.github/workflows/`).

## Common Tasks

- **Change menu items**: Edit `lib/menu-data.ts` arrays.
- **Change colors**: Edit CSS variables in `app/globals.css`.
- **Add a new section**: Create component in `components/`, import dynamically in `app/page.tsx`.
- **Update lyrics**: Replace `public/audio/bg.mp3`, run `python lirik.py` to regenerate `lyrics.json`.
- **Build**: `npm run build` (produces standalone output in `.next/standalone/`).
