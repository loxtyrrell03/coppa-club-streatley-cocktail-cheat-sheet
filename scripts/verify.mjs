import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { beers, wines } from "../catalog-data.js";
import { drinks, products } from "../data.js";
import { flashcards } from "../flashcards.js";
import { photoCredits } from "../photo-credits.js";
import {
  formatInterval,
  newSchedule,
  nextInterval,
  scheduleReview
} from "../scheduler.js";

const expectedCocktails = {
  "pornstar-martini": ["Pornstar Martini", "£14.25"],
  "espresso-martini": ["Espresso Martini", "£14.25"],
  "hibiscus-rose-delight": ["Hibiscus & Rose Delight", "£22.75"],
  "lychee-rose-martini": ["Lychee & Rose Martini", "£13.75"],
  "popstar-martini": ["Popstar Martini", "£8.25"],
  margarita: ["Margarita", "£13.25"],
  negroni: ["Negroni", "£14.25"],
  "old-fashioned": ["Old Fashioned", "£13.75"],
  "peach-elderflower-mai-tai": ["Peach & Elderflower Mai Tai", "£14.25"],
  "rhubarb-raspberry-bramble": ["Rhubarb & Raspberry Bramble", "£14.75"],
  "green-chilli-mango-margarita": ["Green Chilli & Mango Margarita", "£14.25"],
  "rum-fashioned": ["The Rum Fashioned", "£14.75"],
  mojito: ["Mojito", "£14.25"],
  "british-orchard-highball": ["British Orchard Highball", "£14.75"],
  "spiced-pina-colada": ["Spiced Piña Colada", "£13.25"],
  "acv-colada": ["ACV-Colada", "£8.25"],
  "blazing-pineapple-buck": ["Blazing Pineapple Buck", "£10.25"],
  "grapefruit-thyme-aperol": ["Grapefruit & Thyme Aperol Spritz", "£13.75"],
  "pear-pomegranate-hugo": ["Pear & Pomegranate Hugo Spritz", "£13.75"],
  "limoncello-lavender": ["Limoncello & Lavender Spritz", "£13.75"],
  "rhubarb-orange-zero": ["Rhubarb & Orange Spritz", "£9.75"],
  "aperol-spritz": ["Aperol Spritz", "£13.25"],
  "hugo-spritz": ["Hugo Spritz", "£13.25"],
  "limoncello-spritz": ["Limoncello Spritz", "£13.25"],
  "sarti-spritz": ["Sarti Spritz", "£13.25"],
  "floral-spritz": ["Floral Spritz", "£10.25"]
};

const expectedBeerDetails = {
  "asahi-super-dry": ["Asahi Super Dry", "5%", "½ pint £3.90 · Pint £7.80"],
  "freedom-session-ipa": ["Freedom Session IPA", "4.3%", "½ pint £4 · Pint £8"],
  "guinness-draught": ["Guinness", "4.2%", "½ pint £3.90 · Pint £7.70"],
  "aspall-cyder": ["Aspall Cyder", "5.5%", "½ pint £3.80 · Pint £7.60"],
  "curious-brew-lager": ["Curious Brew Lager", "4.7%", "£6.30"],
  "jubel-peach-lager": ["Jubel Peach Lager", "4%", "£6.80"],
  "small-beer-hazy-ipa": ["Small Beer Hazy IPA", "2.6%", "£6.80"],
  "howies-berry-cider": ["Howies Berries Cider", "3.4%", "£7.30"],
  "howies-peach-cider": ["Howies Peach Cider", "3.4%", "£7.30"],
  "peroni-zero": ["Peroni Nastro Azzurro 0.0%", "0.0%", "£5.70"],
  "big-drop-paradiso": ["Big Drop Paradiso Citra IPA", "0.5%", "£5.90"],
  "bero-kingston-golden-pils": ["BERO Kingston Golden Pils", "0.48%", "£5.90"],
  "bero-edge-hill-hazy-ipa": ["BERO Edge Hill Hazy IPA", "0.48%", "£5.90"],
  "guinness-zero": ["Guinness 0.0%", "0.0%", "£7"]
};

const countBy = (items, key) =>
  Object.fromEntries(
    Object.entries(Object.groupBy(items, (item) => item[key])).map(([value, entries]) => [
      value,
      entries.length
    ])
  );

const byId = (items) => new Map(items.map((item) => [item.id, item]));

