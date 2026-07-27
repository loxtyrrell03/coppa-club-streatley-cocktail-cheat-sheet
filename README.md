# Coppa Club Streatley drinks cheat sheet

An iPhone-first, installable cocktail reference built from the revised **23 July
2026** Summer 2026 working drinks sheet.

**Open the app:**

<https://loxtyrrell03.github.io/coppa-club-streatley-cocktail-cheat-sheet/>

## What is included

- All 26 recipes from source pages 2–5
- A distinct, original illustration for every drink
- Tappable branded ingredients with 30 labelled bottle references
- Exact source ingredient wording plus verified plain-language product types
- Fast name and ingredient search
- Coupe/Martini, Rocks, Highball, and Spritz filters
- Large type and touch targets for bar use
- Offline caching and iPhone Home Screen metadata
- No account, analytics, cookies, or tracking

The product-type evidence, image-rights decision, and two preserved source
ambiguities are documented in [PRODUCT_SOURCES.md](./PRODUCT_SOURCES.md).

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

To regenerate the original SVG visuals and offline asset manifest:

```powershell
npm run visuals
```

## iPhone installation

1. Open the published URL in Safari.
2. Tap **Share**.
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.

The app is a static PWA hosted free on GitHub Pages.
