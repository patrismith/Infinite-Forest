'use strict';

var Tree = require('../prefabs/tree');

var Trees = function(game, collisionArray, velocity) {
  Phaser.Group.call(this, game);
  for (var i = 0; i < 20; i++) {
    var tree = new Tree(game, this, Math.floor(Math.random()*400), Math.floor(Math.random()*300), collisionArray);
    this.add(tree);
  }
  this.velocity = velocity;
};

Trees.prototype = Object.create(Phaser.Group.prototype);
Trees.prototype.constructor = Trees;

Trees.prototype.update = function() {
  // if there's trees offscreen (give a margin of 800/600 pixels either side), delete
  // recycle them to trees that are about to be onscreen (within that margin)

  for (var i = 0; i < this.length; i++) {
    this.getAt(i).update(this.velocity);
  }

  this.sort('y', Phaser.Group.SORT_ASCENDING);
};

module.exports = Trees;
