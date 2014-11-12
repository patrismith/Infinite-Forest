'use strict';

// import player, slime, tree
var Ground = require('../prefabs/ground');

function Play() {}
Play.prototype = {
  create: function() {
    this.ground = new Ground(this.game, 0, 0, 800, 600);

    // initialize player
    // initialize tree group
    // initialize slime group
  },
  update: function() {
    // make sure the three above are updating (may be automatic)
  }
};

module.exports = Play;
