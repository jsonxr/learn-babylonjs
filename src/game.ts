import {
  Engine,
  FreeCamera,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from 'babylonjs';

// @ts-ignore
import AssetTextureBedrock from '../assets/bedrock.png';
// @ts-ignore
import AssetTextureDirt from '../assets/dirt.png';
// @ts-ignore
import AssetTextureStone from '../assets/stone.png';

export default class Game {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private scene: Scene;
  private camera!: FreeCamera;
  // Textures
  private dirt: StandardMaterial;
  private stone: StandardMaterial;
  private bedrock: StandardMaterial;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);
    this.scene.useRightHandedSystem = true; // Most graphics software use right handed system
    // Textures
    this.dirt = new StandardMaterial('material', this.scene);
    this.dirt.diffuseTexture = new Texture(AssetTextureDirt, this.scene, undefined, undefined,
      Texture.NEAREST_SAMPLINGMODE);
    this.stone = new StandardMaterial('material', this.scene);
    this.stone.diffuseTexture = new Texture(AssetTextureStone, this.scene, undefined, undefined,
      Texture.NEAREST_SAMPLINGMODE);
    this.bedrock = new StandardMaterial('material', this.scene);
    this.bedrock.diffuseTexture = new Texture(AssetTextureBedrock, this.scene, undefined, undefined,
      Texture.NEAREST_SAMPLINGMODE);
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

    // Blocks
    this.setBlock(this.scene, this.bedrock, new Vector3(0, 1, 0));
    this.setBlock(this.scene, this.stone, new Vector3(1, 1, 0));
    this.setBlock(this.scene, this.dirt, new Vector3(2, 1, 0));
  }

  public setBlock(scene: Scene, material: StandardMaterial, position: Vector3): Mesh {
    const block: Mesh = MeshBuilder.CreateBox('block1', {
      size: 1,
    }, scene);
    block.material = material;
    position.x = position.x + 0.5;
    position.z = position.z + 0.5;
    position.y = position.y - 0.5;
    block.setAbsolutePosition(position);
    return block;
  }

  public start(): void {
    this.engine.runRenderLoop(this.renderLoop.bind(this));
  }

  private renderLoop(): void {
    this.scene.render();
  }

}
