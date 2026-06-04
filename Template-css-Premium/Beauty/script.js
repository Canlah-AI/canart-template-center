const DESIGN_WIDTH = 1920;
const sectionPositions = {
  hero: 0,
  new: 1486,
  women: 2800,
  men: 3893,
  collections: 4822,
  subscribe: 6339,
  footer: 7044,
};

const root = document.documentElement;
const shell = document.getElementById("scaleShell");
const cartCount = document.getElementById("cartCount");
const form = document.getElementById("subscribeForm");
const emailInput = document.getElementById("emailInput");
const formMessage = document.getElementById("formMessage");

let cartItems = 0;
let scale = 1;

function updateScale() {
  scale = Math.min(1, window.innerWidth / DESIGN_WIDTH);
  root.style.setProperty("--scale", scale.toFixed(5));
  if (shell) {
    shell.style.height = `${7513 * scale}px`;
  }
}

function scrollToSection(id) {
  const y = sectionPositions[id];
  if (typeof y !== "number") return;
  window.scrollTo({
    top: y * scale,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

function setCartCount(value) {
  if (!cartCount) return;
  cartCount.textContent = String(value);
  cartCount.classList.toggle("is-visible", value > 0);
}

function setFormMessage(message, visible = true) {
  if (!formMessage) return;
  formMessage.textContent = message;
  formMessage.classList.toggle("is-visible", visible);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

updateScale();
window.addEventListener("resize", updateScale);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href").slice(1);
    if (!sectionPositions.hasOwnProperty(id)) return;
    event.preventDefault();
    scrollToSection(id);
  });
});

document.querySelectorAll(".like-btn").forEach((button) => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => {
    const liked = button.classList.toggle("is-liked");
    button.setAttribute("aria-pressed", String(liked));
  });
});

document.querySelectorAll(".add-cart").forEach((button) => {
  const original = button.innerHTML;
  button.addEventListener("click", () => {
    cartItems += 1;
    setCartCount(cartItems);
    button.classList.add("added");
    button.innerHTML = 'Added <span class="icon-bag"></span>';
    window.setTimeout(() => {
      button.classList.remove("added");
      button.innerHTML = original;
    }, 900);
  });
});

document.querySelectorAll(".pin").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pin").forEach((pin) => pin.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

if (form && emailInput) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    if (!isValidEmail(email)) {
      setFormMessage("Enter a valid email address.");
      emailInput.focus();
      return;
    }
    setFormMessage("Subscribed.");
    emailInput.value = "";
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 35, 280)}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
