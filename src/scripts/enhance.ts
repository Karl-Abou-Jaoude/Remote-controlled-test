/**
 * Progressive enhancement. Every behaviour here is additive: with this file
 * blocked or broken the page renders fully, the form still submits, the booking
 * link still navigates, and nothing is left invisible.
 *
 * The scroll-reveal observer that used to live here was deleted on purpose. The
 * opacity+translate fade-up is the default Tailwind/Framer preset, so shipping it
 * on every section makes the site's entire motion character a stock effect. The
 * motion budget is spent instead on one scroll-driven CSS idea (the ink band
 * wipe), which costs no JavaScript at all.
 */

type TrackProps = Record<string, string | number | undefined>;

declare global {
  interface Window {
    track?: (name: string, props?: TrackProps) => void;
    plausible?: (name: string, opts?: { props: TrackProps }) => void;
    umami?: { track: (name: string, props?: TrackProps) => void };
    Cal?: ((...args: unknown[]) => void) & {
      loaded?: boolean;
      ns?: Record<string, unknown>;
      q?: unknown[];
    };
  }
}

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ *
   Analytics shim — the markup never couples to a vendor.
 * ------------------------------------------------------------------ */

window.track = (name, props = {}) => {
  try {
    if (window.plausible) return window.plausible(name, { props });
    if (window.umami) return window.umami.track(name, props);
  } catch {
    /* analytics must never break the page */
  }
};

/* ------------------------------------------------------------------ *
   Cal.com — loaded on intent, never on load.
   An eagerly embedded scheduler costs seconds of main-thread time, and total
   blocking time is a large share of the Lighthouse score. The facade is a real
   anchor, so with JS off (or before the embed is warm) the click just navigates.
 * ------------------------------------------------------------------ */

const CAL_EMBED = 'https://app.cal.com/embed/embed.js';
let calLoaded = false;

function loadCalScript(): void {
  if (calLoaded) return;
  calLoaded = true;

  ((C: Window, A: string) => {
    const push = (target: { q?: unknown[] }, args: unknown) => {
      (target.q ??= []).push(args);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function (...args: unknown[]) {
        const cal = C.Cal!;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (args[0] === 'init') {
          const api = function (...inner: unknown[]) {
            push(api as { q?: unknown[] }, inner);
          };
          (api as { q?: unknown[] }).q = [];
          cal.ns![args[1] as string] = api;
          push(cal as { q?: unknown[] }, args);
          return;
        }
        push(cal as { q?: unknown[] }, args);
      };
  })(window, CAL_EMBED);

  window.Cal?.('init', { origin: 'https://cal.com' });
}

/** Warm the connection on intent without loading anything heavy. */
function preconnectCal(): void {
  if (document.querySelector('link[data-cal-preconnect]')) return;
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://app.cal.com';
  link.crossOrigin = '';
  link.setAttribute('data-cal-preconnect', '');
  document.head.appendChild(link);
}

function initBooking(): void {
  const triggers = document.querySelectorAll<HTMLAnchorElement>('[data-cal-link]');

  for (const el of triggers) {
    for (const evt of ['pointerenter', 'focus', 'touchstart'] as const) {
      el.addEventListener(evt, preconnectCal, { once: true, passive: true });
    }

    el.addEventListener('click', (event) => {
      window.track?.('Book Call Click', { position: el.dataset.position ?? 'unknown' });

      const isFacade = el.hasAttribute('data-cal-facade');
      const host = document.querySelector<HTMLElement>('[data-cal-host]');

      // Below 640px the hosted page wins: month view is cramped under ~420px and
      // inline embeds reliably auto-scroll the page on load. Let the anchor
      // navigate instead of fighting it.
      if (!isFacade || !host || innerWidth < 640) return;

      event.preventDefault();
      el.setAttribute('aria-busy', 'true');
      el.textContent = 'Loading calendar…';
      host.hidden = false;

      loadCalScript();
      window.Cal?.('inline', {
        elementOrSelector: '[data-cal-host]',
        calLink: el.dataset.calLink,
        config: { layout: 'month_view' },
      });
      window.Cal?.('ui', { hideEventTypeDetails: false, layout: 'month_view' });

      host.setAttribute('tabindex', '-1');
      host.focus({ preventScroll: true });
      el.removeAttribute('aria-busy');
      el.hidden = true;
    });
  }
}

/* ------------------------------------------------------------------ *
   Enquiry form. Native POST with a real action and redirect is the baseline;
   fetch is the upgrade so the visitor never leaves the page.
 * ------------------------------------------------------------------ */

function initForm(): void {
  const form = document.querySelector<HTMLFormElement>('form[data-inquiry]');
  if (!form) return;

  const statusEl = form.querySelector<HTMLElement>('[data-form-status]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const email = form.dataset.email ?? '';
  const loadedAt = performance.now();

  form.addEventListener('submit', async (event) => {
    if (!form.reportValidity()) return;
    event.preventDefault();

    // Humans do not complete this in under three seconds. Client-side only — the
    // real server-side defence is the honeypot.
    const tooFast = performance.now() - loadedAt < 3000;

    if (button) button.disabled = true;
    if (statusEl) statusEl.textContent = 'Sending…';

    const payload = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (tooFast) {
      if (statusEl) statusEl.textContent = 'Thanks — I’ll be in touch.';
      return;
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(String(response.status));

      form.hidden = true;
      const done = document.querySelector<HTMLElement>('[data-form-success]');
      if (done) {
        done.hidden = false;
        done.focus?.();
      }
      window.track?.('Teardown Requested');
    } catch {
      // Never dead-end: hand over a mailto that preserves what they typed.
      if (statusEl) {
        const body = encodeURIComponent(
          `Store: ${payload.store ?? ''}\n\n${payload.message ?? ''}`,
        );
        statusEl.innerHTML =
          `Couldn’t send that — the form service is down, not you. ` +
          `<a href="mailto:${email}?subject=Store%20teardown%20request&body=${body}">Email me instead</a>` +
          ` and your text is already in it.`;
      }
      if (button) button.disabled = false;
    }
  });
}

/* ------------------------------------------------------------------ *
   Copy-to-clipboard email
 * ------------------------------------------------------------------ */

function initCopy(): void {
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy ?? '';
      const live = button.parentElement?.querySelector<HTMLElement>('[data-copy-status]');
      try {
        await navigator.clipboard.writeText(value);
        if (live) live.textContent = 'Copied';
        setTimeout(() => {
          if (live) live.textContent = '';
        }, 2500);
        window.track?.('Email Copied');
      } catch {
        if (live) live.textContent = `Copy failed — the address is ${value}`;
      }
    });
  }
}

