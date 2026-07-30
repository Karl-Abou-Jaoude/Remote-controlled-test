import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { DEMO_CONTENT } from './src/data/site.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://karlaboujaoude.com',
  trailingSlash: 'always',
  // The OG card is a render target, not a page — keep it out of the sitemap. While
  // demo content is active nothing is submitted at all, to match the noindex the
  // layout emits: a sitemap is an invitation to crawl invented claims.
  integrations: DEMO_CONTENT ? [] : [sitemap({ filter: (page) => !page.includes('/og/') })],

  // One-pager: inline every stylesheet so there are zero render-blocking requests.
  build: { inlineStylesheets: 'always' },

  // Fonts are resolved from the installed @fontsource* packages (no runtime CDN,
  // no third-party connection). `optimizedFallbacks` derives metric-matched
  // fallback faces from the real font metrics, so the swap costs 0 CLS.
  /*
    THE TRINITY. The design system runs three faces with an absolute split:
    Display for headlines and the wordmark, a serif Text face for running body
    copy, Monospace for buttons, nav and captions. Never crossed.

    Bugatti's own three faces are licensed and unavailable, so these are the
    documented substitutes. Preserving the three-family split matters more than
    matching the exact typeface.

    Every face is loaded at weight 400 only — the system has no bold role, and
    emphasis comes from size, tracking and case instead. Nothing here can
    synthesise a heavier weight (`font-synthesis-weight: none` in global.css).
  */
  fonts: [
    /*
      Display: Saira Condensed at a wide positive tracking. Only the static 400
      is installed rather than the variable family — with no weight axis in use,
      a variable file would ship extra axis data for a single instance.
    */
    {
      name: 'Saira Condensed',
      cssVariable: '--font-saira',
      provider: fontProviders.local(),
      display: 'swap',
      optimizedFallbacks: true,
      fallbacks: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      options: {
        variants: [
          {
            weight: '400',
            style: 'normal',
            src: ['@fontsource/saira-condensed/files/saira-condensed-latin-400-normal.woff2'],
          },
        ],
      },
    },
    /*
      Text: EB Garamond. The serif body voice is what separates this system from
      the all-sans luxury crowd — it signals slow-reading, considered prose.
    */
    {
      name: 'EB Garamond',
      cssVariable: '--font-garamond',
      provider: fontProviders.local(),
      display: 'swap',
      optimizedFallbacks: true,
      fallbacks: ['Garamond', 'Times New Roman', 'serif'],
      options: {
        variants: [
          {
            weight: '400',
            style: 'normal',
            src: ['@fontsource-variable/eb-garamond/files/eb-garamond-latin-wght-normal.woff2'],
          },
        ],
      },
    },
    /*
      Monospace: Geist Mono, kept from the previous system. It is already a
      neutral machined grotesque, which is exactly the register the mono slot
      calls for; swapping it for JetBrains Mono would cost a download to land in
      the same place.
    */
    {
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      provider: fontProviders.local(),
      display: 'swap',
      optimizedFallbacks: true,
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [
          {
            weight: '400',
            style: 'normal',
            src: ['@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2'],
          },
        ],
      },
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
