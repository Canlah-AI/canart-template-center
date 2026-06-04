const designHeight = 7444;
const designWidth = 1920;
const stage = document.querySelector("#landingStage");
const modal = document.querySelector("#actionModal");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector("#modalBody");
const toast = document.querySelector("#toast");
let lastFocusedElement = null;
let toastTimer = 0;

function currentScale() {
  if (!stage) {
    return 1;
  }

  return stage.getBoundingClientRect().width / designWidth;
}

function scrollToDesignY(y) {
  window.scrollTo({
    top: Math.round(Number(y) * currentScale()),
    behavior: "smooth",
  });
}

function showToast(message) {
  if (!toast) {
    return;
  }

  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

function openModal(title, body) {
  if (!modal) {
    return;
  }

  lastFocusedElement = document.activeElement;
  modalTitle.textContent = title || "Get help";
  modalBody.textContent =
    body || "Tell us what kind of support you need and we will guide you to the right session.";
  modal.hidden = false;
  document.body.classList.add("modal-open");
  window.setTimeout(() => {
    modal.querySelector("input")?.focus();
  }, 40);
}

function closeModal() {
  if (!modal) {
    return;
  }

  modal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus?.();
}

document.querySelectorAll("[data-scroll-y]").forEach((control) => {
  control.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToDesignY(control.dataset.scrollY);
  });
});

document.querySelectorAll("[data-modal-title]").forEach((control) => {
  control.addEventListener("click", () => {
    openModal(control.dataset.modalTitle, control.dataset.modalBody);
  });
});

document.querySelectorAll("[data-event-title]").forEach((control) => {
  control.addEventListener("click", () => {
    openModal(
      control.dataset.eventTitle,
      `${control.dataset.eventDate}. Reserve a place or ask for workshop details.`
    );
  });
});

document.querySelectorAll("[data-toast]").forEach((control) => {
  control.addEventListener("click", () => {
    showToast(control.dataset.toast);
  });
});

document.querySelectorAll(".hotspot").forEach((control) => {
  control.addEventListener("pointerenter", () => {
    control.classList.add("is-hovered");
  });
  control.addEventListener("pointerleave", () => {
    control.classList.remove("is-hovered");
  });
  control.addEventListener("focus", () => {
    control.classList.add("is-hovered");
  });
  control.addEventListener("blur", () => {
    control.classList.remove("is-hovered");
  });
});

document.querySelectorAll("[data-close-modal]").forEach((control) => {
  control.addEventListener("click", closeModal);
});

document.querySelector("#supportForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  closeModal();
  showToast("Request saved locally for this demo");
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) {
    closeModal();
  }
});
