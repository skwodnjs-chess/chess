// Compatibility UCI bridge: app.js still talks to this worker using the
// previous UCI-shaped protocol, but actual move generation is Maia3 5M.

const MAIA_MODULE_URL = "https://esm.sh/maia3-js@0.2.0/web?bundle&deps=onnxruntime-web@1.27.0";
const MAIA_MODEL_URL = new URL("./assets/maia3_5m.onnx", self.location.href).href;

let maia = null;
let loadPromise = null;
let currentFen = "startpos";
let elo = 2000;
let temperature = 0.0;
let topP = 1.0;
let multiPv = 5;
let generation = 0;

function emit(line) {
  self.postMessage(line);
}

function emitDebug(payload) {
  emit(`info string maia-debug ${JSON.stringify(payload)}`);
}

function reportFatal(error) {
  const message = error instanceof Error ? error.message : String(error);
  emit(`info string maia-error ${message.replace(/[\r\n]+/g, " ")}`);
  emitDebug({ phase: "error", message, elo, temperature, topP, fen: currentFen });
  setTimeout(() => {
    throw error instanceof Error ? error : new Error(message);
  }, 0);
}

async function ensureMaia() {
  if (maia) return maia;
  if (!loadPromise) {
    loadPromise = (async () => {
      emitDebug({ phase: "loading", model: "Maia3-5M", modelUrl: MAIA_MODEL_URL });
      const { Maia3 } = await import(MAIA_MODULE_URL);
      const instance = new Maia3({
        variant: "5m",
        url: MAIA_MODEL_URL,
        temperature,
        topP,
        topK: multiPv,
        onProgress: (loaded, total) => {
          if (!total) return;
          const percent = Math.max(0, Math.min(100, Math.round((loaded / total) * 100)));
          emit(`info string maia-loading ${percent}`);
        }
      });
      await instance.load();
      maia = instance;
      emit("info string maia-ready");
      emitDebug({ phase: "ready", model: "Maia3-5M" });
      return maia;
    })().catch((error) => {
      loadPromise = null;
      throw error;
    });
  }
  return loadPromise;
}

function parseSetOption(line) {
  const match = line.match(/^setoption\s+name\s+(.+?)(?:\s+value\s+(.*))?$/i);
  if (!match) return;
  const name = match[1].trim().toLowerCase();
  const value = (match[2] ?? "").trim();

  if (name === "uci_elo" || name === "elo" || name === "selfelo") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) elo = Math.max(0, Math.min(5000, Math.round(parsed)));
    emitDebug({ phase: "option", option: name, value: elo });
    return;
  }

  if (name === "temperature") {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0) temperature = parsed;
    emitDebug({ phase: "option", option: "temperature", value: temperature });
    return;
  }

  if (name === "topp") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) topP = Math.max(0, Math.min(1, parsed));
    emitDebug({ phase: "option", option: "topP", value: topP });
    return;
  }

  if (name === "multipv") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) multiPv = Math.max(1, Math.min(20, Math.round(parsed)));
    emitDebug({ phase: "option", option: "multiPv", value: multiPv });
  }
}

async function playMove(searchGeneration) {
  const engine = await ensureMaia();
  if (searchGeneration !== generation) return;
  if (!currentFen || currentFen === "startpos") {
    currentFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  }

  const startedAt = performance.now();
  emitDebug({
    phase: "predict-start",
    elo,
    selfElo: elo,
    oppoElo: elo,
    temperature,
    topP,
    topK: multiPv,
    fen: currentFen
  });

  const result = await engine.predict({
    fen: currentFen,
    selfElo: elo,
    oppoElo: elo,
    temperature,
    topP,
    topK: multiPv
  });

  if (searchGeneration !== generation) return;

  const candidates = (result.candidates ?? []).map((candidate) => ({
    uci: candidate.uci,
    probability: candidate.probability,
    winProbability: candidate.winProbability,
    wdl: candidate.wdl
  }));

  emitDebug({
    phase: "predict-result",
    elo,
    selfElo: elo,
    oppoElo: elo,
    temperature,
    topP,
    elapsedMs: Math.round((performance.now() - startedAt) * 10) / 10,
    fen: currentFen,
    bestMove: result.bestMove,
    candidates
  });

  for (let i = 0; i < candidates.length; i += 1) {
    const candidate = candidates[i];
    const probability = Math.max(1e-6, candidate.probability ?? 0);
    const pseudoCp = Math.round(Math.log(probability) * 100);
    emit(`info multipv ${i + 1} score cp ${pseudoCp} pv ${candidate.uci}`);
  }

  emit(`bestmove ${result.bestMove}`);
}

self.addEventListener("message", (event) => {
  const line = String(event.data ?? "").trim();
  if (!line) return;

  if (line === "uci") {
    emit("id name Maia3 5M");
    emit("id author CSSLab / browser bridge");
    emit("option name Elo type spin default 2000 min 0 max 5000");
    emit("option name SelfElo type spin default 2000 min 0 max 5000");
    emit("option name OppoElo type spin default 2000 min 0 max 5000");
    emit("option name Temperature type string default 0.0");
    emit("option name TopP type string default 1.0");
    emit("option name MultiPV type spin default 5 min 1 max 20");
    emit("uciok");
    void ensureMaia().catch(reportFatal);
    return;
  }

  if (line === "isready") {
    void ensureMaia()
      .then(() => emit("readyok"))
      .catch(reportFatal);
    return;
  }

  if (line === "ucinewgame") {
    generation += 1;
    currentFen = "startpos";
    return;
  }

  if (line === "stop") {
    generation += 1;
    return;
  }

  if (line.startsWith("setoption ")) {
    parseSetOption(line);
    return;
  }

  if (line.startsWith("position fen ")) {
    currentFen = line.slice("position fen ".length).trim();
    return;
  }

  if (line === "position startpos") {
    currentFen = "startpos";
    return;
  }

  if (line.startsWith("go ")) {
    const searchGeneration = generation;
    void playMove(searchGeneration).catch(reportFatal);
  }
});
