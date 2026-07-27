import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { drinks, products } from "../data.js";

const expectedNames = [
  "Pornstar Martini",
  "Espresso Martini",
  "Hibiscus & Rose Delight",
  "Lychee & Rose Martini",
  "Popstar Martini",
  "Margarita",
  "Negroni",
  "Old Fashioned",
  "Peach & Elderflower Mai Tai",
  "Rhubarb & Raspberry Bramble",
  "Green Chilli & Mango Margarita",
  "The Rum Fashioned",
  "Mojito",
  "British Orchard Highball",
  "Spiced Piña Colada",
  "ACV-Colada",
  "Blazing Pineapple Buck",
  "Grapefruit & Thyme Aperol",
  "Pear & Pomegranate Hugo",
  "Limoncello & Lavender",
  "Rhubarb & Orange 0%",
  "Aperol Spritz",
  "Hugo Spritz",
  "Limoncello Spritz",
  "Sarti Spritz",
  "Floral Spritz"
];

const signature = (drink) =>
  [
    drink.price,
    drink.glass,
    drink.ice,
    drink.build.map(({ measure, sourceName }) => `${measure}:${sourceName}`).join("|"),
    drink.method,
    drink.serve ?? "",
    drink.finish ?? ""
  ].join(";");

const expectedSignatures = {
  "pornstar-martini":
    "£14.25;Coupe + shot;No ice;50:Absolut|25:passion fruit|10:vanilla|25:pineapple;Shake hard; fine-strain.;Prosecco alongside;Half passion fruit",
  "espresso-martini":
    "£14.25;Coupe;No ice;50:Absolut Vanilla|25:Kahlúa|25:espresso;Shake very hard; fine-strain.;;3 coffee beans",
  "hibiscus-rose-delight":
    "£22.75;Coupe;No ice;25:Crossip Pure Hibiscus|10:rose|100:Veuve Clicquot;Build gently; minimal stir.;;",
  "lychee-rose-martini":
    "£13.75;Coupe;No ice;50:Bombay Sapphire|25:lychee|10:rose|20:lemon;Shake; fine-strain.;;",
  "popstar-martini":
    "£8.25;Coupe + shot;No ice;25:passion fruit|25:pineapple|10:vanilla|:0% sparkling;Shake; fine-strain.;0% sparkling alongside;",
  margarita:
    "£13.25;Rocks;Cubed ice;50:Altos Plata|25:Cointreau|25:lime|10:agave;Half salt rim; shake; strain over ice.;;Lime",
  negroni:
    "£14.25;Rocks;Cubed ice;25:Beefeater|25:Campari|25:Martini Rubino;Stir over ice.;;Orange peel",
  "old-fashioned":
    "£13.75;Rocks;Cubed ice;50:Buffalo Trace|5:demerara|2–3 dashes:bitters;Stir over ice until chilled/diluted.;;Orange peel",
  "peach-elderflower-mai-tai":
    "£14.25;Rocks;Cubed ice;50:Havana 7|20:peach|10:elderflower|20:lime|30:pineapple|:bitters;Shake; strain over ice.;;",
  "rhubarb-raspberry-bramble":
    "£14.75;Rocks;Crushed/cubed;50:Plymouth|20:lemon|15:raspberry|10:rhubarb;Shake; pour/strain over ice.;;",
  "green-chilli-mango-margarita":
    "£14.25;Rocks;Cubed ice;50:Altos Plata|25:mango|25:lime|10:green chilli;Shake; strain over ice.;;",
  "rum-fashioned":
    "£14.75;Rocks;Cubed ice;50:Discarded Banana Rum|25:Crossip Blazing Pineapple|5:demerara|2 dashes:bitters;Stir over ice.;;",
  mojito:
    "£14.25;Highball;Crushed ice;50:Havana 3|25:lime|15:sugar|:mint|:soda;Churn with crushed ice; top soda; cap with more crushed ice.;;Mint bouquet + lime",
  "british-orchard-highball":
    "£14.75;Highball;Cubed ice;50:Compass Box Orchard House|10:jasmine|25:cranberry|15:lime|:soda;Build over ice; top soda; gentle stir.;;",
  "spiced-pina-colada":
    "£13.25;Highball;Cubed ice;50:Havana Spiced|50:pineapple|25:coconut|20:lime|5:green chilli;Shake hard; strain over ice.;;",
  "acv-colada":
    "£8.25;Highball;Cubed ice;10:apple-cider vinegar|20:lime|50:pineapple|25:coconut;Shake; strain over ice.;;",
  "blazing-pineapple-buck":
    "£10.25;Highball;Cubed ice;50:Crossip Blazing Pineapple|25:mango|10:ginger|10:spiced-orange|:ginger beer;Build over ice; top ginger beer; gentle stir.;;",
  "grapefruit-thyme-aperol":
    "£13.50;Large wine glass;Fill with ice;50:Aperol|25:grapefruit sherbet|100:Prosecco|25:soda;Add still ingredients, then Prosecco, then soda. Gentle stir.;;Grapefruit + thyme",
  "pear-pomegranate-hugo":
    "£13.50;Large wine glass;Fill with ice;25:Mondoro Elderflower|25:pear purée|10:grenadine/pomegranate|100:Prosecco|25:soda;Add still ingredients, then Prosecco, then soda. Gentle stir.;;Mint / venue finish",
  "limoncello-lavender":
    "£13.50;Large wine glass;Fill with ice;50:Limoncello|10:lavender Monin|100:Prosecco|25:soda;Add still ingredients, then Prosecco, then soda. Gentle stir.;;Lemon",
  "rhubarb-orange-zero":
    "£9.50;Large wine glass;Fill with ice;25:Bristol Syrup Co rhubarb-and-orange syrup|top:premium 0% sparkling;Add the still ingredient, then premium 0% sparkling. Gentle stir.;;Orange",
  "aperol-spritz":
    "£13;Large wine glass;Fill with ice;50:Aperol|100:Prosecco|25:soda;Add still ingredients, then Prosecco, then soda. Gentle stir.;;Orange",
  "hugo-spritz":
    "£13;Large wine glass;Fill with ice;25:St-Germain|100:Prosecco|splash:soda;Add still ingredients, then Prosecco, then soda. Gentle stir.;;Mint + lime wheel",
  "limoncello-spritz":
    "£13;Large wine glass;Fill with ice;50:Pallini Limoncello|100:Prosecco|splash:soda;Add still ingredients, then Prosecco, then soda. Gentle stir.;;Lemon wheel",
  "sarti-spritz":
    "£13;Large wine glass;Fill with ice;60:Sarti Rosa|90:Prosecco|30:soda;Add still ingredients, then Prosecco, then soda. Gentle stir.;;Lime slice",
  "floral-spritz":
    "£10.25;Large wine glass;Fill with ice;25:Crossip Pure Hibiscus|10:rose|top:0% sparkling;Build over ice; gentle stir.;;"
};

