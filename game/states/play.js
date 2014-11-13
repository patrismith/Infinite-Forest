'use strict';

// import player, slime, tree
var Ground = require('../prefabs/ground');
var Trees = require('../prefabs/trees');
var Player = require('../prefabs/player');
var Tree = require('../prefabs/tree');

function Play() {}
Play.prototype = {
  create: function() {

    this.treetops = [];
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.velocity = {x: 0, y: 0, canMove: true};

    this.ground = new Ground(this.game, 0, 0, this.game.world.width, this.game.world.height);
    this.trees = new Trees(this.game, this.treetops, this.velocity);

    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.player = new Player(this.game, this.game.width/2, this.game.height/2, this.cursors, this.velocity);

    console.log(this.game.world.width, this.game.world.height);
    //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //this.game.scale.fullscreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    //this.game.scale.refresh();
    //this.game.input.onDown.add(this.gofull, this);
  },
  gofull: function() {
    if (this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen();
    } else {
      this.game.scale.startFullScreen(false);
    }
  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.treetops);
  }
};

module.exports = Play;
