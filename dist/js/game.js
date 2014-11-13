(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  //var game = new Phaser.Game(800, 600, Phaser.AUTO, 'procjam');
  var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio,
                             window.innerHeight * window.devicePixelRatio,
                             Phaser.AUTO, 'procjam');

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

var Player = function(game, x, y, controls, velocity) {
  Phaser.Sprite.call(this, game, x, y, 'player');
  game.physics.arcade.enableBody(this);
  // start walking
  this.anchor.setTo(0.5,0.5);
  this.speed = 50;
  this.controls = controls;
  this.game.add.existing(this);
  this.velocity = velocity;
  this.body.immovable.true;
  console.log(this.addChild);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

  // make walking decisions:
  // 1. find out if moving forward (function)
  //    this function will see if the player is colliding w/ a tree
  //    on the side that's facing the player's walking direction
  // 2. if not moving forward, turn randomly clockwise or counter-clockwise
  //    there will be a list of directions, n e s w , use mod + additions/subtractions to figure

  // make attack decisions:
  // 1. find out if touching slime (function)
  // 1a. if slime touching non-forward-facing direction, set direction to that
  // 2. if slime touching forward-facing direction, set animation to attacking slime

  // player has a variable that says which direction they need to move in
  // player also has a variable that says whether to be walking or not
  // 1. if walking, set animation to walking and that direction
  //    also set velocity to walking velocity
  // 2. if not walking, set animation to standing and that direction
  //    also set velocity to 0

  this.body.velocity.x = 0;
  this.body.velocity.y = 0;

  if (this.controls.right.isDown && !this.body.touching.right) {
    this.velocity.y = 0;
    this.velocity.x = -this.speed;
  } else if (this.controls.left.isDown && !this.body.touching.left) {
    this.velocity.y = 0;
    this.velocity.x = this.speed;
  } else if (this.controls.up.isDown && !this.body.touching.up) {
    this.velocity.y = this.speed;
    this.velocity.x = 0;
  } else if (this.controls.down.isDown && !this.body.touching.down) {
    this.velocity.y = -this.speed;
    this.velocity.x = 0;
  };

  if (this.velocity.y > 0 && this.body.touching.up) {
    this.velocity.y = 0;
  }
  if (this.velocity.y < 0 && this.body.touching.down) {
    this.velocity.y = 0;
  }
  if (this.velocity.x > 0 && this.body.touching.left) {
    this.velocity.x = 0;
  }
  if (this.velocity.x < 0 && this.body.touching.right) {
    this.velocity.x = 0;
  }
};

module.exports = Player;

},{}],5:[function(require,module,exports){
'use strict';

//var Treetop = require('../prefabs/treetop');
var Treebottom = require('../prefabs/treebottom');

var Tree = function(game, parent, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'treetop');
  game.physics.arcade.enableBody(this);
  this.body.immovable = true;
  this.checkWorldBounds = true;
  this.outOfBoundsKill = false;

  this.treebottom = game.add.sprite(0, 112, 'treebottom');
  this.addChild(this.treebottom);
};

Tree.prototype = Object.create(Phaser.Sprite.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.update = function(velocity) {
  this.body.velocity.x = velocity.x;
  this.body.velocity.y = velocity.y;
  if (!this.outOfBoundsKill &&
      (this.x < this.game.world.width &&
       this.x > 0 &&
       this.y < this.game.world.height &&
       this.y > 0)) {
    this.outOfBoundsKill = true;
  }
  if (!this.alive) {
    this.treebottom.destroy();
    this.destroy();
  };
};

module.exports = Tree;

},{"../prefabs/treebottom":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

var Tree = require('../prefabs/tree');

var Trees = function(game, velocity) {
  Phaser.Group.call(this, game);
  this.maxTrees = 20;
  for (var i = 0; i < 20; i++) {
    var x = game.math.snapTo(game.world.randomX, 75);
    var y = game.math.snapTo(game.world.randomY, 75);
    var tree = new Tree(game, this, x, y, this.collisionArray);
    this.add(tree);
  }
  this.velocity = velocity;
};

Trees.prototype = Object.create(Phaser.Group.prototype);
Trees.prototype.constructor = Trees;

Trees.prototype.update = function() {
  if (this.length < this.maxTrees) {
    var tree, x, y;
    if (this.velocity.y > 0) {
      x = this.game.math.snapTo(this.game.world.randomX, 75);
      y = -128;
    } else if (this.velocity.y < 0) {
      x = this.game.math.snapTo(this.game.world.randomX, 75);
      y = this.game.world.height + 10;
    } else if (this.velocity.x > 0) {
      y = this.game.math.snapTo(this.game.world.randomY, 75);
      x = -128;
    } else {
      y = this.game.math.snapTo(this.game.world.randomY, 75);
      x = this.game.world.width;
    }
    tree = new Tree(this.game, this, x, y);
    this.add(tree);
  }

  //console.log(this.length);

  for (var i = 0; i < this.length; i++) {
    this.getAt(i).update(this.velocity);
  }

  this.sort('y', Phaser.Group.SORT_ASCENDING);
};

module.exports = Trees;

},{"../prefabs/tree":5}],8:[function(require,module,exports){

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
var Player = require('../prefabs/player');
var Tree = require('../prefabs/tree');

function Play() {}
Play.prototype = {
  create: function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.velocity = {x: 0, y: 0, canMove: true};

    this.ground = new Ground(this.game, 0, 0, this.game.world.width, this.game.world.height);
    this.trees = new Trees(this.game, this.velocity);

    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.player = new Player(this.game, this.game.width/2, this.game.height/2, this.cursors, this.velocity);

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
    this.game.physics.arcade.collide(this.player, this.trees);
  }
};

module.exports = Play;

},{"../prefabs/ground":3,"../prefabs/player":4,"../prefabs/tree":5,"../prefabs/trees":7}],12:[function(require,module,exports){
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
    var images = [ 'treebottom', 'treetop', 'grass', 'player' ];
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