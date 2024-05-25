import { SceneCode } from "../constants";
import { CanvasCtx, SceneOptions, Scene, Canvas } from "../types";
import { drawText } from "../utils/draw-text";
import { storage } from "../utils/storage";

export class MainMenu implements Scene {
  private ctx: CanvasCtx;
  private c: Canvas;
  private _code = SceneCode.MainMenu;

  constructor(options: SceneOptions) {
    this.ctx = options.ctx;
    this.c = this.ctx.canvas;
    this.c.classList.replace("purple", "soft-purple");
  }

  draw() {
    drawText(this.ctx, "Astro Evade".toUpperCase(), 25, 75, {
      fill: "#333",
      size: 50,
    });
    drawText(this.ctx, "Press 'Enter' to play!", 25, 125);
    drawText(this.ctx, "By Aissa Bedr", 25, this.c.height - 25);
    drawText(
      this.ctx,
      `High Score: ${storage.get("high-score") || 0}`,
      this.c.width - 185,
      this.c.height - 25
    );
  }

  update() {}

  get code(): SceneCode {
    return this._code;
  }
}
