import { Hippogriff } from "./hippogriff";

export class Dementor extends Phaser.Physics.Arcade.Sprite {
  private SPEED: number = 75;
  private SPRITE_SCALE: number = .25;
  private player: Hippogriff;

  constructor(scene: Phaser.Scene, x: number, y: number, hippogriff: Hippogriff) {
    super(scene, x, y, 'dementor');

    this.player = hippogriff;
    this.setScale(this.SPRITE_SCALE);
    this.setOrigin(.5, .5);
    this.scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY);

    this.scene.add.existing(this);
  }

  update(): void {
    this.updateMovement('x');
    this.updateMovement('y');
  }

  private updateMovement(axis: string): void {
    if (this.player.body[axis] < this.body[axis] - 15) {
      this.body.velocity[axis] = -this.SPEED;
    }
    else if (this.player.body[axis] > this.body[axis] + 15) {
      this.body.velocity[axis] = this.SPEED;
    }
    else {
      this.body.velocity[axis] = 0;
    }
  }

}
