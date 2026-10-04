(() => {
  const NativeWorker = window.Worker;
  const THREADED = window.crossOriginIsolated && typeof SharedArrayBuffer !== "undefined";
  const STOCKFISH_WASM_URL = THREADED
    ? "https://unpkg.com/stockfish@19.0.0/bin/stockfish-19.wasm"
    : "https://unpkg.com/stockfish@19.0.0/bin/stockfish-19-single.wasm";
  const THREADS = THREADED
    ? Math.max(2, Math.min(4, Math.max(1, (navigator.hardwareConcurrency || 4) - 1)))
    : 1;
  const SEARCH_MS = THREADED ? 700 : 1200;

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

      if (isStockfish) {
        super.addEventListener("error", (event) => showEngineError(event));

        super.addEventListener("message", (event) => {
          const payload = String(event.data ?? "");
          for (const line of payload.split(/\r?\n/)) {
            if (line === "uciok" && THREADED) {
              // Apply threading before app.js sends isready.
              super.postMessage(`setoption name Threads value ${THREADS}`);
              super.postMessage("setoption name Hash value 64");
            }
          }
        });
      }
    }

    postMessage(message, transferOrOptions) {
      if (this.__isStockfish && typeof message === "string") {
        // app.js uses `go movetime 350` as a generic search trigger. Replace
        // that placeholder with a short, predictable cap. Full multi-threaded
        // Stockfish searches far more nodes within this window than the old
        // lite/single-threaded setup, while UCI_Elo still controls move choice.
        if (/^go movetime \d+$/.test(message)) {
          message = `go movetime ${SEARCH_MS}`;
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
    searchMs: SEARCH_MS,
    nativeEloMin: 1320,
    nativeEloMax: 3190
  });

  console.info(
    `[Chess] ${window.__CHESS_ENGINE_INFO__.engine} · threads=${THREADS} · movetime=${SEARCH_MS}ms · crossOriginIsolated=${window.crossOriginIsolated}`
  );
})();
