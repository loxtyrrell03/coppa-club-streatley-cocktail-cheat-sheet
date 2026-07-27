const bottle = (id, label, type, sourceUrl = "") => ({
  id,
  label,
  type,
  image: `./images/bottles/${id}.webp`,
  imageAlt: `Photographic bottle or ingredient reference for ${label}, ${type}.`,
  sourceUrl
});

export const products = {
  absolut: bottle("absolut", "Absolut", "vodka", "https://www.absolut.com/en/products/absolut-vodka/"),
  "absolut-vanilla": bottle(
    "absolut-vanilla",
    "Absolut Vanilla",
    "vanilla-flavoured vodka",
    "https://www.absolut.com/en/products/absolut-vanilia/"
  ),
  kahlua: bottle(
    "kahlua",
    "Kahlúa",
    "coffee liqueur",
    "https://www.kahlua.com/en/products/original-coffee-liqueur/"
  ),
  "crossip-pure-hibiscus": bottle(
    "crossip-pure-hibiscus",
    "Crossip Pure Hibiscus",
    "alcohol-free spirit",
    "https://www.crossipdrinks.com/pages/faq"
  ),
  "veuve-clicquot": bottle(
    "veuve-clicquot",
    "Veuve Clicquot",
    "Champagne",
    "https://www.veuveclicquot.com/en-int/our-champagnes/yellow-label"
  ),
  "bombay-sapphire": bottle(
    "bombay-sapphire",
    "Bombay Sapphire",
    "gin",
    "https://www.bombaysapphire.com/products/bombay-sapphire/"
  ),
  "zero-sparkling": bottle(
    "zero-sparkling",
    "0% sparkling",
    "alcohol-free sparkling drink · brand not specified"
  ),
  "altos-plata": bottle(
    "altos-plata",
    "Altos Plata",
    "tequila",
    "https://olmecaaltos.com/olmeca-altos-plata/"
  ),
  cointreau: bottle(
    "cointreau",
    "Cointreau",
    "orange liqueur",
    "https://www.cointreau.com/us/en/what-cointreau"
  ),
  beefeater: bottle(
    "beefeater",
    "Beefeater",
    "London dry gin",
    "https://www.beefeatergin.com/en-gb/our-gins/london-dry-gin/"
  ),
  campari: bottle(
    "campari",
    "Campari",
    "bitter aperitif",
    "https://www.campari.com/our-products/campari/"
  ),
  "martini-rubino": bottle(
    "martini-rubino",
    "Martini Rubino",
    "vermouth",
    "https://www.martini.com/products/riserva-speciale-rubino/"
  ),
  "buffalo-trace": bottle(
    "buffalo-trace",
    "Buffalo Trace",
    "bourbon whiskey",
    "https://www.buffalotracedistillery.com/our-brands/buffalo-trace/"
  ),
  "havana-7": bottle(
    "havana-7",
    "Havana 7",
    "aged rum",
    "https://havana-club.com/en-gb/our-rums/"
  ),
  plymouth: bottle(
    "plymouth",
    "Plymouth",
    "gin",
    "https://www.plymouthgin.com/en/product/plymouth-gin/"
  ),
  "discarded-banana-rum": bottle(
    "discarded-banana-rum",
    "Discarded Banana Rum",
    "banana rum",
    "https://discardedspirits.com/products/discarded-rum"
  ),
  "crossip-blazing-pineapple": bottle(
    "crossip-blazing-pineapple",
    "Crossip Blazing Pineapple",
    "alcohol-free spirit",
    "https://www.crossipdrinks.com/products/blazing-pineapple"
  ),
  "havana-3": bottle(
    "havana-3",
    "Havana 3",
    "white rum",
    "https://havana-club.com/en-gb/our-rums/"
  ),
  "compass-box-orchard-house": bottle(
    "compass-box-orchard-house",
    "Compass Box Orchard House",
    "blended malt Scotch whisky",
    "https://www.compassboxwhisky.com/products/orchard-house"
  ),
  "havana-spiced": bottle(
    "havana-spiced",
    "Havana Spiced",
    "spiced rum",
    "https://havana-club.com/en/our-rum/cuban-spiced/"
  ),
  aperol: bottle(
    "aperol",
    "Aperol",
    "aperitif",
    "https://www.aperol.com/our-products/aperol/"
  ),
  prosecco: bottle("prosecco", "Prosecco", "sparkling wine · brand not specified"),
  "mondoro-elderflower": bottle(
    "mondoro-elderflower",
    "Mondoro Elderflower",
    "elderflower aperitif",
    "https://www.diffordsguide.com/beer-wine-spirits/12366/mondoro-aperitivo-elderflower"
  ),
  limoncello: bottle("limoncello", "Limoncello", "lemon liqueur · brand not specified"),
  "monin-lavender": bottle(
    "monin-lavender",
    "MONIN Lavender Syrup",
    "lavender syrup",
    "https://monin1912.com/products/monin-lavender-syrup"
  ),
  "bristol-rhubarb-orange": bottle(
    "bristol-rhubarb-orange",
    "Bristol Syrup Co rhubarb-and-orange syrup",
    "rhubarb-and-orange syrup",
    "https://staustellbrewerywholesale.co.uk/soft/syrups/bristol-syrup-co-rhubarb-orange-spritz-syrup-1-750ml-glass-bottle/"
  ),
  "premium-zero-sparkling": bottle(
    "premium-zero-sparkling",
    "premium 0% sparkling",
    "premium alcohol-free sparkling drink · brand not specified"
  ),
  "st-germain": bottle(
    "st-germain",
    "St-Germain",
    "elderflower liqueur",
    "https://www.stgermainliqueur.com/us/en"
  ),
  "pallini-limoncello": bottle(
    "pallini-limoncello",
    "Pallini Limoncello",
    "lemon liqueur",
    "https://pallini.com/en/prodotti-pallini/limoncello/"
  ),
  "sarti-rosa": bottle(
    "sarti-rosa",
    "Sarti Rosa",
    "Italian aperitif",
    "https://www.sartiaperitivo.com/"
  )
};

