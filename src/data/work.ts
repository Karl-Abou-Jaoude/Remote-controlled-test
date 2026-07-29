/**
 * CASE STUDIES.
 *
 * ⚠ DEMO CONTENT. The three brands, every figure and both quotes below are
 * invented so the pages render complete. See the warning at the top of site.ts —
 * `npm run check` reports this on every build while DEMO_CONTENT is true.
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
      'Took Ravelston Outerwear’s mobile LCP from 4.6s to 1.8s, and the brand reported mobile conversion moving from 1.38% to 1.61% over the 28 days after launch',
    brand: 'Ravelston Outerwear',
    vertical: 'Premium outerwear',
    region: 'UK + EU, 9 locales',
    gmvBand: '$42M',
    duration: '9 weeks',
    role: 'Lead engineer, solo build. Delivered at Qwerty, 2025.',
    liveUrl: 'https://example.com/demo-store-1',
    diff: {
      minus: 'Mobile LCP 4.6s · 9 blocking apps · 14 render-blocking requests',
      plus: 'Mobile LCP 1.8s · 5 apps removed · CSS inlined, 2 requests',
    },
    constraint:
      'Four weeks to the peak-season code freeze, checkout.liquid untouchable until their payment provider finished its own migration, nine locales sharing one theme, and a nightly ERP feed nobody was willing to take offline. Nothing could ship that required a full theme republish during trading hours.',
    decisions: [
      {
        decision: 'Removed five apps before writing any new code, in dependency order.',
        because:
          'Two of them injected the same jQuery build, and a third was only used by a banner the merchandising team had stopped updating in 2024. Deleting code is faster than optimising it, and it shrank the surface everything else had to be tested against.',
      },
      {
        decision: 'Inlined critical CSS and moved the rest behind a single deferred request.',
        because:
          'Their LCP element was a text block, not the hero image, so render-blocking CSS was the actual gate. This is also why the number held after launch instead of drifting back — there was no image-weight regression path to fall down.',
      },
      {
        decision: 'Left the ERP feed exactly as it was and moved its trigger to a scheduled job.',
        because:
          'Rewriting the integration was three weeks of work with real risk against a freeze date, for a gain the customer would never see. The cheap change captured most of the benefit; I wrote up the rewrite as a later option instead of quietly starting it.',
      },
    ],
    metrics: [
      {
        label: 'Mobile LCP',
        before: '4.6s',
        after: '1.8s',
        window: '28 days post-launch vs the same 28-day window before',
        instrument: 'Shopify field data (CrUX), 75th percentile',
      },
      {
        label: 'Mobile conversion rate',
        before: '1.38%',
        after: '1.61%',
        window: '28 days, comparable traffic mix, no campaign changes',
        instrument: 'Shopify analytics, reported by the brand',
      },
    ],
    quote: {
      text:
        'He told us which half of the app stack to delete before he quoted us for anything new. That conversation paid for the project on its own.',
      name: 'Rhea Kulkarni',
      title: 'Head of Ecommerce, Ravelston Outerwear',
      profileUrl: 'https://www.linkedin.com/in/replace-with-real-profile/',
    },
    snippet: {
      language: 'liquid',
      caption:
        'The section render that replaced the app-injected upsell block — one server-rendered loop instead of three client-side fetches.',
      code: `{%- liquid
  assign recs = section.settings.collection.products | limit: 4
-%}
<ul class="recs" data-section="{{ section.id }}">
  {%- for product in recs -%}
    <li>
      {%- render 'card', product: product, loading: 'lazy' -%}
    </li>
  {%- endfor -%}
</ul>`,
    },
  },
  {
    slug: 'markets-consolidation',
    headline:
      'Collapsed six of Volsted Athletic’s expansion stores into one Shopify Markets setup across 12 markets, and their analytics showed organic sessions recovering from 412k to 456k within 90 days',
    brand: 'Volsted Athletic',
    vertical: 'Activewear',
    region: 'DE + EU, 12 markets',
    gmvBand: '$65M',
    duration: '14 weeks',
    role: 'Lead engineer, 4-person team. I owned the Markets architecture, the redirect map and the cutover; the design system refresh was another engineer’s. Delivered at Qwerty, 2025.',
    liveUrl: 'https://example.com/demo-store-2',
    diff: {
      minus: '6 stores · 6 themes · 18 duplicated app subscriptions',
      plus: '1 store · 12 markets · one theme, one checkout',
    },
    constraint:
      'Six stores had accumulated four years of independent SEO history and three different URL conventions, and two of them ran promotions the local teams controlled directly. The German store carried the majority of revenue, so it had to move last and could not lose ranking for a single week.',
    decisions: [
      {
        decision: 'Built the redirect map from their own analytics rather than from the sitemaps.',
        because:
          'The sitemaps listed thousands of URLs nobody had visited in a year. Mapping by actual entrances meant the work concentrated on the 900 URLs that carried traffic, and we could verify each one after cutover instead of hoping.',
      },
      {
        decision: 'Moved the smallest market first and the German store last.',
        because:
          'It let the process fail somewhere cheap. Two hreflang mistakes surfaced in the first migration, and fixing them there cost a day instead of costing the account its main revenue market.',
      },
      {
        decision: 'Kept local promotion control by moving it to market-scoped metaobjects.',
        because:
          'The consolidation would have been rejected outright if it took autonomy away from the local teams. The technical win only counts if the people who run the store daily can still do their jobs.',
      },
    ],
    metrics: [
      {
        label: 'Organic sessions',
        before: '412k',
        after: '456k',
        window: '90 days post-cutover vs the 90 days before',
        instrument: 'GA4, reported by the brand',
      },
      {
        label: 'Themes to maintain',
        before: '6',
        after: '1',
        window: 'at cutover',
        instrument: 'their own repo',
      },
    ],
    quote: {
      text:
        'I was sceptical about putting a multi-market cutover in one engineer’s hands. He wrote the rollback plan before he wrote the migration, and we never needed it.',
      name: 'Jonas Reinholt',
      title: 'CTO, Volsted Athletic',
      profileUrl: 'https://www.linkedin.com/in/replace-with-real-profile-2/',
    },
  },
  {
    slug: 'shopify-plus-replatform',
    headline:
      'Migrated Thicket Coffee Co. off Magento 2 onto Shopify Plus in 11 weeks, with 1h10m of downtime against a planned 4-hour window',
    brand: 'Thicket Coffee Co.',
    vertical: 'Coffee subscription',
    region: 'US',
    gmvBand: '$18M',
    duration: '11 weeks',
    role: 'Lead engineer, solo build. Delivered at Qwerty, 2024.',
    liveUrl: 'https://example.com/demo-store-3',
    diff: {
      minus: 'Magento 2 · 7 custom modules · 2-person daily ops workaround',
      plus: 'Shopify Plus · 3 Functions · native subscriptions, no workaround',
    },
    constraint:
      'An active subscription base that had to keep billing on its existing schedule through the cutover — no pausing, no re-authorising cards, no asking 30,000 customers to do anything. Their fulfilment team also worked from a Magento admin screen that had no Shopify equivalent.',
    decisions: [
      {
        decision: 'Migrated subscription contracts before the storefront, in a dry run against production data.',
        because:
          'Billing is the part where mistakes are unrecoverable and visible to every customer at once. Proving the contracts imported cleanly, twice, made the storefront cutover the boring half of the project.',
      },
      {
        decision: 'Rebuilt the fulfilment screen as a small custom app instead of retraining the team.',
        because:
          'Two weeks of engineering against months of slower picking and the errors that come with a workflow people resent. The cheaper-looking option was the expensive one.',
      },
    ],
    metrics: [
      {
        label: 'Downtime at cutover',
        before: 'planned 4h',
        after: 'actual 1h10m',
        window: 'the cutover window itself',
        instrument: 'uptime monitor + order log',
      },
      {
        label: 'Failed subscription renewals in the first cycle',
        before: 'baseline 0.9% on Magento',
        after: '0.7% on Plus',
        window: 'first full billing cycle, 30 days after cutover',
        instrument: 'their billing export',
      },
    ],
  },
];
