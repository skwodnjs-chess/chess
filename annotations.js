const board = document.querySelector("#board");
const SVG_NS = "http://www.w3.org/2000/svg";
const arrows = [];
let dragStart = null;

function squareFromEvent(event) {
  const target = event.target instanceof Element ? event.target.closest(".square") : null;
  return target?.dataset.square ?? null;
}

function clearArrows() {
  if (!arrows.length) return;
  arrows.length = 0;
  board.querySelector(".annotation-layer")?.remove();
}

function toggleArrow(from, to) {
  if (!from || !to || from === to) return;
  const index = arrows.findIndex((arrow) => arrow.from === from && arrow.to === to);
  if (index >= 0) arrows.splice(index, 1);
  else arrows.push({ from, to });
  renderArrows();
}

function squareCenter(square, boardRect) {
  const element = board.querySelector(`[data-square="${square}"]`);
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left - boardRect.left + rect.width / 2,
    y: rect.top - boardRect.top + rect.height / 2,
    size: Math.min(rect.width, rect.height)
  };
}

function renderArrows() {
  board.querySelector(".annotation-layer")?.remove();
  if (!arrows.length) return;
  const boardRect = board.getBoundingClientRect();
  if (!boardRect.width || !boardRect.height) return;

  const svg = document.createElementNS(SVG_NS, "svg");
  svg.classList.add("annotation-layer");
  svg.setAttribute("viewBox", `0 0 ${boardRect.width} ${boardRect.height}`);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");

  const defs = document.createElementNS(SVG_NS, "defs");
  const marker = document.createElementNS(SVG_NS, "marker");
  marker.setAttribute("id", "board-arrow-head");
  marker.setAttribute("markerWidth", "4.5");
  marker.setAttribute("markerHeight", "4.5");
  marker.setAttribute("refX", "3.75");
  marker.setAttribute("refY", "2.25");
  marker.setAttribute("orient", "auto");
  marker.setAttribute("markerUnits", "strokeWidth");
  const head = document.createElementNS(SVG_NS, "path");
  head.setAttribute("d", "M0,0 L4.5,2.25 L0,4.5 Z");
  head.setAttribute("class", "annotation-arrow-head");
  marker.append(head);
  defs.append(marker);
  svg.append(defs);

  for (const arrow of arrows) {
    const from = squareCenter(arrow.from, boardRect);
    const to = squareCenter(arrow.to, boardRect);
    if (!from || !to) continue;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.hypot(dx, dy);
    if (!distance) continue;
    const ux = dx / distance;
    const uy = dy / distance;
    const startInset = from.size * 0.08;
    const endInset = to.size * 0.27;
    const line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", String(from.x + ux * startInset));
    line.setAttribute("y1", String(from.y + uy * startInset));
    line.setAttribute("x2", String(to.x - ux * endInset));
    line.setAttribute("y2", String(to.y - uy * endInset));
    line.setAttribute("marker-end", "url(#board-arrow-head)");
    line.setAttribute("class", "annotation-arrow");
    svg.append(line);
  }

  board.append(svg);
}

board.addEventListener("contextmenu", (event) => event.preventDefault());

board.addEventListener("mousedown", (event) => {
  const square = squareFromEvent(event);
  if (!square) return;
  if (event.button === 0) {
    clearArrows();
    return;
  }
  if (event.button === 2) {
    event.preventDefault();
    dragStart = square;
  }
});

board.addEventListener("mouseup", (event) => {
  if (event.button !== 2 || !dragStart) return;
  event.preventDefault();
  const end = squareFromEvent(event);
  const start = dragStart;
  dragStart = null;
  if (end) toggleArrow(start, end);
});

document.addEventListener("mouseup", (event) => {
  if (event.button === 2) dragStart = null;
});

new MutationObserver(() => {
  if (arrows.length && !board.querySelector(".annotation-layer")) queueMicrotask(renderArrows);
}).observe(board, { childList: true });

new ResizeObserver(() => {
  if (arrows.length) renderArrows();
}).observe(board);
