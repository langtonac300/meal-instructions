# UI kit — mealinstructions.com (web)

Click-through recreation of the live site, composed from the design-system components (`window.MealInstructionsDesignSystem_767cb5`) and `components/sample-data.js` (values copied from the live home page on 2026-09-05).

Screens (hash-routed in `App.jsx`):
- **Home / directory** (`HomeScreen.jsx`) — `app/HomePageClient.tsx`: protein selector, time-budget scrubber, hero + SYSTEM SPECIFICATIONS, Kitchen HUD, crisis triage, category tiles, filterable directory (grid/table, ROLL DINNER, sort), kitchen engines, air-fryer matrix, guides, manifesto strip.
- **Recipe** (`RecipeScreen.jsx`) — `app/recipes/[slug]/RecipeClientView.tsx`: header card, Lean 5S matrix, share toolbar, verified datasheet cross-link, sticky mode switch, timer, ingredients + portion multiplier, ⚡/📖 panels, Dad tips, nutrition basis, MealActions, related.
- **Cook-time datasheet** (`DatasheetScreen.jsx`) — `app/how-long/[appliance]/[food]/page.tsx`: spec badges, COOK MODE, 3-step protocol, verification rig, related cook times.
- **Tools & Calcs** (`ToolsScreen.jsx`) — `components/tools/ToolsDirectory.tsx`: category chips, search, engine tiles.

Not recreated: the 29 individual calculators, merch/shop, blog/guide article pages, account, KitchenEnginesDock, SiteGuide. Only recipe #0001 carries full ingredients/steps in the sample data; other recipes show the card-level fields.
