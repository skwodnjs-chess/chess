const board = document.querySelector("#board");

function squareDelta(from, to) {
  if (!/^[a-h][1-8]$/.test(from ?? "") || !/^[a-h][1-8]$/.test(to ?? "")) return null;
  return {
    file: Math.abs(to.charCodeAt(0) - from.charCodeAt(0)),
    rank: Math.abs(Number(to[1]) - Number(from[1]))
  };
}

function bendKnightArrows() {
  const layer = board.querySelector(".annotation-layer");
  if (!layer) return;

  for (const line of [...layer.querySelectorAll("line.annotation-arrow")]) {
    const delta = squareDelta(line.dataset.from, line.dataset.to);
    if (!delta) continue;

    const isKnightMove =
      (delta.file === 2 && delta.rank === 1) ||
      (delta.file === 1 && delta.rank === 2);
    if (!isKnightMove) continue;

    const x1 = Number(line.getAttribute("x1"));
    const y1 = Number(line.getAttribute("y1"));
    const x2 = Number(line.getAttribute("x2"));
    const y2 = Number(line.getAttribute("y2"));
    const horizontalFirst = delta.file > delta.rank;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      horizontalFirst
        ? `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2}`
        : `M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2}`
    );
    path.setAttribute("class", "annotation-arrow");
    path.setAttribute("marker-end", line.getAttribute("marker-end") || "url(#board-arrow-head)");
    path.dataset.from = line.dataset.from;
    path.dataset.to = line.dataset.to;
    line.replaceWith(path);
  }
}

new MutationObserver(() => queueMicrotask(bendKnightArrows)).observe(board, { childList: true });
bendKnightArrows();
