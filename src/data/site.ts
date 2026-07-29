/**
 * SINGLE SOURCE OF TRUTH FOR EVERY WORD AND FACT ON THE SITE.
 *
 * ⚠ DEMO CONTENT IS ACTIVE. Every brand, figure, quote and price below is
 * INVENTED so the site renders complete for review and screenshots. The brands
 * are fictional, the testimonials were written rather than collected, and the
 * metrics are illustrative. Do not point a live domain at this: publishing
 * invented client work and invented endorsements as real is the one claim set a
 * buyer can check, and the one that ends the sale when they do.
 *
 * `npm run check` prints exactly what is fabricated on every build. Set
 * DEMO_CONTENT to false once the values are yours and the guard switches to
 * enforcing the real rules. CONTENT.md has the order to work through.
 *
 * RULES BAKED IN HERE, all from the research and the adversarial reviews:
 *
 * 1. Attribution states the contracting relationship in the heading itself, so
 *    the qualifier cannot be missed. "Clients", "Trusted by" and "Worked with"
 *    are forbidden headings — they imply a direct relationship he did not hold,
 *    and it is the most checkable misrepresentation in the category.
 * 2. Verb discipline. His actions: built, led, migrated, owned, removed,
 *    refactored, shipped. Client outcomes: "the brand reported", "their
 *    analytics showed". Never "I increased revenue by X" — that is a statement
 *    of fact requiring substantiation.
 * 3. No tenure number anywhere except the FAQ and the about page, where it is
 *    stated exactly and never rounded up. A timeline makes the buyer compute his
 *    age; scope makes them compute his reach.
 * 4. No fake scarcity, no countdown, no "1 spot left". Availability is a real
 *    date that the build fails on when stale.
 * 5. Never a percentage without its baseline and measurement window.
 */

/**
 * Flip to false when every value here and in work.ts is genuinely yours. The
 * content guard reads this flag, so leaving it true keeps the warning loud on
 * every build rather than letting demo data go quiet.
 */
export const DEMO_CONTENT = true;

export const identity = {
  name: 'Karl Abou Jaoude',
  role: 'Shopify Plus & Headless Commerce Engineer',
  shortRole: 'Lead Shopify Engineer',
  email: 'Karlaj@notqwerty.com',
  origin: 'https://karlaboujaoude.com',
  location: 'Remote — EU & US time zones',
  agency: 'Qwerty',
  /** Exact, never rounded. Used in the FAQ and about page only. */
  agencyTenure: 'March 2024 to June 2026',
  agencyYearRange: '2024–2026',
} as const;

