const PAGE_WIDTH = 1920;
const PAGE_HEIGHT = 7594;

const shell = document.querySelector(".page-shell");
const page = document.querySelector(".page");
const root = document.documentElement;

function syncScale() {
  const scale = Math.min(1, window.innerWidth / PAGE_WIDTH);
  root.style.setProperty("--scale", String(scale));
  shell.style.height = `${PAGE_HEIGHT * scale}px`;

  if (scale < 1 || window.innerWidth <= PAGE_WIDTH + 20) {
    page.style.left = "0";
    page.style.transformOrigin = "top left";
    page.style.transform = `scale(${scale})`;
  } else {
    page.style.left = "50%";
    page.style.transformOrigin = "top center";
    page.style.transform = "translateX(-50%) scale(1)";
  }
}

window.addEventListener("resize", syncScale, { passive: true });
syncScale();

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

const toast = document.querySelector(".toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll("[data-subscribe-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    const value = input.value.trim();

    if (!value || !input.checkValidity()) {
      input.focus();
      form.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-7px)" },
          { transform: "translateX(7px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 220, easing: "ease-out" }
      );
      return;
    }

    input.value = "";
    showToast("Subscription request received");
  });
});

const reviews = [
  {
    title: "It Was Amazing Experienced!",
    copyOne:
      "Highly glad to avail the cordial services of Medfysio. One of my patients enjoyed these services recently and he express deep gartitude to me for referring him to Medfysio.",
    copyTwo:
      "He also stated that he will strongly recommended the Anavara to the overseas treatement seekers. Medical tourism & air Ambulance Service.Health & Wellness Global Facilitators.",
  },
  {
    title: "Care That Felt Personal!",
    copyOne:
      "The appointment flow was clear and the medical team helped my family understand each next step without confusion or delay.",
    copyTwo:
      "The follow-up recommendations were easy to use, and the remote health support made the whole treatment journey feel more confident.",
  },
  {
    title: "Helpful From Start to End!",
    copyOne:
      "Medfysio gave us direct answers, practical guidance, and a calm way to keep track of health information every day.",
    copyTwo:
      "The service made regular checks easier for our household and helped us stay connected with reliable care options.",
  },
];

let activeReview = 0;
const patientButtons = [...document.querySelectorAll(".patient")];
const reviewTitle = document.querySelector("[data-review-title]");
const reviewCopyOne = document.querySelector("[data-review-copy-one]");
const reviewCopyTwo = document.querySelector("[data-review-copy-two]");
const reviewCard = document.querySelector(".review-card");

function setReview(index) {
  activeReview = (index + reviews.length) % reviews.length;
  const review = reviews[activeReview];

  patientButtons.forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === activeReview);
    button.setAttribute("aria-selected", String(buttonIndex === activeReview));
  });

  reviewCard.animate(
    [
      { opacity: 0.4, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 220, easing: "ease-out" }
  );

  reviewTitle.textContent = review.title;
  reviewCopyOne.textContent = review.copyOne;
  reviewCopyTwo.textContent = review.copyTwo;
}

patientButtons.forEach((button) => {
  button.addEventListener("click", () => setReview(Number(button.dataset.reviewIndex)));
});

document.querySelector("[data-review-prev]").addEventListener("click", () => setReview(activeReview - 1));
document.querySelector("[data-review-next]").addEventListener("click", () => setReview(activeReview + 1));

const blogCards = [...document.querySelectorAll(".blog-card")];
let blogFocus = 0;

function setBlogFocus(index) {
  blogFocus = (index + blogCards.length) % blogCards.length;
  blogCards.forEach((card, cardIndex) => {
    card.style.transform = cardIndex === blogFocus ? "translateY(-6px)" : "";
    card.style.boxShadow = cardIndex === blogFocus ? "0 24px 48px rgba(0, 0, 0, 0.12)" : "";
  });
}

document.querySelector("[data-blog-prev]").addEventListener("click", () => setBlogFocus(blogFocus - 1));
document.querySelector("[data-blog-next]").addEventListener("click", () => setBlogFocus(blogFocus + 1));
