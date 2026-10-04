// Compatibility UCI bridge: app.js still talks to this worker using the
// Stockfish-shaped protocol, but actual move generation is Maia3 5M.
// Stockfish assets remain in the repository for future post-game analysis.

const MAIA_MODULE_URL = "https://esm.sh/maia3-js@0.2.0/web?bundle&deps=onnxruntime-web@1.27.0";
const MAIA_MODEL_URL = "https://huggingface.co/cemoss17/maia3-onnx/resolve/main/maia3_5m.onnx";

let maia = null;
let loadPromise = null;
let currentFen = "startpos";
let elo = 1000;
let temperature = 1.0;
let topP = 1.0;
let generation = 0;

function emit(line) {
  self.postMessage(line);
}

function reportFatal(error) {
  const message = error instanceof Error ? error.message : String(error);
  emit(`info string maia-error ${message.replace(/[\r\n]+/g, " ")}`);
  setTimeout(() => {
    throw error instanceof Error ? error : new Error(message);
  }, 0);
}

async function ensureMaia() {
  if (maia) return maia;
  if (!loadPromise) {
    loadPromise = (async () => {
      const { Maia3 } = await import(MAIA_MODULE_URL);
      const instance = new Maia3({
        variant: "5m",
        url: MAIA_MODEL_URL,
        temperature,
        topP,
        topK: 5,
        onProgress: (loaded, total) => {
          if (!total) return;
          const percent = Math.max(0, Math.min(100, Math.round((loaded / total) * 100)));
          emit(`info string maia-loading ${percent}`);
        }
      });
      await instance.load();
      maia = instance;
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
    if (Number.isFinite(parsed)) elo = Math.max(0, Math.min(5000, Math.round(parsed)));
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
  }
}

async function playMove(searchGeneration) {
  const engine = await ensureMaia();
  if (searchGeneration !== generation) return;
  if (!currentFen || currentFen === "startpos") {
    currentFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  }

  const result = await engine.predict({
    fen: currentFen,
    selfElo: elo,
    oppoElo: elo,
    temperature,
    topP,
    topK: 5
  });

  if (searchGeneration !== generation) return;

  // app.js already understands MultiPV-like info lines. For sub-1320 levels
  // it uses these scores to add an extra controlled amount of variability.
  for (let i = 0; i < result.candidates.length; i += 1) {
    const candidate = result.candidates[i];
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
    emit("option name UCI_Elo type spin default 1000 min 0 max 5000");
    emit("option name Elo type spin default 1000 min 0 max 5000");
    emit("option name Temperature type string default 1.0");
    emit("option name TopP type string default 1.0");
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
