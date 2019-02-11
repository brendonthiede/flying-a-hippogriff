import { Hippogriff } from "../objects/hippogriff";
import { Dementor } from "../objects/Dementor";

export class MainScene extends Phaser.Scene {
  private player: Hippogriff;
  private enemy: Dementor;
  private food: Phaser.Physics.Arcade.Group;
  private isPaused: boolean;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  init(): void {
    this.registry.set("score", 0);
    this.updatePoints();
    this.registry.set("time", 120);
    this.isPaused = false;
  }

  preload(): void {
    this.load.image('hippogriff', 'assets/hippogriff.png');
    this.load.image('dementor', 'assets/dementor.png');
    this.load.image('food', 'assets/sunshine.png');
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#6dd3e7');
    this.food = this.physics.add.group();
    this.food.create(this.sys.canvas.width * .1, this.sys.canvas.height * .1, 'food');
    this.food.create(this.sys.canvas.width * .1, this.sys.canvas.height * .9, 'food');
    this.food.create(this.sys.canvas.width * .9, this.sys.canvas.height * .1, 'food');
    this.food.create(this.sys.canvas.width * .9, this.sys.canvas.height * .9, 'food');
    this.player = new Hippogriff(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2);
    this.enemy = new Dementor(this, 0, this.sys.canvas.height / 2, this.player);

    this.physics.add.overlap(this.player, this.food, this.eatFood, null, this);

    this.time.addEvent({
      delay: 1000,
      callback: this.decrementTime,
      callbackScope: this,
      loop: true
    });

    // allow outside access to some actions
    window['mainScene'] = this;
    window['togglePauseState'] = this.togglePauseState;
    window['restartGame'] = this.restartGame;
  }

  update(): void {
    if (this.player.isAlive) {
      this.player.update();
      this.enemy.update();
      if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemy.getBounds())) {
        this.incrementPoints(-1);
      }
    }
  }

  private togglePauseState(): void {
    const mainScene: MainScene = window['mainScene'];
    if (mainScene.isPaused) {
      mainScene.scene.resume();
      mainScene.isPaused = false;
    } else {
      mainScene.scene.pause();
      mainScene.isPaused = true;
    }
  }

  private restartGame(): void {
    window['mainScene'].scene.restart();
  }

  private decrementTime(): void {
    this.registry.values.time -= 1;
    this.updateTime();
    if (this.registry.values.time <= 0) {
      this.scene.pause();
    }
  }

  private updateTime(): void {
    document.getElementById('time').textContent = this.getFormattedTime(this.registry.values.time);
  }

  private getFormattedTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const paddedMinutes = `0${minutes}`.substr(-2);
    const seconds = timeInSeconds - (minutes * 60);
    const paddedSeconds = `0${seconds}`.substr(-2);
    return `${paddedMinutes}:${paddedSeconds}`;
  }

  private incrementPoints(points: number): void {
    this.registry.values.score += points;
    this.updatePoints();
  }

  private updatePoints(): void {
    document.getElementById('score').textContent = this.registry.values.score;
  }

  private eatFood(player: Hippogriff, food: Phaser.Physics.Arcade.Sprite): void {
    if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), food.getBounds())) {
      this.incrementPoints(300);
      food.disableBody(true, true);
      this.time.addEvent({
        delay: this.getRandomIntInRange(2000, 15000),
        callback: function () {
          food.enableBody(false, food.x, food.y, true, true);
        },
        callbackScope: this,
        loop: false
      });
    }
  }

  private getRandomIntInRange(minValue: integer, maxValue: integer): integer {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
  }
}
