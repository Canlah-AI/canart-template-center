const shells = Array.from(document.querySelectorAll(".frame-shell"));

function applyScale() {
  for (const shell of shells) {
    const stage = shell.querySelector(".stage");
    const w = Number(shell.dataset.designWidth);
    const h = Number(shell.dataset.designHeight);
    const visible = getComputedStyle(shell).display !== "none";
    if (!visible) continue;
    const scale = w === 375 ? window.innerWidth / w : Math.min(window.innerWidth / w, 1);
    stage.style.transform = `scale(${scale})`;
    stage.style.left = `${Math.max(0, (window.innerWidth - w * scale) / 2)}px`;
    shell.style.height = `${h * scale}px`;
  }
}

window.addEventListener("resize", applyScale, { passive: true });
window.addEventListener("orientationchange", applyScale, { passive: true });
applyScale();

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".cat").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".categories, .m-categories");
    group?.querySelectorAll(".cat").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelectorAll(".btn.outline").forEach((button) => {
  button.addEventListener("click", () => {
    const siblings = button.parentElement?.querySelectorAll(".btn.outline") || [];
    siblings.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelectorAll(".newsletter").forEach((form) => {
  const label = form.querySelector("label");
  const input = form.querySelector("input");
  const note = form.querySelector(".form-note");
  input.addEventListener("input", () => label.classList.toggle("has-value", Boolean(input.value.trim())));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    note.textContent = input.validity.valid && input.value.trim()
      ? "Subscribed. Welcome to BA-JU."
      : "Please enter a valid email.";
    form.classList.toggle("success", input.validity.valid && input.value.trim());
  });
});

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
menuButton?.addEventListener("click", () => {
  const open = !menuButton.classList.contains("open");
  menuButton.classList.toggle("open", open);
  mobileMenu?.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
});
mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.classList.remove("open");
    mobileMenu.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".square-arrow, .circle-arrow").forEach((button) => {
  button.addEventListener("click", () => {
    button.animate(
      [
        { transform: getComputedStyle(button).transform === "none" ? "scale(1)" : getComputedStyle(button).transform },
        { transform: "scale(0.92)" },
        { transform: "scale(1)" }
      ],
      { duration: 260, easing: "cubic-bezier(.2,.8,.2,1)" }
    );
  });
});
