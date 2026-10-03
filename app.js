import { Chess } from "https://cdn.jsdelivr.net/npm/chess.js@1.4.0/+esm";

const boardElement = document.querySelector("#board");
const colorButton = document.querySelector("#color-button");
const startButton = document.querySelector("#start-button");
const resetButton = document.querySelector("#reset-button");
const newGameButton = document.querySelector("#new-game-button");
const statusRow = document.querySelector("#status-row");
const statusElement = document.querySelector("#status");
const statusDot = document.querySelector("#status-dot");
const resultCard = document.querySelector("#result-card");
const resultTitle = document.querySelector("#result-title");
const resultDetail = document.querySelector("#result-detail");
const historyFirstButton = document.querySelector("#history-first");
const historyPrevButton = document.querySelector("#history-prev");
const historyNextButton = document.querySelector("#history-next");
const historyLastButton = document.querySelector("#history-last");
const historyPosition = document.querySelector("#history-position");

const pieceGlyphs = {
  w: { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" },
  b: { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" }
};

let game = new Chess();
let playerColor = "w";
let started = false;
let thinking = false;
let selectedSquare = null;
let legalTargets = new Set();
let turnToken = 0;
let positionHistory = [game.fen()];
let moveHistory = [];
let historyIndex = 0;
let liveStatus = { text: "", mode: "idle" };
let resultState = null;

class StockfishClient {
  constructor() {
    this.worker = null;
    this.readyPromise = null;
    this.readyResolve = null;
    this.pending = null;
    this.candidates = new Map();
    this.failed = false;
  }

  ensureWorker() {
    if (this.worker || this.failed) return;
    try {
      this.worker = new Worker("./stockfish-worker.js");
      this.readyPromise = new Promise((resolve) => { this.readyResolve = resolve; });
      this.worker.addEventListener("message", (event) => this.handleMessage(String(event.data ?? "")));
      this.worker.addEventListener("error", () => this.fail());
      this.worker.postMessage("uci");
    } catch {
      this.fail();
    }
  }

  fail() {
    this.failed = true;
    if (this.pending) {
      this.pending.reject(new Error("Stockfish unavailable"));
      this.pending = null;
    }
    this.worker?.terminate();
    this.worker = null;
    this.readyResolve?.();
    this.readyResolve = null;
  }

  handleMessage(message) {
    for (const line of message.split(/\r?\n/)) {
      if (!line) continue;
      if (line === "uciok") {
        this.worker?.postMessage("setoption name MultiPV value 5");
        this.worker?.postMessage("setoption name Skill Level value 20");
        this.worker?.postMessage("isready");
        continue;
      }
      if (line === "readyok") {
        this.readyResolve?.();
        this.readyResolve = null;
        continue;
      }
      if (!this.pending) continue;
      if (line.startsWith("info ")) this.captureCandidate(line);
      if (line.startsWith("bestmove ")) {
        const fallback = line.split(/\s+/)[1];
        const { resolve, legalMoves } = this.pending;
        this.pending = null;
        resolve(this.chooseApprox1000Move(fallback, legalMoves));
      }
    }
  }

  captureCandidate(line) {
    const pv = line.match(/\bpv\s+([a-h][1-8][a-h][1-8][qrbn]?)/);
    const rank = line.match(/\bmultipv\s+(\d+)/);
    const cp = line.match(/\bscore\s+cp\s+(-?\d+)/);
    const mate = line.match(/\bscore\s+mate\s+(-?\d+)/);
    if (!pv || !rank || (!cp && !mate)) return;
    const score = cp ? Number(cp[1]) : (Number(mate[1]) > 0 ? 100000 : -100000);
    this.candidates.set(Number(rank[1]), { move: pv[1], score });
  }

  chooseApprox1000Move(fallback, legalMoves) {
    if (legalMoves.length > 1 && Math.random() < 0.12) return legalMoves[Math.floor(Math.random() * legalMoves.length)];
    const candidates = [...this.candidates.values()].filter((candidate) => legalMoves.includes(candidate.move));
    if (!candidates.length) return legalMoves.includes(fallback) ? fallback : legalMoves[0];
    const bestScore = Math.max(...candidates.map((candidate) => candidate.score));
    const weighted = candidates.map((candidate) => ({ candidate, weight: Math.exp(-(bestScore - candidate.score) / 165) }));
    const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    let roll = Math.random() * total;
    for (const entry of weighted) {
      roll -= entry.weight;
      if (roll <= 0) return entry.candidate.move;
    }
    return weighted[0].candidate.move;
  }

  async move(fen, legalMoves) {
    this.ensureWorker();
    if (this.failed || !this.worker) throw new Error("Stockfish unavailable");
    await this.readyPromise;
    this.candidates.clear();
    return new Promise((resolve, reject) => {
      this.pending = { resolve, reject, legalMoves };
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage("go movetime 350");
    });
  }

  reset() {
    if (!this.worker) return;
    if (this.pending) {
      this.worker.postMessage("stop");
      this.pending.reject(new Error("Search cancelled"));
      this.pending = null;
    }
    this.candidates.clear();
    this.worker.postMessage("ucinewgame");
    this.worker.postMessage("isready");
  }
}

const engine = new StockfishClient();

function isAtLatestPosition() {
  return historyIndex === positionHistory.length - 1;
}

function viewGame() {
  return isAtLatestPosition() ? game : new Chess(positionHistory[historyIndex]);
}

function recordMove(move) {
  const followLatest = isAtLatestPosition();
  moveHistory.push({ from: move.from, to: move.to });
  positionHistory.push(game.fen());
  if (followLatest) historyIndex = positionHistory.length - 1;
  syncHistoryControls();
}

function renderBoard() {
  boardElement.replaceChildren();
  const displayedGame = viewGame();
  const displayedLastMove = historyIndex > 0 ? moveHistory[historyIndex - 1] : null;
  const livePosition = isAtLatestPosition();
  const files = playerColor === "w" ? ["a", "b", "c", "d", "e", "f", "g", "h"] : ["h", "g", "f", "e", "d", "c", "b", "a"];
  const ranks = playerColor === "w" ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8];

  ranks.forEach((rank, visualRankIndex) => {
    files.forEach((file, visualFileIndex) => {
      const square = `${file}${rank}`;
      const piece = displayedGame.get(square);
      const isDark = ((file.charCodeAt(0) - 97) + rank) % 2 === 1;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `square ${isDark ? "dark" : "light"}`;
      button.dataset.square = square;
      button.setAttribute("role", "gridcell");
      button.setAttribute("aria-label", describeSquare(square, piece));
      if (livePosition && selectedSquare === square) button.classList.add("selected");
      if (livePosition && legalTargets.has(square)) button.classList.add("legal");
      if (piece) button.classList.add("has-piece");
      if (displayedLastMove && (displayedLastMove.from === square || displayedLastMove.to === square)) button.classList.add("last-move");

      if (piece) {
        const span = document.createElement("span");
        span.className = "piece";
        span.textContent = pieceGlyphs[piece.color][piece.type];
        button.append(span);
      }
      if (visualRankIndex === 7) button.append(makeCoord("file", file));
      if (visualFileIndex === 0) button.append(makeCoord("rank", String(rank)));
      button.addEventListener("click", () => handleSquareClick(square));
      boardElement.append(button);
    });
  });
  renderResult();
}

function makeCoord(kind, value) {
  const span = document.createElement("span");
  span.className = `coord ${kind}`;
  span.textContent = value;
  return span;
}

function describeSquare(square, piece) {
  if (!piece) return `${square}, 빈 칸`;
  const names = { k: "킹", q: "퀸", r: "룩", b: "비숍", n: "나이트", p: "폰" };
  return `${square}, ${piece.color === "w" ? "백" : "흑"} ${names[piece.type]}`;
}

function handleSquareClick(square) {
  if (!started || thinking || game.isGameOver() || game.turn() !== playerColor || !isAtLatestPosition()) return;
  const piece = game.get(square);
  if (!selectedSquare) {
    if (piece?.color === playerColor) selectSquare(square);
    return;
  }
  if (square === selectedSquare) {
    clearSelection();
    renderBoard();
    return;
  }
  if (piece?.color === playerColor) {
    selectSquare(square);
    return;
  }

  let move = null;
  try { move = game.move({ from: selectedSquare, to: square, promotion: "q" }); } catch { move = null; }
  if (!move) return;
  recordMove(move);
  clearSelection();
  renderBoard();
  if (!updateGameOverStatus()) void requestAiMove();
}

function selectSquare(square) {
  selectedSquare = square;
  legalTargets = new Set(game.moves({ square, verbose: true }).map((move) => move.to));
  renderBoard();
}

function clearSelection() {
  selectedSquare = null;
  legalTargets.clear();
}

function legalUciMoves() {
  return game.moves({ verbose: true }).map((move) => `${move.from}${move.to}${move.promotion ?? ""}`);
}

function chooseFallbackMove() {
  const moves = game.moves({ verbose: true });
  if (!moves.length) return null;
  const scored = moves.map((move) => {
    let score = Math.random() * 1.8;
    if (move.captured) score += 2.5;
    if (move.san.includes("+")) score += 1.8;
    if (["d4", "d5", "e4", "e5"].includes(move.to)) score += 0.7;
    return { move, score };
  }).sort((a, b) => b.score - a.score);
  const pool = scored.slice(0, Math.min(6, scored.length));
  const pick = Math.random() < 0.2 ? pool[Math.floor(Math.random() * pool.length)] : pool[0];
  return `${pick.move.from}${pick.move.to}${pick.move.promotion ?? ""}`;
}

async function requestAiMove() {
  if (!started || game.isGameOver() || game.turn() === playerColor) return;
  const token = ++turnToken;
  thinking = true;
  clearSelection();
  renderBoard();
  setStatus("AI가 생각 중입니다…", "thinking");
  const legalMoves = legalUciMoves();
  let uciMove = null;
  try { uciMove = await engine.move(game.fen(), legalMoves); } catch { uciMove = chooseFallbackMove(); }
  if (token !== turnToken || !started || game.isGameOver()) return;
  thinking = false;
  if (!uciMove || !legalMoves.includes(uciMove)) uciMove = chooseFallbackMove();
  if (!uciMove) return updateGameOverStatus();

  const move = game.move({ from: uciMove.slice(0, 2), to: uciMove.slice(2, 4), promotion: uciMove[4] || "q" });
  recordMove(move);
  renderBoard();
  if (!updateGameOverStatus()) setStatus(game.inCheck() ? "체크입니다. 당신의 차례입니다." : "당신의 차례입니다.", "active");
}

function updateGameOverStatus() {
  if (game.isCheckmate()) {
    const winnerColor = game.turn() === "w" ? "b" : "w";
    const playerWon = winnerColor === playerColor;
    setStatus(`체크메이트 · ${winnerColor === "w" ? "백" : "흑"} 승리`, "idle");
    setResult(playerWon ? "win" : "loss", playerWon ? "승리" : "패배", "체크메이트");
    return true;
  }
  if (game.isStalemate()) return finishDraw("스테일메이트");
  if (game.isThreefoldRepetition()) return finishDraw("3회 동형 반복");
  if (game.isInsufficientMaterial()) return finishDraw("기물 부족");
  if (game.isDraw()) return finishDraw("무승부");
  return false;
}

function finishDraw(reason) {
  setStatus(`${reason} · 무승부`, "idle");
  setResult("draw", "무승부", reason);
  return true;
}

function setResult(kind, title, detail) {
  resultState = { kind, title, detail };
  renderResult();
}

function clearResult() {
  resultState = null;
  renderResult();
}

function renderResult() {
  const visible = Boolean(resultState) && isAtLatestPosition();
  resultCard.classList.remove("visible", "win", "loss", "draw");
  resultCard.setAttribute("aria-hidden", visible ? "false" : "true");
  if (!visible) return;
  resultTitle.textContent = resultState.title;
  resultDetail.textContent = resultState.detail;
  resultCard.classList.add(resultState.kind, "visible");
}

function setStatus(text, mode = "idle") {
  liveStatus = { text, mode };
  renderStatus();
}

function renderStatus() {
  const visible = isAtLatestPosition() && Boolean(liveStatus.text);
  statusElement.textContent = visible ? liveStatus.text : "";
  statusRow.classList.toggle("visible", visible);
  statusDot.classList.remove("active", "thinking");
  if (!visible) return;
  if (liveStatus.mode === "active") statusDot.classList.add("active");
  if (liveStatus.mode === "thinking") statusDot.classList.add("thinking");
}

function syncHistoryControls() {
  const lastIndex = positionHistory.length - 1;
  historyFirstButton.disabled = historyIndex === 0;
  historyPrevButton.disabled = historyIndex === 0;
  historyNextButton.disabled = historyIndex === lastIndex;
  historyLastButton.disabled = historyIndex === lastIndex;
  historyPosition.textContent = `${historyIndex} / ${lastIndex}`;
}

function goToHistory(index) {
  const lastIndex = positionHistory.length - 1;
  historyIndex = Math.max(0, Math.min(index, lastIndex));
  clearSelection();
  syncHistoryControls();
  renderBoard();
  renderStatus();
}

function syncControls() {
  const colorName = playerColor === "w" ? "백" : "흑";
  colorButton.disabled = started;
  startButton.disabled = started;
  colorButton.title = `${colorName}으로 플레이 · 색상 전환`;
  colorButton.setAttribute("aria-label", `${colorName}으로 플레이, 색상 전환`);
  syncHistoryControls();
}

function resetGame() {
  turnToken += 1;
  game = new Chess();
  started = false;
  thinking = false;
  clearSelection();
  engine.reset();
  positionHistory = [game.fen()];
  moveHistory = [];
  historyIndex = 0;
  liveStatus = { text: "", mode: "idle" };
  clearResult();
  renderBoard();
  syncControls();
  renderStatus();
}

colorButton.addEventListener("click", () => {
  if (started) return;
  playerColor = playerColor === "w" ? "b" : "w";
  renderBoard();
  syncControls();
});

startButton.addEventListener("click", () => {
  if (started) return;
  started = true;
  turnToken += 1;
  syncControls();
  if (game.turn() === playerColor) setStatus("당신의 차례입니다.", "active");
  else void requestAiMove();
});

resetButton.addEventListener("click", resetGame);
newGameButton?.addEventListener("click", resetGame);
historyFirstButton.addEventListener("click", () => goToHistory(0));
historyPrevButton.addEventListener("click", () => goToHistory(historyIndex - 1));
historyNextButton.addEventListener("click", () => goToHistory(historyIndex + 1));
historyLastButton.addEventListener("click", () => goToHistory(positionHistory.length - 1));

renderBoard();
syncControls();
renderStatus();
