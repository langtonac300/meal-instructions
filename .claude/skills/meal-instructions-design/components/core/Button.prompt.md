Mono uppercase button in the site's ink / accent / hairline-outline styles; use for every action (SMS TO SPOUSE, PRINT CARD, START TIMER, ROLL DINNER, Sign in).

```jsx
<Button icon="share-2">SMS TO SPOUSE</Button>                    // ink → hover accent
<Button variant="accent" icon="play" size="lg">Start cook</Button>
<Button variant="outline" icon="printer">PRINT CARD</Button>
<Button variant="ink" rounded size="sm" iconRight="arrow-right">VIEW FULL CHEAT SHEET</Button>
<Button variant="caution" icon="pause">PAUSE</Button>            // running timer
<Button variant="outline" iconOnly icon="rotate-ccw" title="Reset" />
```

Rules: square corners on recipe/datasheet surfaces, `rounded` on home-page controls. Hover never resizes — only color. Copy is ALL CAPS.
