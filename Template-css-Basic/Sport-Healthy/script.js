const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.classList.toggle("is-open", !isOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
    });
  });
}

const revealItems = document.querySelectorAll(".section-reveal");
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

document.querySelectorAll(".how-steps .step").forEach((step) => {
  step.addEventListener("click", () => {
    document.querySelectorAll(".how-steps .step").forEach((item) => item.classList.remove("active"));
    step.classList.add("active");
  });
});

document.querySelectorAll(".program-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".program-item").forEach((program) => program.classList.remove("active"));
    item.classList.add("active");
  });
});

const dots = document.querySelectorAll(".dot");
const testimonials = document.querySelectorAll(".testimonial-card");
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    dots.forEach((item) => item.classList.remove("active"));
    dot.classList.add("active");
    testimonials.forEach((card) => card.classList.remove("active"));
    testimonials[index % testimonials.length]?.classList.add("active");
  });
});

const modal = document.querySelector(".video-modal");
const openVideo = document.querySelector("[data-open-video]");
const closeVideo = document.querySelector(".modal-close");

function setModal(open) {
  if (!modal) return;
  modal.classList.toggle("is-open", open);
  modal.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}

openVideo?.addEventListener("click", () => setModal(true));
closeVideo?.addEventListener("click", () => setModal(false));
modal?.addEventListener("click", (event) => {
  if (event.target === modal) setModal(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setModal(false);
});
