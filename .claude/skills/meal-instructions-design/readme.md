# Meal Instructions — Design System

**Meal Instructions** (https://www.mealinstructions.com/) is a "no-fluff cooking reference" for busy cooks and dads. Tagline, used everywhere: **NO FLUFF, JUST THE INSTRUCTIONS.** Two products live in one Next.js site:

1. **Recipes** — a small, quality-gated set (~228 max) of weeknight meals, each with two execution modes: ⚡ **GET TO THE POINT** (20-word telegram bullets) and 📖 **STEP-BY-STEP** (guided steps with "Dad Pro Tips").
2. **The cook-time reference** (`/how-long/*`, `/charts/*`, `/cheat-sheet`) — a parametric database of *food × appliance × state → temp, time, flip mark, internal temp*. Every datasheet carries a `verificationBasis`. This is the SEO/LLM engine.

Secondary surfaces: **Tools & Calcs** (30 "kitchen engines" — Meat Math, Salt Math, Dinner Sync, Reheat…), **Field Guides** (blog / culinary physics), **Top-10 Guides**, **Food Storage** datasheets, **Merch** ("Merch & Useless Tools"), an account area (Google sign-in, saved meals, ratings) and machine endpoints (`/llms.txt`, MCP server card).

Art direction reference named in the repo: kellerstoecklarchitektur.at — "Swiss architectural aesthetic": high-contrast ink on warm paper, dense specimen grids, hairline structure, numeric indexing, ONE accent used only for live/interactive state.

## Sources

- GitHub: https://github.com/langtonac300/meal-instructions (branch `main`) — the whole design system is derived from this codebase: `tailwind.config.ts`, `app/globals.css`, `components/*`, `app/HomePageClient.tsx`, `app/recipes/[slug]/RecipeClientView.tsx`, `app/how-long/[appliance]/[food]/page.tsx`, `components/icons/Lean5SIcons.tsx`, `public/icons/lean5s/*.svg`, `components/Logo.tsx`, `AGENTS.md` (brand rules).
- Live site: https://www.mealinstructions.com/
- No Figma, decks or brand PDF were provided. Explore the repository for anything not covered here — the tool calculators (`components/tools/*`), merch (`components/merch/*`), `KitchenEnginesDock.tsx` and `SiteGuide.tsx` were read only at the inventory level.

---

## CONTENT FUNDAMENTALS

**Voice.** Terse, technical, a little tongue-in-cheek. The site talks like a spec sheet written by an engineer-dad: "Parametric cook-time database and 228 quality-gated weeknight meals. Exact temperatures, verified air fryer datasheets, zero life stories." It never tells stories. Numbers replace adjectives.

**Casing.** Two registers, always visually distinct:
- **ALL-CAPS MONO** for labels, buttons, nav links, badges, table headers, section kickers: `PRIMARY PROTEIN SELECTOR`, `DINNER CRISIS TRIAGE`, `SMS TO SPOUSE`, `PRINT CARD`, `VIEW FULL CHEAT SHEET →`, `SYSTEM SPECIFICATIONS`.
- **Sentence case sans** for body copy, taglines, instructions, tips: "Panko-crusted chicken tenders with zero deep frying that come out golden and crunchy in just 12 minutes."
- Headlines are UPPERCASE bold sans: `NO FLUFF. JUST THE INSTRUCTIONS.`, `THE 5-SECOND COOK-TIME TERMINAL`, `AIR FRYER QUICK TEMPERATURE MATRIX`.

**Spec-sheet idioms.** `//` as a separator (`PRESET // 01`, `REF-01 // FAMILY LOGISTICS`, `DATASHEET // AF-012`, `© 2026 MEAL INSTRUCTIONS // ALL RECIPES VALIDATED…`). Counts in brackets `CHICKEN [22]`, `ALL [228]`. Trailing arrows `→` on links. Colons after label words (`TIME BUDGET:`, `SORT:`, `SERVINGS:`). Version/ID stamps (`V 2.0 PRECISION`, `SPECIMEN #0117`, `HR-2 SOURCED`). Engineering vocabulary: *engine, terminal, HUD, telemetry, datasheet, specimen, matrix, protocol, calibrated, verified*.

**Person.** Mostly imperative and impersonal ("Preheat air fryer to 400°F", "Flip at exactly 6 minutes"). "You" appears in manifesto/marketing copy ("You need to know the temperature, the time, and when to flip the basket. That's it."). "We" only in about/legal/consent copy. Never "I".

**Humor.** Dry and self-aware: `LIFE STORIES REMOVED: 100% (0 WORDS)`, `Merch & Useless Tools`, `Dinner before meltdown`, `NO ESSAYS ABOUT GRANDMOTHER'S CABIN. NO 5-PAGE ADS.`, `Zero Dish Duty`, `Costco Scaler`.

**Emoji.** Yes, sparingly and functionally, only in mono/label contexts: ⚡ (fast / quick mode), 📖 (step-by-step), 🔥 (heat / cook times), ⏱️ (timers), 👶 (kid adjustment), 💡 (pro tip), 🛠️ (tools), 👕 (merch), 🔬 (field guides), 📋 (cheat sheet), ✓. Never in headlines or body prose.

**Numbers.** Always exact and dual-unit for temperature: `400°F (204°C)`. Times as `12 MIN`, `24m`, `≤ 15 MINS`. Protein as `42G`. Every number has a source line (`Cook Time Basis: Tested in 6-qt basket air fryer…`, `USDA FoodData Central #171077`). Never fabricate a number — if unknown, omit it.

**Trust markers.** `VERIFIED NO-FLUFF`, `VERIFIED DATASHEET`, `Reviewed for USDA Food Safety`, `USDA SAFE PULL` — rendered in emerald, the only non-accent color.

---

## VISUAL FOUNDATIONS

**Palette.** Warm paper ground `#F5F4F0`; card surface `#FAF9F6`; inset `#ECE9E1`; deeper `#DED9CD`. Ink `#111111` (muted `#5A5854`, subtle `#8E8A82`). Hairline `#DFDCCE`. One accent, terracotta `#C84B2C` (hover-dark `#A5371C`, tint `#F7EEEA`), used **only** for live/interactive state: running timer, active mode, critical temps, flip marks, pulsing status dots, section kickers. Emerald (`#047857`/`#065F46`) = verified/safety. Amber = paused timer / pressure-release notice. Blue = "from frozen" state / storage. Nothing else is colored. Dark inverse panels (`bg-ink text-paper`) are used for the top ticker, active chips, primary buttons and the manifesto strip.

**Type.** One grotesk: system stack `-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial`. One mono: `"SF Mono", ui-monospace, Menlo, Monaco, Consolas`. **No webfonts are loaded by the product** — it deliberately renders in OS fonts (Helvetica on Apple, Arial on Windows). Body is a very dense **13px / 1.5**. Mono carries all UI chrome (labels, buttons, nav, badges, numbers, tables) at 9–12px, uppercase, tracked `0.08em` (wider) or `0.14em` (widest). Headlines are bold/black sans, uppercase, `tracking-tight -0.01em`, 24–48px. The `.micro-label` = 10px / 0.14em / uppercase / 600 / ink-muted. Big numbers (temps, times) are mono black 18–20px, or 36–48px black tracking-tight for countdowns.

**Layout.** Dense specimen grid, not a hero. Page container `max-width 1280px`, padding 16px (32px ≥640px). Content pages (recipe, datasheet) `max-width 896px`; manifesto 768px. Sticky 64px header with `bg-paper/90 + backdrop-blur-md` below a 26px black ticker bar. Everything stacks as full-width hairline-separated bands (protein selector → time scrubber → hero → HUD → crisis triage → categories → directory). Sections separated by `border-t border-hairline` and `py-8/10/12`. Sticky inline mode selector on recipes (`top-16`, `bg-paper-card/95 backdrop-blur-sm`). No modal interstitials ever (hard rule HR-7) — the only overlays are the ⌘K search dialog, the fixed bottom-right kitchen timer and the cookie banner.

**Cards.** Two families. *Recipe-page cards*: `bg-paper-card` + 1px hairline, **square corners**, padding 24–32px, no shadow. *Home-page controls*: `bg-paper-50/100` + hairline + `rounded` (4px), `shadow-subtle`; hover → `border-ink` (or `border-ink/40–60`) + `shadow-card`. Selected/active → `bg-ink text-paper` with `shadow-sm`. Highlighted (dinner roulette) → `border-2 border-accent ring-4 ring-accent/20 shadow-float scale-1.01`. Nested spec cells inside cards use `bg-paper` + hairline.

**Borders.** Hairlines everywhere (1px `#DFDCCE`). Emphasis = 2px ink (`border-2 border-ink` on the omni-search input and search dropdown). A single 2px left border in emerald marks verified datasheet cross-links. Active nav link = `border-b-2 border-ink`.

**Radii.** Square by default on recipe/datasheet surfaces. 4px (`rounded`) on home-page pills/cards/inputs, 6px on mode-switch buttons, 8px (`rounded-lg`) on the timer, search modal, manifesto strip and category matrix panel. `rounded-full` only for status dots, step-number circles and the timer progress bar. Logo tile rx 8.

**Shadows.** Extremely light: `subtle` (0 1px 3px 3%), `card` (0 4px 12px 4%), `float` (0 12px 32px 8%) for the timer/search modal, `sm` on active chips. No inner shadows.

**Hover / press.** Hover changes color, never size: text `ink-muted → ink`, or `ink → accent`; borders `hairline → ink`; primary buttons `bg-ink → bg-accent`; accent buttons `bg-accent → bg-accent-dark`; links `hover:underline` or `hover:opacity-60/70/80`. Images inside cards `scale-105` over 300ms. Arrow glyphs nudge `translate-x-0.5`. Everything `transition-colors` 150–200ms. No press-shrink; disabled = `opacity-40`.

**Motion.** Pulsing 6px accent/emerald dots (`animate-pulse`) next to section kickers and in the ticker; `animate-ping` on a running timer dot; `animate-bounce` + accent ring only when a timer finishes. Timer progress bar `transition-all 300ms`. Otherwise no animation.

**Imagery.** Warm, directly-lit editorial food photography (air-fryer tenders, smash burgers, sheet-pan fajitas) — see `assets/images/`. Used as 176px `object-cover` thumbnails inside recipe cards (hairline frame, `bg-paper-200` fallback), 96–112px category tiles with a `from-ink/70` bottom gradient and a `bg-ink/80` count pill, and a 256–384px recipe header photo. No illustrations, no patterns, except an 8px dot-grid at 10% opacity behind the time-scrubber ruler.

**Transparency & blur.** `bg-paper/90 backdrop-blur-md` on the sticky header; `bg-paper-card/95 backdrop-blur-sm` on the sticky mode selector; `bg-ink/60 backdrop-blur-sm` search-modal scrim. Alpha tints of accent (`/10 /15 /20 /30`) for soft badges and rings.

**Print.** Recipe cards are print-optimized: white background, chrome hidden, accent kept for temps, URL appended to the H1.

---

## ICONOGRAPHY

Two icon systems, both stroke-based, 2px:

1. **Lean 5S icons** — the brand's own 31-glyph set (`components/icons/Lean5SIcons.tsx`, exported as SVG files in `public/icons/lean5s/`). 28×28 viewBox, `stroke="currentColor"`, `stroke-width 2`, round caps/joins. Copied verbatim to `assets/icons/lean5s/`. Categories: **proteins** (all, beef, chicken, dairy-eggs, lamb, pork, seafood, turkey, vegetarian), **appliances** (air-fryer, grill, instant-pot, sheet-pan, skillet, slow-cooker, smoker), **process metrics** (clock, timer-stopwatch, rest-time, flip-action, heat-waves, flame, pan-heat, thermometer-probe, oil-spray, scale-weight, portion-plate, fork, fork-knife, lightning-fast, safety-shield). Used at 11–28px, colored `text-ink`, `text-ink-muted`, `text-ink-subtle` or `text-accent`. Rendered here via the `LeanIcon` component (CSS mask → inherits `currentColor`).
2. **Lucide** (`lucide-react`) for generic UI: Search, X, Menu, Zap, BookOpen, Clock, Flame, Play, Pause, RotateCcw, Printer, Share2, Copy, Check, ShieldCheck, ArrowLeft, ArrowRight, ArrowUpRight, ArrowUpDown, LayoutGrid, ListFilter, Dices, Bookmark, Star, Pencil, LogIn, LogOut, Users, Volume2. Sizes `w-3 h-3` (12px) to `w-5 h-5` (20px). In this design system Lucide is loaded from CDN (`https://unpkg.com/lucide@latest`) through the `Icon` component.

Emoji act as icons in mobile nav and mode buttons (see Content Fundamentals). Unicode glyphs as icons: `→`, `↑↓`, `↵`, `•`, `—`, `★`, `✓`, `⌘K`. No icon font, no PNG icons.

**Logo.** `assets/logo.svg` (horizontal, 280×48) and `assets/icon.svg` / `assets/logo-512.png` (mark only). Mark: 48px ink tile rx 8 with a square-capped architectural "M", an "I" gauge needle with an orange `#EA580C` status dot, and four calibration ticks. Wordmark: sans 900 uppercase tracked `MEAL INSTRUCTIONS` over mono 9px `NO FLUFF, JUST THE INSTRUCTIONS`. Recreated as the `Logo` component (sizes sm/md/lg/xl, variants horizontal/stacked/mark-only).

---

## INDEX

- `styles.css` — entry; imports `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/base.css` (body reset, `.hairline-*`, `.micro-label`, `.mono-num`, keyframes, `.lean-icon`), `tokens/components.css` (`.mi-btn`, `.mi-pill`, `.mi-chip`, `.mi-card`, `.mi-tile`… hover/active states the primitives use).
- `assets/` — `logo.svg`, `icon.svg`, `logo-512.png`, `opengraph-image.png`, `icons/lean5s/*.svg` (31), `images/{hero,categories,appliances,recipes,merch}/`.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand groups).
- `components/sample-data.js` — `window.MI_DATA`: recipes, one real datasheet (CT-AF-004) + placeholders, categories, counts, tools, guides (values copied from the live home page 2026-09-05).
- `components/core/` — `Button`, `Pill`, `MicroLabel`, `Kbd`, `Panel`, `StatusDot`, `Segmented`, `LeanIcon`, `Icon` (Lucide subset, inlined), `Logo`.
- `components/recipe/` — `LeanSpecBadge`, `Lean5SMatrix`, `RecipeCard`, `RecipeTable`, `ModeSwitch` (+ `ModeSwitchCards`), `PortionScaler`, `ShareButton`, `PrintButton`, `StartCookButton`, `KitchenTimer`, `MealActions`.
- `components/navigation/` — `Navbar`, `Footer`, `SearchModal`, `ConsentBanner`.
- `components/discovery/` — `ProteinSelectorBar`, `RecipeScrubber`, `CrisisTriageBar`, `CategoryGrid`, `KitchenHud`.
- `ui_kits/web/` — click-through recreation of mealinstructions.com (`index.html`, `App.jsx` hash router, `HomeScreen.jsx`, `RecipeScreen.jsx`, `DatasheetScreen.jsx`, `ToolsScreen.jsx`, `README.md`).
- `SKILL.md`, `github.md`, `thumbnail.html`.

Components are consumed from the compiled bundle: `const { Button } = window.MealInstructionsDesignSystem_767cb5` after `<script src="…/_ds_bundle.js">`.

### Intentional additions
`Button`, `Pill`, `MicroLabel`, `Kbd`, `Panel`, `StatusDot`, `Segmented` are not files in the repo — they are the repeated Tailwind class combinations (`bg-ink text-paper font-mono text-xs uppercase tracking-wider hover:bg-accent`, `px-2 py-0.5 bg-paper hairline-border text-[10px] font-mono uppercase`, `.micro-label`, `<kbd>`, `bg-paper-card hairline-border p-6`, the pulsing 6px dot, the `bg-paper-200 p-0.5` toggle group) lifted into primitives so kits don't re-implement them. `LeanIcon`/`Icon` wrap the two icon sets.

### Not yet built (present in repo)
`KitchenEnginesDock`, `SiteGuide`, `KrogerCartPanel`, `components/merch/*` (CartDrawer, MerchCatalog, MerchGraphic, ProductCard, ProductDetailClient), `components/tools/*` (29 calculators), `AdSenseLoader`, `WebMCPClient`, `SessionProviderWrapper` (the last three are non-visual).
