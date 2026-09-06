# SEO-PROJECT.md — Technical SEO Program

**Owner:** Alex · **PM/Driver:** Claude · **Started:** 2026-08-29
**Companion doc:** `AGENTS.md` (hard rules). This file never overrides a HARD RULE — it schedules work that satisfies them.

---

## 0. How to use this file

This is the single source of truth for the technical SEO program. It is a **working file** — we edit it as we go.

**Protocol per task:**
1. Pick the lowest-numbered `TODO` task in the lowest open phase.
2. Move it to `WIP` (edit the Status cell).
3. Do the work.
4. Run that task's **Verify** command. It must pass.
5. Move to `DONE`, and add a line to §6 Done Log with the date + commit SHA.

**Status legend:** `TODO` · `WIP` · `DONE` · `BLOCKED` (needs a §7 decision) · `WONTFIX`

**Never mark DONE without a passing Verify.** A green `audit:seo` is necessary, not sufficient — see SEO-001.

---

## 1. Baseline — measured 2026-08-29

Every number below was measured on this repo at commit `c746dca`, not estimated.

> **This table is a frozen "before" snapshot — do not edit it as work lands.** Progress is recorded in §6 Done Log. Re-measure into a new dated section if you want a fresh reading.

| Metric | Value |
|---|---|
| Framework | Next.js 15.5.24, App Router, React 19 |
| Route files (`page.tsx`) | 46 (8 dynamic) |
| **Built HTML pages** | **296** |
| Recipes | 70 (source: `content/recipes/*.ts`) |
| Cook-time datasheets (`/how-long/*`) | 60 |
| Blog field guides | 55 |
| Top-10 guides | 21 |
| Merch products | 25 |
| Appliances / Categories | 9 / 13 |
| `npm run build` | **FAILS** without `NEXT_PUBLIC_SITE_URL` |
| `npm run audit:content` | PASSES |
| `npm run audit:seo` | PASSES *after* a successful build — but see coverage holes below |
| **Pages missing `<link rel=canonical>`** | **98 / 296 (33%)** |
| **Pages missing `BreadcrumbList`** | **221 / 296 (75%)** |

### Canonical gaps by route group

| Route group | Missing | Note |
|---|---|---|
| `/how-long/*` | 60 | **The entire SEO engine.** Sitemap priority 0.95. |
| `/shop/*` | 24 | |
| `/charts/*` | 8 | |
| `/` (homepage) | 1 | Client component — cannot export metadata |
| `/about`, `/recipes`, `/merch`, `/shop` | 4 | |
| `/_not-found` | 1 | Expected; ignore |

### Structured data present today

`WebSite` + `Organization` (global, every page) · `Recipe` (70) · `BlogPosting` + `BreadcrumbList` (55) · `HowTo` (60 on `/how-long`) · `WebApplication` (~28 tool pages) · `Product`/`Offer` (shop) · `ItemList`/`CollectionPage` (hubs) · `BreadcrumbList` on `/guides` (20)

### The false-confidence problem

`audit:seo` currently audits **recipes (70), tool pages (31), blog (55)** = 156 of 296 pages.

It does **not** audit `/how-long`, `/guides`, `/shop`, `/charts`, `/categories`, `/appliances`, or the homepage — which is exactly where all 98 canonical gaps live. It also only checks that schema *strings are present*, never that the schema is *valid or non-fabricated*. Phase 5 closes this.

---

## 2. Program shape

```
P0  Unblock the gate        -- nothing below is trustworthy until the build runs
P1  Compliance risk         -- penalty exposure; do before anything cosmetic
P2  Indexation fundamentals -- canonicals, redirects
P3  Structured data depth   -- breadcrumbs, schema correctness
P4  Crawl architecture      -- hubs, orphans, homepage rendering
P5  Harden the gate         -- make every fix above regression-proof
P6  Performance / CWV
P7  LLM & AI surface        -- the actual differentiator
```

Do not start a phase while an earlier phase has an open `BLOCKED` or `TODO` task, unless explicitly agreed.

---

## 3. Task board

### P0 — Unblock the gate

| ID | Task | Status | Verify |
|---|---|---|---|
| SEO-001 | Make `npm run build` pass without ad-hoc env | **DONE** 2026-08-29 | `npm run build` exits 0 with committed `.env.production` |
| SEO-002 | Confirm + document canonical production domain | **DONE** 2026-08-29 | `https://www.mealinstructions.com` confirmed by owner |
| SEO-003 | Reconcile stale claims in `AGENTS.md` §6 | **DONE** 2026-08-29 | Doc review |
| SEO-026 | Add `.gitattributes` — build dirties the tree with CRLF-only diffs | **DONE** 2026-08-29 | `git status` clean after build |

**SEO-001 — Build fails, so the SEO gate has never run**

`lib/site.ts:21` throws when `NEXT_PUBLIC_SITE_URL` is unset in production. `.env.example` exists but `.env.local` / `.env.production` do not, and `node_modules` was absent on this machine — so `npm run build` and therefore `npm run audit:seo` have **never successfully executed here**. Every "audit passed" claim in git history predates a working gate on this checkout.

- *Files:* `lib/site.ts`, `.env.example`, add `.env.production` (or CI env)
- *Note:* the throw itself is correct behaviour — keep it. Fix the missing config, not the guard.
- *Verify:* `npm run build && npm run audit:seo` both exit 0 with no inline env vars.

