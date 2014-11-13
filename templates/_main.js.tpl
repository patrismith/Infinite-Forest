'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio,
                             window.innerHeight * window.devicePixelRatio,
                             Phaser.AUTO, '<%= _.slugify(projectName) %>', null, false, false);

  // Game States
  <% _.forEach(gameStates, function(gameState) {  %>game.state.add('<%= gameState.shortName %>', require('./states/<%= gameState.shortName %>'));
  <% }); %>

  game.state.start('boot');
};
