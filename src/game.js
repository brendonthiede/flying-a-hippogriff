(function () {
  //set width and height variables for game
  var width = 1400;
  var height = 600;
  //create game object and initialize the canvas
  var game = new Phaser.Game(width, height, Phaser.AUTO, null, { preload: preload, create: create, update: update });

  //initialize some variables
  var player;
  var food;
  var enemy;
  var cursors;
  var scoreText;
  var timeInSeconds;
  var timeText;
  var timer;
  var score = 0;
  var foodRegenerationMinDelay = 2500;
  var foodRegenerationMaxDelay = 15000;
  var foodPoints = 300;
  var speed = 300;
  var enemySpeed = 75;
  var secondsPerLevel = 120;

  function preload () {
    //set background color of canvas
    game.stage.backgroundColor = '#6dd3e7';

    //load assets
    game.load.image('player', 'asset/hippogriff.png');
    game.load.image('food', 'asset/sunshine.png');
    game.load.image('enemy', 'asset/dementor.png');
  }

  function create () {
    //start arcade physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //initialize keyboard arrows for the game controls
    cursors = game.input.keyboard.createCursorKeys();

    initializeHippogriff();
    initializeFood();
    createEnemy();

    //place score text on the screen
    scoreText = game.add.text(5, 3, score);
    initializeTimer();
  }

  function update () {
    updatePlayerMovement();
    updateEnemyMovement();

    //handle collision events
    game.physics.arcade.overlap(player, food, eatFood);
    game.physics.arcade.overlap(player, enemy, hitEnemy);
  }

  function updatePlayerMovement () {
    //move the player up and down based on keyboard arrows
    if (cursors.up.isDown) {
      player.body.velocity.y = -speed;
    }
    else if (cursors.down.isDown) {
      player.body.velocity.y = speed;
    }
    else {
      player.body.velocity.y = 0;
    }

    //move the player right and left based on keyboard arrows
    if (cursors.left.isDown) {
      player.body.velocity.x = -speed;
    }
    else if (cursors.right.isDown) {
      player.body.velocity.x = speed;
    }
    else {
      player.body.velocity.x = 0;
    }
  }

  function updateEnemyMovement () {
    // have enemy chase the player

    // player is below enemy
    if (player.body.y > enemy.body.y + 15) {
      enemy.body.velocity.y = enemySpeed;
    }
    // player is above enemy
    else if (player.body.y < enemy.body.y - 15) {
      enemy.body.velocity.y = -enemySpeed;
    }
    // player is at the same latitude as enemy
    else {
      enemy.body.velocity.y = 0;
    }

    // player is to the right of enemy
    if (player.body.x > enemy.body.x + 15) {
      enemy.body.velocity.x = enemySpeed;
    }
    // player is to the left of enemy
    else if (player.body.x < enemy.body.x - 15) {
      enemy.body.velocity.x = -enemySpeed;
    }
    // player is at the same longitude as enemy
    else {
      enemy.body.velocity.x = 0;
    }
  }

  function initializeHippogriff () {
    //add player sprite
    player = game.add.sprite(width * 0.5, height * 0.5, 'player');
    //scale the image
    player.scale.setTo(.25, .25);
    //set anchor point to center of the sprite
    player.anchor.set(0.5);
    //enable physics for the player body
    game.physics.enable(player, Phaser.Physics.ARCADE);
    //make the player collide with the bounds of the world
    player.body.collideWorldBounds = true;
  }

  function initializeFood () {
    //create a group called food and add 4 food pieces to the game
    food = game.add.group();
    food.create(width * 0.1, height * 0.1, 'food');
    food.create(width * 0.9, height * 0.1, 'food');
    food.create(width * 0.1, height * 0.9, 'food');
    food.create(width * 0.9, height * 0.9, 'food');
    //set the anchors of their sprites to the center
    for (var i in food.children) {
      food.children[i].anchor.set(0.5);
    }
    //enable physics for the food
    game.physics.enable(food, Phaser.Physics.ARCADE);
  }

  function createEnemy () {
    //add the enemy sprite
    enemy = game.add.sprite(width * 0.1, height * 0.5, 'enemy');
    //scale the image
    enemy.scale.setTo(.25, .25);
    //set anchor point to center of the sprite
    enemy.anchor.set(0.5);
    //enable physics for the enemy body
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    //enemy can ignore the bounds of the world
    enemy.body.collideWorldBounds = false;
  }

  function initializeTimer () {
    timeInSeconds = secondsPerLevel;
    timeText = game.add.text(220, 30, getFormattedTime(timeInSeconds), { font: '30px Arial', fill: '#000000', align: 'center' });
    timeText.anchor.set(0.5, 0.5);
    timer = game.time.events.loop(Phaser.Timer.SECOND, updateTimer);
  }

  function updateTimer () {
    timeInSeconds--;
    timeText.text = getFormattedTime(timeInSeconds);

    if (timeInSeconds === 0) {
      game.state.stop();
    }
  };

  function formatTime () {

  }

  function getFormattedTime (timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60);
    var paddedMinutes = `0${minutes}`.substr(-2);
    var seconds = timeInSeconds - (minutes * 60);
    var paddedSeconds = `0${seconds}`.substr(-2);
    return `${paddedMinutes}:${paddedSeconds}`;
  }

  //eatFood function
  function eatFood (player, food) {
    //remove the piece of food
    food.kill();
    //update the score
    score = score + foodPoints;
    scoreText.text = score;

    var foodRegenerationDelay = Math.floor(Math.random() * (foodRegenerationMaxDelay - foodRegenerationMinDelay + 1)) + foodRegenerationMinDelay;

    setTimeout(function () { food.revive(); }, foodRegenerationDelay);
  }

  //eatFood function
  function hitEnemy (player, enemy) {
    //update the score
    score--;
    scoreText.text = score;
  }
})();