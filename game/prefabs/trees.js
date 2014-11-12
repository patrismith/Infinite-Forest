'use strict';

var Tree = require('../prefabs/tree');

var Trees = function(game) {
  Phaser.Group.call(this, game);
  for (var i = 0; i < 2; i++) {
    var tree = new Tree(game, this, i*50, i*50);
    this.add(tree);
  }
};

Trees.prototype = Object.create(Phaser.Group.prototype);
Trees.prototype.constructor = Trees;

Trees.prototype.update = function() {
  // if there's trees offscreen (give a margin of 800/600 pixels either side), delete
  // recycle them to trees that are about to be onscreen (within that margin)


};

module.exports = Trees;
