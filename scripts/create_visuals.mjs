import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { drinks, products } from "../data.js";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const drinksDirectory = join(projectRoot, "images", "drinks");
const bottlesDirectory = join(projectRoot, "images", "bottles");

await Promise.all([
  mkdir(drinksDirectory, { recursive: true }),
  mkdir(bottlesDirectory, { recursive: true })
]);

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const palettes = {
  "pornstar-martini": ["#f0a632", "#f7d469", "#8b3f20"],
  "espresso-martini": ["#3d241b", "#9b6845", "#201813"],
  "hibiscus-rose-delight": ["#9b2445", "#ed8b9e", "#6f1532"],
  "lychee-rose-martini": ["#e6b6bd", "#f6dbe0", "#9c5665"],
  "popstar-martini": ["#f4b52e", "#fee18a", "#a95520"],
  margarita: ["#d9d365", "#f4edac", "#63834f"],
  negroni: ["#b53624", "#e97843", "#76251e"],
  "old-fashioned": ["#a85d24", "#d99a45", "#683915"],
  "peach-elderflower-mai-tai": ["#e68850", "#fac792", "#8a5233"],
  "rhubarb-raspberry-bramble": ["#9c244d", "#dc5b74", "#5d1736"],
  "green-chilli-mango-margarita": ["#e4a824", "#f4d15f", "#4c7f43"],
  "rum-fashioned": ["#8c4a21", "#cf8b3e", "#5d321b"],
  mojito: ["#7ebf78", "#d1e3a4", "#28664f"],
  "british-orchard-highball": ["#c35b66", "#efabb0", "#6d3145"],
  "spiced-pina-colada": ["#e7cf81", "#fff2bd", "#8a632f"],
  "acv-colada": ["#d7c886", "#f3e8b8", "#6f7440"],
  "blazing-pineapple-buck": ["#dc762b", "#f3ba46", "#863828"],
  "grapefruit-thyme-aperol": ["#e86543", "#f4a27e", "#596d44"],
  "pear-pomegranate-hugo": ["#c95168", "#ef9ca9", "#637c4d"],
  "limoncello-lavender": ["#e4c23a", "#f3e78c", "#8870a0"],
  "rhubarb-orange-zero": ["#d35847", "#f19a6c", "#834131"],
  "aperol-spritz": ["#e85d35", "#f5a06a", "#a23928"],
  "hugo-spritz": ["#d8d589", "#f1edbd", "#538353"],
  "limoncello-spritz": ["#e3c626", "#f3e77a", "#8a7420"],
  "sarti-spritz": ["#dc3f70", "#f387a2", "#802748"],
  "floral-spritz": ["#a62f59", "#e37b9a", "#62213f"]
};

const garnishKinds = {
  "pornstar-martini": "passion",
  "espresso-martini": "coffee",
  "hibiscus-rose-delight": "petal",
  "lychee-rose-martini": "lychee",
  "popstar-martini": "passion",
  margarita: "lime",
  negroni: "orange-peel",
  "old-fashioned": "orange-peel",
  "peach-elderflower-mai-tai": "pineapple",
  "rhubarb-raspberry-bramble": "berries",
  "green-chilli-mango-margarita": "chilli",
  "rum-fashioned": "banana",
  mojito: "mint-lime",
  "british-orchard-highball": "orchard",
  "spiced-pina-colada": "pineapple-chilli",
  "acv-colada": "apple",
  "blazing-pineapple-buck": "ginger-pineapple",
  "grapefruit-thyme-aperol": "grapefruit-thyme",
  "pear-pomegranate-hugo": "pear-mint",
  "limoncello-lavender": "lemon-lavender",
  "rhubarb-orange-zero": "orange",
  "aperol-spritz": "orange",
  "hugo-spritz": "mint-lime",
  "limoncello-spritz": "lemon",
  "sarti-spritz": "lime",
  "floral-spritz": "petal"
};