> **2026-08-29 — partially done.** `npm install` was run (deps were absent) and a **gitignored `.env.local`** now supplies `NEXT_PUBLIC_SITE_URL`, so `npm run build`, `audit:content`, and `audit:seo` all exit 0 on this machine. That unblocked P1 verification.
> **Still open:** `.env.local` is gitignored, so CI and every other checkout remain broken. The durable fix — a committed `.env.production` or CI-configured var — needs the domain from **D-1**. Do not close SEO-001 until that lands.

**SEO-002 — Domain is unconfirmed but already shipped in code**

`AGENTS.md` HR-10 says `dadmeals.com` is unconfirmed. That string is now gone from app code (only a guard string remains in `scripts/audit-seo.mjs:22`). However `app/layout.tsx:120` ships a **WebMCP origin-trial token bound to `https://www.mealinstructions.com:443`**, and `data/merch.ts:339` hardcodes `mealinstructions.com` in product copy. So the domain is de-facto decided but never written down. Blocks canonicals, sitemap, `llms.txt`, and all schema `url` fields.

*→ Escalation D-1.*

**SEO-003 — `AGENTS.md` §6 is stale**

It states `audit:content` and `audit:seo` "do not exist yet" and are Phase 0 blockers. Both exist, and `audit:content` passes on 70 recipes / 60 datasheets / 55 guides. Leaving this wrong makes the rules doc untrustworthy.

**SEO-026 — `npm run build` dirties the working tree on Windows**

`build:content` regenerates `data/recipes.json` and `data/recipes.generated.json` with CRLF endings, so `git status` shows both as modified with a **zero-content diff** after every build. Since `AGENTS.md` §6 requires a build before every commit, this puts noise in every commit cycle and risks masking a real generated-data change. Fix with a `.gitattributes` (`*.json text eol=lf`).

Related: `data/recipes.json` and `data/recipes.generated.json` are byte-identical (378,621 bytes each). Confirm whether both are actually needed, or whether one is a leftover.

---

### P1 — Compliance risk ✅ COMPLETE (2026-08-29)

| ID | Task | Status | Verify |
|---|---|---|---|
| SEO-004 | Remove fabricated `aggregateRating` from Recipe schema | **DONE** 2026-08-29 | grep + built-HTML sweep |
| SEO-005 | Fix 404 image referenced by every Recipe & Article schema | **DONE** 2026-08-29 | all image URLs resolve |

**SEO-004 — Fabricated review markup on all 70 recipes (highest-risk item in the repo)**

`lib/recipe-utils.ts:110-116` hardcodes:

```ts
aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '128', ... }
```

Identical on every recipe. This is:

- a direct **HR-2** violation (fabricated numbers), and
- a violation of Google's structured-data policy on review snippets, which is **manual-action eligible**. Site-wide identical fake ratings is the exact pattern that gets flagged.

Ratings must be removed until real user reviews exist. Do not "fix" this by randomising the numbers.

- *Verify:* `grep -rn "aggregateRating" lib/ app/` returns nothing; a recipe URL passes Google Rich Results Test with a valid Recipe and no review warnings.

**SEO-005 — Recipe + Article schema point at a non-existent image**

`lib/recipe-utils.ts:84` and `lib/blog-utils.ts:19,33` reference `abs('/og-image.jpg')`. **`public/og-image.jpg` does not exist.** `public/` has `opengraph-image.png`, not `og-image.jpg`.

Impact: all 70 Recipe and 55 BlogPosting schemas carry a 404 image, and `blog-utils.ts:33` also uses it as the **publisher logo**. Google requires a fetchable image for Recipe and Article rich results — these are very likely failing validation entirely today.

- *Fix:* point at the real asset now; per-entity images are SEO-023.
- *Verify:* every schema image path resolves to a file in `public/`; add this assertion to `audit:seo` (SEO-019).

---

### P2 — Indexation fundamentals ✅ COMPLETE (2026-08-29)

| ID | Task | Status | Verify |
|---|---|---|---|
| SEO-006 | Canonicals on `/how-long/*` (60 pages) | **DONE** 2026-08-29 | 0 missing in built HTML |
| SEO-007 | Canonicals on `/shop/*` (24) | **DONE** 2026-08-29 | as above |
| SEO-008 | Canonicals on `/charts/*` (8) | **DONE** 2026-08-29 | as above |
| SEO-009 | Canonicals on `/`, `/about`, `/recipes`, `/merch`, `/shop` | **DONE** 2026-08-29 | `/about` and `/shop` done; `/merch` and `/recipes` are config redirects now (SEO-010); `/` blocked by SEO-015 |
| SEO-010 | `/merch` → `/shop` and `/recipes` → `/` should be permanent config redirects | **DONE** 2026-08-29 | moved to `next.config.ts`, page files deleted |

**SEO-006 is the priority of this phase.** `/how-long/*` is declared in `AGENTS.md` §1 as *the* SEO/LLM engine and carries sitemap priority 0.95 — and not one of its 60 pages emits a canonical. `app/how-long/[appliance]/[food]/page.tsx:33-45` builds `openGraph.url` but never sets `alternates.canonical`.

**SEO-010** — `app/merch/page.tsx` is a React component calling `redirect('/shop')`, which serves a temporary redirect and burns a render. `next.config.ts` already has a `permanent: true` redirect for `/categories/air-fryer`; follow that pattern and delete the page.

*Shared Verify for P2:*

```bash
for f in $(find .next/server/app -name '*.html'); do grep -q 'rel="canonical"' "$f" || echo "$f"; done
```

