'use strict';

// import player, slime, tree
var Ground = require('../prefabs/ground');
var Trees = require('../prefabs/trees');
var Player = require('../prefabs/player');
var Clouds = require('../prefabs/clouds');
var Cloud = require('../prefabs/cloud');

function Play() {}
Play.prototype = {
  preload: function() {
    this.music = this.game.add.audio('Infinite_Forest',1,true);
    this.music.play('',0,.5,true);
  },
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.velocity = {x: 0, y: 0, canMove: true};

    this.ground = new Ground(this.game, 0, 0, this.game.world.width, this.game.world.height);
    this.trees = new Trees(this.game, this.velocity);

    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.player = new Player(this.game, this.game.width/2, this.game.height/2, this.cursors, this.velocity);

    this.clouds = new Clouds(this.game, this.velocity);

    this.game.input.onDown.add(this.mute, this);
  },
  mute: function() {
    if (this.music.isPlaying) {
      this.music.pause();
    } else {
      this.music.resume();
    }
  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.trees);
  }
};

module.exports = Play;
