export const drinks = [
  {
    id: "pornstar-martini",
    name: "Pornstar Martini",
    category: "coupe",
    categoryLabel: "Coupe / Martini",
    price: "£14.25",
    glass: "Coupe + shot",
    ice: "No ice",
    build: [
      ["50", "Absolut"],
      ["25", "passion fruit"],
      ["10", "vanilla"],
      ["25", "pineapple"]
    ],
    method: "Shake hard; fine-strain. Serve Prosecco alongside.",
    finish: "Half passion fruit"
  },
  {
    id: "espresso-martini",
    name: "Espresso Martini",
    category: "coupe",
    categoryLabel: "Coupe / Martini",
    price: "£14.25",
    glass: "Coupe",
    ice: "No ice",
    build: [
      ["50", "Absolut Vanilla"],
      ["25", "Kahlúa"],
      ["25", "espresso"]
    ],
    method: "Shake very hard; fine-strain.",
    finish: "3 coffee beans"
  },
  {
    id: "hibiscus-rose-delight",
    name: "Hibiscus & Rose Delight",
    category: "coupe",
    categoryLabel: "Coupe / Martini",
    price: "£22.75",
    glass: "Coupe",
    ice: "No ice",
    build: [
      ["25", "Crossip Pure Hibiscus"],
      ["10", "rose"],
      ["100", "Veuve Clicquot"]
    ],
    method: "Build gently; minimal stir."
  },
  {
    id: "lychee-rose-martini",
    name: "Lychee & Rose Martini",
    category: "coupe",
    categoryLabel: "Coupe / Martini",
    price: "£13.75",
    glass: "Coupe",
    ice: "No ice",
    build: [
      ["50", "Bombay Sapphire"],
      ["25", "lychee"],
      ["10", "rose"],
      ["20", "lemon"]
    ],
    method: "Shake; fine-strain."
  },
  {
    id: "popstar-martini",
    name: "Popstar Martini",
    category: "coupe",
    categoryLabel: "Coupe / Martini",
    price: "£8.25",
    glass: "Coupe + shot",
    ice: "No ice",
    alcoholFree: true,
    tags: ["0%", "alcohol-free", "mocktail"],
    build: [
      ["25", "passion fruit"],
      ["25", "pineapple"],
      ["10", "vanilla"],
      ["", "0% sparkling"]
    ],
    method: "Shake; fine-strain.",
    finish: "Serve 0% sparkling alongside"
  },
  {
    id: "margarita",
    name: "Margarita",
    category: "rocks",
    categoryLabel: "Rocks",
    price: "£13.25",
    glass: "Rocks",
    ice: "Cubed ice",
    build: [
      ["50", "Altos Plata"],
      ["25", "Cointreau"],
      ["25", "lime"],
      ["10", "agave"]
    ],
    method: "Half salt rim; shake; strain over ice.",
    finish: "Lime"
  },
  {
    id: "negroni",
    name: "Negroni",
    category: "rocks",
    categoryLabel: "Rocks",
    price: "£14.25",
    glass: "Rocks",
    ice: "Cubed ice",
    build: [
      ["25", "Beefeater"],
      ["25", "Campari"],
      ["25", "Martini Rubino"]
    ],
    method: "Stir over ice.",
    finish: "Orange peel"
  },
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    category: "rocks",
    categoryLabel: "Rocks",
    price: "£13.75",
    glass: "Rocks",
    ice: "Cubed ice",
    build: [
      ["50", "Buffalo Trace"],
      ["5", "demerara"],
      ["2–3 dashes", "bitters"]
    ],
    method: "Stir over ice until chilled/diluted.",
    finish: "Orange peel"
  },
  {
    id: "peach-elderflower-mai-tai",
    name: "Peach & Elderflower Mai Tai",
    category: "rocks",
    categoryLabel: "Rocks",
    price: "£14.25",
    glass: "Rocks",
    ice: "Cubed ice",
    build: [
      ["50", "Havana 7"],
      ["20", "peach"],
      ["10", "elderflower"],
      ["20", "lime"],
      ["30", "pineapple"],
      ["", "bitters"]
    ],
    method: "Shake; strain over ice."
  },
  {
    id: "rhubarb-raspberry-bramble",
    name: "Rhubarb & Raspberry Bramble",
    category: "rocks",
    categoryLabel: "Rocks",
    price: "£14.75",
    glass: "Rocks",
    ice: "Crushed/cubed",
    build: [
      ["50", "Plymouth"],
      ["20", "lemon"],
      ["15", "raspberry"],
      ["10", "rhubarb"]
    ],
    method: "Shake; pour/strain over ice."
  },
  {
    id: "green-chilli-mango-margarita",
    name: "Green Chilli & Mango Margarita",
    category: "rocks",
    categoryLabel: "Rocks",
    price: "£14.25",
    glass: "Rocks",
    ice: "Cubed ice",
    build: [
      ["50", "Altos Plata"],
      ["25", "mango"],
      ["25", "lime"],
      ["10", "green chilli"]
    ],
    method: "Shake; strain over ice."
  },
  {
    id: "rum-fashioned",
    name: "The Rum Fashioned",
    category: "rocks",
    categoryLabel: "Rocks",
    price: "£14.75",
    glass: "Rocks",
    ice: "Cubed ice",
    build: [
      ["50", "Discarded Banana Rum"],
      ["25", "Crossip Blazing Pineapple"],
      ["5", "demerara"],
      ["2 dashes", "bitters"]
    ],
    method: "Stir over ice."
  },
  {
    id: "mojito",
    name: "Mojito",
    category: "highball",
    categoryLabel: "Highball",
    price: "£14.25",
    glass: "Highball",
    ice: "Crushed ice",
    build: [
      ["50", "Havana 3"],
      ["25", "lime"],
      ["15", "sugar"],
      ["", "mint"],
      ["", "soda"]
    ],
    method: "Churn with crushed ice; top soda; cap with more crushed ice.",
    finish: "Mint bouquet + lime"
  },
  {
    id: "british-orchard-highball",
    name: "British Orchard Highball",
    category: "highball",
    categoryLabel: "Highball",
    price: "£14.75",
    glass: "Highball",
    ice: "Cubed ice",
    build: [
      ["50", "Compass Box Orchard House"],
      ["10", "jasmine"],
      ["25", "cranberry"],
      ["15", "lime"],
      ["", "soda"]
    ],
    method: "Build over ice; top soda; gentle stir."
  },
  {
    id: "spiced-pina-colada",
    name: "Spiced Piña Colada",
    category: "highball",
    categoryLabel: "Highball",
    price: "£13.25",
    glass: "Highball",
    ice: "Cubed ice",
    build: [
      ["50", "Havana Spiced"],
      ["50", "pineapple"],
      ["25", "coconut"],
      ["20", "lime"],
      ["5", "green chilli"]
    ],
    method: "Shake hard; strain over ice."
  },
  {
    id: "acv-colada",
    name: "ACV-Colada",
    category: "highball",
    categoryLabel: "Highball",
    price: "£8.25",
    glass: "Highball",
    ice: "Cubed ice",
    alcoholFree: true,
    tags: ["0%", "alcohol-free", "mocktail"],
    build: [
      ["10", "apple-cider vinegar"],
      ["20", "lime"],
      ["50", "pineapple"],
      ["25", "coconut"]
    ],
    method: "Shake; strain over ice."
  },
  {
    id: "blazing-pineapple-buck",
    name: "Blazing Pineapple Buck",
    category: "highball",
    categoryLabel: "Highball",
    price: "£10.25",
    glass: "Highball",
    ice: "Cubed ice",
    alcoholFree: true,
    tags: ["0%", "alcohol-free", "mocktail"],
    build: [
      ["50", "Crossip Blazing Pineapple"],
      ["25", "mango"],
      ["10", "ginger"],
      ["10", "spiced-orange"],
      ["", "ginger beer"]
    ],
    method: "Build over ice; top ginger beer; gentle stir."
  },
  {
    id: "grapefruit-thyme-aperol",
    name: "Grapefruit & Thyme Aperol",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13.50",
    glass: "Large wine",
    ice: "Cubed ice",
    build: [
      ["50", "Aperol"],
      ["25", "grapefruit sherbet"],
      ["100", "Prosecco"],
      ["25", "soda"]
    ],
    method: "Build over ice: add still ingredients, Prosecco, then soda; gentle stir.",
    finish: "Grapefruit + thyme"
  },
  {
    id: "pear-pomegranate-hugo",
    name: "Pear & Pomegranate Hugo",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13.50",
    glass: "Large wine",
    ice: "Cubed ice",
    build: [
      ["25", "Mondoro Elderflower"],
      ["25", "pear purée"],
      ["10", "grenadine/pomegranate"],
      ["100", "Prosecco"],
      ["25", "soda"]
    ],
    method: "Build over ice: add still ingredients, Prosecco, then soda; gentle stir.",
    finish: "Mint / venue finish",
    note: "Use pear purée, not pear syrup."
  },
  {
    id: "limoncello-lavender",
    name: "Limoncello & Lavender",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13.50",
    glass: "Large wine",
    ice: "Cubed ice",
    build: [
      ["50", "Limoncello"],
      ["10", "lavender Monin"],
      ["100", "Prosecco"],
      ["25", "soda"]
    ],
    method: "Build over ice: add still ingredients, Prosecco, then soda; gentle stir.",
    finish: "Lemon"
  },
  {
    id: "rhubarb-orange-zero",
    name: "Rhubarb & Orange 0%",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£9.50",
    glass: "Large wine",
    ice: "Cubed ice",
    alcoholFree: true,
    tags: ["0%", "alcohol-free", "mocktail"],
    build: [
      ["25", "Bristol Syrup Co rhubarb-and-orange syrup"],
      ["top", "premium 0% sparkling"]
    ],
    method: "Build over ice; top premium 0% sparkling; gentle stir.",
    finish: "Orange",
    note: "Use one Bristol Syrup Co rhubarb-and-orange syrup."
  },
  {
    id: "aperol-spritz",
    name: "Aperol Spritz",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13",
    glass: "Large wine",
    ice: "Cubed ice",
    build: [
      ["50", "Aperol"],
      ["100", "Prosecco"],
      ["25", "soda"]
    ],
    method: "Build over ice: add Aperol, Prosecco, then soda; gentle stir.",
    finish: "Orange"
  },
  {
    id: "hugo-spritz",
    name: "Hugo Spritz",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13",
    glass: "Large wine",
    ice: "Cubed ice",
    build: [
      ["25", "St-Germain"],
      ["100", "Prosecco"],
      ["splash", "soda"]
    ],
    method: "Build over ice: add St-Germain, Prosecco, then soda; gentle stir.",
    finish: "Mint + lime wheel"
  },
  {
    id: "limoncello-spritz",
    name: "Limoncello Spritz",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13",
    glass: "Large wine",
    ice: "Cubed ice",
    build: [
      ["50", "Pallini Limoncello"],
      ["100", "Prosecco"],
      ["splash", "soda"]
    ],
    method: "Build over ice: add Limoncello, Prosecco, then soda; gentle stir.",
    finish: "Lemon wheel"
  },
  {
    id: "sarti-spritz",
    name: "Sarti Spritz",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13",
    glass: "Large wine",
    ice: "Cubed ice",
    build: [
      ["60", "Sarti Rosa"],
      ["90", "Prosecco"],
      ["30", "soda"]
    ],
    method: "Build over ice: add Sarti Rosa, Prosecco, then soda; gentle stir.",
    finish: "Lime slice"
  },
  {
    id: "floral-spritz",
    name: "Floral Spritz",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£10.25",
    glass: "Large wine",
    ice: "Cubed ice",
    alcoholFree: true,
    tags: ["0%", "alcohol-free", "mocktail"],
    build: [
      ["25", "Crossip Pure Hibiscus"],
      ["10", "rose"],
      ["top", "0% sparkling"]
    ],
    method: "Build over ice; top 0% sparkling; gentle stir."
  }
];
