(() => {
  const NativeWorker = window.Worker;
  const THREADED = window.crossOriginIsolated && typeof SharedArrayBuffer !== "undefined";
  const STOCKFISH_WASM_URL = THREADED
    ? "https://unpkg.com/stockfish@19.0.0/bin/stockfish-19.wasm"
    : "https://unpkg.com/stockfish@19.0.0/bin/stockfish-19-single.wasm";
  const INITIAL_CLOCK_MS = 120_000;
  const INCREMENT_MS = 1_000;
  const THREADS = THREADED
    ? Math.max(2, Math.min(4, Math.max(1, (navigator.hardwareConcurrency || 4) - 1)))
    : 1;

  function showEngineError(event) {
    console.error("Stockfish worker error:", event?.message || event);
    const row = document.querySelector("#status-row");
    const status = document.querySelector("#status");
    const dot = document.querySelector("#status-dot");
    const badge = document.querySelector("#engine-badge");
    if (status) status.textContent = "Stockfish 엔진 로딩에 실패했습니다.";
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
      this.__clockMs = INITIAL_CLOCK_MS;
      this.__searchStartedAt = null;

      if (isStockfish) {
        super.addEventListener("error", (event) => {
          this.__searchStartedAt = null;
          showEngineError(event);
        });

        super.addEventListener("message", (event) => {
          const payload = String(event.data ?? "");
          for (const line of payload.split(/\r?\n/)) {
            if (line === "uciok" && THREADED) {
              // Apply threading before app.js sends isready.
              super.postMessage(`setoption name Threads value ${THREADS}`);
              super.postMessage("setoption name Hash value 64");
            }

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
        if (message === "ucinewgame") {
          this.__clockMs = INITIAL_CLOCK_MS;
          this.__searchStartedAt = null;
        }

        // app.js emits a placeholder movetime command as the search trigger.
        // Replace it with a real 120+1 clock so Stockfish's own time manager
        // decides how long to spend on each move.
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
    engine: THREADED
      ? "Stockfish 19 full multi-threaded WASM"
      : "Stockfish 19 full single-threaded WASM",
    threaded: THREADED,
    threads: THREADS,
    timeControl: "120+1",
    nativeEloMin: 1320,
    nativeEloMax: 3190
  });

  console.info(
    `[Chess] ${window.__CHESS_ENGINE_INFO__.engine} · threads=${THREADS} · crossOriginIsolated=${window.crossOriginIsolated}`
  );
})();
