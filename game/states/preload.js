'use strict';

var AssetLoader = require('../prefabs/AssetLoader');

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    var images = [ 'treebottom', 'treetop', 'grass', 'cloud'];
    var sprites = [ { name: 'player', w: 32, h: 40, frames: 12 } ];
    AssetLoader.loadImages.call(this, images);
    AssetLoader.loadSprites.call(this, sprites);
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
