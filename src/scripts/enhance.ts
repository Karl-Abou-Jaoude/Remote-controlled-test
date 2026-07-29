/**
 * Progressive enhancement. Every behaviour here is additive: with this file
 * blocked or broken, the page still renders fully, the form still submits, the
 * booking link still navigates, and nothing is stuck invisible.
 *
 * Budget: this is the only JS that runs on load.
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

/* ------------------------------------------------------------------ *
   Analytics shim — markup never couples to a vendor.
 * ------------------------------------------------------------------ */

window.track = (name, props = {}) => {
  try {
    if (window.plausible) return window.plausible(name, { props });
    if (window.umami) return window.umami.track(name, props);
  } catch {
    /* analytics must never break the page */
  }
};

const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ *
   Scroll reveal for secondary content only.
   The CSS default is *visible*; JS opts elements into the hidden state, so a
   JS failure can never leave content invisible. Skipped entirely under
   reduced-motion.
 * ------------------------------------------------------------------ */

function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.dataset.reveal = '';
        observer.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  for (const el of targets) {
    // Anything already in view on load stays visible — never animate the
    // first screenful into existence.
    const box = el.getBoundingClientRect();
    if (box.top < innerHeight * 0.92) continue;
    el.dataset.reveal = 'pending';
    observer.observe(el);
  }
}

/* ------------------------------------------------------------------ *
   Cal.com booking — loaded on intent, never on page load.
   The anchor's href is a real URL, so with JS off (or before the embed is
   warm) the click simply navigates to the booking page.
 * ------------------------------------------------------------------ */

let calBooting = false;

function bootCal(): void {
  if (calBooting) return;
  calBooting = true;

  ((C: Window, A: string) => {
    const push = (fn: { q?: unknown[] }, args: unknown) => {
      (fn.q ??= []).push(args);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function (this: unknown, ...args: unknown[]) {
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
          const ns = args[1] as string;
          (api as { q?: unknown[] }).q = [];
          cal.ns![ns] = api;
          push(cal as { q?: unknown[] }, args);
          return;
        }
        push(cal as { q?: unknown[] }, args);
      };
  })(window, 'https://app.cal.com/embed/embed.js');

  window.Cal?.('init', { origin: 'https://cal.com' });
  window.Cal?.('ui', { hideEventTypeDetails: false, layout: 'month_view' });
}

function initBooking(): void {
  const triggers = document.querySelectorAll<HTMLAnchorElement>('[data-cal-link]');
  if (triggers.length === 0) return;

  for (const el of triggers) {
    for (const evt of ['pointerenter', 'focus', 'touchstart'] as const) {
      el.addEventListener(evt, bootCal, { once: true, passive: true });
    }
    el.addEventListener('click', () => {
      window.track?.('Book Call Click', { position: el.dataset.position ?? 'unknown' });
    });
  }

  // Safety net for someone who tabs straight in and hits enter.
  addEventListener('load', () => setTimeout(bootCal, 4000), { once: true });
}

/* ------------------------------------------------------------------ *
   Inquiry form — posts via fetch when possible, falls back to a native POST
   (the form has a real action and a redirect field, so no-JS works).
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

    // Humans do not complete five fields in under three seconds. Client-side
    // only — the real server-side defence is the honeypot field.
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
      window.track?.('Inquiry Submitted', { budget: payload.budget });
    } catch {
      if (statusEl) {
        statusEl.innerHTML =
          `Something broke on my end. Email me directly: <a href="mailto:${email}">${email}</a>`;
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
        if (live) live.textContent = 'Email address copied';
        button.dataset.copied = 'true';
        setTimeout(() => delete button.dataset.copied, 2000);
        window.track?.('Email Copied');
      } catch {
        if (live) live.textContent = `Copy failed — the address is ${value}`;
      }
    });
  }
}

/* ------------------------------------------------------------------ *
   Marquee pause control — WCAG 2.2.2 requires a real control for motion that
   runs longer than five seconds. Hover-pause alone is not sufficient.
 * ------------------------------------------------------------------ */

function initMarquee(): void {
  for (const button of document.querySelectorAll<HTMLButtonElement>('.marquee__pause')) {
    const marquee = button.closest('.marquee');
    if (!marquee) continue;
    button.addEventListener('click', () => {
      const paused = marquee.getAttribute('data-paused') === 'true';
      marquee.setAttribute('data-paused', String(!paused));
      button.setAttribute('aria-pressed', String(!paused));
      button.textContent = paused ? 'Pause' : 'Play';
    });
  }
}

/* ------------------------------------------------------------------ *
   Sticky mobile CTA — appears once the hero CTA has scrolled away, so there is
   never a moment where no call-to-action is on screen.
 * ------------------------------------------------------------------ */

function initStickyCta(): void {
  const bar = document.querySelector<HTMLElement>('[data-sticky-cta]');
  const sentinel = document.querySelector<HTMLElement>('[data-hero-end]');
  if (!bar || !sentinel || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      bar.dataset.visible = String(!entry.isIntersecting);
    },
    { threshold: 0 },
  );
  observer.observe(sentinel);
}

/* ------------------------------------------------------------------ *
   Scroll depth via sentinels — never a scroll listener (INP hazard).
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

initReveal();
initBooking();
initForm();
initCopy();
initMarquee();
initStickyCta();
initScrollDepth();

export {};
