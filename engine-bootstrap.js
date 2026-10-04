(() => {
  const BUILD_ID = "20261004-maia-local-v2";
  const NativeWorker = window.Worker;
  const MAIA_MODEL_URL = new URL("./assets/maia3_5m.onnx", document.baseURI).href;
  const ORT_WASM_URL = new URL("./assets/ort/ort-wasm-simd-threaded.wasm", document.baseURI).href;

  class VersionedWorker extends NativeWorker {
    constructor(scriptURL, options) {
      const url = new URL(String(scriptURL), document.baseURI);
      if (url.pathname.endsWith("/stockfish-worker.js")) {
        url.searchParams.set("v", BUILD_ID);
      }
      super(url, options);
    }
  }

  window.Worker = VersionedWorker;
  window.__CHESS_BUILD_ID__ = BUILD_ID;
  window.__CHESS_ENGINE_INFO__ = Object.freeze({
    engine: "Maia3 5M",
    model: "Maia3-5M",
    runtime: "local bundled maia3-js + local ONNX Runtime WASM",
    humanLike: true,
    ratingConditioned: true,
    stockfishReservedForAnalysis: true,
    buildId: BUILD_ID
  });

  // Warm only same-origin binary assets. Do not import Maia/ORT from a CDN.
  const warmAssets = () => {
    for (const url of [MAIA_MODEL_URL, ORT_WASM_URL]) {
      void fetch(url, {
        credentials: "same-origin",
        cache: "force-cache"
      }).catch((error) => {
        console.warn("[Chess] Maia asset warm-up failed; worker will retry.", url, error);
      });
    }
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(warmAssets, { timeout: 1200 });
  } else {
    setTimeout(warmAssets, 0);
  }

  console.info(
    `[Chess] Maia3 5M local runtime · build=${BUILD_ID} · crossOriginIsolated=${window.crossOriginIsolated}`
  );
})();