const garnish = (kind) => {
  const common = 'stroke="#173f37" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"';
  const citrus = (fill, inner = "#fff3c4") => `
    <g transform="translate(548 94) rotate(18)">
      <circle r="43" fill="${fill}" ${common}/>
      <circle r="31" fill="${inner}" stroke="none"/>
      <path d="M0 0V-30M0 0 25-17M0 0 25 17M0 0v30M0 0-25 17M0 0-25-17" fill="none" stroke="${fill}" stroke-width="4"/>
    </g>`;

  switch (kind) {
    case "passion":
      return `<g transform="translate(540 100) rotate(-10)"><ellipse rx="52" ry="38" fill="#734127" ${common}/><ellipse rx="39" ry="26" fill="#f7b735"/><g fill="#3d2a1a">${[-22, -8, 7, 22].map((x, index) => `<ellipse cx="${x}" cy="${index % 2 ? 7 : -6}" rx="4" ry="7"/>`).join("")}</g></g>`;
    case "coffee":
      return `<g fill="#5b2f1d" ${common}>${[-1, 0, 1].map((position) => `<ellipse cx="${400 + position * 32}" cy="${134 + Math.abs(position) * 6}" rx="13" ry="19"/><path d="M${400 + position * 32} ${119 + Math.abs(position) * 6}q-8 15 0 30" fill="none"/>`).join("")}</g>`;
    case "petal":
      return `<g transform="translate(542 104)" fill="#d44775" ${common}><ellipse cy="-23" rx="18" ry="35"/><ellipse cx="23" rx="35" ry="18"/><ellipse cy="23" rx="18" ry="35"/><ellipse cx="-23" rx="35" ry="18"/><circle r="12" fill="#f0b44e"/></g>`;
    case "lychee":
      return `<g transform="translate(544 102)"><circle r="38" fill="#f0c7c2" ${common}/><path d="M-24-8c18 8 29 3 47-8" fill="none" ${common}/><path d="M4-38q20-31 46-14" fill="none" ${common}/></g>`;
    case "lime":
      return citrus("#7ba952", "#dceba8");
    case "lemon":
      return citrus("#e3c62d", "#fff2a6");
    case "orange":
      return citrus("#e87231", "#ffd58c");
    case "orange-peel":
      return `<path d="M520 72c54 22 49 67 2 82-38 12-65 45-30 74" fill="none" stroke="#e8772f" stroke-width="18" stroke-linecap="round"/><path d="M520 72c54 22 49 67 2 82" fill="none" ${common}/>`;
    case "pineapple":
    case "ginger-pineapple":
      return `<g transform="translate(544 104) rotate(10)"><path d="M-20-26-36-75M0-30V-86M20-26 37-73" fill="none" stroke="#4a824c" stroke-width="12" stroke-linecap="round"/><ellipse rx="38" ry="48" fill="#e4af34" ${common}/><path d="M-28-25 28 25M28-25-28 25M-35 0h70" fill="none" stroke="#9b6a28" stroke-width="4"/></g>`;
    case "berries":
      return `<g transform="translate(542 106)" fill="#9b254d" ${common}><circle cx="-22" cy="9" r="24"/><circle cx="15" cy="14" r="25"/><circle cy="-17" r="24"/><path d="M0-40q12-28 37-25" fill="none"/></g>`;
    case "chilli":
      return `<path d="M520 61q77 31 48 102-31 60-99 34 63-4 59-76-2-31-23-43z" fill="#5c9a4a" ${common}/>`;
    case "banana":
      return `<path d="M495 65q61 8 92 57-24 77-112 61 59-18 78-57-20-31-68-41z" fill="#e7c849" ${common}/>`;
    case "mint-lime":
      return `${citrus("#7ba952", "#dceba8")}<g fill="#4c8b57" ${common}><ellipse cx="507" cy="60" rx="19" ry="35" transform="rotate(-32 507 60)"/><ellipse cx="542" cy="48" rx="18" ry="34" transform="rotate(18 542 48)"/><ellipse cx="571" cy="66" rx="18" ry="32" transform="rotate(45 571 66)"/></g>`;
    case "orchard":
    case "apple":
      return `<g transform="translate(542 102)"><path d="M0-30q-18-36 8-58" fill="none" ${common}/><path d="M8-66q31-17 45 3-28 15-45-3" fill="#5d9257" ${common}/><path d="M0-31c-63-31-81 91-4 102 75 13 95-133 4-102z" fill="#d96a62" ${common}/></g>`;
    case "pineapple-chilli":
      return `${garnish("pineapple")}<path d="M473 43q44 20 32 66-15 39-56 28 35-8 34-48-2-22-17-31z" fill="#5c9a4a" ${common}/>`;
    case "grapefruit-thyme":
      return `${citrus("#dd6652", "#ffd0b3")}<path d="M493 61q-38-42-67-3m50 14-61 18m72-5-49 38" fill="none" stroke="#607b4a" stroke-width="7" stroke-linecap="round"/>`;
    case "pear-mint":
      return `<g transform="translate(540 105)"><path d="M0-30q7-35 25-55" fill="none" ${common}/><path d="M-4-27c-51 17-70 87-7 105 72 20 96-71 10-105z" fill="#b7c96b" ${common}/><ellipse cx="33" cy="-63" rx="25" ry="12" transform="rotate(-22 33 -63)" fill="#4f8a51" ${common}/></g>`;
    case "lemon-lavender":
      return `${citrus("#e3c62d", "#fff2a6")}<g fill="#8062a3">${[-18, -6, 6, 18].map((y) => `<circle cx="487" cy="${68 + y}" r="7"/>`).join("")}</g><path d="M487 54v73" stroke="#54734c" stroke-width="5"/>`;
    default:
      return "";
  }
};

