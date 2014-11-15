'use strict';

var Cloud = require('../prefabs/cloud');

var Clouds = function(game, velocity) {
  Phaser.Group.call(this, game);
  this.maxClouds = (window.innerHeight > window.innerWidth)
    && Math.ceil(window.innerHeight / 40)
    || Math.ceil(window.innerWidth / 40);
  this.resolution = 25;
  this.velocity = velocity;
  for (var i = 0; i < this.maxClouds; i++) {
    var x = game.math.snapTo(game.world.randomX, this.resolution);
    var y = game.math.snapTo(game.world.randomY, this.resolution);
    var cloud = new Cloud(game, x, y, this.velocity);
    this.add(cloud);
  }
  this.alpha = .5;
};

Clouds.prototype = Object.create(Phaser.Group.prototype);
Clouds.prototype.constructor = Clouds;

Clouds.prototype.update = function() {
  if (this.length < this.maxClouds) {
    var cloud, x, y;
    if (this.velocity.y > 0) {
      x = this.game.math.snapTo(this.game.world.randomX, this.resolution);
      y = -200;
    } else if (this.velocity.y < 0) {
      x = this.game.math.snapTo(this.game.world.randomX, this.resolution);
      y = this.game.world.height + 10;
    } else if (this.velocity.x > 0) {
      y = this.game.math.snapTo(this.game.world.randomY, this.resolution);
      x = -400;
    } else {
      y = this.game.math.snapTo(this.game.world.randomY, this.resolution);
      x = this.game.world.width;
    }
    cloud = new Cloud(this.game, x, y);
    this.add(cloud);
  }
  for (var i = 0; i < this.length; i++) {
    this.getAt(i).update(this.velocity);
  }

  this.sort('y', Phaser.Group.SORT_ASCENDING);
};



module.exports = Clouds;
