import { drinks, products } from "./data.js";
import { photoCredits } from "./photo-credits.js";
import "./study.js";

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
  bottleDialog: document.querySelector("#bottle-dialog"),
  bottleClose: document.querySelector("#bottle-close"),
  bottleDone: document.querySelector("#bottle-done"),
  bottleImage: document.querySelector("#bottle-image"),
  bottleTitle: document.querySelector("#bottle-title"),
  bottleType: document.querySelector("#bottle-type"),
  bottleNote: document.querySelector("#bottle-note"),
  bottleCredit: document.querySelector("#bottle-credit"),
  bottleLicense: document.querySelector("#bottle-license"),
  offlineBanner: document.querySelector("#offline-banner")
};

const normalise = (value) =>
  String(value)
    .toLocaleLowerCase("en-GB")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const searchableText = (drink) =>
  normalise(
    [
      drink.name,
      drink.categoryLabel,
      drink.price,
      drink.glass,
      drink.ice,
      drink.method,
      drink.serve,
      drink.finish,
      drink.note,
      drink.ambiguity,
      ...(drink.tags ?? []),
      ...drink.build.flatMap((item) => [
        item.measure,
        item.sourceName,
        item.displayName,
        item.productId ? products[item.productId]?.type : ""
      ])
    ].join(" ")
  );

const bottleIcon = `
  <svg class="bottle-icon" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M9 3h6v4l2 3v9.5c0 .83-.67 1.5-1.5 1.5h-7A1.5 1.5 0 0 1 7 19.5V10l2-3V3Zm0 9h6v5H9v-5Z" />
  </svg>
`;

const productButtonMarkup = ({ productId, sourceName, measure = "", className = "" }) => {
  const product = products[productId];
  if (!product) return "";
  const combinedLabel = `${sourceName}, ${product.type}`;
  return `
    <button
      class="ingredient-button ${className}"
      type="button"
      data-product-id="${escapeHtml(productId)}"
      aria-haspopup="dialog"
      aria-controls="bottle-dialog"
      aria-label="Open photo reference for ${escapeHtml(combinedLabel)}"
    >
      ${measure ? `<span class="measure">${escapeHtml(measure)}</span>` : ""}
      <span class="ingredient-copy">
        <span class="ingredient-name">${escapeHtml(sourceName)}</span>
        <span class="ingredient-kind">${escapeHtml(product.type)}</span>
      </span>
      ${bottleIcon}
    </button>
  `;
};

const ingredientMarkup = (item) => {
  if (item.productId) {
    return `<li class="build-item build-item--product">${productButtonMarkup(item)}</li>`;
  }

  return `
    <li class="build-item">
      ${item.measure ? `<span class="measure">${escapeHtml(item.measure)}</span>` : ""}
      <span class="ingredient-name">${escapeHtml(item.sourceName)}</span>
    </li>
  `;
};

const photoCreditMarkup = (credit) => {
  if (!credit) return "";
  return `
    <figcaption class="photo-credit">
      <a href="${escapeHtml(credit.sourceUrl)}" target="_blank" rel="noopener">
        Photo: ${escapeHtml(credit.creator)}
      </a>
      <span aria-hidden="true">·</span>
      <a href="${escapeHtml(credit.licenseUrl)}" target="_blank" rel="noopener">
        ${escapeHtml(credit.license)}
      </a>
    </figcaption>
  `;
};

