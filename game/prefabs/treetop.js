'use strict';

var Treetop = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'treetop', frame);

  // initialize your prefab here
  
};

Treetop.prototype = Object.create(Phaser.Sprite.prototype);
Treetop.prototype.constructor = Treetop;

Treetop.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Treetop;
