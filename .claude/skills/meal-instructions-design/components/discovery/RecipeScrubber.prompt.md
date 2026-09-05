The "TIME BUDGET" ruler band — six tick stops (10/15/20/25/35/ALL) on a dot-grid track with an accent needle; shows meals ready before meltdown.

```jsx
<RecipeScrubber maxMinutes={max} onTimeChange={setMax} countFor={(m) => m == null ? RECIPES.length : RECIPES.filter(r => r.totalMinutes <= m).length} sample="Air Fryer Bacon (8m)" />
```
