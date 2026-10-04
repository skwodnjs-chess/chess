(() => {
  const MAIA_MODULE_URL = "https://esm.sh/maia3-js@0.2.0/web?bundle&deps=onnxruntime-web@1.27.0";
  const MAIA_MODEL_URL = "https://huggingface.co/cemoss17/maia3-onnx/resolve/main/maia3_5m.onnx";

  window.__CHESS_ENGINE_INFO__ = Object.freeze({
    engine: "Maia3 5M",
    model: "Maia3-5M",
    humanLike: true,
    ratingConditioned: true,
    stockfishReservedForAnalysis: true
  });

  // Start the large network/model downloads while the player is deciding on a
  // move. The actual ONNX session is created inside the engine worker, so UI
  // rendering stays responsive and the first AI turn usually avoids the full
  // network download latency.
  const warmAssets = () => {
    void import(MAIA_MODULE_URL).catch((error) => {
      console.warn("[Chess] Maia3 module warm-up failed; worker will retry.", error);
    });
    void fetch(MAIA_MODEL_URL, {
      mode: "cors",
      credentials: "omit",
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
