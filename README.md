# karlaboujaoude.com

A conversion-first portfolio site for a lead Shopify engineer. One page, one
goal: a qualified buyer books a call or sends a store URL.

> ### ⚠ Demo content is active
>
> Every brand, figure, quote and price is **invented** so the site renders
> complete for review. `Ravelston Outerwear`, `Volsted Athletic`, `Thicket Coffee Co.`,
> `Maison Perlaine` and `Quillon Supply` are fictional; both testimonials were
> written rather than collected; the case-study metrics are illustrative.
>
> **Do not point a live domain at this build.** Invented client work and written
> testimonials are the most checkable claims on a page like this — one email to a
> named brand settles it, and it settles the whole claim set, including the parts
> that were true.
>
> While the flag is set, every page ships `noindex, nofollow` and no sitemap is
> generated, so nothing fabricated can be crawled — the JSON-LD graph would
> otherwise make invented revenue and platform claims machine-readable. Demo
> links (`example.com` storefronts, replace-me profile paths) render as plain text
> rather than anchors.
>
> `npm run check` prints the full inventory on every build. Replace the values in
> `src/data/site.ts` and `src/data/work.ts`, then set `DEMO_CONTENT = false` —
> that re-enables indexing and the sitemap. [CONTENT.md](./CONTENT.md) has the
> order, starting with written permission from the agency before any real brand
> name goes on the page.

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # content guard → type check → static build
npm run check        # what content is still outstanding
npm run check:strict # fails while any placeholder remains
```

**Start with [CONTENT.md](./CONTENT.md).** Every word lives in `src/data/site.ts`
and `src/data/work.ts`; you should never edit a component to change copy.

---

## What this is optimised for, and why

The design is not a matter of taste — each decision below traces to research on
what actually converts on high-ticket service pages, what award juries reward,
and what technical buyers read as unverifiable.

### The page argues in one order

Hero → scope → credits → what I get hired for → mid-page CTA with proof → three
cases → hiring-one-person concerns → pricing → booking → FAQ → footer.

Roughly 27% of visitors scroll at all and most pages get under 15 seconds of
attention, so the whole offer is above the fold: outcome headline, both asks,
doubt-remover, risk reversal, availability, and the price band. The hero is text
— the LCP element is the `<h1>`, not an image.

There is deliberately **no portrait in the hero**. An agency homepage tested as
*more* professional, and as having *larger* clients, without the founder photo —
precisely the anxiety a solo engineer must not feed. The portrait is small and on
`/about`, which is where hiring managers click only after they have decided the
work is solid.

### Proof floors are enforced in code, not in prose

Anonymous or half-filled proof at high density is worse than less proof: it reads
as a template someone filled in optimistically. So:

- `ScopeStrip` renders only cells with real values and **fails the build below
  four**.
- `CreditsTable` renders nothing below **three nameable brands**; category-only
  clients live inside a case study where the constraint narrative carries them.
- `Testimonial` demands a resolvable public profile URL — the link is the trust
  mechanism, the quote is only the design.
- `npm run check` fails on a percentage with no baseline or window, on an
  availability date in the past, on anonymous brands in the credits row, and on
  headings that imply a client relationship held by the agency.

### Attribution is stated in the heading, not buried

Agency-side work is credited as *"Selected work delivered as lead Shopify
engineer at Qwerty"*. "Clients", "Trusted by" and "Worked with" are blocked by
the content guard: each implies a direct contractual relationship, and it is the
most checkable misrepresentation in this category — one email to the brand ends
the deal. Outcomes are attributed to the client's instrument ("the brand
reported"), never asserted as "I increased revenue by X".

Tenure appears in exactly two places — the FAQ and `/about` — stated exactly and
never rounded. Rounding two years up is checkable in fifteen seconds and would
discount every other number on the site.

### One ownable motif instead of borrowed devices

The **diff** (`−` before / `+` after, in mono) is what he actually sells: a store
before and after his decisions. It repeats on the triage tiles, the work cards,
each case-study decision, the 404, and the footer's own performance numbers. The
glyph carries the meaning, so it never depends on colour.

Cut in its favour: the hover-word device, the infinite logo marquee (replaced by
an editorial credits table — more evidence per pixel, fully static, and WCAG
2.2.2 stops applying), and the blanket opacity/translate fade-up that every
Tailwind starter ships.

### Motion budget: one idea, zero JavaScript

The two ink bands arrive as a `clip-path` wipe on `animation-timeline: view()`,
background layer only, text never hidden. Hairlines draw in the same way. There
is no scroll-reveal observer, no smooth-scroll library, no magnetic buttons and
no cursor tracking.

Nothing that a buyer reads to decide — body copy, pricing, service descriptions,
form labels, any CTA — ever animates or waits on scroll. Reduced-motion keeps
sub-200ms fades (they aid orientation) and removes every transform, wipe and
count-up.

### Performance is the product demo

Measured on the built site: **6 requests, 21KB HTML with all CSS inlined, 2KB JS,
87KB fonts, zero third-party requests, zero cookies.**

- CSS is fully inlined → no render-blocking requests.
- Fonts resolve from installed `@fontsource` packages through Astro's local
  provider, so there is no CDN connection, and `optimizedFallbacks` derives
  metric-matched fallbacks from the real metrics → the swap costs no layout
  shift. Only the two above-the-fold faces preload.
- The booking embed loads **on intent, never on load** — an eagerly embedded
  scheduler costs seconds of main-thread time, and blocking time is a large share
  of the Lighthouse score. The facade is a real anchor, so it works with
  JavaScript off. Below 640px it stays a link to the hosted page, because month
  view is cramped under ~420px.
- Scroll depth uses IntersectionObserver sentinels; there is no scroll listener
  anywhere.

### Accessibility, because it is also sales collateral

Many international brands have legal accessibility exposure, so this is a
differentiator rather than overhead: keyboard-complete, semantic landmarks, real
`<details>` disclosure, a two-tone focus ring measured to hold 3:1 over both the
paper sections and the ink bands, 24×24px minimum targets, `color-scheme: only
light` so a forced-dark browser cannot destroy the measured palette, and a print
sheet (the buyer forwards this to a CFO) that drops the fixed chrome, flattens
the ink bands and exposes live URLs.

Every colour pair in `global.css` was measured against WCAG 2.2 and carries its
ratio in a comment. The rail uses difference blending so it stays legible over
both surfaces without per-section bookkeeping.

---

## Stack

| Package | Why |
| --- | --- |
| `astro` 7 | Static output, zero JS baseline, stable local Fonts API. |
| `tailwindcss` 4 + `@tailwindcss/vite` | CSS-first `@theme` tokens. |
| `@astrojs/sitemap` | Sitemap, zero runtime. |
| `@fontsource-variable/fraunces` | Display face, `WONK` axis pinned. |
| `@fontsource-variable/geist` + `-mono` | Text and functional mono. |
| `sharp` | Build-time image optimisation. |
| `playwright` (dev, optional) | Only for `npm run og`. The PNG is committed, so a normal build never needs it. |

Deliberately **not** installed: any React runtime (a framework island costs more
gzip than this entire page), GSAP or Lenis (44KB and 5KB to replace behaviours
the platform now has), `clsx`/`tailwind-merge` (Astro has `class:list`), a
carousel library (a Next button hides portfolio work, which is
conversion-negative), and GA4 (~135KB plus a consent banner that would undo both
the score and the first impression).

Fraunces replaced Instrument Serif because Instrument Serif is the most-deployed
free display serif of the last two years and reads as a template at hero size;
the `wonk` subset file carries `wght` 100–900 plus `WONK` 0–1 (verified with
fontTools) and defaults to weight 900, so weight is always set explicitly.

## Deploying

Any static host. `dist/` is the whole site.

Two things to set up on the host: a trailing-slash policy enforced with a 301
(inconsistent slashes are the most common duplicate-content bug on static hosts),
and a real 404 status for `404.html`.

Add analytics only if it is cookieless (Umami, Plausible, Fathom). The markup is
already vendor-agnostic — `window.track()` in `src/scripts/enhance.ts` detects
whichever is present, and every CTA reports its position, so you can see which
placement actually produces bookings.

## Known limits

- **The content is demo data, not fact** — see the warning at the top.
  `npm run check` lists every fabricated field; `CONTENT.md` gives the order to
  replace them. `npm run check:strict` fails while `DEMO_CONTENT` is true, so it
  is safe to wire into a deploy pipeline as a launch gate.
- Vendor free-tier numbers (Web3Forms caps, Cal.com event types) come from
  research that could not reach those vendors' live pages; re-verify before
  relying on them. `CONTENT.md` lists exactly which.
- Lighthouse has not been run here (no scoring harness in this environment). The
  numbers above are measured request/transfer sizes, not a Lighthouse score.
