/**
 * SINGLE SOURCE OF TRUTH FOR EVERY WORD AND FACT ON THE SITE.
 *
 * Anything wrapped in <ANGLE_BRACKETS> is a placeholder that only Karl can
 * supply. The site builds and looks correct with the placeholders in place, so
 * you can deploy and fill them in incrementally — but every <PLACEHOLDER> is a
 * claim a buyer will read, so none of them should survive to production.
 * `npm run check:placeholders` lists everything still outstanding.
 *
 * Rule applied throughout: no invented client names, no invented metrics, no
 * invented scarcity. Agency-side work is attributed as work delivered *at*
 * Qwerty, which is the honest and legally safe convention.
 */

export const identity = {
  name: 'Karl Abou Jaoude',
  /** Query-bearing role first — a personal name has no search volume yet. */
  role: 'Shopify Plus & Headless Commerce Engineer',
  shortRole: 'Lead Shopify Engineer',
  email: 'Karlaj@notqwerty.com',
  /** Update once the domain is live; every absolute URL derives from this. */
  origin: 'https://karlaboujaoude.com',
  location: 'Remote — working across EU & US time zones',
  agency: 'Qwerty',
} as const;

export const contact = {
  /**
   * Cal.com booking link. Free tier allows several event types, so a 20-minute
   * intro and a longer technical scoping call can both live here later.
   * Self-hosting on cal.<domain> would make the embed first-party — see README.
   */
  calLink: '<CAL_COM_USERNAME>/intro-20',
  calUrl: 'https://cal.com/<CAL_COM_USERNAME>/intro-20',
  /** Web3Forms access key: free, no signup, zero third-party JS, no cookies. */
  web3formsKey: '<WEB3FORMS_ACCESS_KEY>',
  socials: [
    { label: 'GitHub', url: 'https://github.com/<GITHUB_HANDLE>' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/<LINKEDIN_HANDLE>/' },
  ],
} as const;

export const seo = {
  /** ≤60 chars, intent phrase first. */
  title: 'Shopify Plus Engineer & Lead Developer — Karl Abou Jaoude',
  /** ~155 chars, carrying proof and a CTA rather than adjectives. */
  description:
    'Lead Shopify engineer for international brands: Plus, Hydrogen, checkout extensibility, Functions, replatforms. Book a 20-minute technical call.',
  ogImage: '/og/default.png',
  ogImageAlt:
    'Karl Abou Jaoude — Shopify Plus and headless commerce engineer',
} as const;

/** Fed to schema.org `knowsAbout` and the stack chips. Buyer vocabulary, not mine. */
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
