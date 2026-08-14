import { drinks } from "./data.js";

// Deck order and tags were imported from Coppa_Club_Cocktail_Flashcards_Summer_2026.tsv.
// Card names and answers resolve from the audited drink records to keep one source of truth.
const importedDeck = [
  ["pornstar-martini", ["coupe_martini"]],
  ["espresso-martini", ["coupe_martini"]],
  ["hibiscus-rose-delight", ["coupe_martini"]],
  ["lychee-rose-martini", ["coupe_martini"]],
  ["popstar-martini", ["coupe_martini", "alcohol_free"]],
  ["margarita", ["rocks"]],
  ["negroni", ["rocks"]],
  ["old-fashioned", ["rocks"]],
  ["peach-elderflower-mai-tai", ["rocks"]],
  ["rhubarb-raspberry-bramble", ["rocks"]],
  ["green-chilli-mango-margarita", ["rocks"]],
  ["rum-fashioned", ["rocks"]],
  ["mojito", ["highball"]],
  ["british-orchard-highball", ["highball"]],
  ["spiced-pina-colada", ["highball"]],
  ["acv-colada", ["highball", "alcohol_free"]],
  ["blazing-pineapple-buck", ["highball", "alcohol_free"]],
  ["grapefruit-thyme-aperol", ["spritz"]],
  ["pear-pomegranate-hugo", ["spritz"]],
  ["limoncello-lavender", ["spritz"]],
  ["rhubarb-orange-zero", ["spritz", "alcohol_free"]],
  ["aperol-spritz", ["spritz"]],
  ["hugo-spritz", ["spritz"]],
  ["limoncello-spritz", ["spritz"]],
  ["sarti-spritz", ["spritz"]],
  ["floral-spritz", ["spritz", "alcohol_free"]]
];

const drinksById = new Map(drinks.map((drink) => [drink.id, drink]));

export const flashcards = importedDeck.map(([id, tags]) => {
  const drink = drinksById.get(id);
  return {
    id,
    front: drink?.name,
    tags,
    drink
  };
});
