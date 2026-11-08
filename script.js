const NS = "http://www.w3.org/2000/svg";
const svg = document.getElementById("ramo");

function el(tag, attrs = {}, padre = svg) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  padre.appendChild(e);
  return e;
}

const base = { x: 200, y: 430 };           // punto donde se juntan los tallos
const flores = [                            // x, y, tamaño, rotación
  { x: 200, y: 90,  s: 1.1,  r: 0 },
  { x: 120, y: 140, s: 1,    r: -20 },
  { x: 285, y: 130, s: 1,    r: 18 },
  { x: 70,  y: 230, s: 0.9,  r: -35 },
  { x: 335, y: 225, s: 0.9,  r: 30 },
  { x: 165, y: 215, s: 1.05, r: -8 },
  { x: 240, y: 220, s: 1,    r: 10 },
  { x: 125, y: 305, s: 0.85, r: -25 },
  { x: 280, y: 305, s: 0.85, r: 22 },
];

// Hoja en forma de corazón
function hoja(x, y, r, s) {
  const g = el("g", { transform: `translate(${x} ${y}) rotate(${r}) scale(${s})` });
  el("path", {
    d: "M0 0 C-30 -10 -35 -50 0 -65 C35 -50 30 -10 0 0Z",
    fill: "url(#hoja)", stroke: "#25552b", "stroke-width": 1.5
  }, g);
  el("path", { d: "M0 -4 L0 -50", stroke: "#8fcf84", "stroke-width": 1.5, fill: "none" }, g);
}

// 1) Hojas del fondo
[[200, 400, -70, 1.3], [200, 400, 70, 1.3], [200, 390, -35, 1.1],
 [200, 390, 35, 1.1], [200, 380, -100, 1], [200, 380, 100, 1]]
  .forEach(h => hoja(...h));

// 2) Tallos
flores.forEach(f => {
  el("path", {
    d: `M${base.x} ${base.y} Q${(base.x + f.x) / 2} ${f.y + 200} ${f.x} ${f.y + 12}`,
    stroke: "#3b7d3b", "stroke-width": 3, fill: "none", "stroke-linecap": "round"
  });
});

// 3) Violeta de 5 pétalos
function violeta({ x, y, s, r }) {
  const g = el("g", { class: "flor", transform: `translate(${x} ${y}) rotate(${r}) scale(${s})` });
  const b = el("g", { class: "balanceo" }, g);
  b.style.animationDelay = `${-Math.random() * 4}s`;

  const petalo = (ang, rx, ry, dy) => {
    const p = el("ellipse", {
      cx: 0, cy: dy, rx, ry,
      fill: "url(#petalo)", stroke: "#3a1675", "stroke-width": 1,
      transform: `rotate(${ang})`
    }, b);
    return p;
  };
  petalo(-28, 10, 17, -15);   // superiores
  petalo(28, 10, 17, -15);
  petalo(-85, 10, 17, -15);   // laterales
  petalo(85, 10, 17, -15);
  petalo(180, 12, 19, -16);   // inferior (más grande)

  // Rayitas del pétalo inferior
  [-8, 0, 8].forEach(a =>
    el("line", { x1: 0, y1: 4, x2: 0, y2: 16, stroke: "#e8d9ff", "stroke-width": 1.2,
                 "stroke-linecap": "round", transform: `rotate(${a + 180})` }, b));

  // Centro
  el("circle", { r: 5, fill: "#ffd84a" }, b);
  el("circle", { r: 2, fill: "#fff3b0" }, b);

  g.addEventListener("click", () => {
    g.classList.remove("salta");
    void g.offsetWidth;            // reinicia la animación
    g.classList.add("salta");
  });
}
flores.forEach(violeta);

// 4) Lazo
el("path", { d: "M200 430 L160 470 L185 478 Z", fill: "#e85d9a" });
el("path", { d: "M200 430 L240 470 L215 478 Z", fill: "#e85d9a" });
el("path", { d: "M185 478 L170 515 L195 505 L200 480Z", fill: "#d1427f" });
el("path", { d: "M215 478 L230 515 L205 505 L200 480Z", fill: "#d1427f" });
el("rect", { x: 186, y: 420, width: 28, height: 22, rx: 6, fill: "#f27bb0" });