const cardMarkup = (drink, index) => `
  <article class="recipe-card" style="--order: ${Math.min(index, 8)}" id="${escapeHtml(drink.id)}">
    <figure class="drink-visual">
      <img
        src="${escapeHtml(drink.image)}"
        alt="${escapeHtml(drink.imageAlt)}"
        width="800"
        height="450"
        loading="${index < 2 ? "eager" : "lazy"}"
        decoding="async"
      />
      <div class="drink-visual__fallback" hidden role="img" aria-label="Drink image unavailable">
        <svg aria-hidden="true" viewBox="0 0 80 80">
          <path d="M18 14h44q-3 29-22 33Q21 43 18 14Zm22 33v18m-14 0h28" />
        </svg>
        <span>Recipe image unavailable</span>
      </div>
      ${photoCreditMarkup(photoCredits.drinks[drink.id])}
    </figure>

    <div class="card-topline">
      <p class="category-label">${escapeHtml(drink.categoryLabel)}</p>
      ${drink.alcoholFree ? '<p class="zero-badge">Alcohol-free</p>' : ""}
    </div>

    <div class="name-price">
      <h3>${escapeHtml(drink.name)}</h3>
      <p class="price">${escapeHtml(drink.price)}</p>
    </div>

    <dl class="serve-facts">
      <div>
        <dt>Glass</dt>
        <dd>${escapeHtml(drink.glass)}</dd>
      </div>
      <div>
        <dt>Ice</dt>
        <dd>${escapeHtml(drink.ice)}</dd>
      </div>
    </dl>

    <section class="card-section" aria-labelledby="${escapeHtml(drink.id)}-build">
      <div class="section-heading">
        <h4 id="${escapeHtml(drink.id)}-build">Build</h4>
        <span>Numbered measures: ml</span>
      </div>
      <ul class="build-list">
        ${drink.build.map(ingredientMarkup).join("")}
      </ul>
    </section>

    <section class="card-section method-section" aria-labelledby="${escapeHtml(drink.id)}-method">
      <h4 id="${escapeHtml(drink.id)}-method">Method</h4>
      <p>${escapeHtml(drink.method)}</p>
    </section>

    ${
      drink.serve
        ? `
          <section class="card-section serve-section" aria-labelledby="${escapeHtml(drink.id)}-serve">
            <h4 id="${escapeHtml(drink.id)}-serve">Serve</h4>
            ${
              drink.serveProductId
                ? productButtonMarkup({
                    productId: drink.serveProductId,
                    sourceName: drink.serve,
                    className: "serve-product-button"
                  })
                : `<p>${escapeHtml(drink.serve)}</p>`
            }
          </section>
        `
        : ""
    }

    ${
      drink.finish
        ? `
          <section class="card-section finish-section" aria-labelledby="${escapeHtml(drink.id)}-finish">
            <h4 id="${escapeHtml(drink.id)}-finish">Finish</h4>
            <p>${escapeHtml(drink.finish)}</p>
          </section>
        `
        : ""
    }

    ${
      drink.note
        ? `
          <aside class="recipe-note">
            <strong>Watch:</strong> ${escapeHtml(drink.note)}
          </aside>
        `
        : ""
    }

    ${
      drink.ambiguity
        ? `
          <aside class="source-ambiguity">
            <strong>Source note:</strong> ${escapeHtml(drink.ambiguity)}
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

elements.grid.addEventListener("error", (event) => {
  if (!event.target.matches(".drink-visual img")) return;
  const figure = event.target.closest(".drink-visual");
  event.target.hidden = true;
  figure.querySelector(".drink-visual__fallback").hidden = false;
}, true);

let lastBottleTrigger = null;

function openBottleDialog(trigger) {
  const product = products[trigger.dataset.productId];
  if (!product) return;
  const credit = photoCredits.products[product.id];

  lastBottleTrigger = trigger;
  delete elements.bottleImage.dataset.fallback;
  elements.bottleImage.src = product.image;
  elements.bottleImage.alt = credit
    ? `${product.label}, ${product.type}. ${credit.note}. Photograph by ${credit.creator}.`
    : product.imageAlt;
  elements.bottleTitle.textContent = product.label;
  elements.bottleType.textContent = product.type;
  elements.bottleNote.textContent =
    credit?.note ?? "Photographic bottle or ingredient reference.";
  elements.bottleCredit.href = credit?.sourceUrl ?? product.sourceUrl;
  elements.bottleCredit.textContent = credit ? `Photo: ${credit.creator}` : "Product reference";
  elements.bottleLicense.href = credit?.licenseUrl ?? product.sourceUrl;
  elements.bottleLicense.textContent = credit?.license ?? "Source";
  elements.bottleDialog.showModal();
  history.pushState(
    { coppaBottle: product.id },
    "",
    `${location.pathname}${location.search}#bottle-${product.id}`
  );
  elements.bottleClose.focus();
}

function closeBottleDialog({ fromHistory = false } = {}) {
  if (elements.bottleDialog.open) {
    elements.bottleDialog.close();
  }
  if (!fromHistory && history.state?.coppaBottle) {
    history.back();
  }
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest(".ingredient-button");
  if (trigger) openBottleDialog(trigger);
});

elements.bottleClose.addEventListener("click", () => closeBottleDialog());
elements.bottleDone.addEventListener("click", () => closeBottleDialog());
elements.bottleDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeBottleDialog();
});
elements.bottleDialog.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  const focusable = [elements.bottleClose, elements.bottleDone];
  const first = focusable[0];
  const last = focusable.at(-1);
  if (
    event.shiftKey &&
    (document.activeElement === first ||
      !elements.bottleDialog.contains(document.activeElement))
  ) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
elements.bottleDialog.addEventListener("click", (event) => {
  if (event.target === elements.bottleDialog) closeBottleDialog();
});
elements.bottleDialog.addEventListener("close", () => {
  lastBottleTrigger?.focus();
});
elements.bottleImage.addEventListener("error", () => {
  if (elements.bottleImage.dataset.fallback === "true") return;
  elements.bottleImage.dataset.fallback = "true";
  elements.bottleImage.src = "./icons/icon.svg";
  elements.bottleImage.alt = "Bottle reference image unavailable.";
  elements.bottleNote.textContent =
    "Image unavailable — use the exact product name and ingredient type shown here.";
});

window.addEventListener("popstate", () => {
  if (elements.bottleDialog.open) closeBottleDialog({ fromHistory: true });
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
