---
name: meal-instructions-design
description: Use this skill to generate well-branded interfaces and assets for Meal Instructions (mealinstructions.com — "No fluff, just the instructions"), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Quick rules that matter most for this brand:
- Warm paper `#F5F4F0` ground, ink `#111111`, hairlines `#DFDCCE`. ONE accent `#C84B2C`, only for live/interactive state (timers, active mode, critical temps). Emerald = verified.
- System grotesk (Helvetica/Arial) + SF Mono/Menlo. Body 13px. All chrome is ALL-CAPS mono, tracked 0.08–0.14em. Headlines uppercase bold sans.
- Dense hairline grids, square corners on content surfaces, 4px radius on home controls. Almost no shadows. Hover changes color, never size.
- Copy is a spec sheet: `//` separators, `[counts]`, trailing `→`, exact dual-unit temps `400°F (204°C)`, a `basis`/source line under every number. Never fabricate a number.
- Icons: Lean 5S glyphs (`assets/icons/lean5s/`) for proteins/appliances/metrics; Lucide for UI chrome.
