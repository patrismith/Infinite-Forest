'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio,
                             window.innerHeight * window.devicePixelRatio,
                             Phaser.AUTO, 'procjam', null, false, false);

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  game.state.add('title', require('./states/title'));
  

  game.state.start('boot');
};
