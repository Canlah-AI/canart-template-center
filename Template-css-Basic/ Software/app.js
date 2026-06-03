const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

reveals.forEach((item) => revealObserver.observe(item));

const toast = document.querySelector("[data-toast]");
let toastTimer;

document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    if (!input || !toast) return;

    if (!input.value.trim()) {
      input.focus();
      return;
    }

    input.value = "";
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
  });
});

const faqItems = document.querySelectorAll(".faq-list details");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.removeAttribute("open");
    });
  });
});

const quotes = [
  {
    name: "Esther Jackson",
    text: "I cant describe how great we feel using Newsify. It completely changed our workflow and the face we waste on truying to connect each other.Top Newsify!"
  },
  {
    name: "Fachry Adams",
    text: "Newsify makes our newsletter flow faster. We can track reports, schedule posts, and keep every member aligned without losing the conversation."
  },
  {
    name: "John Jos",
    text: "The automated connection reports helped our team see who was active, what mattered, and where our community needed better guidance."
  }
];

let quoteIndex = 0;
const quoteCard = document.querySelector("[data-quote-card]");
const quoteText = document.querySelector("[data-quote-text]");
const quoteName = document.querySelector("[data-quote-name]");

function setQuote(nextIndex) {
  if (!quoteCard || !quoteText || !quoteName) return;
  quoteIndex = (nextIndex + quotes.length) % quotes.length;
  quoteCard.classList.add("is-changing");

  setTimeout(() => {
    quoteText.textContent = quotes[quoteIndex].text;
    quoteName.textContent = quotes[quoteIndex].name;
    quoteCard.classList.remove("is-changing");
  }, 180);
}

document.querySelector("[data-testimonial-prev]")?.addEventListener("click", () => setQuote(quoteIndex - 1));
document.querySelector("[data-testimonial-next]")?.addEventListener("click", () => setQuote(quoteIndex + 1));
