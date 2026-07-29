# What to replace, in order

**The site is currently filled with demo data so it renders complete.** Every
brand, number, quote and price is invented. `npm run check` prints the full
inventory on every build, and `npm run check:strict` fails while
`DEMO_CONTENT = true` — use it as your launch gate.

Replacing a fabricated value is more urgent than filling a blank one was: an
obvious `<PLACEHOLDER>` cannot be deployed by accident, but a plausible invented
brand can. Work top to bottom.

All copy lives in **two files**: `src/data/site.ts` and `src/data/work.ts`. You
should never need to touch a component to change a word.

---

## 0. Before any brand name goes on the site — do this first

This is the single largest legal and credibility exposure on the page, and it is
cheap to clear:

1. Read your Qwerty employment/contractor agreement for confidentiality, IP
   assignment and any portfolio/publicity clause. Many agency contracts vest
   showcase rights in the agency, which means naming a brand can breach the
   contract **even when every fact you state is true**.
2. Get written permission from Qwerty — email is enough — naming exactly which
   brands and which screenshots you may use.
3. Check whether Qwerty already publicly credits the work. A brand Qwerty names
   on its own site is materially safer for you to name.
4. For any NDA'd brand, use the anonymised pattern **inside a case study only**
   (`A <revenue band> DTC <category> brand (name under NDA)` +
   `Reference call available on request`). Never in the credits table — an
   anonymous row there reads as unverifiable. And do not leak by adjacency: an
   unnamed case plus a recognisable screenshot is still identification.

The one-line test for every attribution on the site: **would Qwerty and the named
brand both read this line and agree it is accurate?** A hostile buyer will email
one of them.

None of this is legal advice — have the final wording checked against your
contract.

---

## 1. Make it reachable (15 minutes, unblocks everything)

| Field | Currently set to | What to do |
| --- | --- | --- |
| `contact.calLink` / `calUrl` | `karl-abou-jaoude/intro-20` (guessed handle) | Create a free Cal.com account with a 20-minute `intro-20` event type, then confirm the handle matches. Verify the free tier still allows multiple event types before relying on a second one. |
| `contact.web3formsKey` | `demo-key-not-configured` — **the form cannot work** | Get a key from web3forms.com (no signup; they email it). Until then a submission fails into the mailto fallback, which is deliberate. Confirm the current free monthly cap. |
| `contact.socials` | `github.com/karlaboujaoude`, `linkedin.com/in/karlaboujaoude` | Check both resolve to you. |
| `identity.origin` | `https://karlaboujaoude.com` | Your real domain. Every canonical, absolute URL and the OG image URL derive from it. |
| `availability.nextStart` | `2026-09-14` (invented) | Your real earliest start, ISO format, plus the human label. **The build fails once this date passes** — deliberate, because a stale availability date is worse than none. |
| `identity.agencyTenure` / `agencyYearRange` | `March 2024 to June 2026` / `2024–2026` | Your real dates. Never round up: it is checkable in fifteen seconds and would discount every other number on the site. |

## 2. Price it (the section that qualifies for you)

`site.ts` → `rates`. Publish **bands with both ends**, not floors — a floor is
the number every buyer negotiates toward, and "from $X" tells a large buyer
nothing about whether you are a $3k or an $18k operation.

Currently invented: audit **$3,500 fixed**, projects **$18k–$85k**, fractional
**$9k–$16k/month**. Set them to numbers you will actually quote — they appear in
the hero's right column on desktop and under the scope strip on mobile, so a
buyer is qualified or disqualified in the first screenful.