export const contact = {
  calLink: 'karl-abou-jaoude/intro-20',
  calUrl: 'https://cal.com/karl-abou-jaoude/intro-20',
  /** Deliberately not a valid key while DEMO_CONTENT is true: a submission fails
      loudly into the mailto fallback rather than posting quietly into nowhere. */
  web3formsKey: 'demo-key-not-configured',
  socials: [
    { label: 'GitHub', url: 'https://github.com/karlaboujaoude' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/karlaboujaoude/' },
  ],
} as const;

export const availability = {
  /** ISO date. `npm run check` fails the build when this is in the past. */
  nextStart: '2026-09-14',
  /** Human form of the same date. */
  nextStartLabel: '14 Sep',
  concurrentEngagements: 2,
} as const;

/** Bands with both ends, never floors — a floor is what every buyer negotiates toward. */
export const rates = {
  auditFixed: '$3,500',
  projectLow: '$18k',
  projectHigh: '$85k',
  retainerLow: '$9k',
  retainerHigh: '$16k',
} as const;

export const seo = {
  title: 'Shopify Plus Engineer & Lead Developer — Karl Abou Jaoude',
  description:
    'Lead Shopify engineer for international brands: Plus, Hydrogen, checkout extensibility, Functions, replatforms. Book a 20-minute technical call.',
  ogImage: '/og/default.png',
  ogImageAlt: 'Karl Abou Jaoude — Shopify Plus and headless commerce engineer',
} as const;

export const expertise = [
  'Shopify Plus',
  'Shopify Hydrogen',
  'Oxygen',
  'Liquid',
  'Online Store 2.0',
  'Metaobjects',
  'Checkout Extensibility',
  'Shopify Functions',
  'Admin GraphQL API',
  'Shopify Markets',
  'B2B on Shopify',
  'Subscriptions APIs',
  'Shopify Flow',
  'Custom apps',
  'Remix',
  'TypeScript',
  'Core Web Vitals',
  'Replatforming',
  'ERP & 3PL integrations',
] as const;

/* ------------------------------------------------------------------ *
   HERO
   Headline is buyer + problem + outcome, not an identity claim. "Lead engineer
   at Qwerty" is deliberately NOT in the first clause of the subhead: opening
   with an employer hands the visitor a new objection in the first twelve words
   (is he employed? is he even available? am I hiring his employer?). It appears
   in the credits heading instead, where it works as a credential.
 * ------------------------------------------------------------------ */

export const hero = {
  headline: 'I fix the Shopify Plus problems that cost you revenue',
  /** Rendered only at >=768px — the mobile fold cannot afford the extra lines. */
  headlineTail: ' — at checkout, in new markets, and at peak.',
  subhead:
    'Lead engineer on 14 Shopify Plus builds across 23 markets, 9 of them solo-owned end to end.',
  subheadTail: ' You talk to the person who makes the architecture calls and then ships them.',
  primaryCta: 'Book a 20-min call',
  /** Co-equal on mobile, not a demoted inline link: the lower-friction ask
      produces more qualified opportunities than the meeting request alone. */
  secondaryCta: 'Send your store URL, get 3 fixes',
  doubtRemover:
    '20 minutes, screen-share, no pitch — because I’d rather tell you no than waste both our time.',
  /** Distinct from the doubt-remover: tone vs. actual risk reversal. */
  reversal: 'If it isn’t a fit, I’ll say so on the call and point you somewhere better.',
  credentialBlock: [
    { k: 'Role', v: 'Lead Shopify engineer' },
    { k: 'Platforms', v: 'Shopify Plus · Hydrogen · Liquid' },
    { k: 'Time zones', v: 'EU & US overlap' },
  ],
} as const;

/* ------------------------------------------------------------------ *
   SCOPE STRIP — arithmetic instead of adjectives.
   `emphasis: true` marks the ONE figure allowed to render at --text-metric.
   Six equal numerals is six focal points, which is none.
   ScopeStrip.astro renders only filled cells and fails the build below four.
 * ------------------------------------------------------------------ */

export const scope: ReadonlyArray<{ value: string; label: string; emphasis?: boolean }> = [
  { value: '14', label: 'Shopify Plus storefronts shipped', emphasis: true },
  { value: '23', label: 'Markets live' },
  { value: '11', label: 'Currencies' },
  { value: '$180M', label: 'GMV under management' },
  { value: '9', label: 'Engineers led' },
  { value: '3', label: 'Black Fridays, 0 P1 incidents' },
];

/* ------------------------------------------------------------------ *
   CREDITS TABLE
   Replaces the logo marquee. An infinite logo scroll is the most templated
   component of the era and renders less information than a table while costing
   a duplicated DOM track, an aria-hidden clone, a pause control and two
   fallback branches. This carries more evidence per pixel, is static, and is
   keyboard- and screen-reader-clean by construction.

   ⚠ DEMO: these five brands are invented. Replace with real, cleared names.
 * ------------------------------------------------------------------ */

export const creditsHeading = `Selected work delivered as lead Shopify engineer at ${identity.agency} (${identity.agencyYearRange})`;

export const credits = [
  {
    brand: 'Halden & Roe',
    region: 'UK + EU',
    gmvBand: '$42M',
    shipped: 'Markets consolidation, 9 locales',
    role: 'Lead engineer, solo build',
    nda: false,
  },
  {
    brand: 'Volsted Athletic',
    region: 'DE + EU',
    gmvBand: '$65M',
    shipped: 'Checkout extensibility migration',
    role: 'Lead engineer, 4-person team',
    nda: false,
  },
  {
    brand: 'Marrow Coffee Co.',
    region: 'US',
    gmvBand: '$18M',
    shipped: 'Replatform from Magento 2',
    role: 'Lead engineer, solo build',
    nda: false,
  },
  {
    brand: 'Ferrand Maison',
    region: 'FR + EU',
    gmvBand: '$31M',
    shipped: 'B2B wholesale on Plus',
    role: 'Lead engineer, 3-person team',
    nda: false,
  },
  {
    brand: 'Quillon Supply',
    region: 'US + CA',
    gmvBand: '$24M',
    shipped: 'Theme rebuild, peak readiness',
    role: 'Lead engineer, solo build',
    nda: false,
  },
] as const;

/** Shown under the credits table as a footnote rule, not hidden in a tooltip. */
export const creditsFootnote = `All work above was delivered under contract to ${identity.agency}. Reference call available on request.`;

/* ------------------------------------------------------------------ *
   TRIAGE — four named jobs, urgent first. Jobs-to-be-done, not technologies,
   so the buyer self-selects into a problem they already know they have.
   Each carries the diff motif: the state they are in, the state they end in.
 * ------------------------------------------------------------------ */

export const triage = [
  {
    id: 'checkout',
    title: 'Checkout extensibility remediation',
    prose:
      'Scripts are gone and checkout.liquid is going. If your checkout still runs on either, the work is a migration to Functions, Checkout UI extensions and Web Pixels — done in the right order so discounting and tracking never both break at once.',
    chips: ['Shopify Functions', 'Checkout UI extensions', 'Web Pixels', 'Scripts → Functions'],
    diff: {
      minus: '12 Scripts, checkout.liquid, 6 script tags',
      plus: '4 Functions, UI extensions, Web Pixels',
    },
    caseSlug: 'mobile-performance-rebuild',
  },
  {
    id: 'markets',
    title: 'Expansion stores → Markets consolidation',
    prose:
      'Collapsing separate country stores into one Markets setup is a real project, not a switch: redirect map, hreflang, historical order data, and a plan for the SEO you already earned. I will tell you when it is not worth doing.',
    chips: ['Shopify Markets', 'hreflang', 'Multi-currency', 'Data migration'],
    diff: {
      minus: '6 expansion stores, 6 themes to maintain',
      plus: '1 store, 12 markets, one theme',
    },
    caseSlug: 'markets-consolidation',
  },
  {
    id: 'b2b',
    title: 'B2B on Shopify',
    prose:
      'Below roughly 500 wholesale customers, native B2B usually works. Above it, the three-catalogue ceiling, missing partial payments and sales-rep gaps become the blockers. Knowing which side of that line you are on is most of the decision.',
    chips: ['B2B catalogues', 'Company locations', 'Payment terms', 'Draft orders'],
    diff: {
      minus: 'Wholesale on a second platform',
      plus: 'One admin, one inventory, one truth',
    },
    caseSlug: 'shopify-plus-replatform',
  },
  {
    id: 'performance',
    title: 'Performance & peak readiness',
    prose:
      'LCP, INP and CLS converted into revenue rather than a score, app bloat removed in dependency order, and a code freeze with a written degradation plan before Black Friday — so the busiest week is the boring one.',
    chips: ['Core Web Vitals', 'App audit', 'Theme architecture', 'BFCM freeze'],
    diff: {
      minus: 'Mobile LCP 4.6s, 9 blocking apps',
      plus: 'Mobile LCP 1.8s, 5 apps removed',
    },
    caseSlug: 'mobile-performance-rebuild',
  },
] as const;

/* ------------------------------------------------------------------ *
   TESTIMONIALS
   No testimonial ships without a resolvable public profile URL. An anonymous
   styled blockquote at this density signals that nothing here is checkable.
   The attribution discloses the agency relationship, because implying he was
   their direct vendor would be the misrepresentation.

   ⚠ DEMO: both people are invented and both quotes were written, not collected.
   The profile links go to a placeholder path on purpose — they must be replaced
   with real quotes and real profiles, or this section must be removed.
 * ------------------------------------------------------------------ */

export const testimonials = [
  {
    id: 'commercial',
    quote:
      'Our mobile product pages went from four and a half seconds to under two, and the conversion rate moved with them. Karl was the one who told us which half of our app stack to delete first.',
    name: 'Priya Raman',
    title: 'Head of Ecommerce',
    company: 'Halden & Roe',
    profileUrl: 'https://www.linkedin.com/in/replace-with-real-profile/',
    relationship: `Halden & Roe was a ${identity.agency} client; I was the lead engineer on their build.`,
  },
  {
    id: 'technical',
    quote:
      'I was sceptical about putting a nine-market cutover in one engineer’s hands. He wrote the rollback plan before he wrote the migration, and we never needed it.',
    name: 'Tobias Lentz',
    title: 'CTO',
    company: 'Volsted Athletic',
    profileUrl: 'https://www.linkedin.com/in/replace-with-real-profile-2/',
    relationship: `Volsted Athletic was a ${identity.agency} client; I was the lead engineer on their build.`,
  },
] as const;

/* ------------------------------------------------------------------ *
   OBJECTIONS — one module, not four overlapping ones.
   The ANSWER is the visible heading and the fear is secondary text. Leading
   with seven fears in 30px type on a black band manufactures the anxiety it
   claims to discharge, for the majority who never framed this as risky.
   Only the three fears structurally universal to buying from one person stay
   on the band; the rest opt-in via the FAQ. The process artifacts live here as
   the evidence they already are, instead of as a separate section.
 * ------------------------------------------------------------------ */

export const objections = [
  {
    answer: 'Everything ships through your GitHub org, from the first commit.',
    fear: '“If you get ill, take another contract, or disappear, does my project stop dead?”',
    detail:
      'Reviewed PRs into your repo, architecture decisions written as ADRs in /docs, walkthroughs recorded as Looms — all in your account, not mine. Two engineers I have worked with for years are named in the handover doc with their contact details, and they already have context.',
    artifact: { label: 'Artifact', value: 'ADR + handover doc template in your repo' },
  },
  {
    answer: 'I take two clients. You get three days a week, and I name which days.',
    fear: '“Most freelancers juggle three to five clients and give each ten hours a week.”',
    detail:
      'In writing, before we start. That is a number you can hold me to, which is more than an adjective like “dedicated” gives you. When I am at capacity I say so and give you a date rather than a maybe.',
    artifact: { label: 'Artifact', value: 'Weekly written report — real, redacted' },
  },
  {
    answer: 'The person you meet is the person who writes the code.',
    fear: '“At an agency the senior engineer sells the project and a junior builds it.”',
    detail:
      'No account layer, no handoff, no junior inheriting an architecture that lives in someone else’s head. I run the standups, write the tickets and send the weekly report, so you save the account-management layer without inheriting the management load.',
    artifact: { label: 'Artifact', value: 'theme-check + CI in the pipeline, named rollback plan' },
  },
] as const;

/* ------------------------------------------------------------------ *
   ENGAGEMENTS
   The paid diagnostic carries a real guarantee, not a restatement of the
   deliverable. The retainer's first month is cancellable: a three-month
   minimum protects the seller and reads as a trap on a five-figure recurring
   commitment.
 * ------------------------------------------------------------------ */

export const engagements = [
  {
    id: 'fractional',
    name: 'Fractional lead engineer',
    price: `${rates.retainerLow}–${rates.retainerHigh}/month`,
    meta: '2–3 days a week',
    flagship: true,
    prose:
      'I run the technical side of your store: architecture decisions, the roadmap’s engineering half, code review, and — the part nobody else sells — managing your existing agency and in-house juniors so you are not the one translating between them.',
    includes: [
      'Architecture and technical roadmap',
      'Managing your agency and junior engineers',
      'Code review on everything that ships',
      'Weekly written report, monthly CFO-readable summary',
    ],
    reversal: 'Month one is cancellable in writing, any time, no notice.',
  },
  {
    id: 'diagnostic',
    name: 'Paid diagnostic',
    price: `${rates.auditFixed} fixed`,
    meta: '5 business days',
    flagship: false,
    prose:
      'A written architecture assessment, a prioritised remediation plan with effort estimates against each item, and a 30-minute walkthrough. The fee is credited in full against the first implementation engagement.',
    includes: [
      'Architecture and app-stack assessment',
      'Prioritised backlog with effort estimates',
      '30-minute recorded walkthrough',
      'Fee credited against implementation',
    ],
    reversal:
      'If it does not name at least three issues you did not already know about, do not pay. You keep the document either way.',
  },
  {
    id: 'project',
    name: 'Fixed-scope project',
    price: `${rates.projectLow}–${rates.projectHigh}`,
    meta: 'Scoped, dated, fixed',
    flagship: false,
    prose:
      'One of the four jobs above, scoped to a written spec with a date on it. You get the spec before you commit, and the price does not move unless the scope does — in writing, both ways.',
    includes: [
      'Written spec and timeline before commitment',
      'Staging → production with a rollback plan',
      'Handover docs and a recorded walkthrough',
      'Two weeks of post-launch cover',
    ],
    reversal: 'Scope changes are priced in writing before they start, or they do not start.',
  },
] as const;

/** Deliberately understated, no price, no case studies — the agency buyer's
    fear is that their client becomes someone else's portfolio piece. */
export const agencyLine = `Agencies: I take white-label lead-engineer work under NDA. Your repo, your branch strategy, and I do not publish subcontracted client names without written sign-off — including yours.`;

export const rateStrip = `Audits ${rates.auditFixed} fixed · Projects ${rates.projectLow}–${rates.projectHigh} · Fractional ${rates.retainerLow}–${rates.retainerHigh}/mo`;

/* ------------------------------------------------------------------ *
   BOOKING
 * ------------------------------------------------------------------ */

export const booking = {
  heading: 'Two ways in. Both end with a written answer.',
  calFacadeLabel: 'Open my calendar',
  calMeta: '20 min · Google Meet · usually confirmed same day',
  calAgenda: [
    'What you are trying to ship, and by when',
    'What I would do first, and what I would not touch',
    'Whether this is worth either of our time — I will say so',
  ],
  teardownHeading: 'Not ready to talk?',
  teardownProse:
    'Send your store URL. You get one page back within one business day: the three fixes I would make first, with the revenue reason for each. No call required.',
  teardownCta: 'Send my store URL',
} as const;

/* ------------------------------------------------------------------ *
   FAQ — the mechanical blockers, in the buyer's own words. This is the ONLY
   place tenure is discussed, because pre-empting it earlier plants the doubt.
 * ------------------------------------------------------------------ */

export const faq = [
  {
    q: 'Have you done this at my size?',
    a: 'Judge the scope rather than the calendar: 14 Shopify Plus storefronts, 23 markets, $180M GMV under management, and 9 builds where I was the only engineer on the account. Two years as lead is short in calendar terms, and that is what it contained — every figure is checkable against the case studies, and I will put you on a call with a former client about how it looked from their side.',
  },
  {
    q: 'Are you a Shopify Plus Partner?',
    a: 'No, and no individual can be: the Plus tier requires five active Plus clients and ten credentialed team members. I am a Shopify Partner with credentials in theme development, custom apps and platform migration. If a solo engineer tells you they hold Plus Partner status, check it.',
  },
  {
    q: 'Isn’t a full-time hire cheaper at my revenue?',
    a: 'Often, for execution — and that is a different purchase. I am the person who decides what your full-time hire builds. In month nine I will write their job spec, interview them with you, hand over the architecture, and graduate out.',
  },
  {
    q: 'What happens if you disappear?',
    a: 'Your code is in your GitHub org from the first commit, decisions are written as ADRs in your repo, and two named engineers with existing context are in the handover doc. Continuity is structural here, not a promise.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do — completely, from day one, in your own repo and your own Shopify org. Any hesitation on this question from anyone you are considering is a serious red flag.',
  },
  {
    q: 'Do you disappear in Q4?',
    a: 'The opposite. Code freeze goes in on 7 November, I am on call through BFCM, and the degradation plan — what we shed first if traffic overwhelms non-core features — is written and agreed before November.',
  },
  {
    q: 'Can you talk to my CFO, or only to engineers?',
    a: 'Both. I have presented architecture options to finance, run launch go/no-go calls, and talked a client out of a six-figure headless project that would not have paid for itself. Every technical number I report comes with the business one next to it.',
  },
  {
    q: 'My store needs design, SEO and paid media too. Can you cover that?',
    a: 'No, and I will not pretend otherwise. I do the engineering and the technical leadership. I do not do brand or paid media — you will get better people for that, and I will integrate with them properly.',
  },
] as const;

/* ------------------------------------------------------------------ *
   NAVIGATION / RAIL
 * ------------------------------------------------------------------ */

export const sections = [
  { id: 'hero', index: '01', label: 'Start' },
  { id: 'scope', index: '02', label: 'Scope' },
  { id: 'credits', index: '03', label: 'Work' },
  { id: 'triage', index: '04', label: 'Services' },
  { id: 'proof', index: '05', label: 'Proof' },
  { id: 'cases', index: '06', label: 'Cases' },
  { id: 'objections', index: '07', label: 'Risk' },
  { id: 'engagements', index: '08', label: 'Pricing' },
  { id: 'book', index: '09', label: 'Book' },
  { id: 'faq', index: '10', label: 'FAQ' },
] as const;

export const footer = {
  ctaHeading: 'Still reading? That usually means it’s worth a call.',
  promise: 'Remote, working across EU and US time zones. I reply within one business day.',
  credit: `Designed & built by ${identity.name}`,
  /** The site's own numbers, diffed against the platform median — the motif
      applied to itself. Re-run PageSpeed against your deployed domain and put
      the real figures in; the link resolves live, so a stale number is visible. */
  perf: {
    minus: '− Shopify mobile median LCP 3.4s',
    plus: '+ This page 0.9s · 2KB JS · 0 cookies',
    proofUrl: 'https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fkarlaboujaoude.com',
  },
} as const;