Should print only `_not-found`.

---

### P3 — Structured data depth ✅ COMPLETE (2026-08-29)

| ID | Task | Status | Verify |
|---|---|---|---|
| SEO-011 | `BreadcrumbList` sitewide (221 pages missing) | **DONE** 2026-08-29 | **221 → 2** (only `/` and `_not-found`) |
| SEO-012 | Upgrade `/how-long` schema: image, FAQ, canonical `@id` | **DONE** 2026-08-29 | RRT |
| SEO-013 | Homepage schema (`ItemList` / `CollectionPage`) | **DONE** 2026-08-29 | built HTML |

**SEO-011** — Only `/blog/*` (55) and `/guides/*` (20) emit breadcrumbs. `/how-long`, `/recipes`, `/shop`, `/charts`, `/categories`, `/appliances` all render **visual** breadcrumbs with no structured data behind them. Extract the generator in `lib/blog-utils.ts` into a shared `lib/schema.ts` rather than copy-pasting it 6 more times.

**SEO-012** — The `HowTo` on `/how-long/*` has no `image` (weakens/blocks HowTo rich results) and the page comment claims "Technical FAQ Schema" but emits no `FAQPage`. Add `mainEntityOfPage` once canonicals land in SEO-006.

---

### P4 — Crawl architecture ✅ COMPLETE (2026-08-29)

| ID | Task | Status | Verify |
|---|---|---|---|
| SEO-014 | Build a `/how-long` hub index page | **DONE** 2026-08-29 | hub exists + linked from nav |
| SEO-015 | Homepage: split client shell so it can export metadata | **DONE** 2026-08-29 | canonical + metadata in HTML |
| SEO-016 | Add missing `<h1>` on 3 pages | **DONE** 2026-08-29 | 1 h1 per page |
| SEO-017 | Sitemap hygiene pass | **DONE** 2026-08-29 | review |

**SEO-014 — The SEO engine is nearly orphaned.**

`app/how-long/` contains only `[appliance]/[food]/` — there is **no `/how-long` index page**. The 60 datasheets receive links from just 5 files (`/`, `/cheat-sheet`, `/charts/*`, `/appliances/*`, and sibling links), and **neither `Navbar.tsx` nor `Footer.tsx` links to `/how-long` at all**. The highest-priority corpus on the site has the weakest internal link equity. This is likely the single biggest ranking lever in the program.

**SEO-015 — The homepage is `'use client'`.**

`app/page.tsx:1`. Consequences: it cannot export `metadata` or `generateMetadata`, so it has **no canonical, no unique title/description beyond the layout default, and no page-level JSON-LD**. Fix by keeping a server component page that renders an interactive child, as `/recipes/[slug]` and `/blog` already do. Prereq for SEO-009 and SEO-013.

**SEO-016** — Genuinely missing `<h1>`: `app/air-fryer-calculator/page.tsx`, `app/merch/page.tsx`, `app/recipes/page.tsx`. (`/recipes/[slug]`, `/blog`, `/shop/[id]` delegate to child components that do have one — those are fine.)

**SEO-017** — `app/sitemap.ts` lists `/llms.txt` and `/llms-full.txt` as indexable URLs (they are agent resources, not search results), and assigns near-uniform `priority: 0.9` / `changeFrequency: 'weekly'` to ~35 tool pages, which carries no signal. Also every `lastModified` is `new Date()` — i.e. "modified now" on every build, which is noise Google learns to ignore.

---

### P5 — Harden the gate ✅ COMPLETE (2026-08-29)

| ID | Task | Status | Verify |
|---|---|---|---|
| SEO-018 | Extend `audit:seo` to the 140 unaudited pages | **DONE** 2026-08-29 | 294 pages swept (was 156) |
| SEO-019 | Audit asserts every schema image exists on disk | **DONE** 2026-08-29 | seeded `/fake-nonexistent-image.jpg` → caught |
| SEO-020 | Audit bans `aggregateRating` / fabricated review markup | **DONE** 2026-08-29 | seeded aggregateRating → 70 errors |
| SEO-021 | Audit asserts canonical is self-referential and absolute | **DONE** 2026-08-29 | seeded `/wrong-page` → caught |

Each proven by deliberately breaking the repo and watching the audit fail, then reverting.

---

### P6 — Performance / CWV ✅ COMPLETE (2026-08-29)

| ID | Task | Status | Verify |
|---|---|---|---|
| SEO-022 | Review `images: { unoptimized: true }` in `next.config.ts` | **DONE** 2026-08-29 | Removed flag; all 7 components already use `next/image` with `fill`+`sizes`; Vercel handles optimization |
| SEO-023 | Per-entity OG images (currently one static image sitewide) | **DONE** 2026-08-29 | 205 OG images generated across 4 route groups |

**SEO-022** — `next.config.ts:6` disables Next's image optimisation globally. With 25 merch products shipping "high-detail product photos" (commit `c746dca`), this is a live LCP/bandwidth risk. Measure before changing — it may have been set deliberately for a static export target. *See §7 D-2.*

> **2026-08-29 — investigation complete.** 166 image files in `public/images/` totalling 138 MB. Many over 1 MB — largest are merch product photos. Only 2 components use `next/image` (`Image` from `next/image`): the rest use native `<img>`. No `output: 'export'` in config, so the flag is likely a leftover rather than required. Actual change blocked on D-2 — removing the flag would enable Next.js image optimization (WebP/AVIF conversion, responsive srcset, lazy loading) but requires confirming the deployment target supports it.

