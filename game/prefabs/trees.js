'use strict';

var Tree = require('../prefabs/tree');

var Trees = function(game, velocity) {
  Phaser.Group.call(this, game);
  this.maxTrees = (window.innerHeight > window.innerWidth)
    && Math.ceil(window.innerHeight / 40)
    || Math.ceil(window.innerWidth / 40);
  this.resolution = 100;
  for (var i = 0; i < this.maxTrees; i++) {
    var x = game.math.snapTo(game.world.randomX, this.resolution);
    var y = game.math.snapTo(game.world.randomY, this.resolution);
    var tree = new Tree(game, this, x, y, this.collisionArray);
    this.add(tree);
  }
  this.velocity = velocity;
};

Trees.prototype = Object.create(Phaser.Group.prototype);
Trees.prototype.constructor = Trees;

Trees.prototype.update = function() {
  if (this.length < this.maxTrees) {
    var tree, x, y;
    if (this.velocity.y > 0) {
      x = this.game.math.snapTo(this.game.world.randomX, this.resolution);
      y = -128;
    } else if (this.velocity.y < 0) {
      x = this.game.math.snapTo(this.game.world.randomX, this.resolution);
      y = this.game.world.height + 10;
    } else if (this.velocity.x > 0) {
      y = this.game.math.snapTo(this.game.world.randomY, this.resolution);
      x = -128;
    } else {
      y = this.game.math.snapTo(this.game.world.randomY, this.resolution);
      x = this.game.world.width;
    }
    tree = new Tree(this.game, this, x, y);
    this.add(tree);
  }

  //console.log(this.length);

  for (var i = 0; i < this.length; i++) {
    this.getAt(i).update(this.velocity);
  }

  this.sort('y', Phaser.Group.SORT_ASCENDING);
};

module.exports = Trees;
