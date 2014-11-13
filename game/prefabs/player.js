'use strict';

var Player = function(game, x, y, controls, velocity) {
  Phaser.Sprite.call(this, game, x, y, 'player');
  game.physics.arcade.enableBody(this);
  // start walking
  this.anchor.setTo(0.5,0.5);
  this.speed = 50;
  this.controls = controls;
  this.game.add.existing(this);
  this.velocity = velocity;
  this.body.immovable.true;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

  // make walking decisions:
  // 1. find out if moving forward (function)
  //    this function will see if the player is colliding w/ a tree
  //    on the side that's facing the player's walking direction
  // 2. if not moving forward, turn randomly clockwise or counter-clockwise
  //    there will be a list of directions, n e s w , use mod + additions/subtractions to figure

  // make attack decisions:
  // 1. find out if touching slime (function)
  // 1a. if slime touching non-forward-facing direction, set direction to that
  // 2. if slime touching forward-facing direction, set animation to attacking slime

  // player has a variable that says which direction they need to move in
  // player also has a variable that says whether to be walking or not
  // 1. if walking, set animation to walking and that direction
  //    also set velocity to walking velocity
  // 2. if not walking, set animation to standing and that direction
  //    also set velocity to 0

  this.body.velocity.x = 0;
  this.body.velocity.y = 0;

  if (this.controls.right.isDown && !this.body.touching.right) {
    this.velocity.y = 0;
    this.velocity.x = -this.speed;
  } else if (this.controls.left.isDown && !this.body.touching.left) {
    this.velocity.y = 0;
    this.velocity.x = this.speed;
  } else if (this.controls.up.isDown && !this.body.touching.up) {
    this.velocity.y = this.speed;
    this.velocity.x = 0;
  } else if (this.controls.down.isDown && !this.body.touching.down) {
    this.velocity.y = -this.speed;
    this.velocity.x = 0;
  };

  if (this.velocity.y > 0 && this.body.touching.up) {
    this.velocity.y = 0;
  }
  if (this.velocity.y < 0 && this.body.touching.down) {
    this.velocity.y = 0;
  }
  if (this.velocity.x > 0 && this.body.touching.left) {
    this.velocity.x = 0;
  }
  if (this.velocity.x < 0 && this.body.touching.right) {
    this.velocity.x = 0;
  }
};

module.exports = Player;
