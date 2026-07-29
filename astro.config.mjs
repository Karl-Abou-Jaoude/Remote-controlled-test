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
  fonts: [
    {
      name: 'Geist',
      cssVariable: '--font-geist',
      provider: fontProviders.local(),
      display: 'swap',
      optimizedFallbacks: true,
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            weight: '400 700',
            style: 'normal',
            src: ['@fontsource-variable/geist/files/geist-latin-wght-normal.woff2'],
          },
        ],
      },
    },
    /*
      Display face is Fraunces with the WONK axis on. Instrument Serif is the
      most-deployed free display serif of the last two years and reads as a
      template at hero size; Fraunces' wonk axis gives genuinely unusual
      ear/leg forms that stay recognisable at 9rem. The `wonk` subset file
      carries wght 100-900 + WONK 0-1 (verified with fontTools), and its
      default weight is 900, so weight is always set explicitly in CSS.
    */
    {
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      provider: fontProviders.local(),
      display: 'swap',
      optimizedFallbacks: true,
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            weight: '100 900',
            style: 'normal',
            variationSettings: "'WONK' 1",
            src: ['@fontsource-variable/fraunces/files/fraunces-latin-wonk-normal.woff2'],
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