const expectedProductMappings = {
  Absolut: "absolut",
  "Absolut Vanilla": "absolut-vanilla",
  Kahlúa: "kahlua",
  "Crossip Pure Hibiscus": "crossip-pure-hibiscus",
  "Veuve Clicquot": "veuve-clicquot",
  "Bombay Sapphire": "bombay-sapphire",
  "0% sparkling": "zero-sparkling",
  "Altos Plata": "altos-plata",
  Cointreau: "cointreau",
  Beefeater: "beefeater",
  Campari: "campari",
  "Martini Rubino": "martini-rubino",
  "Buffalo Trace": "buffalo-trace",
  "Havana 7": "havana-7",
  Plymouth: "plymouth",
  "Discarded Banana Rum": "discarded-banana-rum",
  "Crossip Blazing Pineapple": "crossip-blazing-pineapple",
  "Havana 3": "havana-3",
  "Compass Box Orchard House": "compass-box-orchard-house",
  "Havana Spiced": "havana-spiced",
  Aperol: "aperol",
  Prosecco: "prosecco",
  "Mondoro Elderflower": "mondoro-elderflower",
  Limoncello: "limoncello",
  "lavender Monin": "monin-lavender",
  "Bristol Syrup Co rhubarb-and-orange syrup": "bristol-rhubarb-orange",
  "premium 0% sparkling": "premium-zero-sparkling",
  "St-Germain": "st-germain",
  "Pallini Limoncello": "pallini-limoncello",
  "Sarti Rosa": "sarti-rosa"
};

assert.equal(drinks.length, 26, "The app must contain 26 drinks.");
assert.deepEqual(
  Object.fromEntries(
    Object.entries(Object.groupBy(drinks, (drink) => drink.category)).map(
      ([category, entries]) => [category, entries.length]
    )
  ),
  { coupe: 5, rocks: 7, highball: 5, spritz: 9 },
  "Category counts changed."
);
assert.deepEqual(
  drinks.map((drink) => drink.name),
  expectedNames,
  "A source cocktail is missing or out of order."
);
assert.equal(new Set(drinks.map((drink) => drink.id)).size, 26, "Drink IDs must be unique.");
assert.equal(new Set(drinks.map((drink) => drink.imageAlt)).size, 26, "Drink alt text must be unique.");