const ice = (category) => {
  if (category === "coupe") return "";
  const cubes =
    category === "highball"
      ? [
          [324, 144, -8],
          [397, 116, 8],
          [338, 230, 12],
          [408, 215, -10],
          [370, 302, 5]
        ]
      : [
          [298, 178, -10],
          [390, 145, 8],
          [465, 190, -7],
          [338, 258, 10],
          [430, 270, -11]
        ];
  return cubes
    .map(
      ([x, y, rotation]) =>
        `<rect x="${x}" y="${y}" width="76" height="64" rx="12" transform="rotate(${rotation} ${x + 38} ${y + 32})" fill="#fff" fill-opacity=".22" stroke="#fff" stroke-opacity=".55" stroke-width="4"/>`
    )
    .join("");
};

const bubbles = (category) => {
  if (category !== "spritz") return "";
  return [
    [350, 247, 7],
    [411, 209, 5],
    [378, 162, 6],
    [442, 278, 4],
    [334, 303, 4],
    [428, 138, 4]
  ]
    .map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3"/>`)
    .join("");
};

const glassMarkup = (drink, liquid, highlight) => {
  const glassStroke = 'stroke="#173f37" stroke-width="7" stroke-linejoin="round"';
  if (drink.category === "coupe") {
    return `
      <path d="M220 143Q246 303 400 324Q554 303 580 143Z" fill="${liquid}" ${glassStroke}/>
      <ellipse cx="400" cy="143" rx="180" ry="25" fill="${highlight}" fill-opacity=".8" ${glassStroke}/>
      <path d="M400 324v83M325 420h150" fill="none" stroke="#173f37" stroke-width="8" stroke-linecap="round"/>
      ${drink.glass.includes("shot") ? `<g><rect x="622" y="260" width="74" height="118" rx="10" fill="#fff" fill-opacity=".28" ${glassStroke}/><path d="M626 319h66v55h-66z" fill="${highlight}"/></g>` : ""}
    `;
  }
  if (drink.category === "rocks") {
    return `
      <path d="M240 92h320l-23 292q-2 30-32 30H295q-30 0-32-30z" fill="#fff" fill-opacity=".22" ${glassStroke}/>
      <path d="M258 188h284l-15 191q-2 20-23 20H296q-21 0-23-20z" fill="${liquid}" opacity=".95"/>
      ${ice(drink.category)}
      <path d="M240 92h320" stroke="#173f37" stroke-width="8" stroke-linecap="round"/>
    `;
  }
  if (drink.category === "highball") {
    return `
      <path d="M285 49h230l-17 351q-1 18-21 18H323q-20 0-21-18z" fill="#fff" fill-opacity=".22" ${glassStroke}/>
      <path d="M299 126h202l-13 270q0 10-13 10H325q-13 0-13-10z" fill="${liquid}" opacity=".93"/>
      ${ice(drink.category)}
      <path d="M285 49h230" stroke="#173f37" stroke-width="8" stroke-linecap="round"/>
    `;
  }
  return `
    <path d="M235 69q0 231 165 264Q565 300 565 69Z" fill="#fff" fill-opacity=".2" ${glassStroke}/>
    <path d="M251 143q19 160 149 181 130-21 149-181z" fill="${liquid}" opacity=".92"/>
    ${ice(drink.category)}
    ${bubbles(drink.category)}
    <ellipse cx="400" cy="69" rx="165" ry="24" fill="${highlight}" fill-opacity=".75" ${glassStroke}/>
    <path d="M400 333v72M327 419h146" fill="none" stroke="#173f37" stroke-width="8" stroke-linecap="round"/>
  `;
};

