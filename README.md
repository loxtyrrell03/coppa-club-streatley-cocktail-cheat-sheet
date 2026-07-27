# Coppa Club Streatley drinks cheat sheet

An iPhone-first, installable cocktail reference and spaced-repetition trainer built
from the revised **23 July 2026** Summer 2026 working drinks sheet.

**Open the app:**

<https://loxtyrrell03.github.io/coppa-club-streatley-cocktail-cheat-sheet/>

## What is included

- All 26 recipes from source pages 2–5
- Licensed cocktail photography matched to the correct glass family
- Tappable branded ingredients with 30 real bottle/ingredient photo references
- Exact source ingredient wording plus verified plain-language product types
- Fast name and ingredient search
- Coupe/Martini, Rocks, Highball, and Spritz filters
- The user’s 26-card cocktail flashcard deck in a dedicated Study mode
- Anki-style Again / Hard / Good / Easy scheduling with visible next intervals
- On-device due counts, learning status, review streak, and session summaries
- Large type and touch targets for bar use
- Offline caching and iPhone Home Screen metadata
- No account, analytics, cookies, or tracking

The product-type evidence, photography policy, and two preserved source ambiguities
are documented in [PRODUCT_SOURCES.md](./PRODUCT_SOURCES.md). Per-image creator,
source, and licence records are in [PHOTO_CREDITS.json](./PHOTO_CREDITS.json).

Numbered cocktail measures are **ml**. Written dashes, splashes and tops remain as
shown in the source. These are reconstructed working specs; the live Streatley bar
bible wins if anything differs.

## Run locally

```powershell
npm start
```

Then open
`http://127.0.0.1:4173/coppa-club-streatley-cocktail-cheat-sheet/`.

## Verify

```powershell
npm test
```

To re-fetch and optimize the licensed photo pack:

```powershell
npm run photos
```

The source list is intentionally curated; review any source change before running it.

## Study scheduling

Study progress is saved in the browser under `coppa-study-v1`; it never leaves the
device. New cards begin with short learning steps. Again returns a card during the
session, while graduated review cards receive increasingly long intervals based on
Again, Hard, Good, or Easy.

This is an Anki-style local trainer, not an Anki Sync client. It does not read or
alter scheduling history inside the `.apkg` file.

## iPhone installation

1. Open the published URL in Safari.
2. Tap **Share**.
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.

The app is a static PWA hosted free on GitHub Pages.
