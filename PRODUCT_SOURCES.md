# Product and image sources

Audited 14 August 2026 against the live
[Streatley drinks page](https://theswanatstreatley.co.uk/food/menu/drinks/), its
[Summer 2026 venue menu](https://theswanatstreatley.co.uk/wp-content/uploads/2026/04/Summer-26-Drinks-Menu-HIGH-110x250-WEB.pdf),
and Coppa Club's current
[Season of Spritz menu](https://coppa.cdn.prismic.io/coppa/pdFipmP7wvLMdqz__Summer26DrinksMenuSummerofSpritzHIGHWEB.pdf).
The audit boundary and service caveats are recorded in
[DATA_AUDIT.md](./DATA_AUDIT.md).

## Evidence boundary

The public sources verify menu names, consumer-facing ingredients, descriptions,
prices, wine notes, formats, and the venue's listed draught ABVs. They do **not**
publish the exact cocktail measures, methods, ice, or garnish used by this app.
Those fields are reconstructed operational builds from the Summer 2026 working
sheet. They are useful training data, not a claim of an official public recipe.

The live bar bible, till, bottle label, and keg badge always win. In particular,
vintages and packaged ABVs can change without a menu redesign.

## Product decisions

Ingredient labels keep the source wording and add a plain-language type only where
that helps recognition. Key references include
[Absolut](https://www.absolut.com/en/products/absolut-vodka/),
[Bombay Sapphire](https://www.bombaysapphire.com/products/bombay-sapphire/),
[Altos Plata](https://olmecaaltos.com/olmeca-altos-plata/),
[MARTINI Riserva Speciale Rubino](https://www.martini.com/products/riserva-speciale-rubino/),
[Havana Club](https://havana-club.com/en-gb/our-rums/),
[Discarded Banana Peel Rum](https://discardedspirits.com/products/discarded-rum),
[Crossip Blazing Pineapple](https://www.crossipdrinks.com/products/blazing-pineapple),
[Compass Box Orchard House](https://www.compassboxwhisky.com/products/orchard-house),
[Aperol](https://www.aperol.com/our-products/aperol/), and
[St-Germain](https://www.stgermainliqueur.com/us/en).

Two sparkling mappings are deliberately qualified:

- The wine list names **Canal Grando NV Prosecco** as its only Prosecco, making it
  the likely cocktail pour. No public source explicitly maps it to every cocktail
  that says only `Prosecco`.
- The alcohol-free list names **REAL Sparkling Dry White**, making it the likely
  alcohol-free sparkling pour. The cocktail menu does not explicitly confirm that
  mapping. REAL is alcohol-free at about 0.5% ABV, not a `0.0%` product, so the app
  uses **AF / alcohol-free** rather than claiming zero alcohol.

The app surfaces both as likely pours with a **verify at bar** qualifier rather
than silently inventing a brand.

## Photography policy

Coppa Club and manufacturer pages identify products but do not grant a general
licence to republish their menu or pack-shot photography. The app therefore uses
locally stored, optimized images with a documented reuse basis: Pexels, Creative
Commons, CC0, or the Public Domain Mark.

Drink images are representative of the correct serving family and are not claimed
to be official photographs of proprietary recipes. A product tap either uses a
correctly matched reusable photograph or clearly states **exact bottle not shown**;
it never substitutes a different brand's bottle.

The creator, source, licence, and licence URL for each asset are recorded in
[PHOTO_CREDITS.json](./PHOTO_CREDITS.json) and shown in the app.