assert.equal(drinks.length, 26, "The cocktail guide must contain 26 drinks.");
assert.equal(new Set(drinks.map((drink) => drink.id)).size, 26, "Cocktail IDs must be unique.");
assert.equal(new Set(drinks.map((drink) => drink.name)).size, 26, "Cocktail names must be unique.");
assert.equal(new Set(drinks.map((drink) => drink.imageAlt)).size, 26, "Cocktail alt text must be unique.");
assert.deepEqual(
  countBy(drinks, "category"),
  { coupe: 5, rocks: 7, highball: 5, spritz: 9 },
  "Cocktail category counts changed."
);
assert.deepEqual(
  Object.fromEntries(drinks.map(({ id, name, price }) => [id, [name, price]])),
  expectedCocktails,
  "A current cocktail name or menu price changed."
);

for (const drink of drinks) {
  assert.ok(drink.glass && drink.ice && drink.method, `${drink.name} needs complete serve details.`);
  assert.ok(drink.build.length, `${drink.name} needs at least one build ingredient.`);
  assert.ok(drink.price.startsWith("£"), `${drink.name} is missing a public price.`);
  assert.ok(drink.imageAlt.length > 30, `${drink.name} needs useful image alt text.`);

  for (const item of drink.build) {
    assert.ok(item.sourceName && item.displayName, `${drink.name} has an unnamed ingredient.`);
    assert.ok(item.family, `${drink.name}: ${item.sourceName} needs a colour family.`);
    if (!item.productId) continue;
    const product = products[item.productId];
    assert.ok(product, `${drink.name}: unknown product ${item.productId}.`);
    assert.ok(product.type, `${item.sourceName} needs product context.`);
    if (product.sourceUrl) {
      assert.match(product.sourceUrl, /^https:\/\//, `${item.sourceName} has an invalid product source.`);
    }
    assert.equal(
      item.family,
      product.family,
      `${drink.name}: ${item.sourceName} uses a mismatched colour family.`
    );
  }
}

const cocktailsById = byId(drinks);
assert.equal(
  cocktailsById.get("pornstar-martini").serveProductId,
  "prosecco",
  "Pornstar Martini should retain its separately served Prosecco reference."
);
assert.equal(
  cocktailsById.get("popstar-martini").serveProductId,
  "zero-sparkling",
  "Popstar Martini should retain its separately served alcohol-free sparkling reference."
);
assert.ok(
  cocktailsById
    .get("popstar-martini")
    .build.every(({ productId }) => productId !== "zero-sparkling"),
  "Popstar Martini must not show the same sparkling pour in both Build and Serve."
);
assert.equal(
  products.prosecco.label,
  "Canal Grando Prosecco DOC NV",
  "The likely Streatley Prosecco reference changed."
);
assert.match(
  products.prosecco.type,
  /likely.+verify at bar/i,
  "The inferred Prosecco product must stay clearly qualified."
);
assert.equal(
  products["zero-sparkling"].label,
  "REAL Sparkling Dry White",
  "The likely alcohol-free sparkling reference changed."
);
assert.match(
  products["zero-sparkling"].type,
  /likely.+verify at bar/i,
  "The inferred alcohol-free sparkling product must stay clearly qualified."
);
assert.ok(
  cocktailsById
    .get("pear-pomegranate-hugo")
    .build.some(({ sourceName }) => sourceName === "pomegranate"),
  "Pear & Pomegranate Hugo must use the current public-menu ingredient name."
);
assert.equal(Object.keys(products).length, 30, "The bottle-reference catalogue changed.");

assert.equal(flashcards.length, 26, "Study must contain cocktail flashcards only.");
assert.equal(new Set(flashcards.map((card) => card.id)).size, 26, "Flashcard IDs must be unique.");
assert.deepEqual(
  flashcards.map((card) => card.id),
  drinks.map((drink) => drink.id),
  "Flashcards must stay aligned with the cocktail order."
);
assert.ok(
  flashcards.every(
    (card) =>
      card.drink === cocktailsById.get(card.id) &&
      card.front === card.drink.name &&
      card.tags.length > 0
  ),
  "Every flashcard must resolve to its canonical cocktail record."
);

assert.equal(wines.length, 49, "The current Streatley wine guide must contain 49 wines.");
assert.equal(new Set(wines.map((wine) => wine.id)).size, 49, "Wine IDs must be unique.");
assert.deepEqual(
  countBy(wines, "group"),
  { sparkling: 10, "alcohol-free": 1, white: 15, rose: 7, red: 16 },
  "Wine group counts changed."
);
for (const wine of wines) {
  assert.ok(
    wine.name &&
      wine.groupLabel &&
      wine.style &&
      wine.sweetness &&
      wine.body &&
      wine.origin &&
      wine.notes,
    `${wine.id} needs complete practical wine details.`
  );
  assert.match(wine.sweetness, /dry/i, `${wine.name} needs clear dry/sweet guidance.`);
  assert.match(wine.price, /£/, `${wine.name} needs a current price.`);
  assert.match(wine.sourceUrl, /^https:\/\//, `${wine.name} needs a source URL.`);
}
const winesById = byId(wines);
assert.deepEqual(
  [
    winesById.get("canal-grando-prosecco").name,
    winesById.get("canal-grando-prosecco").sweetness,
    winesById.get("canal-grando-prosecco").price
  ],
  ["Prosecco, Canal Grando NV", "Extra Dry · softly fruity", "125ml £8.80 · Bottle £39"],
  "The current venue-listed Prosecco details changed."
);
assert.deepEqual(
  [
    winesById.get("real-sparkling-dry-white").name,
    winesById.get("real-sparkling-dry-white").style,
    winesById.get("real-sparkling-dry-white").sweetness,
    winesById.get("real-sparkling-dry-white").price
  ],
  [
    "REAL Sparkling Dry White",
    "Slow-fermented sparkling tea · 0.5% ABV",
    "Dry · alcohol-free",
    "125ml £7.90 · Bottle £35"
  ],
  "The alcohol-free sparkling wine details changed."
);

assert.equal(beers.length, 14, "The current beer and cider guide must contain 14 items.");
assert.equal(new Set(beers.map((beer) => beer.id)).size, 14, "Beer/cider IDs must be unique.");
assert.deepEqual(
  countBy(beers, "group"),
  { draught: 4, packaged: 5, "alcohol-free": 5 },
  "Beer/cider group counts changed."
);
assert.deepEqual(
  Object.fromEntries(beers.map(({ id, name, abv, price }) => [id, [name, abv, price]])),
  expectedBeerDetails,
  "A current beer/cider name, ABV or menu price changed."
);
for (const beer of beers) {
  assert.ok(
    beer.groupLabel && beer.style && beer.profile && beer.format,
    `${beer.name} needs complete style and serve details.`
  );
  assert.match(beer.abv, /^\d+(?:\.\d+)?%$/, `${beer.name} needs a numeric ABV.`);
  assert.match(beer.sourceUrl, /^https:\/\//, `${beer.name} needs a source URL.`);
}

const catalogIds = new Set([...wines, ...beers].map(({ id }) => id));
assert.ok(
  flashcards.every(({ id }) => !catalogIds.has(id)),
  "Wine and beer/cider entries must never appear in Study flashcards."
);

const scheduleStart = Date.UTC(2026, 6, 27, 12, 0, 0);
const learningCard = scheduleReview(newSchedule(), "good", scheduleStart);
assert.equal(learningCard.state, "learning", "A first Good answer should enter learning.");
assert.equal(
  learningCard.dueAt,
  scheduleStart + 10 * 60 * 1000,
  "A first Good answer should return in 10 minutes."
);
const graduatedCard = scheduleReview(learningCard, "good", learningCard.dueAt);
assert.equal(graduatedCard.state, "review", "A second Good answer should graduate the card.");
assert.equal(graduatedCard.intervalDays, 1, "A graduated card should start at one day.");
const lapsedCard = scheduleReview(graduatedCard, "again", graduatedCard.dueAt);
assert.equal(lapsedCard.state, "learning", "Again should return a review card to learning.");
assert.equal(lapsedCard.lapses, 1, "Again should record a review lapse.");
assert.equal(
  formatInterval(nextInterval(graduatedCard, "easy")),
  "3d",
  "Easy interval preview changed unexpectedly."
);

const assetManifestText = await readFile(
  new URL("../asset-manifest.js", import.meta.url),
  "utf8"
);
const assets = JSON.parse(assetManifestText.match(/=\s*(\[[\s\S]*\]);/)[1]);
assert.equal(assets.length, 56, "All 26 cocktail and 30 bottle visuals must be cached.");
assert.equal(new Set(assets).size, 56, "Cached visual paths must be unique.");

let totalImageBytes = 0;
for (const relativePath of assets) {
  const assetUrl = new URL(`../${relativePath}`, import.meta.url);
  const [assetBytes, assetStats] = await Promise.all([readFile(assetUrl), stat(assetUrl)]);
  assert.match(relativePath, /\.webp$/, `${relativePath} is not a WebP photo.`);
  assert.equal(assetBytes.subarray(0, 4).toString("ascii"), "RIFF", `${relativePath} is not RIFF.`);
  assert.equal(assetBytes.subarray(8, 12).toString("ascii"), "WEBP", `${relativePath} is not WebP.`);
  assert.ok(assetStats.size < 150_000, `${relativePath} is not suitably optimized.`);
  totalImageBytes += assetStats.size;
}
assert.ok(totalImageBytes < 3_500_000, "The offline photo pack is too large.");

assert.equal(Object.keys(photoCredits.drinks).length, 26, "Every cocktail needs a photo credit.");
assert.equal(
  Object.keys(photoCredits.products).length,
  30,
  "Every bottle/ingredient reference needs a photo credit."
);
for (const credit of [
  ...Object.values(photoCredits.drinks),
  ...Object.values(photoCredits.products)
]) {
  assert.match(credit.sourceUrl, /^https:\/\//, `${credit.id} needs a source URL.`);
  assert.match(credit.licenseUrl, /^https:\/\//, `${credit.id} needs a licence URL.`);
  assert.ok(credit.creator, `${credit.id} needs a creator credit.`);
}

const [html, manifestText, worker, css, app, catalog, study, sourceAudit] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../manifest.webmanifest", import.meta.url), "utf8"),
  readFile(new URL("../service-worker.js", import.meta.url), "utf8"),
  readFile(new URL("../styles.css", import.meta.url), "utf8"),
  readFile(new URL("../app.js", import.meta.url), "utf8"),
  readFile(new URL("../catalog.js", import.meta.url), "utf8"),
  readFile(new URL("../study.js", import.meta.url), "utf8"),
  readFile(new URL("../PRODUCT_SOURCES.md", import.meta.url), "utf8")
]);
const manifest = JSON.parse(manifestText);

assert.equal(manifest.start_url, "./", "Manifest start_url must be Pages-safe.");
assert.equal(manifest.scope, "./", "Manifest scope must be Pages-safe.");
assert.equal(manifest.display, "standalone", "PWA must launch standalone.");
assert.deepEqual(
  manifest.shortcuts.map(({ url }) => url),
  ["./#cocktails", "./#wines", "./#beers", "./#study"],
  "Manifest shortcuts must expose all four views."
);

assert.deepEqual(
  [...html.matchAll(/data-app-view="([^"]+)"/g)].map((match) => match[1]),
  ["cocktails", "wines", "beers", "study"],
  "Top navigation must expose Cocktails, Wines, Beers and Study."
);
for (const id of ["recipes-view", "wines-view", "beers-view", "study-view"]) {
  assert.match(html, new RegExp(`id="${id}"`), `The ${id} view is missing.`);
}
for (const id of ["search", "wine-search", "beer-search"]) {
  assert.match(html, new RegExp(`id="${id}"[\\s\\S]{0,120}type="search"`), `${id} is missing.`);
}
assert.match(html, /apple-touch-icon/, "Apple touch icon is not linked.");
assert.match(html, /id="bottle-dialog"/, "The bottle dialog is missing.");
assert.match(html, /aria-controls="study-answer"/, "Study reveal must expose its target.");
assert.doesNotMatch(html, /(?:href|src)="\//, "Root-relative assets break project Pages.");

assert.match(worker, /self\.registration\.scope/, "Service worker must derive the Pages base path.");
for (const moduleName of [
  "asset-manifest.js",
  "catalog.js",
  "catalog-data.js",
  "photo-credits.js",
  "flashcards.js",
  "scheduler.js",
  "study.js"
]) {
  assert.match(worker, new RegExp(moduleName.replace(".", "\\.")), `${moduleName} must be precached.`);
}
assert.match(worker, /cache: "reload"/, "Updated releases must refresh precached assets.");

assert.match(app, /import "\.\/catalog\.js"/, "The scoped catalogs must load with the app.");
assert.match(app, /history\.pushState/, "Bottle dialog must support browser-back dismissal.");
assert.match(app, /document\.addEventListener\("click"/, "Ingredients must open bottle photos.");
assert.match(app, /addEventListener\("cancel"/, "Bottle dialog must support Escape.");
assert.match(app, /event\.key !== "Tab"/, "Bottle dialog must contain keyboard focus.");
assert.match(app, /lastBottleTrigger\?\.focus/, "Dialog close must restore focus.");
assert.match(catalog, /#wine-search/, "Wine search must be scoped to the wine catalog.");
assert.match(catalog, /#beer-search/, "Beer search must be scoped to the beer/cider catalog.");
assert.match(css, /\.recipe-card__lead/, "The compact specs-and-photo recipe layout is missing.");
assert.match(css, /\.family-vodka/, "Vodka colour coding is missing.");
assert.match(css, /\.family-gin/, "Gin colour coding is missing.");
assert.match(css, /\.study-grades/, "Study grading controls are missing.");
assert.match(css, /prefers-reduced-motion/, "Reduced-motion support must be retained.");
assert.match(study, /coppa-study-v1/, "Study progress needs a stable local-storage key.");
assert.match(study, /localStorage/, "Study progress must persist locally.");
assert.match(study, /data-rating/, "The four review grades are missing.");
assert.match(
  sourceAudit,
  /Pexels[\s\S]*Creative\s+Commons/,
  "The licensed-photo policy must be documented."
);

console.log(
  "Verified 26 cocktail-only flashcards, 49 wines, 14 beer/cider entries, current audited menu facts, scoped catalog navigation/search, 56 credited WebP assets, scheduling, accessibility and offline PWA paths."
);
