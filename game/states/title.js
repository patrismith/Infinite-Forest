'use strict';
function Title() {}

Title.prototype = {
  preload: function() {

  },
  create: function() {

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Title;
