const MINUTE = 60 * 1000;
const DAY = 24 * 60 * MINUTE;

export const ratingOrder = ["again", "hard", "good", "easy"];

export function newSchedule() {
  return {
    state: "new",
    dueAt: 0,
    intervalDays: 0,
    ease: 2.5,
    reviews: 0,
    lapses: 0,
    learningStep: 0,
    firstSeenAt: null,
    lastReviewedAt: null
  };
}

const dayInterval = (value) => Math.max(1, Math.round(value));

export function nextInterval(schedule, rating) {
  const current = { ...newSchedule(), ...schedule };

  if (rating === "again") return { amount: 1, unit: "minute" };

  if (rating === "hard") {
    return current.state === "review"
      ? { amount: dayInterval(Math.max(current.intervalDays, 1) * 1.2), unit: "day" }
      : { amount: 6, unit: "minute" };
  }

  if (rating === "good") {
    if (current.state === "new") return { amount: 10, unit: "minute" };
    if (current.state === "learning") return { amount: 1, unit: "day" };
    return {
      amount: dayInterval(Math.max(current.intervalDays, 1) * current.ease),
      unit: "day"
    };
  }

  if (rating === "easy") {
    return {
      amount:
        current.state === "review"
          ? dayInterval(Math.max(current.intervalDays, 1) * current.ease * 1.3)
          : 4,
      unit: "day"
    };
  }

  throw new Error(`Unknown study rating: ${rating}`);
}

const toMilliseconds = ({ amount, unit }) => amount * (unit === "day" ? DAY : MINUTE);

export function scheduleReview(schedule, rating, now = Date.now()) {
  const current = { ...newSchedule(), ...schedule };
  const interval = nextInterval(current, rating);
  const next = {
    ...current,
    reviews: current.reviews + 1,
    firstSeenAt: current.firstSeenAt ?? now,
    lastReviewedAt: now,
    dueAt: now + toMilliseconds(interval)
  };

  if (rating === "again") {
    next.state = "learning";
    next.learningStep = 0;
    next.intervalDays = 0;
    next.ease = Math.max(1.3, current.ease - 0.2);
    next.lapses = current.lapses + (current.state === "review" ? 1 : 0);
    return next;
  }

  if (rating === "hard") {
    next.ease = Math.max(1.3, current.ease - 0.15);
    if (current.state === "review") {
      next.state = "review";
      next.intervalDays = interval.amount;
      next.learningStep = 0;
    } else {
      next.state = "learning";
      next.learningStep = 1;
    }
    return next;
  }

  if (rating === "good") {
    next.ease = current.ease;
    if (current.state === "new") {
      next.state = "learning";
      next.learningStep = 1;
    } else {
      next.state = "review";
      next.learningStep = 0;
      next.intervalDays = interval.amount;
    }
    return next;
  }

  next.state = "review";
  next.learningStep = 0;
  next.intervalDays = interval.amount;
  next.ease = Math.min(3.2, current.ease + 0.15);
  return next;
}

export function formatInterval(interval) {
  if (interval.unit === "minute") return `${interval.amount}m`;
  return `${interval.amount}d`;
}
