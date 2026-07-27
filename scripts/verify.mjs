import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { drinks } from "../data.js";

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

for (const drink of drinks) {
  assert.ok(drink.price.startsWith("£"), `${drink.name} is missing a public price.`);
  assert.ok(drink.glass, `${drink.name} is missing its glass.`);
  assert.ok(drink.ice, `${drink.name} is missing its ice.`);
  assert.ok(drink.build.length, `${drink.name} is missing its build.`);
  assert.ok(drink.method, `${drink.name} is missing its method.`);
}

const [html, manifestText, worker, css] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../manifest.webmanifest", import.meta.url), "utf8"),
  readFile(new URL("../service-worker.js", import.meta.url), "utf8"),
  readFile(new URL("../styles.css", import.meta.url), "utf8")
]);
const manifest = JSON.parse(manifestText);

assert.equal(manifest.start_url, "./", "Manifest start_url must be Pages-safe.");
assert.equal(manifest.scope, "./", "Manifest scope must be Pages-safe.");
assert.equal(manifest.display, "standalone", "PWA must launch standalone.");
assert.match(html, /apple-touch-icon/, "Apple touch icon is not linked.");
assert.match(html, /Numbered cocktail measures are ml/, "The ml guidance is missing.");
assert.match(html, /live Streatley bar bible wins/, "The source-of-truth warning is missing.");
assert.doesNotMatch(html, /(?:href|src)="\//, "Root-relative assets break project Pages.");
assert.match(worker, /self\.registration\.scope/, "Service worker must derive the Pages base path.");
assert.match(css, /min-height: 3(?:\.25)?rem/, "Large touch targets must be retained.");

console.log("Verified 26 recipes, category counts, required fields, PWA paths, and iPhone metadata.");
