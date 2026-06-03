const holder = document.getElementById("stage-holder");
const canvas = document.getElementById("canvas");
const toast = document.getElementById("toast");
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 6259;
let currentScale = 1;
let toastTimer;

function fitCanvas() {
  currentScale = Math.min(1, window.innerWidth / DESIGN_WIDTH);
  holder.style.width = `${DESIGN_WIDTH * currentScale}px`;
  holder.style.height = `${DESIGN_HEIGHT * currentScale}px`;
  canvas.style.transform = `scale(${currentScale})`;
}

window.addEventListener("resize", fitCanvas);
fitCanvas();

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function scrollToSection(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  const top = target.offsetTop * currentScale;
  window.scrollTo({ top, behavior: "smooth" });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    const action = link.dataset.action;

    if (hash && hash.length > 1) {
      event.preventDefault();
      scrollToSection(hash);
      history.replaceState(null, "", hash);
      return;
    }

    if (action) {
      event.preventDefault();
      const messages = {
        login: "Login flow is ready for connection.",
        register: "Registration flow is ready for connection.",
        android: "Android download selected.",
        ios: "iOS download selected.",
        transfer: "E Transfer selected.",
        "get-app": "App download selected.",
        instagram: "Instagram profile selected.",
        facebook: "Facebook profile selected.",
        linkedin: "LinkedIn profile selected.",
      };
      showToast(messages[action] || "Action selected.");
    }
  });
});

const faqButtons = document.querySelectorAll(".faq-list button");
faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    faqButtons.forEach((item) => item.setAttribute("aria-expanded", "false"));
    button.setAttribute("aria-expanded", String(!isOpen));
  });
});

const tabTitle = document.querySelector(".tile-right h3");
const tabCopy = {
  Fintech: "Get the\nApplication Now On\nYour Mobile",
  Banking: "Banking\nServices In\nYour Pocket",
  Online: "Online\nPayments Without\nDelay",
  Additional: "More Tools\nFor Every\nWallet",
  Card: "Card Controls\nIn Seconds\nAnywhere",
  Mobile: "Mobile\nPayments Wherever\nYou Go",
  PayoutPal: "PayoutPal\nWallet Is\nReady",
};

document.querySelectorAll(".app-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".app-tabs button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const copy = tabCopy[button.dataset.tab] || tabCopy.Fintech;
    tabTitle.innerHTML = copy.split("\n").join("<br />");
  });
});

const counter = document.querySelector("[data-count]");
function animateCounter() {
  if (!counter || counter.dataset.done) return;
  counter.dataset.done = "true";
  const target = Number(counter.dataset.count);
  counter.textContent = `${target}K+`;
  counter.classList.add("is-count-ready");
}

if ("IntersectionObserver" in window && counter) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        animateCounter();
        observer.disconnect();
      }
    },
    { threshold: 0.35 }
  );
  observer.observe(counter);
} else {
  animateCounter();
}

document.querySelector(".email-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  const value = input.value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  input.setAttribute("aria-invalid", String(!isValid));
  if (!isValid) {
    showToast("Enter a valid email address.");
    input.focus();
    return;
  }

  input.value = "";
  input.setAttribute("aria-invalid", "false");
  showToast("Subscribed successfully.");
});

const revealSelectors = [
  ".nav",
  ".hero h1",
  ".hero-copy",
  ".hero-actions",
  ".hero-art",
  ".choice-panel",
  ".stress h2",
  ".arrow-icon",
  ".large-tile",
  ".transact .portrait",
  ".review-card",
  ".transfer-card",
  ".transact-copy",
  ".faq-list",
  ".faq-photo",
  ".cta",
  ".footer h2",
  ".email-form",
  ".socials",
  ".footer-col",
  ".license-line",
  ".copyright",
  ".policies",
];

const revealItems = revealSelectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)));

const hoverSelectors = [
  "a",
  "button",
  ".choice-copy",
  ".choice-card",
  ".metric-card",
  ".large-tile",
  ".review-card",
  ".transfer-card",
  ".cta",
  ".portrait",
  ".faq-photo",
  ".arrow-icon",
];

hoverSelectors
  .flatMap((selector) => Array.from(document.querySelectorAll(selector)))
  .forEach((item) => {
    item.addEventListener("mouseenter", () => item.classList.add("is-hovered"));
    item.addEventListener("mouseleave", () => item.classList.remove("is-hovered"));
  });

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.setProperty("--reveal-delay", `${Math.min(index * 35, 210)}ms`);
  });

  document.documentElement.classList.add("motion-ready");
  requestAnimationFrame(() => {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  });
}
