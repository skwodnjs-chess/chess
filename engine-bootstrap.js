(() => {
  const NativeWorker = window.Worker;
  const STOCKFISH_WASM_URL = "https://cdn.jsdelivr.net/npm/stockfish@19.0.0/bin/stockfish-19-single.wasm";
  const INITIAL_CLOCK_MS = 120_000;
  const INCREMENT_MS = 1_000;

  function showEngineError() {
    const row = document.querySelector("#status-row");
    const status = document.querySelector("#status");
    const dot = document.querySelector("#status-dot");
    const badge = document.querySelector("#engine-badge");
    if (status) status.textContent = "Stockfish 엔진을 불러오지 못했습니다. 새로고침 후 다시 시도하세요.";
    if (row) row.classList.add("visible");
    if (dot) dot.classList.remove("active", "thinking");
    if (badge) {
      badge.textContent = "AI · 엔진 오류";
      badge.setAttribute("aria-label", "Stockfish 엔진 오류");
    }
  }

  class ChessWorker extends NativeWorker {
    constructor(scriptURL, options) {
      const url = new URL(String(scriptURL), document.baseURI);
      const isStockfish = url.pathname.endsWith("/stockfish-worker.js");

      if (isStockfish) {
        // stockfish.js reads the worker URL hash as the WASM location.
        url.hash = encodeURIComponent(STOCKFISH_WASM_URL);
      }

      super(url, options);
      this.__isStockfish = isStockfish;
      this.__stockfishElo = null;
      this.__clockMs = INITIAL_CLOCK_MS;
      this.__sideToMove = "w";
      this.__searchStartedAt = null;

      if (isStockfish) {
        // Register before app.js adds its own error handler. If the real engine
        // fails to load, do not silently fall back to a weak heuristic player.
        super.addEventListener("error", (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          this.__searchStartedAt = null;
          showEngineError();
        });

        super.addEventListener("message", (event) => {
          const payload = String(event.data ?? "");
          for (const line of payload.split(/\r?\n/)) {
            if (!line.startsWith("bestmove ") || this.__searchStartedAt === null) continue;
            const elapsed = Math.max(0, performance.now() - this.__searchStartedAt);
            this.__clockMs = Math.max(1, this.__clockMs - elapsed) + INCREMENT_MS;
            this.__searchStartedAt = null;
          }
        });
      }
    }

    postMessage(message, transferOrOptions) {
      if (this.__isStockfish && typeof message === "string") {
        const eloMatch = message.match(/^setoption name UCI_Elo value (\d+)$/);
        if (eloMatch) this.__stockfishElo = Number(eloMatch[1]);

        if (message === "setoption name UCI_LimitStrength value false") {
          this.__stockfishElo = null;
        }

        if (message === "ucinewgame") {
          this.__clockMs = INITIAL_CLOCK_MS;
          this.__sideToMove = "w";
          this.__searchStartedAt = null;
        }

        if (message.startsWith("position fen ")) {
          const parts = message.split(/\s+/);
          this.__sideToMove = parts[3] === "b" ? "b" : "w";
        }

        // app.js still emits a placeholder movetime command. Replace it before
        // it reaches Stockfish with a real 120+1 clock command. Stockfish then
        // decides how long to spend on each move via its own time manager.
        if (/^go movetime \d+$/.test(message)) {
          const clock = Math.max(1, Math.round(this.__clockMs));
          this.__searchStartedAt = performance.now();
          message = `go wtime ${clock} btime ${clock} winc ${INCREMENT_MS} binc ${INCREMENT_MS}`;
        }
      }

      if (arguments.length > 1) {
        return super.postMessage(message, transferOrOptions);
      }
      return super.postMessage(message);
    }
  }

  window.Worker = ChessWorker;
  window.__CHESS_ENGINE_INFO__ = Object.freeze({
    engine: "Stockfish 19 full single-threaded WASM",
    timeControl: "120+1",
    nativeEloMin: 1320,
    nativeEloMax: 3190
  });
})();
