'use strict';

//var Treetop = require('../prefabs/treetop');
var Treebottom = require('../prefabs/treebottom');

var Tree = function(game, parent, x, y, collisionArray) {
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
    console.log('kill me');
    this.outOfBoundsKill = true;
  }
  if (!this.alive) {
    this.treebottom.destroy();
    this.destroy();
    console.log('tree destroyed');
  };
};

module.exports = Tree;