The guarantee attached to the diagnostic ("if it does not name at least three
issues you did not already know about, do not pay") is what makes a four-figure
first purchase easy. Keep it only if you will honour it.

## 3. The scope strip — six figures, no tenure

`site.ts` → `scope`. Currently invented: **14** Plus storefronts, **23** markets,
**11** currencies, **$180M** GMV under management, **9** engineers led, **3**
Black Fridays with **0** P1 incidents.

Replace with your real figures, and keep them consistent with the credits table
and the case studies — a reader who adds them up and finds a contradiction
discounts all of them. There is deliberately no years number anywhere: a timeline
makes the buyer compute your age, a scope strip makes them compute your reach.

`emphasis: true` marks the single figure allowed to render at the largest size —
put it on your strongest number. Exactly one, and note it animates on scroll.

## 4. The credits table — at least three nameable brands

`site.ts` → `credits`. Currently five **invented** brands: Halden & Roe, Volsted
Athletic, Marrow Coffee Co., Ferrand Maison, Quillon Supply. These must go before
launch — a fictional brand with a revenue band attached is a specific factual
claim about a business that does not exist, and if a name turns out to belong to a
real company it is a claim about a company that never hired you.

Nothing renders below three named brands, and the heading already states the
contracting relationship. For each row give region, GMV band, what shipped, and
your role — `Lead engineer, solo build` or `Lead engineer, N-person team. I owned
X; Y was another engineer's.` Ambiguity here is the expensive kind: a reference
call resolves it, and the resolution reads as an attempted overstatement.

## 5. Two testimonials — each with a public profile link

`site.ts` → `testimonials`. Currently two **invented people** (Priya Raman,
Tobias Lentz) with quotes that were written, not collected, and profile links that
point at `/in/replace-with-real-profile/` so they cannot be mistaken for real.
Either replace both with real quotes and real links, or delete the section — a
fabricated endorsement attributed to a named person at a named company is the
single most damaging thing this page could carry.

**No quote ships without a resolvable profile URL** — the link is the trust
mechanism, the quote is only the design. If you cannot get a link, ship a
screenshotted email or Slack excerpt with a real name and company instead of a
styled anonymous blockquote.

Best format is objection-shaped: *"I was worried X, but Y."* Ask the person to
name a number they own. The attribution already discloses that the brand was a
Qwerty client and you were the lead engineer — leave that in.

## 6. Three case studies

`src/data/work.ts`. All three are **invented**, including every metric, the
constraints, the decisions, the Liquid snippet, and the `example.com` live-store
URLs. Replace or delete them.

The `constraint` field matters most: it is the section most portfolios omit and
the one an experienced buyer judges you on. Anyone can ship when nothing is in the
way. The `because` on each decision is where seniority actually shows — name the
tradeoff you accepted and what you gave up.

Rules the guard enforces:

- **Never a percentage without its baseline and its measurement window.** `+340%`
  with no baseline reads as fiction.
- Outcomes belong to the client's instrument: *"their Shopify field data showed"*,
  not *"I increased revenue by X"*. The second construction is both the dishonest
  one and the legally exposed one.
- `liveUrl` must be a real production storefront. A screenshot is not proof.
- Consider renaming the slugs to include the brand (`/work/<brand>-replatform/`)
  once names are cleared — better for search, and nothing links to them yet.

Optionally add `snippet` — one real Liquid/Functions excerpt per case. Buyers who
can read it, do.

## 7. Portrait and the reversal (about page)

`src/pages/about.astro`. Two things:

- A 4:5 portrait, max 288px wide, replacing the placeholder box. Deliberately
  small and on a separate page: an agency homepage tested as *more* professional
  and as having larger clients without the founder photo, which is precisely the
  anxiety a solo engineer should not feed.
- The reversal story is currently **written for you** (a headless recommendation
  reversed to a 2.0 theme). Replace it with a decision you actually reversed.
  Judgement is what buyers mean by "senior", and a reversed decision is the one
  thing that cannot be faked — which also means an invented one is the easiest
  thing to catch in conversation.

## 8. Your own performance numbers

`site.ts` → `footer.perf`. Currently claims **0.9s LCP** against a 3.4s Shopify
mobile median — plausible for this build but not measured on your host, so treat
it as invented too. Run PageSpeed Insights on the deployed site and put the real
numbers in. This is the most direct proof available to someone selling store
performance, and the only claim on the page a buyer can verify in ten seconds —
which cuts both ways.

## 9. The rest

- FAQ: the Shopify Partner credentials line currently says "theme development,
  custom apps and platform migration" — make it match what you actually hold. The
  Plus Partner answer is honest as written (no individual can hold that tier); do
  not soften it, because a buyer can check and being caught is fatal.
- FAQ: the BFCM code-freeze date is set to **7 November** — make it yours.
- The credits footnote and the FAQ both offer a **reference call**. If you offer
  it you must honour it: an unanswered reference request is worse than never
  having offered one.
- The objections band commits to **three days a week** and **two named backup
  engineers**. Both are promises with your name on them — set them to what you
  will actually do, in writing, before a client asks.

---

## Before you launch

```bash
npm run check:strict   # fails while any placeholder remains OR demo data is active
npm run build          # runs the content guard, then type-checks, then builds
```

Set `DEMO_CONTENT = false` in `src/data/site.ts` as the last step — only once
every brand, figure, quote and price is genuinely yours.

Then the manual passes that no script can do for you:

- [ ] Submit the form from a real device; confirm it lands and is not in spam
- [ ] Submit with JavaScript disabled → lands on `/thanks/`
- [ ] Fill the hidden `botcheck` field → submission is discarded
- [ ] Book a real slot end-to-end from a non-local timezone; check the invite
- [ ] Open the calendar, close it, then scroll — the page must not be dead
- [ ] Tab the whole page: every control reachable, visible focus ring, nothing
      trapped behind the sticky bar
- [ ] Turn on reduced-motion: no band wipes, no count-up, no transforms
- [ ] Check the OG card unfurls in LinkedIn and Slack (LinkedIn caches — validate
      before you share it anywhere)
- [ ] Lighthouse mobile, throttled, incognito, median of 3

## Numbers to re-verify yourself

These came from research that could not reach the vendors' live pages, so treat
them as "probably right, check before relying on":

- Web3Forms free-tier monthly submission cap and data residency
- Cal.com free-tier event-type limit, and their current embed snippet (copy it
  from their embed generator; the lazy-load wrapper here stays valid regardless)
- Whichever analytics free tier you choose (Umami Cloud / Plausible / Fathom)
