/**
 * CASE STUDIES.
 *
 * Three, not twelve. Three named cases with real numbers beat a grid of mystery
 * tiles, and a grid invites the buyer to hunt for the one relevant to them and
 * fail.
 *
 * Structure follows what an experienced buyer actually judges:
 *   headline (outcome + number)  →  quick facts  →  CONSTRAINT  →  decisions,
 *   each with a because  →  metrics with baseline, window and instrument named
 *   →  named quote.
 *
 * The constraint block is the part most portfolios omit and the part that
 * separates an engineer from a vendor: anyone can ship when nothing is in the
 * way.
 *
 * CLAIM RULES, enforced by `npm run check`:
 * - Never a percentage without its baseline and its measurement window.
 * - Outcomes are attributed to the client's instrument ("their Shopify field
 *   data showed"), never asserted as "I increased revenue by X".
 * - `liveUrl` must be a real production storefront. Live work is the only proof
 *   that holds up under inspection; a mockup screenshot is not proof.
 *
 * Slugs are descriptive rather than placeholders so the routes and the sitemap
 * are valid from the first build. Renaming them to include the brand
 * (/work/<brand>-replatform/) is better for search once the names are cleared —
 * do it before launch, while nothing links to them yet.
 */

export interface CaseStudy {
  slug: string;
  /** Outcome-first, with the number in it. */
  headline: string;
  brand: string;
  vertical: string;
  region: string;
  gmvBand: string;
  duration: string;
  /** States scope without inflating it, and names the contracting party. */
  role: string;
  liveUrl: string;
  /** The motif, applied to the store's actual state. */
  diff: { minus: string; plus: string };
  constraint: string;
  decisions: Array<{ decision: string; because: string }>;
  metrics: Array<{
    label: string;
    before: string;
    after: string;
    window: string;
    instrument: string;
  }>;
  quote?: { text: string; name: string; title: string; profileUrl: string };
  /** One real snippet per case. Buyers who can read it, do. */
  snippet?: { language: string; caption: string; code: string };
}

export const cases: CaseStudy[] = [
  {
    slug: 'mobile-performance-rebuild',
    headline:
      'Cut mobile LCP from <LCP_BEFORE>s to <LCP_AFTER>s for <BRAND_1>, and the brand reported a <CVR_DELTA> conversion-rate change over the following <WINDOW_DAYS> days',
    brand: '<BRAND_1>',
    vertical: '<VERTICAL_1>',
    region: '<REGION_1>',
    gmvBand: '$<GMV_1>M',
    duration: '<N> weeks',
    role: 'Lead engineer, solo build. Delivered at Qwerty, <YEAR>.',
    liveUrl: '<LIVE_STORE_URL_1>',
    diff: {
      minus: 'Mobile LCP <LCP_BEFORE>s · <N> blocking apps · <N> render-blocking requests',
      plus: 'Mobile LCP <LCP_AFTER>s · <N> apps removed · CSS inlined',
    },
    constraint:
      '<CONSTRAINT_1 — e.g. four weeks to a peak-season code freeze, checkout.liquid untouchable, three locales on one theme, and a legacy ERP feed nobody could take offline>',
    decisions: [
      {
        decision: '<DECISION_1>',
        because: '<WHY_1 — the tradeoff you accepted and what you gave up to get it>',
      },
      { decision: '<DECISION_2>', because: '<WHY_2>' },
      { decision: '<DECISION_3>', because: '<WHY_3>' },
    ],
    metrics: [
      {
        label: 'Mobile LCP',
        before: '<LCP_BEFORE>s',
        after: '<LCP_AFTER>s',
        window: '<WINDOW_DAYS> days post-launch vs the same window before',
        instrument: 'Shopify field data (CrUX)',
      },
      {
        label: 'Conversion rate',
        before: '<CVR_BEFORE>%',
        after: '<CVR_AFTER>%',
        window: '<WINDOW_DAYS> days, same traffic mix',
        instrument: 'Shopify analytics, reported by the brand',
      },
    ],
    quote: {
      text: '<QUOTE_1>',
      name: '<QUOTE_NAME_1>',
      title: '<QUOTE_ROLE_1>',
      profileUrl: '<QUOTE_LINKEDIN_1>',
    },
  },
  {
    slug: 'markets-consolidation',
    headline:
      'Consolidated <N> expansion stores into one Shopify Markets setup for <BRAND_2> without losing the earned SEO',
    brand: '<BRAND_2>',
    vertical: '<VERTICAL_2>',
    region: '<REGION_2>',
    gmvBand: '$<GMV_2>M',
    duration: '<N> weeks',
    role: 'Lead engineer, <N>-person team. I owned <MY_SCOPE>; <OTHER_SCOPE> was another engineer’s. Delivered at Qwerty, <YEAR>.',
    liveUrl: '<LIVE_STORE_URL_2>',
    diff: {
      minus: '<N> stores · <N> themes · <N> app subscriptions',
      plus: '1 store · <N> markets · one theme, one checkout',
    },
    constraint: '<CONSTRAINT_2>',
    decisions: [
      { decision: '<DECISION_1>', because: '<WHY_1>' },
      { decision: '<DECISION_2>', because: '<WHY_2>' },
    ],
    metrics: [
      {
        label: 'Organic sessions',
        before: '<SESSIONS_BEFORE>',
        after: '<SESSIONS_AFTER>',
        window: '<WINDOW_DAYS> days post-cutover',
        instrument: 'GA4, reported by the brand',
      },
    ],
  },
  {
    slug: 'shopify-plus-replatform',
    headline:
      'Migrated <BRAND_3> off <SOURCE_PLATFORM> onto Shopify Plus in <N> weeks with <N> hours of downtime',
    brand: '<BRAND_3>',
    vertical: '<VERTICAL_3>',
    region: '<REGION_3>',
    gmvBand: '$<GMV_3>M',
    duration: '<N> weeks',
    role: 'Lead engineer, solo build. Delivered at Qwerty, <YEAR>.',
    liveUrl: '<LIVE_STORE_URL_3>',
    diff: {
      minus: '<SOURCE_PLATFORM> · <N> custom modules · <N>-person ops workaround',
      plus: 'Shopify Plus · <N> Functions · native B2B catalogues',
    },
    constraint: '<CONSTRAINT_3>',
    decisions: [
      { decision: '<DECISION_1>', because: '<WHY_1>' },
      { decision: '<DECISION_2>', because: '<WHY_2>' },
    ],
    metrics: [
      {
        label: 'Downtime at cutover',
        before: 'planned <N>h',
        after: 'actual <N>h',
        window: 'cutover window',
        instrument: 'uptime monitor + order log',
      },
    ],
  },
];
