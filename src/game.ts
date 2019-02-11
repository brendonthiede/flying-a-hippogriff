import "phaser";
import { MainScene } from "./scenes/mainScene";

const config: GameConfig = {
  width: 1400,
  height: 600,
  parent: "game-canvas",
  scene: MainScene,
  input: {
    keyboard: true
  },
  physics: {
    default: "arcade",
    arcade: {}
  }
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  let game = new Game(config);
  window['game'] = game;
});
