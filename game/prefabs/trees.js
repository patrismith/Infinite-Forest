'use strict';

var Trees = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'trees', frame);

  // initialize your prefab here
  
};

Trees.prototype = Object.create(Phaser.Sprite.prototype);
Trees.prototype.constructor = Trees;

Trees.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Trees;
