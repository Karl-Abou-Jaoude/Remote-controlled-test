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

  /*
    Fonts are resolved from the installed @fontsource* packages (no runtime CDN,
    no third-party connection). `optimizedFallbacks` derives metric-matched
    fallback faces from the real font metrics, so the swap costs 0 CLS.

    One text face in two cuts carries the whole system: Inter at 700 for
    UPPERCASE display, nav labels and button text, and at 300 (Light) for body
    and secondary copy. That weight gap is the editorial signature, so the
    variable range is declared 100-900 and weight is always set explicitly in
    CSS. Geist Mono is kept for exactly two things: the diff motif and the
    case-study code block.
  */
  fonts: [
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.local(),
      display: 'swap',
      optimizedFallbacks: true,
      fallbacks: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      options: {
        variants: [
          {
            weight: '100 900',
            style: 'normal',
            src: ['@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'],
          },
        ],
      },
    },
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
            weight: '400 500',
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
