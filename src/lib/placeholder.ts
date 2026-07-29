/**
 * Is this value still a stand-in rather than a real fact?
 *
 * Every component that renders a link, a figure or a quote asks this before
 * treating the value as real. It replaces six identical copies of a regex that
 * only matched `<ANGLE_TOKENS>` — which meant the demo values that look like
 * real data (an example.com storefront, a replace-me LinkedIn path) sailed
 * straight through and rendered as live, clickable anchors. That is the exact
 * failure mode worth guarding: an obvious `<PLACEHOLDER>` is harmless because
 * nobody mistakes it for a fact, while a plausible-looking dead link is a claim
 * the reader will try to check.
 */
const PATTERNS: RegExp[] = [
  /<[^>]+>/, // <BRAND_1>, <LCP_BEFORE> …
  /\bexample\.com\b/i, // RFC 2606 reserved — can never be a real storefront
  /replace-with-real/i, // the demo profile paths
  /demo-key-not-configured/i, // the intentionally invalid form key
  /REPLACE[-_ ]?ME/i,
];

export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return PATTERNS.some((pattern) => pattern.test(value));
}

/** Inverse, for readability at call sites that gate on real values. */
export function isReal(value: string | undefined | null): boolean {
  return !isPlaceholder(value);
}
