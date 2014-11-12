'use strict';

var Treetop = require('../prefabs/treetop');
var Treebottom = require('../prefabs/treebottom');

var Tree = function(game, parent, x, y, collisionArray) {
  Phaser.Group.call(this, game, parent, undefined, false, true, Phaser.Physics.ARCADE);
  //this.top = new Treetop(game, x, y);
  //this.bottom = new Treebottom(game, x, y+112);
  var treetop = this.create(x, y, 'treetop');
  treetop.body.immovable = true;
  collisionArray.push(treetop);
  this.create(x, y+112, 'treebottom');
  this.x = x;
  this.y = y;
  //game.add.existing(this.top);
  //this.add(this.top);
  //this.add(this.bottom);
};

Tree.prototype = Object.create(Phaser.Group.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Tree;