const ingredient = (measure, sourceName, displayName = sourceName, productId = "") => ({
  measure,
  sourceName,
  displayName,
  productId
});

const image = (id) => `./images/drinks/${id}.webp`;

export const drinks = [
  {
    id: "pornstar-martini",
    name: "Pornstar Martini",
    category: "coupe",
    categoryLabel: "Coupe / Martini",
    price: "£14.25",
    glass: "Coupe + shot",
    ice: "No ice",
    image: image("pornstar-martini"),
    imageAlt:
      "Representative photograph of a golden Pornstar Martini in a coupe, with passion fruit and a side shot.",
    build: [
      ingredient("50", "Absolut", "Absolut vodka", "absolut"),
      ingredient("25", "passion fruit"),
      ingredient("10", "vanilla"),
      ingredient("25", "pineapple")
    ],
    method: "Shake hard; fine-strain.",
    serve: "Prosecco alongside",
    serveProductId: "prosecco",
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
    image: image("espresso-martini"),
    imageAlt: "Representative photograph of a dark Espresso Martini in a coupe with three coffee beans.",
    build: [
      ingredient(
        "50",
        "Absolut Vanilla",
        "Absolut Vanilla vodka",
        "absolut-vanilla"
      ),
      ingredient("25", "Kahlúa", "Kahlúa coffee liqueur", "kahlua"),
      ingredient("25", "espresso")
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
    image: image("hibiscus-rose-delight"),
    imageAlt: "Representative photograph of a sparkling ruby Hibiscus & Rose Delight in a coupe.",
    build: [
      ingredient(
        "25",
        "Crossip Pure Hibiscus",
        "Crossip Pure Hibiscus alcohol-free spirit",
        "crossip-pure-hibiscus"
      ),
      ingredient("10", "rose"),
      ingredient(
        "100",
        "Veuve Clicquot",
        "Veuve Clicquot Champagne",
        "veuve-clicquot"
      )
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
    image: image("lychee-rose-martini"),
    imageAlt: "Representative photograph of a pale pink Lychee & Rose Martini in a chilled coupe.",
    build: [
      ingredient("50", "Bombay Sapphire", "Bombay Sapphire gin", "bombay-sapphire"),
      ingredient("25", "lychee"),
      ingredient("10", "rose"),
      ingredient("20", "lemon")
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
    image: image("popstar-martini"),
    imageAlt:
      "Representative photograph of a bright alcohol-free Popstar Martini in a coupe with a sparkling side shot.",
    build: [
      ingredient("25", "passion fruit"),
      ingredient("25", "pineapple"),
      ingredient("10", "vanilla"),
      ingredient(
        "",
        "0% sparkling",
        "0% sparkling alcohol-free drink",
        "zero-sparkling"
      )
    ],
    method: "Shake; fine-strain.",
    serve: "0% sparkling alongside",
    serveProductId: "zero-sparkling"
  },
  {
    id: "margarita",
    name: "Margarita",
    category: "rocks",
    categoryLabel: "Rocks",
    price: "£13.25",
    glass: "Rocks",
    ice: "Cubed ice",
    image: image("margarita"),
    imageAlt: "Representative photograph of a pale lime Margarita over cubed ice with a half salt rim.",
    build: [
      ingredient("50", "Altos Plata", "Altos Plata tequila", "altos-plata"),
      ingredient("25", "Cointreau", "Cointreau orange liqueur", "cointreau"),
      ingredient("25", "lime"),
      ingredient("10", "agave")
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
    image: image("negroni"),
    imageAlt: "Representative photograph of a deep red Negroni over ice with a curled orange peel.",
    build: [
      ingredient("25", "Beefeater", "Beefeater gin", "beefeater"),
      ingredient("25", "Campari", "Campari bitter aperitif", "campari"),
      ingredient("25", "Martini Rubino", "Martini Rubino vermouth", "martini-rubino")
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
    image: image("old-fashioned"),
    imageAlt: "Representative photograph of an amber Old Fashioned over a large ice cube with orange peel.",
    build: [
      ingredient("50", "Buffalo Trace", "Buffalo Trace bourbon whiskey", "buffalo-trace"),
      ingredient("5", "demerara"),
      ingredient("2–3 dashes", "bitters")
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
    image: image("peach-elderflower-mai-tai"),
    imageAlt: "Representative photograph of a peach-coloured Mai Tai over ice with pineapple leaves.",
    build: [
      ingredient("50", "Havana 7", "Havana 7 aged rum", "havana-7"),
      ingredient("20", "peach"),
      ingredient("10", "elderflower"),
      ingredient("20", "lime"),
      ingredient("30", "pineapple"),
      ingredient("", "bitters")
    ],
    method: "Shake; strain over ice.",
    ambiguity: "The revised source lists bitters without a quantity."
  },
  {
    id: "rhubarb-raspberry-bramble",
    name: "Rhubarb & Raspberry Bramble",
    category: "rocks",
    categoryLabel: "Rocks",
    price: "£14.75",
    glass: "Rocks",
    ice: "Crushed/cubed",
    image: image("rhubarb-raspberry-bramble"),
    imageAlt: "Representative photograph of a ruby Rhubarb & Raspberry Bramble over crushed ice.",
    build: [
      ingredient("50", "Plymouth", "Plymouth gin", "plymouth"),
      ingredient("20", "lemon"),
      ingredient("15", "raspberry"),
      ingredient("10", "rhubarb")
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
    image: image("green-chilli-mango-margarita"),
    imageAlt: "Representative photograph of a vivid mango Margarita over ice with a green chilli.",
    build: [
      ingredient("50", "Altos Plata", "Altos Plata tequila", "altos-plata"),
      ingredient("25", "mango"),
      ingredient("25", "lime"),
      ingredient("10", "green chilli")
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
    image: image("rum-fashioned"),
    imageAlt: "Representative photograph of a rich amber Rum Fashioned over ice with banana and pineapple.",
    build: [
      ingredient(
        "50",
        "Discarded Banana Rum",
        "Discarded Banana Rum",
        "discarded-banana-rum"
      ),
      ingredient(
        "25",
        "Crossip Blazing Pineapple",
        "Crossip Blazing Pineapple alcohol-free spirit",
        "crossip-blazing-pineapple"
      ),
      ingredient("5", "demerara"),
      ingredient("2 dashes", "bitters")
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
    image: image("mojito"),
    imageAlt: "Representative photograph of a tall Mojito packed with crushed ice, mint and lime.",
    build: [
      ingredient("50", "Havana 3", "Havana 3 white rum", "havana-3"),
      ingredient("25", "lime"),
      ingredient("15", "sugar"),
      ingredient("", "mint"),
      ingredient("", "soda")
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
    image: image("british-orchard-highball"),
    imageAlt: "Representative photograph of a blush British Orchard Highball over cubed ice.",
    build: [
      ingredient(
        "50",
        "Compass Box Orchard House",
        "Compass Box Orchard House Scotch whisky",
        "compass-box-orchard-house"
      ),
      ingredient("10", "jasmine"),
      ingredient("25", "cranberry"),
      ingredient("15", "lime"),
      ingredient("", "soda")
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
    image: image("spiced-pina-colada"),
    imageAlt: "Representative photograph of a creamy Spiced Piña Colada with pineapple and green chilli.",
    build: [
      ingredient("50", "Havana Spiced", "Havana Spiced rum", "havana-spiced"),
      ingredient("50", "pineapple"),
      ingredient("25", "coconut"),
      ingredient("20", "lime"),
      ingredient("5", "green chilli")
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
    image: image("acv-colada"),
    imageAlt: "Representative photograph of a creamy alcohol-free ACV-Colada with apple and pineapple.",
    build: [
      ingredient("10", "apple-cider vinegar"),
      ingredient("20", "lime"),
      ingredient("50", "pineapple"),
      ingredient("25", "coconut")
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
    image: image("blazing-pineapple-buck"),
    imageAlt: "Representative photograph of a fiery golden Blazing Pineapple Buck with ginger bubbles.",
    build: [
      ingredient(
        "50",
        "Crossip Blazing Pineapple",
        "Crossip Blazing Pineapple alcohol-free spirit",
        "crossip-blazing-pineapple"
      ),
      ingredient("25", "mango"),
      ingredient("10", "ginger"),
      ingredient("10", "spiced-orange"),
      ingredient("", "ginger beer")
    ],
    method: "Build over ice; top ginger beer; gentle stir."
  },
  {
    id: "grapefruit-thyme-aperol",
    name: "Grapefruit & Thyme Aperol",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13.50",
    glass: "Large wine glass",
    ice: "Fill with ice",
    image: image("grapefruit-thyme-aperol"),
    imageAlt: "Representative photograph of a coral Grapefruit & Thyme Aperol spritz with bubbles.",
    build: [
      ingredient("50", "Aperol", "Aperol aperitif", "aperol"),
      ingredient("25", "grapefruit sherbet"),
      ingredient("100", "Prosecco", "Prosecco sparkling wine", "prosecco"),
      ingredient("25", "soda")
    ],
    method: "Add still ingredients, then Prosecco, then soda. Gentle stir.",
    finish: "Grapefruit + thyme"
  },
  {
    id: "pear-pomegranate-hugo",
    name: "Pear & Pomegranate Hugo",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13.50",
    glass: "Large wine glass",
    ice: "Fill with ice",
    image: image("pear-pomegranate-hugo"),
    imageAlt: "Representative photograph of a rose-coloured Pear & Pomegranate Hugo with mint.",
    build: [
      ingredient(
        "25",
        "Mondoro Elderflower",
        "Mondoro Elderflower aperitif",
        "mondoro-elderflower"
      ),
      ingredient("25", "pear purée"),
      ingredient("10", "grenadine/pomegranate"),
      ingredient("100", "Prosecco", "Prosecco sparkling wine", "prosecco"),
      ingredient("25", "soda")
    ],
    method: "Add still ingredients, then Prosecco, then soda. Gentle stir.",
    finish: "Mint / venue finish",
    note: "Use pear purée, not pear syrup."
  },
  {
    id: "limoncello-lavender",
    name: "Limoncello & Lavender",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13.50",
    glass: "Large wine glass",
    ice: "Fill with ice",
    image: image("limoncello-lavender"),
    imageAlt: "Representative photograph of a pale yellow Limoncello & Lavender spritz with lemon.",
    build: [
      ingredient("50", "Limoncello", "Limoncello lemon liqueur", "limoncello"),
      ingredient(
        "10",
        "lavender Monin",
        "lavender MONIN syrup",
        "monin-lavender"
      ),
      ingredient("100", "Prosecco", "Prosecco sparkling wine", "prosecco"),
      ingredient("25", "soda")
    ],
    method: "Add still ingredients, then Prosecco, then soda. Gentle stir.",
    finish: "Lemon"
  },
  {
    id: "rhubarb-orange-zero",
    name: "Rhubarb & Orange 0%",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£9.50",
    glass: "Large wine glass",
    ice: "Fill with ice",
    alcoholFree: true,
    tags: ["0%", "alcohol-free", "mocktail"],
    image: image("rhubarb-orange-zero"),
    imageAlt: "Representative photograph of an alcohol-free rhubarb and orange spritz with bubbles.",
    build: [
      ingredient(
        "25",
        "Bristol Syrup Co rhubarb-and-orange syrup",
        "Bristol Syrup Co rhubarb-and-orange syrup",
        "bristol-rhubarb-orange"
      ),
      ingredient(
        "top",
        "premium 0% sparkling",
        "premium 0% sparkling alcohol-free drink",
        "premium-zero-sparkling"
      )
    ],
    method: "Add the still ingredient, then premium 0% sparkling. Gentle stir.",
    finish: "Orange",
    note: "Use one Bristol Syrup Co rhubarb-and-orange syrup."
  },
  {
    id: "aperol-spritz",
    name: "Aperol Spritz",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13",
    glass: "Large wine glass",
    ice: "Fill with ice",
    image: image("aperol-spritz"),
    imageAlt: "Representative photograph of a bright orange Aperol Spritz with bubbles and orange.",
    build: [
      ingredient("50", "Aperol", "Aperol aperitif", "aperol"),
      ingredient("100", "Prosecco", "Prosecco sparkling wine", "prosecco"),
      ingredient("25", "soda")
    ],
    method: "Add still ingredients, then Prosecco, then soda. Gentle stir.",
    finish: "Orange"
  },
  {
    id: "hugo-spritz",
    name: "Hugo Spritz",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13",
    glass: "Large wine glass",
    ice: "Fill with ice",
    image: image("hugo-spritz"),
    imageAlt: "Representative photograph of a pale Hugo Spritz with mint, lime and fine bubbles.",
    build: [
      ingredient(
        "25",
        "St-Germain",
        "St-Germain elderflower liqueur",
        "st-germain"
      ),
      ingredient("100", "Prosecco", "Prosecco sparkling wine", "prosecco"),
      ingredient("splash", "soda")
    ],
    method: "Add still ingredients, then Prosecco, then soda. Gentle stir.",
    finish: "Mint + lime wheel"
  },
  {
    id: "limoncello-spritz",
    name: "Limoncello Spritz",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13",
    glass: "Large wine glass",
    ice: "Fill with ice",
    image: image("limoncello-spritz"),
    imageAlt: "Representative photograph of a lemon-yellow Limoncello Spritz with a lemon wheel.",
    build: [
      ingredient(
        "50",
        "Pallini Limoncello",
        "Pallini Limoncello lemon liqueur",
        "pallini-limoncello"
      ),
      ingredient("100", "Prosecco", "Prosecco sparkling wine", "prosecco"),
      ingredient("splash", "soda")
    ],
    method: "Add still ingredients, then Prosecco, then soda. Gentle stir.",
    finish: "Lemon wheel"
  },
  {
    id: "sarti-spritz",
    name: "Sarti Spritz",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£13",
    glass: "Large wine glass",
    ice: "Fill with ice",
    image: image("sarti-spritz"),
    imageAlt: "Representative photograph of a vivid pink Sarti Spritz with bubbles and a lime slice.",
    build: [
      ingredient("60", "Sarti Rosa", "Sarti Rosa aperitif", "sarti-rosa"),
      ingredient("90", "Prosecco", "Prosecco sparkling wine", "prosecco"),
      ingredient("30", "soda")
    ],
    method: "Add still ingredients, then Prosecco, then soda. Gentle stir.",
    finish: "Lime slice"
  },
  {
    id: "floral-spritz",
    name: "Floral Spritz",
    category: "spritz",
    categoryLabel: "Spritz",
    price: "£10.25",
    glass: "Large wine glass",
    ice: "Fill with ice",
    alcoholFree: true,
    tags: ["0%", "alcohol-free", "mocktail"],
    image: image("floral-spritz"),
    imageAlt: "Representative photograph of a ruby alcohol-free Floral Spritz with fine bubbles.",
    build: [
      ingredient(
        "25",
        "Crossip Pure Hibiscus",
        "Crossip Pure Hibiscus alcohol-free spirit",
        "crossip-pure-hibiscus"
      ),
      ingredient("10", "rose"),
      ingredient(
        "top",
        "0% sparkling",
        "0% sparkling alcohol-free drink",
        "zero-sparkling"
      )
    ],
    method: "Build over ice; gentle stir.",
    ambiguity:
      "The revised source places this method in the finish column and does not specify a garnish."
  }
];

for (const drink of drinks) {
  drink.imageAlt = `Representative cocktail photograph for ${drink.name}, matched to the ${drink.glass} serving family.`;
}
