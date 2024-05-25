import { Axis, CanvasCtx } from "../types";
import { drawRect } from "../utils/draw-rect";
import { HitBox } from "./hitbox";

export class Enemy {
  private ctx: CanvasCtx | null = null;
  private fill = "#333";
  private speed = 5;

  private _size = 50;
  private _axis: Axis = {
    x: 0,
    y: 0,
  };
  private _hitbox = new HitBox();

  constructor() {
    this.hitbox.updateSize(this.size);
  }

  draw() {
    if (this.ctx === null) return;
    drawRect(this.ctx, this.axis.x, this.axis.y, {
      size: this.size,
      fill: this.fill,
    });
    this.hitbox.draw();
  }

  update() {
    this.axis.y += this.speed;
    this.hitbox.axis.y = this.axis.y;
  }

  updateCtx(ctx: CanvasCtx) {
    this.ctx = ctx;
    this.hitbox.updateCtx(this.ctx);
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
