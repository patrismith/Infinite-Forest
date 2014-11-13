'use strict';

var Player = function(game, x, y, controls, velocity) {
  Phaser.Sprite.call(this, game, x, y, 'player', 0);
  game.physics.arcade.enableBody(this);
  this.anchor.setTo(0.5,0.5);
  this.speed = 50;
  this.controls = controls;
  this.game.add.existing(this);
  this.velocity = velocity;
  this.body.immovable.true;


  this.animSpeed = 6;
  this.animations.add('walkRight', [0,1,2,1]);
  this.animations.add('walkLeft', [3,4,5,4]);
  this.animations.add('walkDown', [6,7,8,7]);
  this.animations.add('walkUp', [9,10,11,10]);
  this.animations.play('walkRight', this.animSpeed, true);

  // start walking
  this.velocity.x = -this.speed;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

  // make attack decisions:
  // 1. find out if touching slime (function)
  // 1a. if slime touching non-forward-facing direction, set direction to that
  // 2. if slime touching forward-facing direction, set animation to attacking slime

  this.body.velocity.x = 0;
  this.body.velocity.y = 0;

  if (this.controls.right.isDown && !this.body.touching.right) {
    this.velocity.y = 0;
    this.velocity.x = -this.speed;
    this.animations.play('walkRight', this.animSpeed, true);
  } else if (this.controls.left.isDown && !this.body.touching.left) {
    this.velocity.y = 0;
    this.velocity.x = this.speed;
    this.animations.play('walkLeft', this.animSpeed, true);
  } else if (this.controls.up.isDown && !this.body.touching.up) {
    this.velocity.y = this.speed;
    this.velocity.x = 0;
    this.animations.play('walkUp', this.animSpeed, true);
  } else if (this.controls.down.isDown && !this.body.touching.down) {
    this.velocity.y = -this.speed;
    this.velocity.x = 0;
    this.animations.play('walkDown', this.animSpeed, true);
  };

  if ((this.velocity.y > 0 && this.body.touching.up) ||
      (this.velocity.y < 0 && this.body.touching.down)) {
    this.velocity.y = 0;
    var speed = Math.floor(Math.random()*2) > 0 && this.speed || -this.speed;
    this.velocity.x = speed;
    if (speed < 0) this.animations.play('walkRight', this.animSpeed, true);
    else this.animations.play('walkLeft', this.animSpeed, true);
  } else if ((this.velocity.x > 0 && this.body.touching.left) ||
             (this.velocity.x < 0 && this.body.touching.right)) {
    this.velocity.x = 0;
    var speed = Math.floor(Math.random()*2) > 0 && this.speed || -this.speed;
    this.velocity.y = speed;
    if (speed < 0) this.animations.play('walkDown', this.animSpeed, true);
    else this.animations.play('walkUp', this.animSpeed, true);
  }
};

module.exports = Player;
