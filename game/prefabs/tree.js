'use strict';

//var Treetop = require('../prefabs/treetop');
var Treebottom = require('../prefabs/treebottom');

var Tree = function(game, parent, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'treetop');
  game.physics.arcade.enableBody(this);
  this.body.immovable = true;
  this.checkWorldBounds = true;
  this.outOfBoundsKill = false;

  this.treebottom = game.add.sprite(0, 112, 'treebottom');
  this.addChild(this.treebottom);
};

Tree.prototype = Object.create(Phaser.Sprite.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.update = function(velocity) {
  this.body.velocity.x = velocity.x;
  this.body.velocity.y = velocity.y;
  if (!this.outOfBoundsKill &&
      (this.x < this.game.world.width &&
       this.x > 0 &&
       this.y < this.game.world.height &&
       this.y > 0)) {
    this.outOfBoundsKill = true;
    }
  if (this.x > this.game.world.width + 400 ||
      this.x < -400 ||
      this.y > this.game.world.height + 400 ||
      this.y < -400) {
    this.kill();
  }
  if (!this.alive) {
    this.treebottom.destroy();
    this.destroy();
  };
};

module.exports = Tree;
