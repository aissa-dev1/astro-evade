import { GameManager } from "./game/game-manager";
import { Canvas } from "./types";

const c = document.querySelector<Canvas>("#game_canvas")!;

const game = new GameManager({ canvas: c });

document.addEventListener("DOMContentLoaded", () => {
  game.startGame();
});
