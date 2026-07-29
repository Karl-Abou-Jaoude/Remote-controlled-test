# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Astro static site — conversion-first portfolio for a Shopify engineer. Zero JavaScript in production (progressive enhancement only). Heavy emphasis on performance, accessibility, and content validation.

## Commands

```bash
npm run dev               # Dev server http://localhost:4321
npm run build            # Type check + content validation + static build
npm run check            # List all placeholders and demo content (non-blocking)
npm run check:strict     # Fail build if any placeholder remains (gate for CI)
npm run preview          # View built site locally
npm run og               # Regenerate OG image (Playwright, optional)
```

**Content validation is part of the build.** `npm run build` won't succeed if content guard checks fail. See "Content guards" below.

## Architecture

**Pages** (`src/pages/*.astro`):
- `index.astro` — main page (layout + component imports)
- `work/[slug].astro` — case study detail pages (dynamic)
- `about.astro`, `404.astro`, `privacy.astro`, `thanks.astro` — static pages

**Components** (`src/components/*.astro`):
- Page sections: `Hero`, `ScopeStrip`, `Triage`, `CaseCards`, `Testimonial`, `Engagements`, `Objections`, `MidProof`, `Faq`
- Utilities: `Cta`, `Diff`, `CreditsTable`, `SectionHead`, `Booking`, `StickyCta`, `TeardownForm`, `Rail`, `Header`, `Footer`
- All are `.astro` (zero client-side JS) except optional Booking embed loaded on click-intent

**Data** (`src/data/`):
- `site.ts` — all site-level copy (hero, pricing, contact info, metadata)
- `work.ts` — case studies array (each study: metrics, brands, outcomes, testimonials)
- **All marketing copy lives here.** Never edit components to change wording.

**Content guards** (`scripts/check-content.mjs`):
- Fails if `ScopeStrip` has <4 metrics cells
- Fails if `CreditsTable` has <3 nameable brands
- Fails if any testimonial lacks a resolvable public profile URL
- Fails on percentages without baseline/window, past availability dates, anonymous brands, or misleading agency attribution language
- Runs on every build; `npm run check` reports all issues without failing

**Styling** (`src/styles/`):
- Tailwind CSS 4 + `@tailwindcss/vite` (CSS-first `@theme` tokens)
- All CSS inlined at build time (no render-blocking requests)
- Color pairs in `global.css` are WCAG 2.2 checked; ratios in comments
- Fonts from `@fontsource-variable/*` packages (local, no CDN)

**Layout** (`src/layouts/Base.astro`):
- Wraps all pages
- Loads fonts, defines meta, handles sitemap exclusions when `DEMO_CONTENT = true`

**Enhancement** (`src/scripts/enhance.ts`):
- Progressive enhancement: scroll depth tracking, IntersectionObserver sentinels, analytics detection (`window.track()`)
- No scroll listeners or animation libraries

## Content replacement workflow

See `CONTENT.md`. Order matters — legal/brand permissions first, then:
1. Set `contact.calLink` and `contact.web3formsKey` (unblocks booking and form)
2. Replace all fake metrics, prices, and dates in `src/data/site.ts`
3. Replace case studies and testimonials in `src/data/work.ts`
4. Replace brand names and descriptions
5. Set `DEMO_CONTENT = false` in `src/data/site.ts` (re-enables SEO, sitemap)
6. Run `npm run check:strict` to verify no placeholders remain

## Key constraints

- **Demo mode is a safety feature.** `DEMO_CONTENT = true` → `noindex, nofollow`, no sitemap, demo links render as text. This prevents invented metrics and testimonials from being crawled before they're replaced.
- **Content guards are strict by design.** Proof floors (4+ metrics, 3+ brands, resolvable testimonial URLs) are enforced in code, not prose.
- **No fabricated claims for deployed sites.** Every brand, metric, quote, and price in a live build must be real and verifiable.
- **Attribution matters.** Agency work is credited as "Selected work delivered as lead Shopify engineer at [agency]" — never "Clients" or "Worked with" (these imply direct contracts). Outcomes are stated as "the brand reported" not "I increased".

## Performance/accessibility notes

- LCP element is `<h1>` text, not an image (no hero portrait)
- Zero third-party requests (fonts local, no GA4)
- Booking embed loads on click-intent (not on page load)
- Below 640px, booking link stays as anchor (month view cramped on mobile)
- `color-scheme: only light` prevents forced-dark from breaking measured palette
- Focus ring is 3:1 contrast over both paper and ink sections
- Motion budget: `clip-path` wipes on `animation-timeline: view()`, sub-200ms fades for orientation, no transforms/counts in reduced-motion

## Git commit policy

Commits should have only Karlaboujaoude as author — no co-author trailers.

## Deployment

Any static host. `dist/` is the full site.

Two setup steps:
1. Trailing-slash redirect policy (301 for inconsistent slashes → prevent duplicate content)
2. Real 404 status for `404.html` (not 200 with body)

Analytics (optional): use cookieless tracker (Umami, Plausible, Fathom). Markup is vendor-agnostic — `window.track()` auto-detects and every CTA reports position for booking conversion tracking.
