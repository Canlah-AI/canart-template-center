const root = document.documentElement;
const stageWidth = 375;
const stageHeight = 5747;
const desktopStageWidth = 1440;
const desktopStageHeight = 5361;
const viewport = document.querySelector(".figma-viewport");
const desktopViewport = document.querySelector(".desktop-viewport");
const menuButton = document.querySelector(".menu-hotspot");
const menuPanel = document.querySelector(".menu-panel");
const subscribeForm = document.querySelector(".subscribe-form");
const emailInput = document.querySelector("#email");
const formMessage = document.querySelector(".form-message");
const desktopSubscribeForm = document.querySelector(".desktop-exact-subscribe-form");
const desktopEmailInput = document.querySelector("#desktop-exact-email");
const desktopFormMessage = document.querySelector(".desktop-exact-form-message");
const animatedHotspots = document.querySelectorAll(".hotspot, .desktop-hotspot");

function syncStageScale() {
  const mobileScale = Math.min(1, window.innerWidth / stageWidth);
  const desktopScale = Math.min(1, window.innerWidth / desktopStageWidth);

  root.style.setProperty("--stage-scale", String(mobileScale));
  root.style.setProperty("--desktop-stage-scale", String(desktopScale));

  if (viewport) {
    viewport.style.width = `${stageWidth * mobileScale}px`;
    viewport.style.height = `${stageHeight * mobileScale}px`;
  }

  if (desktopViewport) {
    desktopViewport.style.width = `${desktopStageWidth * desktopScale}px`;
    desktopViewport.style.height = `${desktopStageHeight * desktopScale}px`;
  }
}

syncStageScale();
window.addEventListener("resize", syncStageScale);

menuButton?.addEventListener("click", () => {
  const isOpen = !menuPanel.classList.contains("is-open");
  menuPanel.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuPanel.setAttribute("aria-hidden", String(!isOpen));
});

menuPanel?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menuPanel.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuPanel.setAttribute("aria-hidden", "true");
  }
});

subscribeForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValid) {
    formMessage.textContent = "Please enter a valid email.";
    formMessage.style.color = "#ffb3a6";
    emailInput.focus();
    return;
  }

  formMessage.textContent = "Subscribed.";
  formMessage.style.color = "#aeff63";
  subscribeForm.reset();
});

animatedHotspots.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    item.style.setProperty("--hover-x", `${x.toFixed(1)}%`);
    item.style.setProperty("--hover-y", `${y.toFixed(1)}%`);
  });

  item.addEventListener("pointerleave", () => {
    item.style.removeProperty("--hover-x");
    item.style.removeProperty("--hover-y");
  });

  item.addEventListener("click", () => {
    item.classList.remove("is-clicked");
    void item.offsetWidth;
    item.classList.add("is-clicked");
  });
});

function syncDesktopEmailState() {
  desktopSubscribeForm?.classList.toggle("has-value", Boolean(desktopEmailInput?.value.trim()));
}

desktopEmailInput?.addEventListener("input", syncDesktopEmailState);

desktopSubscribeForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = desktopEmailInput.value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValid) {
    desktopFormMessage.textContent = "Please enter a valid email.";
    desktopFormMessage.style.color = "#ffb3a6";
    desktopEmailInput.focus();
    return;
  }

  desktopFormMessage.textContent = "Subscribed.";
  desktopFormMessage.style.color = "#aeff63";
  desktopSubscribeForm.reset();
  syncDesktopEmailState();
});
