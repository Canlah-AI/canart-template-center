const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 7916;

const root = document.documentElement;
const shell = document.getElementById("page-shell");
let stageScale = 1;

function setStageScale() {
  stageScale = Math.min(window.innerWidth / DESIGN_WIDTH, 1);
  root.style.setProperty("--stage-scale", String(stageScale));
  shell.style.height = `${DESIGN_HEIGHT * stageScale}px`;
}

function designYToScroll(y) {
  return y * stageScale;
}

function getDesignY(element) {
  if (element.dataset.sectionY) return Number(element.dataset.sectionY);
  const y = element.style.getPropertyValue("--y");
  return y ? Number(y) : 0;
}

function scrollToDesignY(y) {
  window.scrollTo({
    top: designYToScroll(y),
    behavior: "smooth",
  });
}

function updateReveal() {
  const visibleLine = window.scrollY / stageScale + window.innerHeight / stageScale * 0.86;
  document.querySelectorAll("[data-reveal]").forEach((element) => {
    if (getDesignY(element) <= visibleLine) {
      element.classList.add("is-visible");
    }
  });
}

function updateActiveNav() {
  const current = window.scrollY / stageScale + 260;
  const sections = [
    ["learn", 968],
    ["build", 3832],
    ["explore", 6944],
    ["join", 6216],
    ["help", 6944],
  ];

  let active = "learn";
  sections.forEach(([id, y]) => {
    if (current >= y) active = id;
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    const hash = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", hash === active || (hash === "help" && active === "explore"));
  });
}

function bindScrolling() {
  document.querySelectorAll(".js-scroll").forEach((button) => {
    button.addEventListener("click", () => {
      scrollToDesignY(Number(button.dataset.targetY || 0));
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash) return;
      const target = document.querySelector(hash === "#help" ? "#explore" : hash);
      if (!target) return;
      event.preventDefault();
      scrollToDesignY(getDesignY(target));
    });
  });
}

function bindInteractiveStates() {
  document.querySelectorAll(".footer-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".footer-chip").forEach((item) => item.classList.remove("is-active"));
      chip.classList.add("is-active");
    });
  });

  document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".feature-card").forEach((item) => item.classList.remove("is-selected"));
      card.classList.add("is-selected");
    });
  });

  document.querySelectorAll(".news-card, .built-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.animate(
        [
          { transform: "translateY(-8px) scale(1)" },
          { transform: "translateY(-8px) scale(1.025)" },
          { transform: "translateY(-8px) scale(1)" },
        ],
        { duration: 260, easing: "ease-out" },
      );
    });
  });
}

function sync() {
  updateReveal();
  updateActiveNav();
}

setStageScale();
bindScrolling();
bindInteractiveStates();
sync();

window.addEventListener("resize", () => {
  setStageScale();
  sync();
});

window.addEventListener("scroll", sync, { passive: true });
