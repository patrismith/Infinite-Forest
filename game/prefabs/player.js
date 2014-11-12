'use strict';

var Player = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'player', frame);
  game.physics.arcade.enableBody(this);
  // start walking
  this.body.velocity.x += 30;
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
};

module.exports = Player;
