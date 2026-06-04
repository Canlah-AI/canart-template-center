const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 6046;
const shell = document.getElementById("page-shell");

function resizeCanvas() {
  const scale = Math.min(window.innerWidth / DESIGN_WIDTH, 1);
  document.documentElement.style.setProperty("--page-scale", String(scale));
  shell.style.width = `${DESIGN_WIDTH * scale}px`;
  shell.style.height = `${DESIGN_HEIGHT * scale}px`;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
