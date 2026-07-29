import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://karlaboujaoude.com',
  trailingSlash: 'always',
  integrations: [sitemap()],

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
    {
      name: 'Instrument Serif',
      cssVariable: '--font-instrument',
      provider: fontProviders.local(),
      display: 'swap',
      optimizedFallbacks: true,
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2'],
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
