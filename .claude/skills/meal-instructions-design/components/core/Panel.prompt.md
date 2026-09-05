The hairline-bordered paper box every section sits in (recipe header card, ingredients, spec cells, HUD read-out, manifesto strip).

```jsx
<Panel padding="xl">…recipe header…</Panel>                 // square, bg-paper-card
<Panel variant="paper" padding="sm">…spec cell…</Panel>     // nested cell
<Panel variant="inset" rounded shadow padding="md">…hero stats…</Panel>
<Panel variant="dark" padding="xl">…manifesto…</Panel>
<Panel verified hover as="a" href="#">…datasheet link…</Panel>
```