/* ------------------------------------------------------------------ *
   Mobile sticky CTA. Appears only once the hero CTA has left the viewport, so
   its height is returned to the fold instead of double-counting a CTA that is
   already on screen.
 * ------------------------------------------------------------------ */

function initStickyCta(): void {
  const bar = document.querySelector<HTMLElement>('[data-sticky-cta]');
  const sentinel = document.querySelector<HTMLElement>('[data-hero-end]');
  if (!bar || !sentinel || !('IntersectionObserver' in window)) return;

  new IntersectionObserver(
    ([entry]) => {
      // "Not intersecting" is true both above AND below the viewport, and on a
      // phone the end of the hero starts out below the fold — so testing
      // isIntersecting alone shows the bar on load, on top of a hero CTA that is
      // already on screen. The bar may only appear once the sentinel has passed
      // above the top edge.
      const scrolledPast = entry.boundingClientRect.top <= 0;
      bar.dataset.visible = String(!entry.isIntersecting && scrolledPast);
    },
    { threshold: 0 },
  ).observe(sentinel);
}

/* ------------------------------------------------------------------ *
   Rail: mark the section currently in view.
 * ------------------------------------------------------------------ */

function initRail(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-rail-link]');
  if (links.length === 0 || !('IntersectionObserver' in window)) return;

  const byId = new Map<string, HTMLAnchorElement>();
  for (const link of links) byId.set(link.dataset.railLink!, link);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) link.removeAttribute('aria-current');
        byId.get(entry.target.id)?.setAttribute('aria-current', 'true');
      }
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );

  for (const id of byId.keys()) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  }
}

/* ------------------------------------------------------------------ *
   Count-up on the single emphasised metric. The real value is already in the
   DOM as text, so this never gates readability, and it is skipped entirely
   under reduced-motion.
 * ------------------------------------------------------------------ */

function initCountUp(): void {
  const el = document.querySelector<HTMLElement>('[data-count-up]');
  if (!el || reduceMotion || !('IntersectionObserver' in window)) return;

  const text = el.textContent ?? '';
  const match = text.match(/\d[\d,.]*/);
  if (!match) return; // still a placeholder — leave it alone

  const target = Number(match[0].replace(/,/g, ''));
  if (!Number.isFinite(target) || target === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();

      const start = performance.now();
      const duration = 600;
      let settled = false;

      const settle = () => {
        settled = true;
        el.textContent = text;
      };

      const tick = (now: number) => {
        if (settled) return;
        const p = Math.min(1, (now - start) / duration);
        // ease-out quint, matching the CSS easing token
        const eased = 1 - Math.pow(1 - p, 5);
        el.textContent = text.replace(match[0], Math.round(target * eased).toLocaleString());
        if (p < 1) requestAnimationFrame(tick);
        else settle();
      };
      requestAnimationFrame(tick);

      /*
        While counting, the element displays a number that is not the real one.
        requestAnimationFrame pauses in a backgrounded tab, so without these two
        guards the strip can sit showing "2" where the truth is "14" for as long
        as the tab stays hidden. On a page whose entire argument is that its
        figures are checkable, a wrong number on screen is worse than no
        animation — so it snaps to the real value if the tab is hidden, and a
        timer backstops it regardless.
      */
      addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') settle();
      });
      setTimeout(settle, duration + 200);
    },
    { threshold: 0.4 },
  );

  observer.observe(el);
}

/* ------------------------------------------------------------------ *
   Scroll depth via sentinels — never a scroll listener.
 * ------------------------------------------------------------------ */

function initScrollDepth(): void {
  const sentinels = document.querySelectorAll<HTMLElement>('[data-depth]');
  if (sentinels.length === 0 || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        window.track?.(`Scroll ${(entry.target as HTMLElement).dataset.depth}`);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -20% 0px' },
  );

  for (const el of sentinels) observer.observe(el);
}

initBooking();
initForm();
initCopy();
initStickyCta();
initRail();
initCountUp();
initScrollDepth();

export {};
