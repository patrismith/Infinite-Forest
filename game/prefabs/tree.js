'use strict';

var Treetop = require('../prefabs/treetop');
var Treebottom = require('../prefabs/treebottom');

var Tree = function(game, parent, x, y, collisionArray) {
  Phaser.Group.call(this, game, parent, undefined, false, true, Phaser.Physics.ARCADE);
  this.x = x;
  this.y = y;
  this.treetop = this.create(0,0, 'treetop');
  this.treetop.body.immovable = true;
  collisionArray.push(this.treetop);
  this.treebottom = this.create(0, 112, 'treebottom');
  this.treebottom.body.immovable.true;
  this.treetop.checkWorldBounds = true;
  this.treetop.outOfBoundsKill = false;
};

Tree.prototype = Object.create(Phaser.Group.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.update = function(velocity) {
  this.treetop.body.velocity.x = velocity.x;
  this.treebottom.body.velocity.x = velocity.x;
  this.treetop.body.velocity.y = velocity.y;
  this.treebottom.body.velocity.y = velocity.y;
  if (!this.outOfBoundsKill &&
      (this.treetop.x < this.game.world.width &&
       this.treetop.x > 0 &&
       this.treetop.y < this.game.world.height &&
       this.treetop.y > 0)) {
    this.treetop.outOfBoundsKill = true;
  }
  if (!this.treetop.alive) {
    this.destroy();
  };
};

module.exports = Tree;
