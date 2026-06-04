const BASE_WIDTH = 1920;
const BASE_HEIGHT = 9037;
const viewport = document.querySelector(".viewport");
const stage = document.getElementById("stage");
document.documentElement.classList.add("js");

function fitCanvas() {
  const scale = Math.min(window.innerWidth / BASE_WIDTH, 1);
  viewport.style.width = `${BASE_WIDTH * scale}px`;
  viewport.style.height = `${BASE_HEIGHT * scale}px`;
  stage.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", fitCanvas);
fitCanvas();

const menuButton = document.querySelector(".menu-button");
const menuPanel = document.getElementById("menu-panel");

function setMenu(open) {
  menuButton.classList.toggle("is-open", open);
  menuPanel.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuPanel.setAttribute("aria-hidden", String(!open));
}

menuButton.addEventListener("click", () => {
  setMenu(!menuPanel.classList.contains("is-open"));
});

menuPanel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
  }
});

document.querySelectorAll(".service-row").forEach((row) => {
  row.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelectorAll(".service-row").forEach((item) => item.classList.remove("is-active"));
    row.classList.add("is-active");
  });
});

document.querySelectorAll(".project-card").forEach((card) => {
  const selectCard = () => {
    document.querySelectorAll(".project-card").forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
  };

  card.addEventListener("click", selectCard);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCard();
    }
  });
});

const signup = document.querySelector(".signup");
const signupMessage = document.querySelector(".signup-message");

signup.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = signup.querySelector("input").value.trim();
  signupMessage.textContent = email ? "Thanks. We will send the latest news shortly." : "Please enter your email address.";
  signupMessage.classList.add("is-visible");
});

const revealTargets = [
  ".services-title",
  ".services-copy",
  ".service-row",
  ".projects-title",
  ".project-card",
  ".projects-cta",
  ".about-label",
  ".about-heading",
  ".about-left-wrap",
  ".about-center-wrap",
  ".about-right",
  ".about-copy",
  ".about-cta",
  ".footer-heading",
  ".signup",
  ".footer-img-left",
  ".footer-img-right-wrap",
  ".footer-brand",
  ".copyright",
];

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
);

document.querySelectorAll(revealTargets.join(",")).forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});
