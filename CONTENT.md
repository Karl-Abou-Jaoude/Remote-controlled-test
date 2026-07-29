# What to fill in, in order

Run `npm run check` any time to see exactly what is still outstanding. The site
builds and looks finished with placeholders in place, so you can deploy now and
fill in as you clear things — but every `<PLACEHOLDER>` is a claim a buyer will
read, so none should survive to launch.

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

| Placeholder | Where | How to get it |
| --- | --- | --- |
| `<CAL_COM_USERNAME>` | `site.ts` → `contact` | Create a free Cal.com account, add a 20-minute event type called `intro-20`. Verify the free tier still allows multiple event types before you rely on a second one. |
| `<WEB3FORMS_ACCESS_KEY>` | `site.ts` → `contact` | web3forms.com — no signup, they email you a key. Confirm the current free monthly submission cap. |
| `<GITHUB_HANDLE>`, `<LINKEDIN_HANDLE>` | `site.ts` → `contact.socials` | Yours. |
| `identity.origin` | `site.ts` | Your real domain. Every absolute URL, the canonical and the OG image URL derive from it. |
| `<YYYY-MM-DD>` / `<START_DATE>` | `site.ts` → `availability` | Your real earliest start. **The build fails when this date passes** — that is deliberate, a stale availability date is worse than none. |

## 2. Price it (the section that qualifies for you)

`site.ts` → `rates`. Publish **bands with both ends**, not floors — a floor is
the number every buyer negotiates toward, and "from $X" tells a large buyer
nothing about whether you are a $3k or an $18k operation.

- `<AUDIT_PRICE>` — the paid diagnostic. A four-figure fixed fee is established
  at this end of the market; the guarantee attached to it ("if it doesn't name
  three issues you didn't know about, don't pay") is what makes it easy to buy.
- `<PROJECT_LOW>`–`<PROJECT_HIGH>`, `<RETAINER_LOW>`–`<RETAINER_HIGH>`.

## 3. The scope strip — six figures, no tenure

`site.ts` → `scope`. **Only cells with real values render, and the build fails
below four**, so partial filling is safe. There is deliberately no years number
anywhere: a timeline makes the buyer compute your age, a scope strip makes them
compute your reach.

`emphasis: true` marks the single figure allowed to render at the largest size —
put it on your strongest number. Exactly one.

## 4. The credits table — at least three nameable brands

`site.ts` → `credits`. Nothing renders below three named brands, and the heading
already states the contracting relationship, so the qualifier cannot be missed.
Fill `<BRAND_n>`, `<REGION_n>`, `<GMV_n>`, what shipped, and your role — using
`Lead engineer, solo build` or `Lead engineer, <N>-person team. I owned X; Y was
another engineer's.` Ambiguity here is the expensive kind: a reference call will
resolve it, and the resolution reads as an attempted overstatement.

## 5. Two testimonials — each with a public profile link

`site.ts` → `testimonials`. **No quote ships without a resolvable profile URL** —
the link is the trust mechanism, the quote is only the design. If you cannot get
a link, ship a screenshotted email or Slack excerpt with a real name and company
instead of a styled anonymous blockquote.

Best format is objection-shaped: *"I was worried X, but Y."* Ask the person to
name a number they own. The attribution already discloses that the brand was a
Qwerty client and you were the lead engineer — leave that in.

## 6. Three case studies

`src/data/work.ts`. The `constraint` field matters most: it is the section most
portfolios omit and the one an experienced buyer judges you on. Anyone can ship
when nothing is in the way.

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

- A 4:5 portrait, max 288px wide. Deliberately small and on a separate page: an
  agency homepage tested as *more* professional and as having larger clients
  without the founder photo, which is precisely the anxiety a solo engineer
  should not feed.
- `<THE_DECISION_YOU_SHIPPED>` / `<WHAT_YOU_REPLACED_IT_WITH>` /
  `<WHY_YOU_REVERSED_IT>` — a real decision you reversed. Judgement is what
  buyers mean by "senior", and a reversed decision is the one thing that cannot
  be faked.

## 8. Your own performance numbers

`site.ts` → `footer.perf`. Run PageSpeed Insights on the deployed site, put your
real LCP and JS weight in, and link the dated result. This is the most direct
proof available to someone selling store performance, and the only claim on the
page a buyer can verify in ten seconds.

## 9. The rest

- `<VERIFIED_SKILLS_LIST>` — your actual Shopify Partner credentials. The FAQ
  already answers the Plus Partner question honestly (no individual can hold it);
  do not soften that, a buyer can check it and being caught is fatal.
- `<FREEZE_DATE>` — your BFCM code-freeze date.
- `<REFERENCE_NAME>` — whoever will take a reference call. If you offer it, you
  must honour it; an unanswered reference request is worse than never offering.
- `<N>` values throughout: days per week, backup engineers, markets, locales.

---

## Before you launch

```bash
npm run check:strict   # fails while any placeholder remains
npm run build          # type-checks and runs the content guard
```

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
