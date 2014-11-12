'use strict';

// import player, slime, tree
var Ground = require('../prefabs/ground');
var Trees = require('../prefabs/trees');
var Player = require('../prefabs/player');

function Play() {}
Play.prototype = {
  create: function() {
    this.treetops = [];
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.velocity = {x: 0, y: 0, canMove: true};

    this.ground = new Ground(this.game, 0, 0, this.game.world.width, this.game.world.height);
    this.trees = new Trees(this.game, this.treetops, this.velocity);

    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.player = new Player(this.game, this.game.world.width/2, this.game.world.height/2, this.cursors, this.velocity);
  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.treetops);

    for (var i = 0; i < this.trees.length; i++) {
      this.trees.getAt(i).update(this.velocity);
    }

  }
};

module.exports = Play;
