import { SceneCode } from "../constants";
import { Enemy } from "../game/enemy";
import { player } from "../game/player";
import { Score } from "../game/score";
import { soundController } from "../game/sound-controller";
import { Canvas, CanvasCtx, GameSceneOptions, Scene } from "../types";
import { drawText } from "../utils/draw-text";
import { storage } from "../utils/storage";
import { MainMenu } from "./main-menu";
import { ScenesManager } from "./scenes-manager";

export class GameScene implements Scene {
  private ctx: CanvasCtx;
  private c: Canvas;
  private keys = new Set<string>();
  private enemies: Enemy[] = [];
  private scenesManager: ScenesManager;
  private score = new Score();
  private highScore = new Score(storage.get("high-score") || 0);

  private _code = SceneCode.Game;

  constructor(options: GameSceneOptions) {
    this.ctx = options.ctx;
    this.c = this.ctx.canvas;
    this.scenesManager = options.scenesManager;
    this.c.classList.replace("soft-purple", "purple");
    soundController.play(soundController.gameStart);
    this.updatePlayerInfo();
    this.handleDomEvents();
    setInterval(() => {
      this.createEnemy();
    }, 1000);
  }

  draw() {
    player.draw();
    this.drawEnemies();
    drawText(
      this.ctx,
      `Score: ${this.score.value}`,
      25,
      this.ctx.canvas.height - 25,
      {
        fill: "#fff",
        size: 25,
      }
    );
  }

  update() {
    player.update();
    this.updateActiveKeys();
    this.updateEnemies();
    this.handlePlayerEnemyCollision();
    this.handlePlayerShotEnemyCollision();
  }

  private updatePlayerInfo() {
    player.updateCtx(this.ctx);
    player.axis.x = this.c.width / 2 - player.size;
    player.axis.y = this.c.height - player.size * 2;
    player.hitbox.axis.x = player.axis.x;
    player.hitbox.axis.y = player.axis.y;
    player.resetShots();
  }

  private updateActiveKeys() {
    player.updateActiveKeys(this.keys);
  }

  private handleDomEvents() {
    document.addEventListener("keydown", (e) => {
      this.keys.add(e.key);
    });
    document.addEventListener("keyup", (e) => {
      this.keys.delete(e.key);
    });
  }

  private createEnemy() {
    const enemy = new Enemy();
    enemy.updateCtx(this.ctx);
    const randomWidth = Math.floor(Math.random() * this.c.width);
    enemy.axis.x = randomWidth - enemy.size;
    enemy.hitbox.axis.x = enemy.axis.x;
    this.enemies.push(enemy);
  }

  private drawEnemies() {
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
  }

  private updateEnemies() {
    this.enemies.forEach((enemy, i) => {
      if (enemy.axis.y >= this.c.height) {
        this.enemies.splice(i, 1);
        this.score.decrease();
        return;
      }
      enemy.update();
    });
  }

  private handlePlayerEnemyCollision() {
    this.enemies.forEach((enemy) => {
      if (!enemy.hitbox.collision(player.hitbox)) return;
      soundController.play(soundController.playerExplosion);
      this.scenesManager.changeScene(
        new MainMenu({
          ctx: this.ctx,
        })
      );
      this.score.reset();
    });
  }

  private handlePlayerShotEnemyCollision() {
    this.enemies.forEach((enemy, i) => {
      player.shots.forEach((shot, j) => {
        if (!enemy.hitbox.collision(shot.hitbox)) return;
        soundController.play(soundController.asteroidExplosion);
        this.enemies.splice(i, 1);
        player.shots.splice(j, 1);
        this.score.increase();
        if (this.score.value > this.highScore.value) {
          this.highScore.increase();
          storage.set("high-score", this.highScore.value);
        }
      });
    });
  }

  get code(): SceneCode {
    return this._code;
  }
}
