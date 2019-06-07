export class LevelUpScene extends Phaser.Scene {
    levelNumber: integer;

    constructor() {
        super({
            key: "LevelUpScene",
            active: true
        });
    }

    init(data): void {
        this.levelNumber = data.levelNumber;
    }

    preload(): void {
        //    this.load.image('food', 'assets/sunshine.png');
    }

    create(): void {
        // this.add.text(220, 110, `You leveled up to level blah ${this.levelNumber}`, { font: '48px Courier', fill: '#000000' });

        this.input.once('pointerup', function () {
            this.scene.start('MainScene');
        }, this);
    }

    update(): void {
    }
}
