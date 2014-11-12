(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'procjam');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  game.state.add('title', require('./states/title'));
  

  game.state.start('boot');
};
},{"./states/boot":8,"./states/gameover":9,"./states/menu":10,"./states/play":11,"./states/preload":12,"./states/title":13}],2:[function(require,module,exports){
'use strict';

var AssetLoader = (function () {

    function loadImages (list) {
        for (var i = 0; i < list.length; i++) {
            this.load.image(list[i], 'assets/images/' + list[i] + '.png');
        }
    };

    function loadAudio (list, context) {
        for (var i = 0; i < list.length; i++) {
            context.load.audio(list[i], ['assets/audio/' + list[i] + '.ogg']);
        }
    };

    function loadSprites (list) {
        for (var i = 0; i < list.length; i++) {
            this.load.spritesheet(list[i].name,
                                  'assets/sprites/' + list[i].name + '.png',
                                  list[i].w, list[i].h, list[i].frames);
        }
    };

    function loadMaps (list) {
        for (var i = 0; i < list.length; i++) {
            this.load.tilemap(list[i], 'assets/maps/' + list[i] + '.json', null, Phaser.Tilemap.TILED_JSON);
        }
    };

    return { loadImages: loadImages,
             loadSprites: loadSprites,
             loadAudio: loadAudio,
             loadMaps: loadMaps };

})();

module.exports = AssetLoader;

},{}],3:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, w, h) {
  Phaser.TileSprite.call(this, game, x, y, w, h, 'grass');
  game.add.existing(this);
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Ground;

},{}],4:[function(require,module,exports){
'use strict';

var Treetop = require('../prefabs/treetop');
var Treebottom = require('../prefabs/treebottom');

var Tree = function(game, parent, x, y) {
  Phaser.Group.call(this, game, parent);
  this.top = new Treetop(game, x, y);
  this.bottom = new Treebottom(game, x, y+112);
  this.x = x;
  this.y = y;
  //game.add.existing(this.top);
  this.add(this.top);
  this.add(this.bottom);
};

Tree.prototype = Object.create(Phaser.Group.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Tree;

},{"../prefabs/treebottom":5,"../prefabs/treetop":7}],5:[function(require,module,exports){
'use strict';

var Treebottom = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'treebottom', frame);

  // initialize your prefab here
  
};

Treebottom.prototype = Object.create(Phaser.Sprite.prototype);
Treebottom.prototype.constructor = Treebottom;

Treebottom.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Treebottom;

},{}],6:[function(require,module,exports){
'use strict';

var Tree = require('../prefabs/tree');

var Trees = function(game) {
  Phaser.Group.call(this, game);
  for (var i = 0; i < 20; i++) {
    var tree = new Tree(game, this, Math.floor(Math.random()*400), Math.floor(Math.random()*300));
    this.add(tree);
  }
};

Trees.prototype = Object.create(Phaser.Group.prototype);
Trees.prototype.constructor = Trees;

Trees.prototype.update = function() {
  // if there's trees offscreen (give a margin of 800/600 pixels either side), delete
  // recycle them to trees that are about to be onscreen (within that margin)
  this.sort('y', Phaser.Group.SORT_ASCENDING);
};

module.exports = Trees;

},{"../prefabs/tree":4}],7:[function(require,module,exports){
'use strict';

var Treetop = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'treetop', frame);

  // initialize your prefab here
  
};

Treetop.prototype = Object.create(Phaser.Sprite.prototype);
Treetop.prototype.constructor = Treetop;

Treetop.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Treetop;

},{}],8:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],9:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],10:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],11:[function(require,module,exports){
'use strict';

// import player, slime, tree
var Ground = require('../prefabs/ground');
var Trees = require('../prefabs/trees');

function Play() {}
Play.prototype = {
  create: function() {
    this.ground = new Ground(this.game, 0, 0, 800, 600);
    this.trees = new Trees(this.game);
    // initialize player
    // initialize tree group
    // initialize slime group
  },
  update: function() {
    // make sure the three above are updating (may be automatic)
  }
};

module.exports = Play;

},{"../prefabs/ground":3,"../prefabs/trees":6}],12:[function(require,module,exports){
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
    var images = [ 'treebottom', 'treetop', 'grass' ];
    AssetLoader.loadImages.call(this, images);
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

},{"../prefabs/AssetLoader":2}],13:[function(require,module,exports){
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

},{}]},{},[1])