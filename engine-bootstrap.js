(() => {
  const NativeWorker = window.Worker;
  const STOCKFISH_WASM_URL = "https://cdn.jsdelivr.net/npm/stockfish@19.0.0/bin/stockfish-19-lite-single.wasm";

  function thinkTimeForRating(rating) {
    if (!Number.isFinite(rating)) return 350;
    if (rating >= 2800) return 2200;
    if (rating >= 2400) return 1800;
    if (rating >= 2000) return 1400;
    if (rating >= 1800) return 1100;
    if (rating >= 1600) return 900;
    if (rating >= 1400) return 700;
    if (rating >= 1320) return 600;
    return 350;
  }

  class ChessWorker extends NativeWorker {
    constructor(scriptURL, options) {
      const url = new URL(String(scriptURL), document.baseURI);
      const isStockfish = url.pathname.endsWith("/stockfish-worker.js");

      if (isStockfish) {
        // Stockfish.js reads the worker URL hash as the WASM location.
        url.hash = encodeURIComponent(STOCKFISH_WASM_URL);
      }

      super(url, options);
      this.__isStockfish = isStockfish;
      this.__stockfishElo = null;
    }

    postMessage(message, transferOrOptions) {
      if (this.__isStockfish && typeof message === "string") {
        const eloMatch = message.match(/^setoption name UCI_Elo value (\d+)$/);
        if (eloMatch) this.__stockfishElo = Number(eloMatch[1]);

        if (message === "setoption name UCI_LimitStrength value false") {
          this.__stockfishElo = null;
        }

        if (/^go movetime \d+$/.test(message)) {
          message = `go movetime ${thinkTimeForRating(this.__stockfishElo)}`;
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
    engine: "Stockfish 19 lite single-threaded WASM",
    nativeEloMin: 1320,
    nativeEloMax: 3190
  });
})();
