'use strict';

var Cloud = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'cloud');
  game.physics.arcade.enableBody(this);
  this.body.immovable = true;
  this.checkWorldBounds = true;
  this.outOfBoundsKill = false;
};

Cloud.prototype = Object.create(Phaser.Sprite.prototype);
Cloud.prototype.constructor = Cloud;

Cloud.prototype.update = function(velocity) {
  this.body.velocity.x = velocity.x;
  this.body.velocity.y = velocity.y;
  if (!this.outOfBoundsKill &&
      (this.x < this.game.world.width &&
       this.x > 0 &&
       this.y < this.game.world.height &&
       this.y > 0)) {
    this.outOfBoundsKill = true;
  }
  if (!this.alive) {
    this.destroy();
  };
};

module.exports = Cloud;