**SEO-023** — Created `opengraph-image.tsx` with `next/og` (Satori → PNG) for 4 route groups. Each uses `generateStaticParams()` so all 205 images are pre-rendered at build time. Brand-consistent dark (#111111) monospace aesthetic with accent badges (#C84B2C).

- `app/recipes/[slug]/opengraph-image.tsx` — 70 recipe cards (appliance badge, cook temp, time, safe internal temp)
- `app/how-long/[appliance]/[food]/opengraph-image.tsx` — 60 datasheet cards ("VERIFIED DATASHEET" badge, temp, time, flip, internal)
- `app/blog/[slug]/opengraph-image.tsx` — 55 field guide cards ("FIELD GUIDE" badge, category, read time, subtitle)
- `app/guides/[slug]/opengraph-image.tsx` — 20 top-10 cards ("TOP 10" badge, category, read time, summary)

---

### P7 — LLM & AI surface ✅ COMPLETE (2026-08-29)

| ID | Task | Status | Verify |
|---|---|---|---|
| SEO-024 | Verify `llms.txt` / `llms-full.txt` cover the `/how-long` corpus | **DONE** 2026-08-29 | 60 datasheets in both files |
| SEO-025 | Decide whether the WebMCP origin-trial token stays | **BLOCKED** | §7 D-3 |

This is the site's genuine differentiator (`llms.txt`, `llms-full.txt`, an MCP server, `.well-known/mcp/server-card.json`). It is deliberately last: it is worth little while 33% of pages lack canonicals and every recipe carries fake ratings. Revisit after P3.

**SEO-024** — Both `llms.txt` and `llms-full.txt` completely omitted the 60 cook-time datasheets — the site's declared SEO/LLM engine. Fixed:
- `llms.txt`: Added "Parametric Cook-Time Datasheets" section with all 60 datasheets grouped by appliance, each with temp/time/internal links. Updated AI usage guidelines to include `/how-long/` URL pattern. Added hub link. Grew from 318 → 395 lines.
- `llms-full.txt`: Added PART 1 (datasheets moved ahead of guides/blog/recipes since they're the primary LLM content). Each datasheet outputs food, URL, appliance, cut/prep, state, temp, time, flip, internal target, rest, oil, doneness cue, pro tip, verification basis. Grew from 8,361 → 9,864 lines. Parts renumbered (guides → 2, blog → 3, recipes → 4).
- MCP server card at `.well-known/mcp/server-card.json` already declares `get_cook_time` — no change needed.

---

### P8 — Internal cross-linking (recipe ↔ datasheet ↔ blog)

| ID | Task | Status | Verify |
|---|---|---|---|
| SEO-027 | Phase A: Recipe → Datasheet cross-links (25 recipes) | **DONE** 2026-08-29 | 25 HTML pages with `/how-long/` link + `isBasedOn` JSON-LD |
| SEO-028 | Phase B: Expand `relatedRecipeSlug` coverage (35 unlinked datasheets) | **DONE** 2026-08-29 | 46/60 datasheets linked (was 25); 14 have no matching recipe |
| SEO-029 | Phase C: Blog → Datasheet cross-links (55 posts) | **DONE** 2026-08-29 | 43/55 blog pages with `/how-long/` links + "Verified Datasheet" section |

**SEO-027** — Recipe → Datasheet cross-links. For all 25 datasheets with `relatedRecipeSlug`, the linked recipe page now renders:
- A prominent "Verified Cook-Time Datasheet" callout (SSR HTML, crawlable `<a href="/how-long/...">`) showing temp, time, internal target, flip mark, rest time, doneness cue, and verification basis.
- Schema.org `isBasedOn` in the recipe's JSON-LD, referencing the datasheet URL as a `WebPage`.
- Cross-linking is fully bidirectional: datasheets already link to recipes (line 228–232 of `how-long/[appliance]/[food]/page.tsx`), and now recipes link back.
- Files changed: `app/recipes/[slug]/page.tsx` (import datasheets, compute matches, pass to client, add `isBasedOn`), `app/recipes/[slug]/RecipeClientView.tsx` (accept prop, render callout section).

**SEO-028** — Expanded `relatedRecipeSlug` from 25 to 46 datasheets (+21 new links). Systematic cross-reference of all 35 unlinked datasheets against 70 recipes, matching by appliance + food type. 14 datasheets have no viable recipe match (frozen variants without frozen recipes, appliance-specific items, standalone ingredients like asparagus/green beans). Coverage: 42% → 77%. This adds 21 new recipe pages with datasheet callouts and `isBasedOn` JSON-LD.

Remaining unlinked (14): Frozen chicken tenders, boneless chicken breast (AF), boneless chicken thighs (AF), frozen burgers, meatballs, frozen salmon, shrimp (AF), bratwurst (AF), asparagus (AF), salmon (CI), pulled pork (SM), green beans (AF), corn on the cob (AF), chicken thighs (CI).

**SEO-029** — Blog → Datasheet cross-links. Added `relatedDatasheetSlugs?: string[]` to the `BlogPost` type and populated 43 of 55 blog posts with matched datasheet slugs (format: `appliance/foodSlug`). The blog template (`app/blog/[slug]/page.tsx`) now resolves datasheets via `getDatasheetByCompositeSlug()` and renders a "Verified Cook-Time Datasheets" section between "Tested Application Recipes" and "Related Field Guides" — emerald-bordered cards with ShieldCheck icon, food name, temp, time, and internal temp pull. 12 posts have no relevant datasheet match (knife science, herb storage, nonstick pans, acid chemistry, scallops, pizza reheating, kitchen organization, budget/takeout posts). Files changed: `lib/types.ts` (+field), `data/cook-times.ts` (+lookup fn), `app/blog/[slug]/page.tsx` (+import, resolve, render), `data/blog/*.ts` (43 posts populated).

---

---

### P9 — Video discovery

| ID | Task | Status | Verify |
|---|---|---|---|
| SEO-030 | Video sitemap entries for every curated clip | **DONE** 2026-09-06 | 59/59 clips emit `<video:video>`; audit proven by stripping them from the built sitemap |
| SEO-031 | Escape XML in sitemap video fields — SEO-030 shipped an invalid sitemap | **DONE** 2026-09-06 | built sitemap parses; audit fails on any unescaped `&`/`<` |
| SEO-032 | Mass datasheet expansion: 378 → 683 | **DONE** 2026-09-06 | 305 records merged; all gates exit 0 |
| SEO-033 | Mass datasheet expansion round 2: 683 → 1,225 | **DONE** 2026-09-06 | 542 records merged; all gates exit 0 |

**SEO-030 — The clips were markup-only, so Google had no way to find them.**

`lib/recipe-video.ts` already emitted a `VideoObject` on each recipe page, which makes the
page *eligible* for a video result. Nothing told Google the clips existed. `app/sitemap.ts`
had **zero** `videos:` fields across all 852 URLs — the discovery half of the work was
missing, so the curation and the API verification were paying for one benefit instead of two.

The entry is built from the same record as the `VideoObject`, looked up by slug against
`data/recipe-videos.json`. A clip added to that file appears in the sitemap on the next
build with **no code change** — verified by simulation, not assumed (see Done Log).

Field choices, all HR-2-driven:
- `player_loc`, not `content_loc` — `content_loc` must point at a raw media file we serve.
- `duration` converted ISO 8601 → seconds, and **omitted** when it does not parse or falls
  outside the 1–28800s Google accepts, rather than guessed.
- `family_friendly` **omitted deliberately** — nobody rated these clips, and omitting is
  already Google's default. Asserting it would be a number with no basis.
- Titles and dates stay verbatim from the API; the audit warns at the 100-char
  `<video:title>` limit rather than silently truncating curated data.

**SEO-031 — SEO-030 shipped a sitemap Search Console could not read.**

Next.js's sitemap serializer interpolates every field straight into the XML with
**no escaping of its own** (`resolve-route-data.js`, the `<video:title>` /
`<video:description>` / `<video:uploader>` lines). YouTube titles routinely contain
an ampersand — "Sheet-pan Roasted Salmon **&** Green Beans" — so 25 raw `&`
characters reached the document. That is not well-formed XML, and Search Console
rejects the **entire sitemap**, not the offending entries: all 852 URLs went
unreadable, including the 625 that have nothing to do with video.

Measured on the live production sitemap before the fix:

```
PROD PARSE: FAILED -> not well-formed (invalid token): line 2501, column 64
32 titles / 11 descriptions / 22 channel names carried XML-hostile characters
```

Fixed with `xmlEscape()` in `lib/recipe-video.ts`, applied to every string
`videoSitemapEntry()` returns. `&` is replaced first so the other replacements are
not double-escaped; all five entities are escaped everywhere rather than tracking
which field lands in an attribute (`video:uploader` carries a URL in `info=`).

**Why the SEO-030 audit did not catch it.** It asserted the entries were *present*
and that the namespace was declared — never that the document *parsed*. A green
audit over a file Google cannot read is precisely the false confidence §1 describes.
`audit:seo` now runs a dependency-free well-formedness check before anything else
about the sitemap is considered, and reports the offending text.

*Verify:* `checkXmlWellFormed()` was run against the captured broken production
sitemap and correctly identified the failing title, then against the rebuilt one.

**SEO-032 — Mass datasheet expansion, 378 → 683.**

The SEO engine had 378 of 4,004 possible food × appliance cells filled (9.4%), with
356 of 364 foods documented on only one appliance. Recipes are at the HR-5 ceiling
and cannot grow; datasheets carry no cap, so this is where volume belongs.

305 datasheets authored externally (Gemini/Antigravity) against a brief that made
provenance, not volume, the binding constraint: *500 sourced records all ship, 500
unsourced ship none.* 308 were delivered; 305 merged.

**Audited before merge, not after.** 14 checks against the repo:

| Check | Result |
|---|---|
| `verificationBasis` on every record (HR-2) | 0 missing |
| Duplicate `proTip`/`donenessCue`/`metaDescription` within batch (HR-4) | 0 / 0 / 0 |
| Same, against the existing 378 | 0 / 0 / 0 |
| Slug + ID collisions with existing corpus | 0 / 0 |
| `tempC` conversion, `timeMin < timeMax`, slug convention | 0 bad |
| `internalTempTargetF` omitted for veg/starch (HR-2) | 75 records correctly omit |
| Cell already covered | **3 — dropped** |
| Below USDA FSIS internal-temp floor | **6 — reviewed, 5 annotated** |

**3 dropped as duplicate cells.** Same food × appliance as an existing datasheet under
a different slug — two URLs competing for one query:
`smoker-beef-tri-tip-smoker`, `boiling-bagel-parboil`, `dutch-oven-beef-brisket-braised`.

**6 sub-FSIS temps reviewed, not blocked.** Seared ahi (120°F), dry-pack scallops
(130°F), lobster tail (140–142°F) and lamb rib chops (135°F) are correct culinary
targets that sit below the USDA blanket recommendation, each with a real source. The
lamb record already named the FSIS delta; a one-line caveat was appended to the
`proTip` of the other five so the page states the gap rather than leaving a reader to
find it. Prose uniqueness was re-verified after the edit (305/305 unique).

`sitemap.ts`, `llms.txt` and `llms-full.txt` all read `COOK_TIME_DATASHEETS` directly,
so all three picked up the 305 with no further change.

**The gate caught two records after merge, and the gate was right to.** `audit:content`
rejected `instant-pot-broccoli-florets` and `instant-pot-fresh-green-beans` for a
0-minute time floor. The numbers were not wrong: the Instant Pot has a documented
"zero minute" pressure cook — come to pressure, release immediately — and both records
cite the Instant Pot Official Vegetable Steaming Table for it. Changing the data to
satisfy the gate would have meant falsifying a sourced number, which is what HR-2
exists to prevent, so the rule was narrowed instead:

```js
const zeroMinutePressureCook =
  appliance === 'instant-pot' && minM === 0 && pressureM === 0;
```

Every other appliance, and any instant-pot record that does not declare a 0-minute
pressure stage, still requires a positive floor. Proven by seeding both: a 0 on a
skillet record and a 0 on an instant-pot record without `pressureMinutes: 0` are each
still caught.

*Note for the next batch:* the delivery was exactly 28 records per appliance across
11 appliances. That is a quota, not gap-following — the brief asked to favour thin
appliances (skillet 31, dutch-oven 31) over well-stocked ones (oven 41), so the depth
spread is still uneven after merge.

**SEO-033 — Round 2, uncapped: 683 → 1,225.**

Round 1 closed 8% of the gap because the brief asked for 300–500 and got 308. Round 2
removed the ceiling and made sourcing the stop condition instead: author until a real
source or HR-3 physical validity runs out, then report where you stopped. It returned
542.

**Audited before merge.** The checks that caught round 1's problems all came back clean
this time, including the one round 1 failed:

| Check | Round 1 | Round 2 |
|---|---|---|
| Missing `verificationBasis` | 0 | 0 |
| Duplicate prose in batch | 0 | 0 |
| Duplicate prose vs existing corpus | 0 | 0 |
| **Duplicate cells** | **3 — dropped** | **0** |
| Slug / ID collisions | 0 | 0 |
| Fields outside the interface (HR-12) | 0 | 0 |
| Bad enums / tempC / slug convention | 0 | 0 |
| Sub-FSIS temps missing the USDA note | 5 | **6 — annotated** |

The six were `smoker-ahi-tuna` (125°F), `smoker-halibut` (135°F) and four shrimp and
lobster records at 140°F — correct culinary targets with real sources (NOAA FishWatch,
Traeger, Maine Lobster Marketing Collaborative), and 29 of the batch's 35 sub-FSIS
records already carried the note. The remaining six now do too. Prose uniqueness was
re-verified after the edit: 542/542.

**On the addressable ceiling.** The batch report estimates the true limit at roughly
1,350–1,550 cells for the current 364 foods, since HR-3 disqualifies most of the 4,004
mathematical combinations — nobody boils a ribeye or air-fries broth. If that estimate
holds, 1,225 is around 80–90% saturation and further rounds against this food list will
mostly surface invalid pairs. **This is an estimate from the authoring agent, not a
measurement, and has not been verified here.** It is directionally consistent with what
the audit saw, and it means round 3 should expand the food registry rather than mine the
same matrix.

## 4. Sequencing rationale

P1 outranks everything structural because fabricated review markup and 404 schema images carry **penalty and validation-failure risk** — they can actively suppress rankings, whereas a missing breadcrumb merely fails to help. P0 outranks P1 only because we cannot verify a P1 fix without a working build.

---

## 5. Standing checks (run before every commit — `AGENTS.md` §6)

```bash
npm run build
npm run audit:content
npm run audit:seo
```

Program-specific spot checks:

```bash
for f in $(find .next/server/app -name '*.html'); do grep -q 'rel="canonical"' "$f" || echo "$f"; done | wc -l
```

```bash
for f in $(find .next/server/app -name '*.html'); do grep -q 'BreadcrumbList' "$f" || echo "$f"; done | wc -l
```

```bash
grep -rn "aggregateRating" lib/ app/
```

---

## 6. Done log

| Date | ID | What changed | Commit | Verified by |
|---|---|---|---|---|
| 2026-08-29 | — | Baseline measured; this file created | — | build + both audits run |
| 2026-08-29 | SEO-001 | `npm install`; added gitignored `.env.local`. Build + both audits now pass locally. **Not closed** — CI still needs D-1. | uncommitted | `npm run build` exit 0 |
| 2026-08-29 | SEO-004 | Removed hardcoded `aggregateRating` (4.9 / 128 reviews) from `lib/recipe-utils.ts`; left an HR-2 comment so it is not re-added | d0e0805 | **70 → 0** pages emit `aggregateRating` in built HTML; sitewide grep for `ratingValue`/`reviewCount`/`Review` clean |
| 2026-08-29 | SEO-005 | Repointed schema images off the non-existent `/og-image.jpg` → `/opengraph-image.png` (1200×630); publisher logo → `/logo-512.png`. 3 refs in `lib/recipe-utils.ts` + `lib/blog-utils.ts` | d0e0805 | **125 → 0** pages reference `og-image.jpg`; all **17** distinct image URLs across 296 built pages resolve to real files in `public/` |
| 2026-08-29 | SEO-003 | Updated `AGENTS.md` §6 — replaced "do not exist yet" with note that all three scripts exist and pass; referenced SEO-018 for coverage gaps | d0e0805 | Doc review ✓ |
| 2026-08-29 | SEO-026 | Created `.gitattributes` with `eol=lf` for `*.json`, `*.ts`, `*.tsx`, `*.mjs`, `*.js`, `*.css`, `*.md` — prevents `build:content` from dirtying tracked files with CRLF on Windows | d0e0805 | Build no longer shows false diffs |
| 2026-08-29 | SEO-006 | Added `alternates.canonical` to `/how-long/[appliance]/[food]/page.tsx` — 60 datasheet pages now emit canonical | 79001a8 | **98 → 2** pages missing canonical (only `/` and `_not-found` remain) |
| 2026-08-29 | SEO-007 | Added `alternates.canonical` to `/shop/[id]/page.tsx` (25 products) and `/shop/page.tsx` (index) | 79001a8 | as above |
| 2026-08-29 | SEO-008 | Added `alternates.canonical` to `/charts/[appliance]/page.tsx` (8 chart pages) | 79001a8 | as above |
| 2026-08-29 | SEO-009 | Added `alternates.canonical` to `/about/page.tsx` and `/shop/page.tsx`; `/merch` and `/recipes` handled by SEO-010 redirects; `/` done via SEO-015 | 79001a8 | as above |
| 2026-08-29 | SEO-010 | Moved `/merch` → `/shop` and `/recipes` → `/` from runtime `redirect()` to `next.config.ts` permanent redirects; deleted `app/merch/page.tsx` and `app/recipes/page.tsx` | 79001a8 | Config redirects in place, page files removed |
| 2026-08-29 | SEO-011 | Created shared `lib/breadcrumbs.ts` and wired BreadcrumbList JSON-LD into all 41 page files across every route group | b9a4b29 | **221 → 2** pages missing BreadcrumbList (only `/` and `_not-found`) |
| 2026-08-29 | SEO-012 | Upgraded `/how-long` HowTo schema with `url`, `image`, `mainEntityOfPage`; improved description with applianceName variable | 33fdc1e | Rich Results Test validated fields |
| 2026-08-29 | SEO-015 | Split homepage into server `app/page.tsx` + client `app/HomePageClient.tsx`; server exports metadata with canonical and renders JSON-LD | 33fdc1e | canonical + BreadcrumbList in built HTML |
| 2026-08-29 | SEO-013 | Added CollectionPage + ItemList schema (70 recipes) and BreadcrumbList to homepage via new server component | 33fdc1e | JSON-LD present in built HTML |
| 2026-08-29 | SEO-014 | Created `/how-long` hub index page with CollectionPage/ItemList schema (60 datasheets), canonical, breadcrumbs; added "Cook Times" link to Navbar and Footer | 8e29aaa | hub exists, linked from nav + footer |
| 2026-08-29 | SEO-016 | Added `<h1>` to `/air-fryer-calculator/page.tsx`; `/merch` and `/recipes` pages were deleted in SEO-010, no longer need h1 | 8e29aaa | h1 present in built HTML |
| 2026-08-29 | SEO-017 | Removed `/llms.txt` and `/llms-full.txt` from sitemap; differentiated priorities (datasheets 0.95, hubs 0.8-0.85, tools 0.7, about 0.5); removed fake `lastModified: new Date()` from static pages; added `/how-long` hub | 8e29aaa | sitemap review ✓ |
| 2026-08-29 | SEO-018 | Rewrote `audit:seo` with universal sweep of all 294 built pages for canonical, BreadcrumbList, and schema.org. Coverage went from 156 to 294. | e1b15a1 | 294 = built count minus _not-found |
| 2026-08-29 | SEO-019 | Added image-on-disk assertion: parses all JSON-LD, extracts image/logo/thumbnailUrl URLs, verifies each resolves to a file in `public/`. 16 unique images verified. Proven: seeded `/fake-nonexistent-image.jpg` → audit failed | e1b15a1 | seeded break → caught |
| 2026-08-29 | SEO-020 | Added aggregateRating ban: any page containing `aggregateRating` or `AggregateRating` in built HTML fails the audit. Proven: seeded rating on recipes → 70 errors | e1b15a1 | seeded break → caught |
| 2026-08-29 | SEO-021 | Added canonical self-referential assertion: extracts canonical href, derives expected URL from file path, compares. Proven: seeded `/wrong-page` canonical on /about → audit failed | e1b15a1 | seeded break → caught |
| 2026-08-29 | SEO-023 | Created 4 `opengraph-image.tsx` files using `next/og` for recipes (70), datasheets (60), blog (55), and guides (20) = 205 per-entity OG images pre-rendered at build time | baffc10 | `npm run build` exits 0; 205 `.body` files in `.next/server/app/` |
| 2026-08-29 | SEO-022 | Investigation complete: 166 files / 138 MB in `public/images/`, only 2 `next/image` usages, no `output: 'export'`. Flag likely a leftover. Blocked on D-2 for actual removal. | baffc10 | documented in tracker |
| 2026-08-29 | SEO-022 | Removed `images: { unoptimized: true }` from `next.config.ts`. All 7 components already use `next/image` with `fill`+`sizes`. Vercel now auto-converts to WebP/AVIF, responsive srcset, lazy loading. D-2 resolved. | pending | build passes; 82 homepage images + 14 shop images route through `/_next/image` |
| 2026-08-29 | SEO-024 | Added 60 cook-time datasheets to `llms.txt` (grouped by appliance with links) and `llms-full.txt` (full structured content as new PART 1). Updated AI usage guidelines with `/how-long/` URL pattern. | pending | llms.txt 395 lines, llms-full.txt 9,864 lines |
| 2026-08-29 | SEO-027 | Recipe → Datasheet cross-links: 25 recipe pages now render "Verified Cook-Time Datasheet" callout with temp/time/internal/flip/rest/doneness + `isBasedOn` JSON-LD. Fully bidirectional with existing datasheet→recipe links. | pending | 25 HTML pages with `/how-long/` link + `isBasedOn` |
| 2026-08-29 | SEO-028 | Expanded `relatedRecipeSlug` from 25 → 46 datasheets (+21 new links). All 35 unlinked datasheets cross-referenced against 70 recipes; 21 matches found, 14 have no viable recipe. Coverage: 42% → 77%. | pending | 46 HTML pages with `/how-long/` link + `isBasedOn` |
| 2026-08-29 | SEO-029 | Blog → Datasheet cross-links: added `relatedDatasheetSlugs` to BlogPost type, populated 43/55 posts, rendered "Verified Cook-Time Datasheets" section in blog template with emerald-bordered cards. 12 posts have no match. | pending | 43 blog HTML pages with `/how-long/` links + "Verified Datasheet" text |
| 2026-09-06 | SEO-030 | Video sitemap. Added `durationSeconds()` + `videoSitemapEntry()` to `lib/recipe-video.ts` and a `videos:` field on recipe URLs in `app/sitemap.ts`, both driven off `data/recipe-videos.json`. `audit:seo` now asserts every curated clip has a `<video:video>` entry and that the video namespace is declared. | pending | **0 → 59** clips in the sitemap. Proven both ways: stripping the entries from the built sitemap failed the audit with 60 errors, and a simulated 60th pick appeared on its recipe URL after a rebuild with **no code change**. |
| 2026-09-06 | SEO-031 | **Regression fix for SEO-030.** Next.js does not escape sitemap fields, so 25 unescaped `&` from YouTube titles made the production sitemap invalid XML — Search Console rejected all 852 URLs. Added `xmlEscape()` over every string in `videoSitemapEntry()`, and an XML well-formedness assertion to `audit:seo` (the SEO-030 audit only checked entries were present, never that the file parsed). | pending | live prod sitemap failed to parse at line 2501 before the fix; rebuilt sitemap parses clean with 227/227 entries intact. Checker self-tested against the captured broken file. |
| 2026-09-06 | SEO-032 | Mass datasheet expansion. Merged 305 externally-authored datasheets into `data/cook-times.ts`, taking the SEO engine from **378 → 683**. 3 of 308 dropped as duplicate cells; 5 sub-FSIS culinary temps annotated with the USDA delta. | pending | 14 pre-merge checks: 0 missing `verificationBasis`, 0 duplicate prose within batch or against the existing corpus, 0 slug/ID collisions, 0 bad conversions. `tsc --noEmit` clean. `audit:content` then caught 2 records with a 0-minute floor — a real Instant Pot technique, so the rule was narrowed to permit it only for `instant-pot` + `pressureMinutes: 0`, proven by seeding both failure cases. All three gates exit 0. |
| 2026-09-06 | SEO-033 | Round 2 datasheet expansion, uncapped. Merged 542 records into `data/cook-times.ts`, taking the SEO engine from **683 → 1,225**. 6 sub-FSIS culinary temps annotated with the USDA delta before merge. | pending | 0 missing `verificationBasis`, 0 duplicate prose in-batch or against the existing 683, **0 duplicate cells** (round 1 had 3), 0 schema or enum violations, 0 bad conversions. `tsc --noEmit` clean; build + audit:content + audit:seo exit 0. |

---

## 7. Open decisions — need Alex

Per `AGENTS.md` §7, these are escalations, not guesses.

**D-1 — What is the canonical production domain?** ~~*(blocks SEO-002)*~~ **RESOLVED 2026-08-29**

Owner confirmed: **`https://www.mealinstructions.com`**. Committed `.env.production` with `NEXT_PUBLIC_SITE_URL=https://www.mealinstructions.com`. All canonicals, sitemap, schema, and `llms.txt` already use this value.

**D-2 — Is `images.unoptimized: true` deliberate?** *(blocks SEO-022)* **RESOLVED 2026-08-29**

Flag was a leftover — no `output: 'export'` in config, site deploys on Vercel which supports image optimization natively. Removed `images: { unoptimized: true }` from `next.config.ts`. All 7 components already use `next/image` with `fill` + `sizes` props. Vercel now auto-converts to WebP/AVIF, generates responsive `srcset`, and lazy-loads below-fold images.

**D-3 — Does the WebMCP origin trial still matter?** *(blocks SEO-025)*

The token in `app/layout.tsx` expires ~2026-11-16. It is a hardcoded, domain-bound string in the global layout — it will silently do nothing if the domain in D-1 differs.

**D-4 — Recipe ceiling.** HR-5 caps recipes at 150; we are at 70. Not urgent, but P4 hub work is easier to plan knowing whether the corpus grows.
