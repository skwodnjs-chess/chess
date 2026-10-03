# skwodnjs Chess

Static browser chess game for GitHub Pages.

## Current features

- Play as White or Black and flip the board before the game starts.
- Color selection is locked after the game starts.
- Browser-side AI opponent, currently presented as approximately Elo 1000.
- Reset returns the game to the initial position and unlocks color selection.
- Legal move validation, checkmate and draw detection via chess.js.

## AI

The page loads Stockfish.js 19 in a Web Worker through jsDelivr. Stockfish's official `UCI_Elo` range starts at 1320, so the current Elo 1000 level is implemented as an intentionally weakened approximation using MultiPV candidate sampling plus occasional lower-quality move selection. If Stockfish cannot load, a lightweight local fallback opponent keeps the game playable.

## Hosting

The repository is designed to be served directly from the repository root with GitHub Pages.
