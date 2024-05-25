import { SceneCode } from "./constants";
import { ScenesManager } from "./scenes/scenes-manager";

export type Canvas = HTMLCanvasElement;

export type CanvasCtx = CanvasRenderingContext2D;

export interface Scene {
  draw(): void;
  update(): void;
  get code(): SceneCode;
}

export interface SceneOptions {
  ctx: CanvasCtx;
}

export interface GameSceneOptions extends SceneOptions {
  scenesManager: ScenesManager;
}

export interface ScenesManagerOptions {
  currentScene: Scene;
}

export interface GameManagerOptions {
  canvas: Canvas;
}

export type Meas = {
  w: number;
  h: number;
};

export type Axis = {
  x: number;
  y: number;
};

export interface PlayerShotOptions {
  ctx: CanvasCtx;
}
