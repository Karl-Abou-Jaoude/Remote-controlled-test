/**
 * Renders the OG card route to public/og/default.png with the real fonts.
 *
 * Chromium is used rather than satori because the card is built from the site's
 * own CSS and self-hosted woff2 — satori supports neither, so its output would
 * drift from the design every time a token changed. Run it when the card design
 * or the palette changes; the PNG is committed, so a normal build needs nothing.
 *
 *   npm run build && npm run preview &   then:   npm run og
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.OG_BASE ?? 'http://localhost:4321';
const OUT = new URL('../public/og/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(`${BASE}/og/card/`, { waitUntil: 'networkidle' });
const card = await page.$('#card');
await card.screenshot({ path: `${OUT}default.png` });
await browser.close();
console.log(`wrote ${OUT}default.png (1200x630)`);
