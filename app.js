import { drinks } from "./data.js";

const categoryNames = {
  all: "All drinks",
  coupe: "Coupe / Martini",
  rocks: "Rocks",
  highball: "Highball",
  spritz: "Spritz"
};

const state = {
  category: "all",
  query: ""
};

const elements = {
  grid: document.querySelector("#recipe-grid"),
  empty: document.querySelector("#empty-state"),
  heading: document.querySelector("#results-heading"),
  count: document.querySelector("#result-count"),
  search: document.querySelector("#search"),
  clear: document.querySelector("#clear-search"),
  reset: document.querySelector("#reset-search"),
  filters: [...document.querySelectorAll(".filter")],
  installButton: document.querySelector("#install-button"),
  installDialog: document.querySelector("#install-dialog"),
  dialogClose: document.querySelector("#dialog-close"),
  dialogDone: document.querySelector("#dialog-done"),
  offlineBanner: document.querySelector("#offline-banner")
};

const normalise = (value) =>
  String(value)
    .toLocaleLowerCase("en-GB")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const searchableText = (drink) =>
  normalise(
    [
      drink.name,
      drink.categoryLabel,
      drink.price,
      drink.glass,
      drink.ice,
      drink.method,
      drink.finish,
      drink.note,
      ...(drink.tags ?? []),
      ...drink.build.flat()
    ].join(" ")
  );

const ingredientMarkup = ([measure, ingredient]) => `
  <li>
    ${measure ? `<span class="measure">${measure}</span>` : ""}
    <span>${ingredient}</span>
  </li>
`;

const cardMarkup = (drink, index) => `
  <article class="recipe-card" style="--order: ${Math.min(index, 8)}" id="${drink.id}">
    <div class="card-topline">
      <p class="category-label">${drink.categoryLabel}</p>
      ${drink.alcoholFree ? '<p class="zero-badge">Alcohol-free</p>' : ""}
    </div>

    <div class="name-price">
      <h3>${drink.name}</h3>
      <p class="price">${drink.price}</p>
    </div>

    <dl class="serve-facts">
      <div>
        <dt>Glass</dt>
        <dd>${drink.glass}</dd>
      </div>
      <div>
        <dt>Ice</dt>
        <dd>${drink.ice}</dd>
      </div>
    </dl>

    <section class="card-section" aria-labelledby="${drink.id}-build">
      <h4 id="${drink.id}-build">Build</h4>
      <ul class="build-list">
        ${drink.build.map(ingredientMarkup).join("")}
      </ul>
    </section>

    <section class="card-section method-section" aria-labelledby="${drink.id}-method">
      <h4 id="${drink.id}-method">Method</h4>
      <p>${drink.method}</p>
    </section>

    ${
      drink.finish
        ? `
          <section class="card-section finish-section" aria-labelledby="${drink.id}-finish">
            <h4 id="${drink.id}-finish">Finish</h4>
            <p>${drink.finish}</p>
          </section>
        `
        : ""
    }

    ${
      drink.note
        ? `
          <aside class="recipe-note">
            <strong>Watch:</strong> ${drink.note}
          </aside>
        `
        : ""
    }
  </article>
`;

function visibleDrinks() {
  const query = normalise(state.query.trim());
  return drinks.filter((drink) => {
    const categoryMatches = state.category === "all" || drink.category === state.category;
    const searchMatches = !query || searchableText(drink).includes(query);
    return categoryMatches && searchMatches;
  });
}

function render() {
  const matches = visibleDrinks();
  elements.grid.innerHTML = matches.map(cardMarkup).join("");
  elements.grid.hidden = matches.length === 0;
  elements.empty.hidden = matches.length !== 0;
  elements.clear.hidden = state.query.length === 0;
  elements.heading.textContent = state.query
    ? state.category === "all"
      ? "Search results"
      : `Results in ${categoryNames[state.category]}`
    : categoryNames[state.category];
  elements.count.textContent = `${matches.length} ${matches.length === 1 ? "recipe" : "recipes"}`;
}

elements.search.addEventListener("input", (event) => {
  state.query = event.currentTarget.value;
  render();
});

elements.clear.addEventListener("click", () => {
  state.query = "";
  elements.search.value = "";
  elements.search.focus();
  render();
});

elements.reset.addEventListener("click", () => {
  state.category = "all";
  state.query = "";
  elements.search.value = "";
  elements.filters.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.category === "all"));
  });
  render();
  elements.search.focus();
});

elements.filters.forEach((button) => {
  button.addEventListener("click", () => {
    state.category = button.dataset.category;
    elements.filters.forEach((filter) => {
      filter.setAttribute("aria-pressed", String(filter === button));
    });
    render();
    window.scrollTo({
      top: document.querySelector(".tools").offsetTop,
      behavior: "smooth"
    });
  });
});

let deferredInstallPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
});

elements.installButton.addEventListener("click", async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = undefined;
    return;
  }
  elements.installDialog.showModal();
});

elements.dialogClose.addEventListener("click", () => elements.installDialog.close());
elements.dialogDone.addEventListener("click", () => elements.installDialog.close());
elements.installDialog.addEventListener("click", (event) => {
  if (event.target === elements.installDialog) {
    elements.installDialog.close();
  }
});

function updateConnectionStatus() {
  elements.offlineBanner.hidden = navigator.onLine;
}

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
updateConnectionStatus();
render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      // The recipes still work online if service-worker registration is unavailable.
    });
  });
}
