const board = document.querySelector("#board");

function bendDiagonalArrows() {
  const layer = board.querySelector(".annotation-layer");
  if (!layer) return;

  for (const line of [...layer.querySelectorAll("line.annotation-arrow")]) {
    const x1 = Number(line.getAttribute("x1"));
    const y1 = Number(line.getAttribute("y1"));
    const x2 = Number(line.getAttribute("x2"));
    const y2 = Number(line.getAttribute("y2"));
    if (x1 === x2 || y1 === y2) continue;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2}`);
    path.setAttribute("class", "annotation-arrow");
    path.setAttribute("marker-end", line.getAttribute("marker-end") || "url(#board-arrow-head)");
    line.replaceWith(path);
  }
}

new MutationObserver(() => queueMicrotask(bendDiagonalArrows)).observe(board, { childList: true });
bendDiagonalArrows();
