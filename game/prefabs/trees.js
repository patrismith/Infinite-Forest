'use strict';

var Tree = require('../prefabs/tree');

var Trees = function(game, collisionArray, velocity) {
  Phaser.Group.call(this, game);
  this.maxTrees = 20;
  this.collisionArray = collisionArray;
  for (var i = 0; i < 20; i++) {
    var x = game.math.snapTo(game.world.randomX, 75);
    var y = game.math.snapTo(game.world.randomY, 75);
    //console.log(x,y);
    var tree = new Tree(game, this, x, y, this.collisionArray);
    this.add(tree);
  }
  this.velocity = velocity;
};

Trees.prototype = Object.create(Phaser.Group.prototype);
Trees.prototype.constructor = Trees;

Trees.prototype.update = function() {
  // if there's trees offscreen (give a margin of 800/600 pixels either side), delete
  // recycle them to trees that are about to be onscreen (within that margin)
  if (this.length < this.maxTrees) {
    var x = this.game.math.snapTo(this.game.world.randomX, 75);
    var y = this.game.world.height + 10;
    //console.log(x,y);
    var tree = new Tree(this.game, this, x, y, this.collisionArray);
    this.add(tree);
  }

  //console.log(this.length);

  for (var i = 0; i < this.length; i++) {
    this.getAt(i).update(this.velocity);
  }

  this.sort('y', Phaser.Group.SORT_ASCENDING);
};

module.exports = Trees;
