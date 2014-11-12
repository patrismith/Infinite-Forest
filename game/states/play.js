'use strict';

// import player, slime, tree
var Ground = require('../prefabs/ground');
var Trees = require('../prefabs/trees');
var Player = require('../prefabs/player');

function Play() {}
Play.prototype = {
  create: function() {
    this.treetops = [];
    this.ground = new Ground(this.game, 0, 0, 800, 600);
    this.trees = new Trees(this.game, this.treetops);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.player = new Player(this.game, 100, 100);
    this.trees.add(this.player);
    // initialize player
    // initialize tree group
    // initialize slime group
  },
  update: function() {
    // make sure the three above are updating (may be automatic)
    this.game.physics.arcade.collide(this.player, this.treetops);
  }
};

module.exports = Play;
