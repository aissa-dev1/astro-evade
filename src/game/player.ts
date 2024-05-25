import { PlayerDir } from "../constants";
import { Axis, Canvas, CanvasCtx } from "../types";
import { HitBox } from "./hitbox";
import { PlayerShot } from "./player-shot";
import { soundController } from "./sound-controller";

class Player {
  private ctx: CanvasCtx | null = null;
  private c: Canvas | null = null;
  private speed = 7.5;
  private dir: PlayerDir | null = null;
  private nextShotDuration = 500;
  private allowShot = true;
  private image = new Image();
  private frameIndex = 0;
  private frameCount = 6;
  private frameDuration = 100;

  private _size = 50;
  private _axis: Axis = {
    x: 0,
    y: 0,
  };
  private _shots: PlayerShot[] = [];
  private _hitbox = new HitBox();

  constructor() {
    this.image.src = "/astro-player.png";
    this.hitbox.updateSize(this._size);
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
    this.drawShots();
  }

  update() {
    this.updateMovement();
    this.updateShots();
  }

  updateCtx(ctx: CanvasCtx) {
    this.ctx = ctx;
    this.c = this.ctx.canvas;
    this.hitbox.updateCtx(ctx);
  }

  updateActiveKeys(keys: Set<string>) {
    player.updateDir(null);
    if (keys.has("ArrowLeft")) {
      player.updateDir(PlayerDir.Left);
    }
    if (keys.has("ArrowRight")) {
      player.updateDir(PlayerDir.Right);
    }
    if (keys.has(" ")) {
      player.createShot();
    }
  }

  resetShots() {
    this._shots = [];
  }

  private updateDir(dir: PlayerDir | null) {
    this.dir = dir;
  }

  private createShot() {
    if (this.ctx === null || !this.allowShot) return;
    const shot = new PlayerShot({
      ctx: this.ctx,
    });
    shot.axis.x = this.axis.x + shot.size;
    shot.axis.y = this.axis.y - shot.size;
    shot.hitbox.axis.x = shot.axis.x;
    shot.hitbox.axis.y = shot.axis.y;
    this.shots.push(shot);
    soundController.play(soundController.playerShoot);
    this.allowShot = false;
    setTimeout(() => {
      this.allowShot = true;
    }, this.nextShotDuration);
  }

  private updateMovement() {
    if (this.ctx === null || this.c === null) return;
    if (this.dir === PlayerDir.Left) {
      if (this.axis.x < 0) {
        this.axis.x = this.c.width - this.size;
      }
      this.axis.x -= this.speed;
    }
    if (this.dir === PlayerDir.Right) {
      if (this.axis.x >= this.c.width - this.size) {
        this.axis.x = 0;
      }
      this.axis.x += this.speed;
    }

    this.hitbox.axis.x = this.axis.x;
    this.hitbox.axis.y = this.axis.y;
  }

  private drawShots() {
    this.shots.forEach((shot) => {
      shot.draw();
    });
  }

  private updateShots() {
    this.shots.forEach((shot, i) => {
      if (shot.axis.y <= 0) {
        this.shots.splice(i, 1);
        return;
      }
      shot.update();
    });
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

  get shots(): PlayerShot[] {
    return this._shots;
  }

  get hitbox(): HitBox {
    return this._hitbox;
  }
}

export const player = new Player();
