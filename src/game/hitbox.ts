import { Axis, CanvasCtx } from "../types";
import { drawRect } from "../utils/draw-rect";

export class HitBox {
  private ctx: CanvasCtx | null = null;
  private fill = "transparent";

  private _size = 0;
  private _axis: Axis = {
    x: 0,
    y: 0,
  };

  draw() {
    if (this.ctx === null) return;
    this.ctx.fillStyle = this.fill;
    drawRect(this.ctx, this.axis.x, this.axis.y, {
      fill: this.fill,
      size: this.size,
    });
    this.ctx.fill();
  }

  updateCtx(ctx: CanvasCtx) {
    this.ctx = ctx;
  }

  updateSize(size: number) {
    this._size = size;
  }

  collision(hitbox: HitBox): boolean {
    return (
      this.axis.x < hitbox.axis.x + hitbox.size &&
      this.axis.x + this.size > hitbox.axis.x &&
      this.axis.y < hitbox.axis.y + hitbox.size &&
      this.axis.y + this.size > hitbox.axis.y
    );
  }

  get size(): number {
    return this._size;
  }

  get axis(): Axis {
    return this._axis;
  }
}
