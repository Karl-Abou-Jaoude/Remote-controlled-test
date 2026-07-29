/**
 * Pre-launch content guard.
 *
 * Two jobs. First, list every <PLACEHOLDER> still outstanding, so filling the
 * site in is a checklist rather than a hunt. Second — and this is the part that
 * fails the build — refuse the specific patterns that would cost the sale or
 * create real exposure if they ever reached production:
 *
 *   - an availability date that is in the past (a stale date is worse than none)
 *   - a percentage with no baseline and no measurement window ("+340%" reads as
 *     fiction to a Head of Ecommerce)
 *   - an anonymous "a $60M UK activewear brand" row in the credits table, where
 *     no surrounding narrative can carry it
 *   - the forbidden proof headings that imply a direct client relationship
 *   - copy on the banned list ("Get in touch", "passionate developer", …)
 *
 * Run: node scripts/check-content.mjs        (also wired to `npm run check`)
 *      node scripts/check-content.mjs --strict   fails on placeholders too
 */

import { readFile, readdir } from 'node:fs/promises';
import { join, extname } from 'node:path';

const STRICT = process.argv.includes('--strict');
const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');

const errors = [];
const warnings = [];
const placeholders = new Map();

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (['.astro', '.ts', '.md'].includes(extname(entry.name))) out.push(full);
  }
  return out;
}

const files = await walk(SRC);

/**
 * Comments explain the rules — including quoting the forbidden phrases — so they
 * must be stripped before any rule is applied, or the guard flags its own
 * documentation. Class names and inline styles are stripped for the same reason:
 * `color-mix(... 92%)` is not a marketing claim.
 */
function copyOnly(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/^\s*\/\/.*$/gm, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/class:list=\{\[[\s\S]*?\]\}/g, ' ')
    .replace(/class="[^"]*"/g, ' ')
    .replace(/style="[^"]*"/g, ' ')
    .replace(/<style>[\s\S]*?<\/style>/g, ' ');
}

const DATA_FILES = files.filter((f) => f.includes('/data/'));

/* ---------------- 1. placeholders ---------------- */

for (const file of files) {
  const text = copyOnly(await readFile(file, 'utf8'));
  const rel = file.replace(ROOT, '');
  for (const [match] of text.matchAll(/<([A-Z][A-Z0-9_]{2,})(?:\s[^>]*)?>/g)) {
    if (!placeholders.has(match)) placeholders.set(match, new Set());
    placeholders.get(match).add(rel);
  }
}

/* ---------------- 2. hard failures ---------------- */

const siteTs = await readFile(join(SRC, 'data', 'site.ts'), 'utf8');

// Availability date must be real and in the future.
const nextStart = siteTs.match(/nextStart:\s*'([^']+)'/)?.[1];
if (nextStart && !nextStart.startsWith('<')) {
  const parsed = Date.parse(nextStart);
  if (Number.isNaN(parsed)) {
    errors.push(`availability.nextStart is not a valid ISO date: ${nextStart}`);
  } else if (parsed < Date.now()) {
    errors.push(
      `availability.nextStart (${nextStart}) is in the past. A stale availability date is worse ` +
        `than no date — update it or remove the availability line.`,
    );
  }
}

// Percentages need a baseline and a window nearby. Only the data files carry
// copy, so a CSS or rootMargin percentage can never trip this.
for (const file of DATA_FILES) {
  const text = copyOnly(await readFile(file, 'utf8'));
  const rel = file.replace(ROOT, '');
  for (const m of text.matchAll(/([+-]?\d{1,3}(?:\.\d+)?)\s?%/g)) {
    const context = text.slice(Math.max(0, m.index - 220), m.index + 220).toLowerCase();
    const hasBaseline = /(before|from|baseline|vs\b|→|->)/.test(context);
    const hasWindow = /(day|week|month|window|quarter|post-launch|yoy)/.test(context);
    if (!hasBaseline || !hasWindow) {
      errors.push(
        `${rel}: "${m[0]}" appears without ${!hasBaseline ? 'a baseline' : ''}` +
          `${!hasBaseline && !hasWindow ? ' or ' : ''}${!hasWindow ? 'a measurement window' : ''}. ` +
          `Never publish a percentage a buyer cannot check.`,
      );
    }
  }
}

// No anonymous brands in the credits table.
const creditsBlock = copyOnly(siteTs).match(/export const credits[\s\S]*?\n\];/)?.[0] ?? '';
if (/brand:\s*'(a|an|A|An)\s|brand:\s*'<[a-z]/.test(creditsBlock)) {
  errors.push(
    'src/data/site.ts: the credits table contains an anonymised brand. Category-only clients ' +
      'belong inside a case study where the constraint narrative carries them, never in the ' +
      'credits row — six anonymous rows signal that nothing here is checkable.',
  );
}

// Forbidden proof headings and banned copy.
const FORBIDDEN_HEADINGS = ['Trusted by', 'My clients', 'Worked with', 'Brands I’ve helped'];
const BANNED_COPY = [
  'Get in touch',
  'Let’s talk',
  "Let's talk",
  'Contact me',
  'Crafting exceptional',
  'passionate developer',
  'young but experienced',
  'years of experience',
  'only 1 spot left',
  'ninja',
  'rockstar',
];

for (const file of files) {
  const text = copyOnly(await readFile(file, 'utf8'));
  const rel = file.replace(ROOT, '');
  for (const phrase of FORBIDDEN_HEADINGS) {
    if (text.includes(phrase)) {
      errors.push(
        `${rel}: "${phrase}" implies a direct client relationship that was held by the agency. ` +
          `State the contracting relationship in the heading instead.`,
      );
    }
  }
  for (const phrase of BANNED_COPY) {
    // The banned list itself lives in this file and in site.ts comments.
    if (text.includes(phrase) && !rel.includes('check-content')) {
      warnings.push(`${rel}: banned copy "${phrase}" — see the review rules in src/data/site.ts.`);
    }
  }
}

/* ---------------- report ---------------- */

const pad = (s, n) => s.padEnd(n);

if (placeholders.size > 0) {
  console.log(`\nOUTSTANDING CONTENT (${placeholders.size} placeholders)\n`);
  for (const [name, where] of [...placeholders].sort()) {
    console.log(`  ${pad(name, 34)} ${[...where].join(', ')}`);
  }
  console.log(
    `\n  These are the facts only you can supply. The site builds and looks correct with them\n` +
      `  in place, but every one is a claim a buyer will read. See CONTENT.md for the order\n` +
      `  to fill them in.\n`,
  );
}

if (warnings.length > 0) {
  console.log(`\nWARNINGS (${warnings.length})\n`);
  for (const w of warnings) console.log(`  ! ${w}`);
}

if (errors.length > 0) {
  console.log(`\nERRORS (${errors.length})\n`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  console.log('');
  process.exit(1);
}

if (STRICT && placeholders.size > 0) {
  console.log(`\n✗ --strict: ${placeholders.size} placeholders still present. Not launch-ready.\n`);
  process.exit(1);
}

console.log(
  placeholders.size === 0
    ? '\n✓ No placeholders, no unsafe claims. Launch-ready.\n'
    : '\n✓ No unsafe claims. Placeholders above still need filling before launch.\n',
);
