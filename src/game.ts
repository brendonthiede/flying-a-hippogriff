import "phaser";
import { MainScene } from "./scenes/mainScene";
import { LevelUpScene } from "./scenes/levelUpScene";

const config: Phaser.Types.Core.GameConfig = {
  width: 1400,
  height: 600,
  parent: "game-canvas",
  scene: [MainScene, LevelUpScene],
  render: {
    transparent: true
  },
  input: {
    keyboard: true
  },
  physics: {
    default: "arcade",
    arcade: {}
  }
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  let game = new Game(config);
  window['game'] = game;
});
