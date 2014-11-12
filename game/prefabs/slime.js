'use strict';

var Slime = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'slime', frame);

};

Slime.prototype = Object.create(Phaser.Sprite.prototype);
Slime.prototype.constructor = Slime;

Slime.prototype.update = function() {
  // make walking decisions:
  // same as with player
  // may change animation -- code sprite to move forward periodically.
  // animate slime up and down, w/ shadow, to provide illusion of hopping

  // find out if player touching and facing slime, and if attacking animation
  // 1. if so, play hurt animation
  // 2. if not, play attack animation

};

module.exports = Slime;
