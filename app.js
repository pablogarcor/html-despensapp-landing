const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menú");
    }
  });
}

const demoTabs = Array.from(document.querySelectorAll("[data-demo-tab]"));
const demoPanels = Array.from(document.querySelectorAll("[data-demo-panel]"));

demoTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-demo-tab");

    demoTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    demoPanels.forEach((panel) => {
      const isActive = panel.getAttribute("data-demo-panel") === target;
      panel.classList.toggle("is-active", isActive);
      panel.toggleAttribute("hidden", !isActive);
    });
  });
});

const canvas = document.querySelector("#hero-canvas");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas instanceof HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  const pantryItems = [
    { label: "Arroz", color: "#156a5a", x: 0.18, y: 0.28, w: 92, h: 34 },
    { label: "Tomate", color: "#215b91", x: 0.72, y: 0.2, w: 104, h: 34 },
    { label: "Huevos", color: "#9b5b12", x: 0.62, y: 0.68, w: 96, h: 34 },
    { label: "Lentejas", color: "#a33b2b", x: 0.28, y: 0.74, w: 112, h: 34 },
  ];

  let width = 0;
  let height = 0;
  let frameId = 0;

  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);

    if (context) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  };

  const roundedRect = (ctx, x, y, w, h, r) => {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const drawLabel = (ctx, item, time) => {
    const drift = prefersReducedMotion ? 0 : Math.sin(time / 900 + item.x * 8) * 8;
    const x = item.x * width - item.w / 2;
    const y = item.y * height + drift;

    ctx.save();
    ctx.globalAlpha = 0.88;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(222, 219, 210, 0.88)";
    ctx.lineWidth = 1;
    roundedRect(ctx, x, y, item.w, item.h, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.arc(x + 17, y + item.h / 2, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1e2522";
    ctx.font = "700 13px system-ui, sans-serif";
    ctx.fillText(item.label, x + 30, y + 22);
    ctx.restore();
  };

  const drawShelves = (ctx, time) => {
    const shelfWidth = Math.min(width * 0.72, 760);
    const startX = width - shelfWidth - 34;
    const startY = Math.max(120, height * 0.24);
    const gap = Math.max(72, height * 0.14);

    ctx.save();
    ctx.globalAlpha = 0.48;
    ctx.strokeStyle = "#c7c2b7";
    ctx.lineWidth = 2;

    for (let i = 0; i < 4; i += 1) {
      const y = startY + i * gap + (prefersReducedMotion ? 0 : Math.sin(time / 1200 + i) * 2);
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(startX + shelfWidth, y);
      ctx.stroke();
    }

    ctx.restore();
  };

  const draw = (time = 0) => {
    if (!context) {
      return;
    }

    context.clearRect(0, 0, width, height);
    drawShelves(context, time);
    pantryItems.forEach((item) => drawLabel(context, item, time));

    if (!prefersReducedMotion) {
      frameId = window.requestAnimationFrame(draw);
    }
  };

  resizeCanvas();
  draw();
  window.addEventListener("resize", () => {
    resizeCanvas();
    if (prefersReducedMotion) {
      draw();
    }
  });

  window.addEventListener("pagehide", () => {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }
  });
}
