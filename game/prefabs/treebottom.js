'use strict';

var Treebottom = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'treebottom', frame);

  // initialize your prefab here
  
};

Treebottom.prototype = Object.create(Phaser.Sprite.prototype);
Treebottom.prototype.constructor = Treebottom;

Treebottom.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Treebottom;
