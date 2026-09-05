# Photography lives in `public/images/`

Every image shipped in the original design-system bundle was byte-identical to a
file already tracked in this repo, so they were left out rather than committed
twice (9.0 MB of the bundle's 10 MB).

Use the repo copies instead — same filenames, same folders:

| Bundle path | Use instead |
|---|---|
| `assets/images/recipes/…` | `public/images/recipes/…` |
| `assets/images/hero/…` | `public/images/hero/…` |
| `assets/images/categories/…` | `public/images/categories/…` |
| `assets/images/appliances/…` | `public/images/appliances/…` |
| `assets/images/merch/…` | `public/images/merch/…` |

In production code reference them as site-absolute URLs (`/images/recipes/x.jpg`).
For a throwaway HTML mock, copy the file you need out of `public/` next to the mock.

Icons (`assets/icons/lean5s/`), the logos and the OG image ARE included here —
they are a few KB and are design-system source, not page content.
