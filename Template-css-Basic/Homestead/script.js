const faqItems = document.querySelectorAll(".faq-item");
const projectCards = document.querySelectorAll(".project-card");
const revealItems = document.querySelectorAll("[data-reveal]");
const newsletter = document.querySelector(".newsletter");

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    const isOpen = item.getAttribute("aria-expanded") === "true";

    faqItems.forEach((other) => {
      if (other !== item) {
        other.setAttribute("aria-expanded", "false");
      }
    });

    item.setAttribute("aria-expanded", String(!isOpen));
  });
});

projectCards.forEach((card) => {
  card.addEventListener("pointerenter", () => card.classList.add("is-hovered"));
  card.addEventListener("pointerleave", () => card.classList.remove("is-hovered"));
  card.addEventListener("focus", () => card.classList.add("is-hovered"));
  card.addEventListener("blur", () => card.classList.remove("is-hovered"));
  card.addEventListener("click", () => {
    card.classList.add("is-hovered");
    window.setTimeout(() => card.classList.remove("is-hovered"), 1400);
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

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
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

window.addEventListener("load", () => {
  revealItems.forEach((item) => {
    if (item.getBoundingClientRect().top < window.innerHeight) {
      item.classList.add("is-visible");
    }
  });
});

if (newsletter) {
  newsletter.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = newsletter.querySelector("input");
    const status = newsletter.querySelector(".form-status");
    const value = input.value.trim();

    if (!value) {
      status.textContent = "Enter an email to join.";
      input.focus();
      return;
    }

    status.textContent = "Thank you. We will contact you soon.";
    input.value = "";
  });
}
