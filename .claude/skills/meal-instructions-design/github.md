repo: langtonac300/meal-instructions
branch: main

## Last sync
date: 2026-09-05T15:54:00Z
### Updated in this project
- Tokens, type and component CSS derived from `tailwind.config.ts` + `app/globals.css`
- 30 React components rebuilt from `components/*`, `app/HomePageClient.tsx`, `app/recipes/[slug]/RecipeClientView.tsx`, `app/how-long/[appliance]/[food]/page.tsx`
- Lean 5S icon set (31 SVGs), logo, 14 photos copied from `public/`
- Web UI kit: Home, Recipe, Datasheet, Tools screens

## Screen map
| Screen / file | Repo files |
|---|---|
| ui_kits/web/HomeScreen.jsx | app/HomePageClient.tsx, components/ProteinSelectorBar.tsx, components/RecipeScrubber.tsx, components/KitchenHud.tsx, components/CrisisTriageBar.tsx, components/CategoryGrid.tsx, components/RecipeCard.tsx, components/RecipeTable.tsx |
| ui_kits/web/RecipeScreen.jsx | app/recipes/[slug]/RecipeClientView.tsx, components/Lean5SMatrix.tsx, components/LeanSpecBadge.tsx, components/MealActions.tsx |
| ui_kits/web/DatasheetScreen.jsx | app/how-long/[appliance]/[food]/page.tsx, components/LeanSpecBadge.tsx, components/StartCookButton.tsx |
| ui_kits/web/ToolsScreen.jsx | components/tools/ToolsDirectory.tsx, data/tools-directory.ts |
| ui_kits/web/App.jsx | components/Navbar.tsx, components/Footer.tsx, components/SearchModal.tsx, components/ConsentBanner.tsx, components/KitchenTimer.tsx, app/layout.tsx |
| components/core/* | tailwind.config.ts, app/globals.css, components/Logo.tsx, components/icons/Lean5SIcons.tsx, public/icons/lean5s/*.svg |
| components/recipe/* | components/LeanSpecBadge.tsx, components/Lean5SMatrix.tsx, components/RecipeCard.tsx, components/RecipeTable.tsx, components/RecipeModeSwitch.tsx, components/PortionScaler.tsx, components/ShareButton.tsx, components/PrintButton.tsx, components/StartCookButton.tsx, components/KitchenTimer.tsx, components/MealActions.tsx |
| components/navigation/* | components/Navbar.tsx, components/Footer.tsx, components/SearchModal.tsx, components/ConsentBanner.tsx |
| components/discovery/* | components/ProteinSelectorBar.tsx, components/RecipeScrubber.tsx, components/CrisisTriageBar.tsx, components/CategoryGrid.tsx, components/KitchenHud.tsx |
| tokens/*.css | tailwind.config.ts, app/globals.css |
| assets/ | public/logo.svg, public/icon.svg, public/logo-512.png, public/opengraph-image.png, public/icons/lean5s/*, public/images/{hero,categories,appliances,recipes,merch}/* |
| readme.md (voice, rules) | AGENTS.md, app/about/page.tsx, app/layout.tsx, data/categories.ts, content/recipes/air-fryer-crispy-chicken-tenders.ts |
