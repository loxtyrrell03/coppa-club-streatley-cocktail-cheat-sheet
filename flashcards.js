import { drinks } from "./data.js";

// Fronts and tags imported from Coppa_Club_Cocktail_Flashcards_Summer_2026.tsv.
// Answer data is joined from the audited drink records so recipes have one source of truth.
const importedDeck = [
  ["pornstar-martini", "Pornstar Martini", ["coupe_martini"]],
  ["espresso-martini", "Espresso Martini", ["coupe_martini"]],
  ["hibiscus-rose-delight", "Hibiscus & Rose Delight", ["coupe_martini"]],
  ["lychee-rose-martini", "Lychee & Rose Martini", ["coupe_martini"]],
  ["popstar-martini", "Popstar Martini 0%", ["coupe_martini", "alcohol_free"]],
  ["margarita", "Margarita", ["rocks"]],
  ["negroni", "Negroni", ["rocks"]],
  ["old-fashioned", "Old Fashioned", ["rocks"]],
  ["peach-elderflower-mai-tai", "Peach & Elderflower Mai Tai", ["rocks"]],
  ["rhubarb-raspberry-bramble", "Rhubarb & Raspberry Bramble", ["rocks"]],
  ["green-chilli-mango-margarita", "Green Chilli & Mango Margarita", ["rocks"]],
  ["rum-fashioned", "The Rum Fashioned", ["rocks"]],
  ["mojito", "Mojito", ["highball"]],
  ["british-orchard-highball", "British Orchard Highball", ["highball"]],
  ["spiced-pina-colada", "Spiced Piña Colada", ["highball"]],
  ["acv-colada", "ACV-Colada 0%", ["highball", "alcohol_free"]],
  ["blazing-pineapple-buck", "Blazing Pineapple Buck 0%", ["highball", "alcohol_free"]],
  ["grapefruit-thyme-aperol", "Grapefruit & Thyme Aperol", ["spritz"]],
  ["pear-pomegranate-hugo", "Pear & Pomegranate Hugo", ["spritz"]],
  ["limoncello-lavender", "Limoncello & Lavender", ["spritz"]],
  ["rhubarb-orange-zero", "Rhubarb & Orange 0%", ["spritz", "alcohol_free"]],
  ["aperol-spritz", "Aperol Spritz", ["spritz"]],
  ["hugo-spritz", "Hugo Spritz", ["spritz"]],
  ["limoncello-spritz", "Limoncello Spritz", ["spritz"]],
  ["sarti-spritz", "Sarti Spritz", ["spritz"]],
  ["floral-spritz", "Floral Spritz 0%", ["spritz", "alcohol_free"]]
];

const drinksById = new Map(drinks.map((drink) => [drink.id, drink]));

export const flashcards = importedDeck.map(([id, front, tags]) => ({
  id,
  front,
  tags,
  drink: drinksById.get(id)
}));
