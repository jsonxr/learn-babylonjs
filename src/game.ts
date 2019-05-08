import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from 'babylonjs';

export default class Game {
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _scene: Scene;
  private _camera!: FreeCamera;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas
    this._engine = new Engine(this._canvas, true);
    this._scene = new Scene(this._engine);
  }

  createScene() : void {
    // Light
    new HemisphericLight('hemlight', new Vector3(0, 1, 0), this._scene);

    // Sphere
    let sphere = MeshBuilder.CreateSphere('sphere', {
      segments: 16, 
      diameter: 1,
    }, this._scene);
    sphere.position.y = 1;

    // Ground
    MeshBuilder.CreateGround('ground', {
      width: 6,
      height: 6,
      subdivisions: 2,
    }, this._scene);

    // Camera
    this._camera = new FreeCamera('camera', new Vector3(0, 5, -10), this._scene);
    this._camera.setTarget(Vector3.Zero());
    this._camera.attachControl(this._canvas, false);
  }

  private _renderLoop() : void {
    this._scene.render();
  }

  start() : void {
    this._engine.runRenderLoop(this._renderLoop.bind(this));
  }
}
