# AGENTS.md — Standing rules for this repo

Read this before writing any code or content. These are hard constraints, not suggestions.
Violating any **HARD RULE** means the work gets reverted.

---

## 1. What this site actually is

A **no-fluff cooking reference** for dads. Two products in one:

1. **Recipes** — a small, genuinely distinct set. Quality-gated. Not the SEO engine.
2. **The cook-time reference** (`/how-long/*`, `/charts/*`) — a parametric database of
   food × appliance × state → temp, time, internal temp. **This is the SEO/LLM engine.**

The model is BradyBNumbers.com: it ranked because it had 603 *verified* technical
datasheets, not because it had 1,816 URLs. Route count was the symptom. Verified
data was the cause. Do not copy the symptom.

---

## 2. HARD RULES — content

**HR-1. No combinatorial recipe generation. Ever.**
Do not write or run scripts that produce recipes by looping
`protein × flavor × appliance`. Every recipe is authored individually.
`scripts/build-1000-recipes.js` and any successor are banned.

**HR-2. No fabricated numbers.**
Nutrition, cook times, and temperatures may never be derived from array indices,
counters, or formulas. If a number cannot be sourced, the field is omitted, not guessed.
Every `nutrition` object needs a `source` field. Every cook time needs a `basis` field.

**HR-3. Every recipe must be physically valid.**
A protein × appliance pair must be one a person would actually cook.
No `Slow Cooker Parmesan Herb Crusted Chicken Tenders`. No `Smoked Greek Yogurt`.
No `Air Fryer Cottage Cheese`. If you cannot picture a person cooking it, it does not ship.

**HR-4. No duplicate prose across pages.**
- `tagline` must be unique per recipe. Duplicated taglines become duplicated meta descriptions.
- `detailedSteps[].title` sequences must not repeat across recipes.
- `dadProTip`, `reheatInstructions`, `kidAdjustment` must not be drawn from a rotating pool.
Before any content commit, run `npm run audit:content`. It must exit 0.

**HR-5. Recipe count ceiling until the gate is lifted: 150.**
Ship quality first. The volume play is `/how-long/*`, which is verifiable and defensible.
Raising this ceiling requires explicit sign-off from Alex.

---

## 3. HARD RULES — SEO / rendering

**HR-6. Both content modes must exist in the server-rendered HTML.**
The "Get to the point" and "Step-by-step" versions are BOTH present in the initial HTML
payload of every recipe page. Switching between them is **CSS visibility only**.

Banned:
```tsx
{mode === 'quick' && <QuickVersion />}   // ← detailed version never reaches crawlers
```
Required:
```tsx
<div data-mode-panel="quick">...</div>
<div data-mode-panel="detailed">...</div>
// CSS: [data-mode="quick"] [data-mode-panel="detailed"] { display: none }
```
Reason: LLM crawlers (GPTBot, ClaudeBot, PerplexityBot) largely do not execute JS.
Conditionally-rendered content is invisible to them. The long-form corpus is the
whole point of having a long-form mode — it must be in the HTML.

**HR-7. No modal, interstitial, or blocking overlay asking the user to pick a mode.**
Google treats content-blocking interstitials as a ranking negative, and it destroys
LCP/CLS. The mode picker is a sticky inline segmented control at the top of the
content. It is visible immediately; it never covers the content.

**HR-8. Mode preference must be applied before first paint.**
Read `localStorage` in a small blocking inline script in `<head>` that stamps
`data-mode` on `<html>`. Do not apply it in `useEffect` — that causes a visible
content swap and layout shift after hydration.

**HR-9. One URL per recipe. No `/recipes/x` + `/recipes/x/detailed` split.**
`?mode=detailed` may set the mode, but `<link rel="canonical">` always points at the
clean URL.

**HR-10. No hardcoded domain strings.**
Everything reads from `process.env.NEXT_PUBLIC_SITE_URL` via `lib/site.ts`.
`dadmeals.com` is currently hardcoded in metadata and is **not a confirmed domain**.
Grep for it and remove it.

---

## 4. HARD RULES — data integrity

**HR-11. `data/recipes.json` is generated from per-recipe source files, never hand-edited.**
Source of truth: `content/recipes/*.ts` (one file per recipe, typed).
Build step compiles them to JSON. This keeps diffs reviewable.

**HR-12. Type unions are the contract.**
No recipe may reference a `Category` or `Appliance` not declared in `lib/types.ts`
AND present in `data/categories.ts` / `data/appliances.ts`. Currently violated:
`game-day` (undeclared category), `slow-cooker` and `smoker` (undeclared appliances,
260 recipes affected).

**HR-13. `Category` and `Appliance` namespaces must not overlap.**
`air-fryer` is an **appliance**, not a category. Remove it from the `Category` union.
Categories describe *constraints and intent* (15-minute, budget, kid-approved, no-thaw,
one-pan, five-ingredient). Appliances describe *hardware*. Overlap creates duplicate
content at `/categories/air-fryer` and `/appliance/air-fryer`.

**HR-14. `Ingredient.amount` must tolerate real recipe quantities.**
`amount: number` cannot express "1/2", "2–3", "to taste", or "1 can (15 oz)".
Use `{ qty: string; qtyNumeric?: number; unit: string }` — `qtyNumeric` only when the
value is genuinely scalable for the portion scaler.

---

## 5. Brand & art direction

Reference: https://www.kellerstoecklarchitektur.at/ — measured values:

| Token | Value | Note |
|---|---|---|
| ground | `#F5F4F0` | exact match, already in tailwind config |
| ink | `#111111` | exact match |
| typeface | Helvetica / Arial — **one grotesk, no serif** | |
| body size | 13px | very small, very dense |
| labels | uppercase, heavy letter-spacing | |
| color accents | **none** | the reference is monochrome |

**Current drift to correct:**
- `tailwind.config.ts` adds `accent` (terracotta), `forest`, and `mustard`. The reference
  has zero color. Keep **one** accent maximum, and use it only for live/interactive state
  (running timer, active mode). Delete `forest` and `mustard`.
- `fontFamily.serif` declares `"Editorial New"`, which is not loaded anywhere and will
  silently fall back to Georgia. Delete the serif stack entirely.

Layout metaphor: the reference is a **dense grid of specimens**. The homepage should be a
dense index grid of meals, not a hero image with three featured posts.

---

## 6. Required checks before any commit

```bash
npm run build            # must pass, zero type errors
npm run audit:content    # duplicate prose, invalid combos, enum violations, fabricated nutrition
npm run audit:seo        # canonical/domain, both modes in SSR HTML, schema validity
```

All three scripts exist and must exit 0. Coverage is not yet complete — see
`SEO-PROJECT.md` for tracked gaps (SEO-018).

---

## 7. Escalate to Alex, don't guess

- Domain name (blocks canonicals, sitemap, llms.txt, schema)
- Raising the 150-recipe ceiling
- Adding a new `Category` or `Appliance` to the unions
- Any change to the mode-switch mechanism
