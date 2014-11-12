'use strict';

var Tree = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'tree', frame);

  // initialize your prefab here
  
};

Tree.prototype = Object.create(Phaser.Sprite.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Tree;
