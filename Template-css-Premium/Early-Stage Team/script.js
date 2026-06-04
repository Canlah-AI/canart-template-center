const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const toast = document.querySelector(".toast");
const root = document.documentElement;

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealItems = document.querySelectorAll(".reveal");
function revealVisibleItems() {
  const threshold = window.innerHeight * 0.9;
  revealItems.forEach((item) => {
    if (item.classList.contains("is-visible")) return;
    const rect = item.getBoundingClientRect();
    if (rect.top < threshold && rect.bottom > 0) {
      item.classList.add("is-visible");
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));
window.addEventListener("scroll", revealVisibleItems, { passive: true });
window.addEventListener("resize", revealVisibleItems);
window.setTimeout(revealVisibleItems, 80);
window.setTimeout(() => {
  revealItems.forEach((item, index) => {
    window.setTimeout(() => item.classList.add("is-visible"), Math.min(index * 45, 900));
  });
}, 360);

function updateScrollMotion() {
  const maxScroll = root.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  root.style.setProperty("--scroll-progress", progress.toFixed(4));

  document.querySelectorAll(".market-card").forEach((card) => {
    const rect = card.getBoundingClientRect();
    const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
    const y = Math.max(-26, Math.min(26, centerOffset * -0.025));
    card.style.setProperty("--parallax-y", `${y.toFixed(1)}px`);
  });
}

window.addEventListener("scroll", updateScrollMotion, { passive: true });
window.addEventListener("resize", updateScrollMotion);
updateScrollMotion();

function parseCounterText(text) {
  const match = text.trim().match(/^([\d.]+)([a-z%]*)$/i);
  if (!match) return null;
  const value = Number(match[1]);
  if (!Number.isFinite(value)) return null;
  return {
    value,
    decimals: match[1].includes(".") ? match[1].split(".")[1].length : 0,
    suffix: match[2] || "",
  };
}

function animateCounter(counter) {
  if (counter.dataset.animated === "true") return;
  const parsed = parseCounterText(counter.dataset.target || counter.textContent || "");
  if (!parsed) return;

  counter.dataset.animated = "true";
  counter.classList.add("is-counting");
  const duration = 1150;
  const started = performance.now();

  function tick(now) {
    const ratio = Math.min((now - started) / duration, 1);
    const eased = 1 - Math.pow(1 - ratio, 3);
    const current = parsed.value * eased;
    counter.textContent = `${current.toFixed(parsed.decimals)}${parsed.suffix}`;
    if (ratio < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.textContent = `${parsed.value.toFixed(parsed.decimals)}${parsed.suffix}`;
      counter.classList.remove("is-counting");
    }
  }

  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll(".metric-grid strong, .mau-stat strong");
counters.forEach((counter) => {
  counter.dataset.target = counter.textContent.trim();
  counter.classList.add("counter");
});

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) animateCounter(entry.target);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

document.querySelectorAll(".feature-visual").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${(x * 5).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(-y * 5).toFixed(2)}deg`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  });
});

document.querySelectorAll(".tab-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const group = chip.closest(".chart-actions, .mini-head");
    group?.querySelectorAll(".tab-chip").forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
  });
});

let toastTimer = 0;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll(".btn, .nav-cta").forEach((control) => {
  control.addEventListener("click", (event) => {
    const href = control.getAttribute("href") || "";
    if (href.startsWith("mailto:")) {
      showToast("Opening email contact.");
      return;
    }
    if (control.textContent?.toLowerCase().includes("started") || control.textContent?.toLowerCase().includes("trial")) {
      showToast("Trial flow ready.");
    }
  });
});

document.querySelectorAll(".activity-row").forEach((row) => {
  row.addEventListener("click", () => {
    document.querySelectorAll(".activity-row").forEach((item) => item.classList.remove("selected"));
    row.classList.add("selected");
  });
});
