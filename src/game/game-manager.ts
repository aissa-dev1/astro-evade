import { SceneCode } from "../constants";
import { GameScene } from "../scenes/game-scene";
import { MainMenu } from "../scenes/main-menu";
import { ScenesManager } from "../scenes/scenes-manager";
import { CanvasCtx, GameManagerOptions } from "../types";
import { soundController } from "./sound-controller";

export class GameManager {
  private ctx: CanvasCtx;
  private w: number;
  private h: number;

  private scenesManager: ScenesManager;

  constructor(options: GameManagerOptions) {
    this.ctx = options.canvas.getContext("2d")!;
    this.w = options.canvas.width;
    this.h = options.canvas.height;

    this.scenesManager = new ScenesManager({
      currentScene: new MainMenu({ ctx: this.ctx }),
    });
  }

  startGame() {
    this.startGameLoop();
    document.addEventListener("keydown", (e) => {
      this.handleInputKeyDown(e.key);
    });
  }

  private draw() {
    this.scenesManager.draw();
  }

  private update() {
    this.scenesManager.update();
  }

  private handleInputKeyDown(key: string) {
    if (
      this.scenesManager.verifySceneCodeAndKey(SceneCode.MainMenu, key, "Enter")
    ) {
      soundController.playSpaceMusic();
      this.scenesManager.changeScene(
        new GameScene({ ctx: this.ctx, scenesManager: this.scenesManager })
      );
    }
    if (
      this.scenesManager.verifySceneCodeAndKey(SceneCode.Game, key, "Escape")
    ) {
      this.scenesManager.changeScene(new MainMenu({ ctx: this.ctx }));
    }
  }

  private startGameLoop() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.draw();
    this.update();
    requestAnimationFrame(() => this.startGameLoop());
  }
}
