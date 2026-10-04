# skwodnjs Chess

Browser chess app deployed through Cloudflare Workers static assets.

## Current features

- Play as White or Black and flip the board before the game starts.
- Color selection is locked after the game starts.
- Browser-side Maia3 5M opponent with rating-conditioned human-like move prediction.
- Reset returns the game to the initial position and unlocks color selection.
- Legal move validation, checkmate and draw detection via chess.js.
- Move-history navigation and board annotations.

## Playing AI

Actual games use **Maia3 5M** rather than Stockfish. Maia3 predicts moves humans at a selected rating are likely to play instead of searching for an engine-best move, which makes it a better fit for a fast human-like sparring opponent.

The browser integration uses `maia3-js` with ONNX Runtime Web. The 5M ONNX model is fetched at runtime and warmed in the browser cache before the first AI turn. Inference itself runs in a dedicated Worker so model execution does not block the board UI.

The existing `stockfish-worker.js` filename is currently retained as a protocol-compatibility bridge because `app.js` still speaks the previous UCI-shaped interface. Its implementation now runs Maia3. Stockfish remains reserved for a later post-game analysis feature.

For ratings below the old Stockfish native-strength threshold, the existing client-side candidate-selection layer is retained temporarily. Ratings at and above that threshold are passed directly into Maia3 through the existing `UCI_Elo` command. A later cleanup can replace this compatibility layer with a native Maia client for all ratings.

## Hosting

Production hosting is Cloudflare Workers static assets. `_headers` enables cross-origin isolation for browser engine workloads. The GitHub repository remains the source of truth and pushes to `main` trigger Cloudflare deployment through Git integration.

## Third-party engine/model notes

- Maia3 upstream: CSSLab / University of Toronto.
- Browser wrapper: `maia3-js`.
- Maia3 model weights originate from the AGPL-3.0 Maia3 project. The ONNX conversion is downloaded at runtime rather than stored in this repository.
- Stockfish source/assets are retained for future analysis support and remain subject to their upstream GPL terms.
