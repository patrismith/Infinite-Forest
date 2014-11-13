'use strict';

var Treetop = require('../prefabs/treetop');
var Treebottom = require('../prefabs/treebottom');

var Tree = function(game, parent, x, y, collisionArray) {
  Phaser.Group.call(this, game, parent, undefined, false, true, Phaser.Physics.ARCADE);
  this.treetop = this.create(x, y, 'treetop');
  this.treetop.body.immovable = true;
  collisionArray.push(this.treetop);
  this.treebottom = this.create(x, y+112, 'treebottom');
  this.treebottom.body.immovable.true;
  this.x = x;
  this.y = y;
  this.treetop.checkWorldBounds = true;
  this.treetop.outOfBoundsKill = true;
  this.treebottom.checkWorldBounds = true;
  this.treebottom.outOfBoundsKill = true;
};

Tree.prototype = Object.create(Phaser.Group.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.update = function(velocity) {
  this.treetop.body.velocity.x = velocity.x;
  this.treebottom.body.velocity.x = velocity.x;
  this.treetop.body.velocity.y = velocity.y;
  this.treebottom.body.velocity.y = velocity.y;
  if (!this.treetop.alive) {
    this.destroy();
  };
};

module.exports = Tree;
