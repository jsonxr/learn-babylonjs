import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from 'babylonjs';

export default class Game {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private scene: Scene;
  private camera!: FreeCamera;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);
  }

  public createScene(): void {
    // Ground
    const ground = MeshBuilder.CreateGround('ground', {
      height: 10,
      subdivisions: 2,
      width: 10,
    }, this.scene);

    // Light
    const light = new HemisphericLight('hemlight', new Vector3(0, 1, 0), this.scene);

    // Camera
    this.camera = new FreeCamera('camera', new Vector3(0, 2.62, 5), this.scene);
    this.camera.setTarget(Vector3.Zero());
    this.camera.attachControl(this.canvas, false);

    // Sphere
    const sphere = MeshBuilder.CreateSphere('sphere', {
      diameter: 1,
      segments: 16,
    }, this.scene);
    sphere.position.y = 1;
  }

  public start(): void {
    this.engine.runRenderLoop(this.renderLoop.bind(this));
  }

  private renderLoop(): void {
    this.scene.render();
  }

}