for (const drink of drinks) {
  assert.equal(
    signature(drink),
    expectedSignatures[drink.id],
    `${drink.name} differs from the 23 July source audit.`
  );
  assert.ok(drink.price.startsWith("£"), `${drink.name} is missing a public price.`);
  assert.ok(drink.imageAlt.length > 30, `${drink.name} needs useful image alt text.`);
}

const observedMappings = {};
for (const drink of drinks) {
  for (const item of drink.build) {
    if (!item.productId) continue;
    assert.ok(products[item.productId], `${drink.name}: unknown product ${item.productId}.`);
    assert.ok(products[item.productId].type, `${item.sourceName} needs a plain-language type.`);
    assert.equal(
      item.productId,
      expectedProductMappings[item.sourceName],
      `${drink.name}: ${item.sourceName} opens the wrong bottle reference.`
    );
    if (observedMappings[item.sourceName]) {
      assert.equal(
        observedMappings[item.sourceName],
        item.productId,
        `${item.sourceName} is mapped inconsistently.`
      );
    }
    observedMappings[item.sourceName] = item.productId;
  }
}

assert.deepEqual(
  observedMappings,
  expectedProductMappings,
  "A bottled source ingredient is missing or has an unexpected mapping."
);
assert.equal(Object.keys(products).length, 30, "The bottle-reference catalogue changed.");

const assetManifestText = await readFile(
  new URL("../asset-manifest.js", import.meta.url),
  "utf8"
);
const assets = JSON.parse(assetManifestText.match(/=\s*(\[[\s\S]*\]);/)[1]);
assert.equal(assets.length, 56, "All 26 drink and 30 bottle visuals must be cached.");
assert.equal(new Set(assets).size, 56, "Cached visual paths must be unique.");

for (const relativePath of assets) {
  const assetUrl = new URL(`../${relativePath}`, import.meta.url);
  const [assetText, assetStats] = await Promise.all([
    readFile(assetUrl, "utf8"),
    stat(assetUrl)
  ]);
  assert.match(assetText, /^<svg/, `${relativePath} is not an SVG.`);
  assert.match(assetText, /<title/, `${relativePath} lacks an accessible title.`);
  assert.ok(assetStats.size < 30_000, `${relativePath} is not suitably optimized.`);
}

const [html, manifestText, worker, css, app, sourceAudit] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../manifest.webmanifest", import.meta.url), "utf8"),
  readFile(new URL("../service-worker.js", import.meta.url), "utf8"),
  readFile(new URL("../styles.css", import.meta.url), "utf8"),
  readFile(new URL("../app.js", import.meta.url), "utf8"),
  readFile(new URL("../PRODUCT_SOURCES.md", import.meta.url), "utf8")
]);
const manifest = JSON.parse(manifestText);

assert.equal(manifest.start_url, "./", "Manifest start_url must be Pages-safe.");
assert.equal(manifest.scope, "./", "Manifest scope must be Pages-safe.");
assert.equal(manifest.display, "standalone", "PWA must launch standalone.");
assert.match(html, /apple-touch-icon/, "Apple touch icon is not linked.");
assert.match(html, /Numbered cocktail measures are ml/, "The ml guidance is missing.");
assert.match(html, /live Streatley bar bible wins/, "The source-of-truth warning is missing.");
assert.match(html, /id="bottle-dialog"/, "The bottle dialog is missing.");
assert.doesNotMatch(html, /(?:href|src)="\//, "Root-relative assets break project Pages.");
assert.match(worker, /self\.registration\.scope/, "Service worker must derive the Pages base path.");
assert.match(worker, /asset-manifest\.js/, "The service worker must precache visual assets.");
assert.match(worker, /cache: "reload"/, "Updated releases must refresh precached assets.");
assert.match(app, /history\.pushState/, "Bottle dialog must support browser-back dismissal.");
assert.match(app, /addEventListener\("cancel"/, "Bottle dialog must support Escape.");
assert.match(app, /event\.key !== "Tab"/, "Bottle dialog must contain keyboard focus.");
assert.match(app, /lastBottleTrigger\?\.focus/, "Dialog close must restore focus.");
assert.match(css, /min-height: 3\.6rem/, "Large ingredient touch targets must be retained.");
assert.match(css, /prefers-reduced-motion/, "Reduced-motion support must be retained.");
assert.match(sourceAudit, /do not provide a\s+licence/, "The image-rights decision must be documented.");

console.log(
  "Verified 26 source-audited recipes, 30 exact bottle mappings, 56 optimized visuals, accessible modal behavior, and offline PWA paths."
);