const drinkSvg = (drink) => {
  const [liquid, highlight, accent] = palettes[drink.id];
  const title = escapeXml(drink.imageAlt);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">Original editorial illustration created for this offline recipe guide.</desc>
  <defs>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#f8f2e7"/>
      <stop offset="1" stop-color="${highlight}" stop-opacity=".32"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#173f37" flood-opacity=".2"/>
    </filter>
  </defs>
  <rect width="800" height="450" rx="32" fill="url(#paper)"/>
  <circle cx="96" cy="70" r="42" fill="${accent}" opacity=".12"/>
  <path d="M27 353q146-63 296-12t278 4q98-35 172-7v112H27z" fill="${accent}" opacity=".08"/>
  <ellipse cx="400" cy="420" rx="240" ry="20" fill="#173f37" opacity=".12"/>
  <g filter="url(#shadow)">${glassMarkup(drink, liquid, highlight)}</g>
  ${garnish(garnishKinds[drink.id])}
  <path d="M95 131q35-29 68-2t68-2" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round" opacity=".35"/>
</svg>`;
};

const hueFrom = (id) =>
  [...id].reduce((total, character) => total + character.charCodeAt(0), 0) % 360;

const wrapLabel = (label, maximumLength = 20, maximumLines = 4) => {
  const words = label.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (`${line} ${word}`.trim().length > maximumLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = `${line} ${word}`.trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, maximumLines);
};

const bottleSvg = (product) => {
  const hue = hueFrom(product.id);
  const bottleColour = `hsl(${hue} 35% 32%)`;
  const accentColour = `hsl(${(hue + 42) % 360} 62% 58%)`;
  const labelLines = wrapLabel(product.label, 18, 3);
  const typeLines = wrapLabel(product.type, 24, 3);
  const labelStart = 392;
  const typeStart = labelStart + labelLines.length * 38 + 18;
  const title = escapeXml(product.imageAlt);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 780" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">A clearly labelled original reference illustration, not an official product pack shot.</desc>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#fbf6ed"/>
      <stop offset="1" stop-color="${accentColour}" stop-opacity=".2"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="${bottleColour}"/>
      <stop offset=".45" stop-color="${accentColour}"/>
      <stop offset=".72" stop-color="${bottleColour}"/>
    </linearGradient>
    <filter id="shadow" x="-40%" y="-20%" width="180%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#173f37" flood-opacity=".22"/>
    </filter>
  </defs>
  <rect width="600" height="780" rx="40" fill="url(#background)"/>
  <path d="M80 124q92-74 174-13t167 13q53-30 99-6" fill="none" stroke="${accentColour}" stroke-width="12" stroke-linecap="round" opacity=".38"/>
  <ellipse cx="300" cy="698" rx="185" ry="28" fill="#173f37" opacity=".14"/>
  <g filter="url(#shadow)">
    <rect x="251" y="82" width="98" height="84" rx="12" fill="#173f37"/>
    <rect x="242" y="148" width="116" height="140" rx="34" fill="url(#glass)" stroke="#173f37" stroke-width="8"/>
    <path d="M242 240q-18 48-67 88-33 27-33 85v226q0 42 42 42h232q42 0 42-42V413q0-58-33-85-49-40-67-88z" fill="url(#glass)" stroke="#173f37" stroke-width="9" stroke-linejoin="round"/>
    <path d="M205 313q-30 46-30 106v180" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round" opacity=".2"/>
    <rect x="166" y="310" width="268" height="312" rx="22" fill="#fffaf0" stroke="#173f37" stroke-width="7"/>
    <path d="M166 360h268" stroke="${accentColour}" stroke-width="13"/>
    <text x="300" y="344" text-anchor="middle" fill="#173f37" font-family="Arial, sans-serif" font-size="15" font-weight="800" letter-spacing="2.4">BOTTLE REFERENCE</text>
    ${labelLines.map((line, index) => `<text x="300" y="${labelStart + index * 38}" text-anchor="middle" fill="#173f37" font-family="Georgia, serif" font-size="22" font-weight="700">${escapeXml(line)}</text>`).join("")}
    ${typeLines.map((line, index) => `<text x="300" y="${typeStart + index * 22}" text-anchor="middle" fill="#7b3628" font-family="Arial, sans-serif" font-size="13" font-weight="800">${escapeXml(line.toUpperCase())}</text>`).join("")}
  </g>
  <text x="300" y="744" text-anchor="middle" fill="#50635d" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="1.5">ORIGINAL LABELLED ILLUSTRATION</text>
</svg>`;
};

await Promise.all([
  ...drinks.map((drink) =>
    writeFile(join(drinksDirectory, `${drink.id}.svg`), drinkSvg(drink), "utf8")
  ),
  ...Object.values(products).map((product) =>
    writeFile(join(bottlesDirectory, `${product.id}.svg`), bottleSvg(product), "utf8")
  )
]);

const imageAssets = [
  ...drinks.map((drink) => drink.image.slice(2)),
  ...Object.values(products).map((product) => product.image.slice(2))
].sort();

await writeFile(
  join(projectRoot, "asset-manifest.js"),
  `self.COPPA_IMAGE_ASSETS = ${JSON.stringify(imageAssets, null, 2)};\n`,
  "utf8"
);

console.log(
  `Created ${drinks.length} drink illustrations and ${Object.keys(products).length} bottle references.`
);
