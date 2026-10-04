import * as ort from "onnxruntime-web";
import { Maia3 } from "maia3-js/web";

const MAIA_MODEL_URL = new URL("./assets/maia3_5m.onnx", self.location.href).href;
const ORT_WASM_MJS_URL = new URL("./assets/ort/ort-wasm-simd-threaded.mjs", self.location.href).href;
const ORT_WASM_URL = new URL("./assets/ort/ort-wasm-simd-threaded.wasm", self.location.href).href;

// Maia3 is inference-only here. Keep ORT single-threaded and explicitly point
// both the external Emscripten module and its WASM binary at same-origin files.
// This avoids the embedded ORT factory path that breaks when re-bundled.
ort.env.wasm.numThreads = 1;
ort.env.wasm.proxy = false;
ort.env.wasm.wasmPaths = {
  mjs: ORT_WASM_MJS_URL,
  wasm: ORT_WASM_URL
};

let maia = null;
let loadPromise = null;
let currentFen = "startpos";
let elo = 2000;
let temperature = 0;
let topP = 1;
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
  throw error instanceof Error ? error : new Error(message);
}

async function ensureMaia() {
  if (maia) return maia;
  if (!loadPromise) {
    const startedAt = performance.now();
    loadPromise = (async () => {
      emitDebug({
        phase: "load-start",
        model: MAIA_MODEL_URL,
        ortMjs: ORT_WASM_MJS_URL,
        ortWasm: ORT_WASM_URL
      });
      const instance = new Maia3({
        variant: "5m",
        url: MAIA_MODEL_URL,
        executionProviders: ["wasm"],
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
      emitDebug({
        phase: "load-ready",
        elapsedMs: Math.round(performance.now() - startedAt),
        backend: "wasm-external",
        ortThreads: 1
      });
      emit("info string maia-ready");
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
    if (Number.isFinite(parsed)) elo = Math.max(400, Math.min(3200, Math.round(parsed)));
    return;
  }
  if (name === "temperature") {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0) temperature = parsed;
    return;
  }
  if (name === "topp") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) topP = Math.max(0, Math.min(1, parsed));
    return;
  }
  if (name === "multipv") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) multiPv = Math.max(1, Math.min(10, Math.round(parsed)));
  }
}

async function playMove(searchGeneration) {
  const engine = await ensureMaia();
  if (searchGeneration !== generation) return;

  const fen = !currentFen || currentFen === "startpos"
    ? "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    : currentFen;

  const startedAt = performance.now();
  emitDebug({ phase: "predict-start", elo, temperature, topP, fen });

  const result = await engine.predict({
    fen,
    selfElo: elo,
    oppoElo: elo,
    temperature,
    topP,
    topK: multiPv
  });

  if (searchGeneration !== generation) return;

  const candidates = (result.candidates ?? []).map((candidate) => ({
    uci: candidate.uci,
    probability: Number(candidate.probability ?? 0)
  }));

  emitDebug({
    phase: "predict-result",
    elo,
    selfElo: elo,
    oppoElo: elo,
    temperature,
    topP,
    elapsedMs: Math.round(performance.now() - startedAt),
    bestMove: result.bestMove,
    candidates
  });

  for (let i = 0; i < candidates.length; i += 1) {
    const candidate = candidates[i];
    const probability = Math.max(1e-9, candidate.probability);
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
    emit("id author CSSLab / browser bundle");
    emit("option name Elo type spin default 2000 min 400 max 3200");
    emit("option name Temperature type string default 0");
    emit("option name TopP type string default 1");
    emit("option name MultiPV type spin default 5 min 1 max 10");
    emit("uciok");
    void ensureMaia().catch(reportFatal);
    return;
  }

  if (line === "isready") {
    void ensureMaia().then(() => emit("readyok")).catch(reportFatal);
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

  if (line.startsWith("go")) {
    const searchGeneration = generation;
    void playMove(searchGeneration).catch(reportFatal);
  }
});
