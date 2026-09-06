# Brief: choosing a technique video for each recipe

You are picking **one YouTube clip per recipe** for mealinstructions.com. Your entire
output is a list of `{ slug, youtubeId, why }`. Everything else about each video —
its title, channel, upload date, runtime, thumbnail — is fetched from the YouTube
Data API afterwards by `scripts/fetch-video-metadata.mjs`. **Do not write those
fields.** A title or a runtime typed from memory is a fabricated number, and this
repo's standing rules (`AGENTS.md`, HR-2) forbid it.

## The one rule that matters

**Every `youtubeId` must come from a search result you actually opened.** Never
reconstruct an id from memory, never adapt one that "looks right", and never
guess a correction for an id that failed. Eleven-character ids are trivially
plausible to invent and impossible to spot by eye, and an invented one either
404s or, worse, silently points at an unrelated video.

If you cannot find a genuinely good clip for a recipe, **leave that recipe out**.
A missing video costs nothing. A wrong one is on the page next to a food-safety
claim.

Your work is checked by `npm run videos:check`, which asks YouTube about every
id. Ids that do not resolve are rejected, and the batch fails. Run it yourself
before handing anything back.

## What makes a good pick

A clip earns its place if a cook who has already read the recipe would still
learn something by watching it. In order of preference:

1. **The technique the recipe hinges on.** Smashing a burger thin enough, patting
   a shrimp dry, spatchcocking a chicken, checking an internal temperature.
2. **The same dish, cooked properly**, on the same appliance the recipe uses.
   An oven method on an air-fryer recipe is a mismatch, not a substitute.
3. **A close relative** where nothing better exists — the same protein, the same
   cut, the same appliance.

Prefer clips that are:

- **Short.** Two to ten minutes. A forty-minute vlog is not a technique clip.
- **From a channel that shows hands and pans**, not a slideshow with a voiceover.
- **In English**, filmed close, with the step visible rather than described.
- **From an established channel** — a name a cook might recognise. Not a
  re-upload, not a compilation, not a screen recording of someone else's video.

Reject:

- Anything with embedding disabled (the checker catches this, but it wastes a slot).
- Shorts under about 60 seconds — too little to teach a technique.
- Videos whose main content is a product pitch.
- Anything where the food-safety practice is visibly wrong (raw chicken cross-
  contamination, pulling pork at the wrong temperature). This site is a
  temperature reference; a clip that contradicts it does real damage.

## `why` — one sentence, in your own words

`why` becomes the video's description in the page's structured data and the line
of text printed under the player, so it has to be **specific and unique to that
clip**. 25 to 300 characters.

Good: `Shows the two-spatula smash and the 30-second sear that gets the lacy crust.`
Good: `Close-up of the dry brine going on 24 hours ahead, and what the skin looks like after.`
Bad: `A great video about this recipe.` (says nothing, and duplicates across recipes)
Bad: `Chef John makes chicken.` (describes the channel, not the technique)

Duplicate `why` lines fail the check.

## Where things are

| Path | What it is |
|---|---|
| `data/recipes.json` | Every recipe: `slug`, `title`, `appliance`, `protein`, `totalMinutes`, `ingredients`, `detailedSteps`. Read this to know what each recipe actually does. |
| `data/video-picks.json` | **Your output goes here.** |
| `data/recipe-videos.json` | Generated. Do not edit. |
| `AGENTS.md` | The repo's standing rules. |

## Output format

Write `data/video-picks.json`, exactly this shape:

```json
{
  "picks": [
    {
      "slug": "cast-iron-lacy-edge-smash-burgers",
      "youtubeId": "XXXXXXXXXXX",
      "why": "Shows the two-spatula smash and the 30-second sear that gets the lacy crust."
    }
  ]
}
```

- `slug` must exist in `data/recipes.json`, spelled identically.
- One entry per recipe. No recipe twice.
- The same video may serve two recipes only if the technique genuinely is the
  same; the checker warns so it can be reviewed.

## Order of work

Do these first, in this order, and stop for review before going further:

1. The **top 20** recipes by id (`0001`–`0020`) — the ones in the printable pack.
2. Anything where the technique is the hard part: smash burgers, spatchcock
   chicken, reverse-sear steak, brisket, pulled pork, crab cakes, no-knead bread.
3. The rest, by id.

A batch of 20 verified picks is worth more than 228 unchecked ones.

## Finishing

```bash
npm run videos:check     # no API key needed; verifies every id with YouTube
```

Fix everything it reports. When it passes, hand back `data/video-picks.json`
and say which recipes you deliberately skipped and why.

The maintainer then runs `npm run videos:fetch` with an API key to pull the real
metadata, and the clips go live.
