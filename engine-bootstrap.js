(() => {
  const MAIA_MODULE_URL = "https://esm.sh/maia3-js@0.2.0/web?bundle&deps=onnxruntime-web@1.27.0";
  const MAIA_MODEL_URL = new URL("./assets/maia3_5m.onnx", document.baseURI).href;

  window.__CHESS_ENGINE_INFO__ = Object.freeze({
    engine: "Maia3 5M",
    model: "Maia3-5M",
    humanLike: true,
    ratingConditioned: true,
    stockfishReservedForAnalysis: true
  });

  // Warm the module and same-origin model while the player is deciding on a
  // move. The actual ONNX session is still created inside the engine worker.
  const warmAssets = () => {
    void import(MAIA_MODULE_URL).catch((error) => {
      console.warn("[Chess] Maia3 module warm-up failed; worker will retry.", error);
    });
    void fetch(MAIA_MODEL_URL, {
      credentials: "same-origin",
      cache: "force-cache"
    }).catch((error) => {
      console.warn("[Chess] Maia3 model warm-up failed; worker will retry.", error);
    });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(warmAssets, { timeout: 1200 });
  } else {
    setTimeout(warmAssets, 0);
  }

  console.info(
    `[Chess] Maia3 5M playing engine · crossOriginIsolated=${window.crossOriginIsolated}`
  );
})();
