const designWidth = 1920;
const designHeight = 6173;
const shell = document.querySelector(".stage-shell");
const root = document.documentElement;

function syncStageScale() {
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  const scale = Math.min(1, viewportWidth / designWidth);
  root.style.setProperty("--stage-scale", String(scale));
  shell.style.height = `${designHeight * scale}px`;
}

syncStageScale();
window.setTimeout(syncStageScale, 0);
window.setTimeout(syncStageScale, 120);
window.setTimeout(syncStageScale, 500);
window.addEventListener("resize", syncStageScale);
window.addEventListener("load", () => {
  syncStageScale();
  window.setTimeout(syncStageScale, 50);
  window.setTimeout(syncStageScale, 250);
});

const menuButton = document.querySelector(".menu-button");
const menuPanel = document.querySelector(".menu-panel");
const closeMenuButton = document.querySelector(".menu-close");

function setMenu(open) {
  menuPanel.classList.toggle("is-open", open);
  menuPanel.setAttribute("aria-hidden", String(!open));
  menuButton.setAttribute("aria-expanded", String(open));
}

menuButton.addEventListener("click", () => setMenu(!menuPanel.classList.contains("is-open")));
closeMenuButton.addEventListener("click", () => setMenu(false));
menuPanel.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

const commandForm = document.querySelector(".command-pill");
const commandInput = document.querySelector("#commandInput");
const toast = document.querySelector(".toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

commandInput.addEventListener("input", () => {
  commandForm.classList.toggle("has-value", commandInput.value.trim().length > 0);
});

commandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    commandForm.requestSubmit();
  }
});

commandForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = commandInput.value.trim() || "Try your command here";
  showToast(`Command queued: ${value}`);
  commandInput.value = "";
  commandForm.classList.remove("has-value");
});

document.querySelector(".register-button").addEventListener("click", () => {
  showToast("Registration flow ready.");
});

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach((item) => {
      item.classList.remove("is-active");
      item.removeAttribute("aria-selected");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");
    showToast(`${button.textContent} selected.`);
  });
});

document.querySelectorAll(".social-row a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelectorAll(".social-row a").forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
    showToast(`${link.textContent} opened.`);
  });
});

const modal = document.querySelector(".video-modal");
const playButton = document.querySelector(".play-button");
const modalClose = document.querySelector(".modal-close");

function setModal(open) {
  modal.classList.toggle("is-open", open);
  modal.setAttribute("aria-hidden", String(!open));
}

playButton.addEventListener("click", () => setModal(true));
modalClose.addEventListener("click", () => setModal(false));
modal.addEventListener("click", (event) => {
  if (event.target === modal) setModal(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
    setModal(false);
  }
});
