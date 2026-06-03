(function () {
  const shell = document.getElementById("siteShell");
  const canvas = document.getElementById("canvas");
  const designWidth = 1920;
  const designHeight = 6840;

  function updateScale() {
    const scale = shell.clientWidth / designWidth;
    canvas.style.setProperty("--scale", scale);
    shell.style.height = `${designHeight * scale}px`;
  }

  function scrollToDesignY(y) {
    const scale = shell.clientWidth / designWidth;
    const shellTop = shell.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: shellTop + Number(y) * scale,
      behavior: "smooth",
    });
  }

  updateScale();
  window.addEventListener("resize", updateScale, { passive: true });

  document.querySelectorAll(".nav-target").forEach((target) => {
    target.addEventListener("click", (event) => {
      const y = target.getAttribute("data-y");
      if (y !== null) {
        event.preventDefault();
        scrollToDesignY(y);
      }
    });

    target.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && target.hasAttribute("data-y")) {
        event.preventDefault();
        scrollToDesignY(target.getAttribute("data-y"));
      }
    });
  });

  const menuButton = document.querySelector(".menu-button");
  const menuPanel = document.querySelector(".menu-panel");

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuPanel.classList.toggle("is-open", !open);
    menuPanel.setAttribute("aria-hidden", String(open));
  });

  menuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuPanel.classList.remove("is-open");
      menuPanel.setAttribute("aria-hidden", "true");
    });
  });

  const cards = Array.from(document.querySelectorAll(".service-card"));
  const rows = Array.from(document.querySelectorAll(".service-row"));

  function setActiveCard(index) {
    cards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === index);
    });
    rows.forEach((row, rowIndex) => {
      row.classList.toggle("is-selected", rowIndex === index);
    });
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => setActiveCard(Number(card.dataset.card)));
  });

  rows.forEach((row) => {
    row.addEventListener("click", () => {
      setActiveCard(Number(row.dataset.service) % cards.length);
      scrollToDesignY(4517);
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll("[data-reveal]").forEach((element) => {
    revealObserver.observe(element);
  });
})();
