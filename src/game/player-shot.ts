import { Axis, CanvasCtx, PlayerShotOptions } from "../types";
import { HitBox } from "./hitbox";

export class PlayerShot {
  private ctx: CanvasCtx;
  private speed = 7.5;
  private image = new Image();
  private frameIndex = 0;
  private frameCount = 6;
  private frameDuration = 100;

  private _size = 15;
  private _axis: Axis = {
    x: 0,
    y: 0,
  };
  private _hitbox = new HitBox();

  constructor(options: PlayerShotOptions) {
    this.image.src = "/player-shot.png";
    this.ctx = options.ctx;
    this.hitbox.updateCtx(this.ctx);
    this.hitbox.updateSize(this.size);
    setInterval(() => this.updateFrame(), this.frameDuration);
  }

  draw() {
    if (this.ctx === null || !this.image.complete) return;
    const frameX = this.frameIndex * this.size;
    this.ctx.drawImage(
      this.image,
      frameX,
      0,
      this.size,
      this.size,
      this.axis.x,
      this.axis.y,
      this.size,
      this.size
    );
    this.hitbox.draw();
  }

  update() {
    this._axis.y -= this.speed;
    this.hitbox.axis.y = this.axis.y;
  }

  private updateFrame() {
    this.frameIndex = (this.frameIndex + 1) % this.frameCount;
  }

  get size(): number {
    return this._size;
  }

  get axis(): Axis {
    return this._axis;
  }

  get hitbox(): HitBox {
    return this._hitbox;
  }
}
