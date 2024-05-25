import { SceneCode } from "../constants";
import { Scene, ScenesManagerOptions } from "../types";

export class ScenesManager {
  private _currentScene: Scene;

  constructor(options: ScenesManagerOptions) {
    this._currentScene = options.currentScene;
  }

  draw() {
    this.drawScene();
  }

  update() {
    this.updateScene();
  }

  changeScene(scene: Scene) {
    this._currentScene = scene;
  }

  verifySceneCodeAndKey(code: SceneCode, ekey: string, key: string): boolean {
    return this._currentScene.code === code && ekey === key;
  }

  private drawScene() {
    this._currentScene.draw();
  }

  private updateScene() {
    this._currentScene.update();
  }

  get currentScene(): Scene {
    return this._currentScene;
  }
}
