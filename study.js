import { products } from "./data.js";
import { flashcards } from "./flashcards.js";
import { photoCredits } from "./photo-credits.js";
import {
  formatInterval,
  newSchedule,
  nextInterval,
  ratingOrder,
  scheduleReview
} from "./scheduler.js";

const STORAGE_KEY = "coppa-study-v1";
const DAY = 24 * 60 * 60 * 1000;

const elements = {
  recipesView: document.querySelector("#recipes-view"),
  studyView: document.querySelector("#study"),
  navLinks: [...document.querySelectorAll("[data-app-view]")],
  navCount: document.querySelector("#study-nav-count"),
  skipLink: document.querySelector(".skip-link"),
  dashboard: document.querySelector("#study-dashboard"),
  session: document.querySelector("#study-session"),
  complete: document.querySelector("#study-complete"),
  start: document.querySelector("#study-start"),
  end: document.querySelector("#study-end"),
  restart: document.querySelector("#study-restart"),
  reset: document.querySelector("#study-reset"),
  dueCount: document.querySelector("#study-due-count"),
  newCount: document.querySelector("#study-new-count"),
  learntCount: document.querySelector("#study-learnt-count"),
  streak: document.querySelector("#study-streak"),
  nextDue: document.querySelector("#study-next-due"),
  progressText: document.querySelector("#study-progress-text"),
  progressBar: document.querySelector("#study-progress-bar"),
  cardStage: document.querySelector("#study-card-stage"),
  showAnswer: document.querySelector("#show-answer"),
  answer: document.querySelector("#study-answer"),
  gradePanel: document.querySelector("#study-grades"),
  resultSummary: document.querySelector("#study-result-summary"),
  resultBreakdown: document.querySelector("#study-result-breakdown")
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const dayKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function emptyProgress() {
  return {
    version: 1,
    cards: {},
    activity: {},
    streak: 0,
    lastStudyDay: null
  };
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved?.version === 1 ? { ...emptyProgress(), ...saved } : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

let progress = loadProgress();
let queue = [];
let initialQueueSize = 0;
let sessionRatings = { again: 0, hard: 0, good: 0, easy: 0 };
let answerVisible = false;

const scheduleFor = (id) => ({ ...newSchedule(), ...(progress.cards[id] ?? {}) });

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function dueCards(now = Date.now()) {
  return flashcards.filter((card) => {
    const schedule = scheduleFor(card.id);
    return schedule.state === "new" || schedule.dueAt <= now;
  });
}

function updateStreak(now = new Date()) {
  const today = dayKey(now);
  if (progress.lastStudyDay === today) return;

  const yesterday = dayKey(new Date(now.getTime() - DAY));
  progress.streak = progress.lastStudyDay === yesterday ? progress.streak + 1 : 1;
  progress.lastStudyDay = today;
}

function nextDueCopy(now = Date.now()) {
  const scheduled = flashcards
    .map((card) => scheduleFor(card.id))
    .filter((schedule) => schedule.state !== "new")
    .map((schedule) => schedule.dueAt)
    .filter((dueAt) => dueAt > now)
    .sort((a, b) => a - b);

  if (!scheduled.length) return "No scheduled reviews yet";
  const wait = scheduled[0] - now;
  if (wait < 60 * 60 * 1000) return `Next review in ${Math.max(1, Math.ceil(wait / 60000))} min`;
  if (wait < DAY) return `Next review in ${Math.ceil(wait / (60 * 60 * 1000))} hr`;
  return `Next review in ${Math.ceil(wait / DAY)} day`;
}

function renderDashboard() {
  const schedules = flashcards.map((card) => scheduleFor(card.id));
  const due = dueCards();
  const newCount = schedules.filter((schedule) => schedule.state === "new").length;
  const learnt = schedules.filter((schedule) => schedule.state === "review").length;

  elements.dueCount.textContent = due.length;
  elements.newCount.textContent = newCount;
  elements.learntCount.textContent = learnt;
  elements.streak.textContent = progress.streak;
  elements.navCount.textContent = due.length;
  elements.nextDue.textContent = due.length
    ? `${due.length} ${due.length === 1 ? "card" : "cards"} ready now`
    : nextDueCopy();
  elements.start.textContent = due.length ? `Study ${due.length} due` : "Nothing due";
  elements.start.disabled = due.length === 0;
}

const productButton = (item) => {
  const product = products[item.productId];
  if (!product) return "";
  return `
    <button
      class="ingredient-button study-ingredient"
      type="button"
      data-product-id="${escapeHtml(item.productId)}"
      aria-haspopup="dialog"
      aria-controls="bottle-dialog"
      aria-label="Open photo reference for ${escapeHtml(item.sourceName)}, ${escapeHtml(product.type)}"
    >
      ${item.measure ? `<span class="measure">${escapeHtml(item.measure)}</span>` : ""}
      <span class="ingredient-copy">
        <span class="ingredient-name">${escapeHtml(item.sourceName)}</span>
        <span class="ingredient-kind">${escapeHtml(product.type)}</span>
      </span>
      <svg class="bottle-icon" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M9 3h6v4l2 3v9.5c0 .83-.67 1.5-1.5 1.5h-7A1.5 1.5 0 0 1 7 19.5V10l2-3V3Zm0 9h6v5H9v-5Z" />
      </svg>
    </button>
  `;
};

const ingredient = (item) =>
  item.productId
    ? `<li class="build-item build-item--product">${productButton(item)}</li>`
    : `
      <li class="build-item">
        ${item.measure ? `<span class="measure">${escapeHtml(item.measure)}</span>` : ""}
        <span class="ingredient-name">${escapeHtml(item.sourceName)}</span>
      </li>
    `;

function answerMarkup(card) {
  const { drink } = card;
  const credit = photoCredits.drinks[drink.id];
  return `
    <figure class="study-photo">
      <img src="${escapeHtml(drink.image)}" alt="${escapeHtml(drink.imageAlt)}" width="800" height="450" />
      <figcaption>
        <a href="${escapeHtml(credit.sourceUrl)}" target="_blank" rel="noopener">
          Photo: ${escapeHtml(credit.creator)}
        </a>
      </figcaption>
    </figure>
    <div class="study-answer__body">
      <div class="study-serve-facts">
        <p><span>Glass</span><strong>${escapeHtml(drink.glass)}</strong></p>
        <p><span>Ice</span><strong>${escapeHtml(drink.ice)}</strong></p>
        <p><span>Price</span><strong>${escapeHtml(drink.price)}</strong></p>
      </div>
      <section class="study-build">
        <div class="section-heading">
          <h3>Build</h3>
          <span>Numbered measures: ml</span>
        </div>
        <ul class="build-list">${drink.build.map(ingredient).join("")}</ul>
      </section>
      <dl class="study-details">
        <div>
          <dt>Method</dt>
          <dd>${escapeHtml(drink.method)}</dd>
        </div>
        ${
          drink.serve
            ? `
              <div>
                <dt>Serve</dt>
                <dd>
                  ${
                    drink.serveProductId
                      ? productButton({
                          productId: drink.serveProductId,
                          sourceName: drink.serve,
                          measure: ""
                        })
                      : escapeHtml(drink.serve)
                  }
                </dd>
              </div>
            `
            : ""
        }
        <div>
          <dt>Finish</dt>
          <dd>${escapeHtml(drink.finish || "None listed")}</dd>
        </div>
      </dl>
    </div>
  `;
}

function gradeButtons(card) {
  const schedule = scheduleFor(card.id);
  elements.gradePanel.innerHTML = ratingOrder
    .map(
      (rating, index) => `
        <button class="grade grade--${rating}" type="button" data-rating="${rating}">
          <span>${index + 1}</span>
          <strong>${rating[0].toUpperCase()}${rating.slice(1)}</strong>
          <small>${formatInterval(nextInterval(schedule, rating))}</small>
        </button>
      `
    )
    .join("");
}

function renderCard() {
  const card = queue[0];
  if (!card) {
    finishSession();
    return;
  }

  answerVisible = false;
  const completed = Math.max(0, initialQueueSize - queue.length);
  const denominator = Math.max(initialQueueSize, completed + queue.length);
  elements.progressText.textContent = `Card ${completed + 1} of ${denominator}`;
  elements.progressBar.style.width = `${Math.min(100, (completed / denominator) * 100)}%`;
  elements.cardStage.innerHTML = `
    <div class="study-question" id="study-question">
      <p class="category-label">${escapeHtml(card.drink.categoryLabel)}</p>
      ${card.tags.includes("alcohol_free") ? '<p class="zero-badge">Alcohol-free</p>' : ""}
      <h2>${escapeHtml(card.front)}</h2>
      <p>Recall the full build, method, glass, ice and finish.</p>
    </div>
  `;
  elements.answer.innerHTML = answerMarkup(card);
  elements.answer.hidden = true;
  elements.gradePanel.hidden = true;
  elements.showAnswer.hidden = false;
  elements.showAnswer.focus();
  gradeButtons(card);
}

function startSession() {
  queue = dueCards();
  initialQueueSize = queue.length;
  sessionRatings = { again: 0, hard: 0, good: 0, easy: 0 };
  elements.dashboard.hidden = true;
  elements.complete.hidden = true;
  elements.session.hidden = false;
  renderCard();
}

function revealAnswer() {
  if (answerVisible || !queue[0]) return;
  answerVisible = true;
  elements.answer.hidden = false;
  elements.gradePanel.hidden = false;
  elements.showAnswer.hidden = true;
  elements.gradePanel.querySelector("button")?.focus();
}

function rateCurrent(rating) {
  if (!answerVisible || !ratingOrder.includes(rating) || !queue[0]) return;
  const card = queue.shift();
  const now = Date.now();
  progress.cards[card.id] = scheduleReview(scheduleFor(card.id), rating, now);
  updateStreak(new Date(now));
  const today = dayKey(new Date(now));
  progress.activity[today] = (progress.activity[today] ?? 0) + 1;
  sessionRatings[rating] += 1;

  if (rating === "again") {
    queue.splice(Math.min(3, queue.length), 0, card);
    initialQueueSize += 1;
  }

  saveProgress();
  renderDashboard();
  renderCard();
}

function finishSession() {
  elements.session.hidden = true;
  elements.dashboard.hidden = true;
  elements.complete.hidden = false;
  const total = Object.values(sessionRatings).reduce((sum, count) => sum + count, 0);
  elements.resultSummary.textContent = `${total} ${total === 1 ? "answer" : "answers"} graded`;
  elements.resultBreakdown.innerHTML = ratingOrder
    .map(
      (rating) => `
        <li>
          <span>${rating[0].toUpperCase()}${rating.slice(1)}</span>
          <strong>${sessionRatings[rating]}</strong>
        </li>
      `
    )
    .join("");
  renderDashboard();
  elements.restart.textContent = dueCards().length ? "Continue due cards" : "Back to study home";
  elements.restart.focus();
}

function endSession() {
  queue = [];
  elements.session.hidden = true;
  elements.complete.hidden = true;
  elements.dashboard.hidden = false;
  renderDashboard();
  elements.start.focus();
}

function setView(view) {
  const studying = view === "study";
  elements.recipesView.hidden = studying;
  elements.studyView.hidden = !studying;
  elements.navLinks.forEach((link) => {
    const active = link.dataset.appView === view;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  elements.skipLink.href = studying ? "#study-dashboard" : "#recipes";
  elements.skipLink.textContent = studying ? "Skip to study" : "Skip to recipes";
  if (studying) renderDashboard();
}

function viewFromHash() {
  return location.hash === "#study" ? "study" : "recipes";
}

function scrollToView(view) {
  const target =
    view === "study" ? document.querySelector(".mode-switcher") : elements.recipesView;
  if (!target) return;
  window.scrollTo({
    top: Math.max(0, target.offsetTop - (view === "study" ? 16 : 0)),
    behavior: "smooth"
  });
}

elements.start.addEventListener("click", startSession);
elements.showAnswer.addEventListener("click", revealAnswer);
elements.end.addEventListener("click", endSession);
elements.restart.addEventListener("click", () => {
  if (dueCards().length) startSession();
  else endSession();
});
elements.gradePanel.addEventListener("click", (event) => {
  const button = event.target.closest("[data-rating]");
  if (button) rateCurrent(button.dataset.rating);
});
elements.reset.addEventListener("click", () => {
  if (!window.confirm("Reset all study progress on this device? This cannot be undone.")) return;
  progress = emptyProgress();
  saveProgress();
  endSession();
});
elements.navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const view = link.dataset.appView === "study" ? "study" : "recipes";
    location.hash = view;
    requestAnimationFrame(() => scrollToView(view));
  });
});
window.addEventListener("hashchange", () => setView(viewFromHash()));
window.addEventListener("keydown", (event) => {
  if (elements.studyView.hidden || elements.session.hidden) return;
  if (!answerVisible && (event.key === " " || event.key === "Enter")) {
    event.preventDefault();
    revealAnswer();
    return;
  }
  const rating = ratingOrder[Number(event.key) - 1];
  if (answerVisible && rating) rateCurrent(rating);
});

const initialView = viewFromHash();
setView(initialView);
if (initialView === "study") {
  requestAnimationFrame(() => scrollToView("study"));
}
renderDashboard();
setInterval(renderDashboard, 30 * 1000);
