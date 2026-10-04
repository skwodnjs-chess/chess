const threaded = self.crossOriginIsolated && typeof SharedArrayBuffer !== "undefined";

importScripts(
  threaded
    ? "https://unpkg.com/stockfish@19.0.0/bin/stockfish-19.js"
    : "https://unpkg.com/stockfish@19.0.0/bin/stockfish-19-single.js"
);
