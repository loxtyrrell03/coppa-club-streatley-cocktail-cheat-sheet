import { beers, wines } from "./catalog-data.js";

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const normalise = (value) =>
  String(value)
    .toLocaleLowerCase("en-GB")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const wineGroupOrder = ["sparkling", "alcohol-free", "white", "rose", "red"];
const beerGroupOrder = ["draught", "packaged", "alcohol-free"];

const wineMarkup = (wine) => `
  <article class="catalog-item catalog-item--wine">
    <header class="catalog-item__header">
      <div>
        <p class="catalog-item__meta">${escapeHtml(wine.groupLabel)} · ${escapeHtml(wine.sweetness)}</p>
        <h4>${escapeHtml(wine.name)}</h4>
      </div>
      <p class="catalog-item__price">${escapeHtml(wine.price)}</p>
    </header>
    <p class="catalog-item__notes">${escapeHtml(wine.notes)}</p>
    <dl class="catalog-facts catalog-facts--wine">
      <div><dt>Style</dt><dd>${escapeHtml(wine.style)}</dd></div>
      <div><dt>Body</dt><dd>${escapeHtml(wine.body)}</dd></div>
      <div><dt>Origin</dt><dd>${escapeHtml(wine.origin)}</dd></div>
    </dl>
    <a class="catalog-source" href="${escapeHtml(wine.sourceUrl)}" target="_blank" rel="noopener">Source</a>
  </article>
`;

const beerMarkup = (beer) => `
  <article class="catalog-item catalog-item--beer">
    <header class="catalog-item__header">
      <div>
        <p class="catalog-item__meta">${escapeHtml(beer.groupLabel)} · ${escapeHtml(beer.style)}</p>
        <h4>${escapeHtml(beer.name)}</h4>
      </div>
      <p class="catalog-item__abv"><strong>${escapeHtml(beer.abv)}</strong><span>ABV</span></p>
    </header>
    <p class="catalog-item__notes">${escapeHtml(beer.profile)}</p>
    <dl class="catalog-facts catalog-facts--beer">
      <div><dt>Serve</dt><dd>${escapeHtml(beer.format)}</dd></div>
      <div><dt>Price</dt><dd>${escapeHtml(beer.price)}</dd></div>
    </dl>
    <a class="catalog-source" href="${escapeHtml(beer.sourceUrl)}" target="_blank" rel="noopener">Source</a>
  </article>
`;

function createCatalog({ items, list, count, empty, search, clear, reset, groupOrder, markup, noun }) {
  const state = { query: "" };
  const searchable = (item) => normalise(Object.values(item).join(" "));

  function matches() {
    const query = normalise(state.query.trim());
    return query ? items.filter((item) => searchable(item).includes(query)) : items;
  }

  function render() {
    const visible = matches();
    list.innerHTML = groupOrder
      .map((group) => {
        const grouped = visible.filter((item) => item.group === group);
        if (!grouped.length) return "";
        return `
          <section class="catalog-group" aria-labelledby="${noun}-${escapeHtml(group)}-title">
            <div class="catalog-group__heading">
              <h3 id="${noun}-${escapeHtml(group)}-title">${escapeHtml(grouped[0].groupLabel)}</h3>
              <span>${grouped.length}</span>
            </div>
            <div class="catalog-group__items">${grouped.map(markup).join("")}</div>
          </section>
        `;
      })
      .join("");
    list.hidden = visible.length === 0;
    empty.hidden = visible.length !== 0;
    clear.hidden = state.query.length === 0;
    count.textContent = `${visible.length} ${visible.length === 1 ? noun : `${noun}s`}`;
  }

  function resetSearch({ focus = true } = {}) {
    state.query = "";
    search.value = "";
    render();
    if (focus) search.focus();
  }

  search.addEventListener("input", (event) => {
    state.query = event.currentTarget.value;
    render();
  });
  clear.addEventListener("click", () => resetSearch());
  reset.addEventListener("click", () => resetSearch());
  render();
}

createCatalog({
  items: wines,
  list: document.querySelector("#wine-list"),
  count: document.querySelector("#wine-count"),
  empty: document.querySelector("#wine-empty"),
  search: document.querySelector("#wine-search"),
  clear: document.querySelector("#wine-clear"),
  reset: document.querySelector("#wine-reset"),
  groupOrder: wineGroupOrder,
  markup: wineMarkup,
  noun: "wine"
});

createCatalog({
  items: beers,
  list: document.querySelector("#beer-list"),
  count: document.querySelector("#beer-count"),
  empty: document.querySelector("#beer-empty"),
  search: document.querySelector("#beer-search"),
  clear: document.querySelector("#beer-clear"),
  reset: document.querySelector("#beer-reset"),
  groupOrder: beerGroupOrder,
  markup: beerMarkup,
  noun: "drink"
});
