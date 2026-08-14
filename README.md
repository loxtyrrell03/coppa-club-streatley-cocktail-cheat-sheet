# Coppa Club Streatley bar guide

An iPhone-first, installable reference for the Summer 2026 drinks range at Coppa
Club Streatley.

**Open the app:**

<https://loxtyrrell03.github.io/coppa-club-streatley-cocktail-cheat-sheet/>

## What is included

- **Cocktails:** 26 searchable working builds, grouped by serve, with compact
  left-aligned specs and restrained ingredient-family colour cues.
- **Wines:** the 49-wine Streatley list with region, venue tasting notes, price,
  and a practical dryness/body guide.
- **Beer & cider:** 14 draught and packaged drinks with style, format, price, and
  ABV where published.
- **Study:** the 26 cocktail builds only, using an on-device spaced-repetition
  queue. Wine, beer, and cider are not flashcards.
- A separate search within Cocktails, Wines, and Beer & cider, so queries never
  leak between sections.
- Local, credited imagery; offline caching; iPhone Home Screen metadata; no
  account, analytics, cookies, or tracking.

The public menu establishes names, descriptions, prices, wine notes, and listed
draught ABVs. Exact cocktail measures and service instructions come from a
reconstructed Summer 2026 working sheet and are not represented as a published
Coppa specification. Measures are **ml** unless marked; the live Streatley bar
bible, till, bottle label, and keg badge take precedence.

See [DATA_AUDIT.md](./DATA_AUDIT.md) for coverage and unresolved checks,
[PRODUCT_SOURCES.md](./PRODUCT_SOURCES.md) for product and photography evidence,
and [PHOTO_CREDITS.json](./PHOTO_CREDITS.json) for per-image records.

## Run and verify locally

```powershell
npm start
npm test
```

Then open
`http://127.0.0.1:4173/coppa-club-streatley-cocktail-cheat-sheet/`.

To refresh the licensed photo pack:

```powershell
npm run photos
```

The photo source list is curated; review any source change before running it.

## Study data

Progress is saved only in the browser under `coppa-study-v1`. New cards use short
learning steps, followed by Again / Hard / Good / Easy review intervals. This is
an Anki-style local trainer, not an Anki Sync client.

## Install on iPhone

1. Open the published URL in Safari.
2. Tap **Share**, then **Add to Home Screen**.
3. Tap **Add**.

The app is a static PWA hosted on GitHub Pages.
