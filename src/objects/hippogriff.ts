export class Hippogriff extends Phaser.Physics.Arcade.Sprite {
  private SPEED: number = 300;
  private SPRITE_SCALE: number = .25;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  public isAlive: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'hippogriff');


    this.setScale(this.SPRITE_SCALE);
    this.setOrigin(.5, .5);
    this.isAlive = true;
    this.scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY);
    //this.body.setGravity(300);
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.scene.add.existing(this);
  }

  update(): void {
    this.updateVerticalMovement();
    this.updateHorizontalMovement();
  }

  private updateVerticalMovement(): void {
    if (this.cursors.up.isDown && !this.cursors.down.isDown && this.body.y > 0) {
      this.body.velocity.y = -this.SPEED;
    }
    else if (this.cursors.down.isDown && !this.cursors.up.isDown && this.body.y < this.scene.sys.canvas.height - this.body.height * this.SPRITE_SCALE) {
      this.body.velocity.y = this.SPEED;
    }
    else {
      this.body.velocity.y = 0;
    }
  }

  private updateHorizontalMovement(): void {
    if (this.cursors.left.isDown && !this.cursors.right.isDown && this.body.x > 0) {
      this.body.velocity.x = -this.SPEED;
    }
    else if (this.cursors.right.isDown && !this.cursors.left.isDown && this.body.x < this.scene.sys.canvas.width - this.body.width * this.SPRITE_SCALE) {
      this.body.velocity.x = this.SPEED;
    }
    else {
      this.body.velocity.x = 0;
    }
  }
}
