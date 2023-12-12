//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

// ovdje pišete svoje klase

class Racoon extends Sprite {
  constructor(x, y, layer) {
    super(x, y, 60, 60);
    this.frame_sets = {
      up: [1],
      "walk-up": [1],
      right: [1],
      "walk-right": [2, 3, 4, 5, 6, 7, 8],
      down: [1],
      "walk-down": [1],
      left: [11],
      "walk-left": [12, 13, 14, 15, 16, 17, 18],
    };

    this.layer = layer;
    this.visible = true; //tek kad se postavi layer
  }
}

class Characters extends Sprite{
  constructor(x,y,w,h){
    super(x,y,w,h);
  }

  moveLeft(){
    this.direction = 270;
    this.velocity_x -= 1.5;
  }

  moveRight() {
    this.direction = 90;
    this.velocity_x += 1.5;
  }
}

class Valdyn extends Characters {
  #hitPoints = 4;
  #lives = 3;
  #lockedHitPoints = 4;
  #talismans;
  constructor(x, y, layer) {
    super(x, y, 48, 48);
    this.frame_sets = {
      up: [1],
      "walk-up": [1, 3, 4, 5],
      right: [1],
      "walk-right": [10, 11, 12, 13, 14, 15, 16, 18],
      down: [1],
      "walk-down": [6, 7, 8, 9],
      left: [2],
      "walk-left": [19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
      "sword-drawn-r":[29],
      "sword-drawn-l":[40],
      "high-attack-r":[31, 32,33],
      "middle-attack-r":[30],
      "low-attack-r":[34,35],
      "high-attack-l":[42,43,44],
      "middle-attack-l":[41],
      "low-attack-l":[45,46],
      "jump-high-attack-r":[38,39],
      "jump-low-attack-r":[36,37],
      "jump-high-attack-l":[49,50],
      "jump-low-attack-l":[47,48]
    };

    this.layer = layer;
    this.visible = true;
    this.okvir = true;
    this.invincible = false;
    this.swordDrawn = false;
    this.attacking = false;
    this.middleAttack = false;
    this.highAttack = false;
    this.lowAttack = false;
    this.jumpHighAttack = false;
    this.jumpLowAttack = false;
    
  }
  set talismans(t){
    this.#talismans = t;
    this.#lockedHitPoints--;
    this.#lives++;
  }

  get talismans(){
    return this.#talismans;
  }

  set lives(l){
    if (l <= 0) {
      this.#lives = 0;
      //ako izgubi živote pozvati gameover
      gameButton.dispatchEvent(gameOverEvent);
    }
    else {
      this.#lives = l;
    }

    console.log("Lives" + this.#lives);
  }

  get lives(){
    return this.#lives;
  }

  set hitPoints(h){
    if(h > 8-this.#lockedHitPoints){
      this.#hitPoints = 8-this.#lockedHitPoints;
    }
    if(h == 0){
      this.lives--;
      this.#hitPoints = 8-this.#lockedHitPoints;
    }
    else
      this.#hitPoints = h;
    console.log("HitPoints" + this.#hitPoints);
  }

  get hitPoints(){
    return this.#hitPoints
  }

  set lockedHitPoints(l){
    this.#lockedHitPoints = l;
    console.log("LockedHitPoints" + this.#lockedHitPoints);
  }

  get lockedHitPoints(){
    return this.#lockedHitPoints;
  }

  jump(h = 35) {

    if (!this.jumping && !this.swordDrawn) {
      this.direction = 0;
      this.jumping = true;
      this.velocity_y -= h;
    }
  }

  updateAnimation() {

    if (this.direction < 90 || this.direction > 270) {
      if (this.velocity_y < -0.1) this.changeFrameSet(this.frameSets("walk-up"), "loop", 2);
      else this.changeFrameSet(this.frameSets("up"), "pause");
    }
    else if (this.direction > 90 && this.direction < 270) {
      if (this.velocity_y > 0.1) this.changeFrameSet(this.frameSets("walk-down"), "loop", 5);
      else this.changeFrameSet(this.frameSets("down"), "pause");
    }

    // ako je lik okrenut desno
    else if (this.direction == 90) {
      // ako ima brzinu po x, onda rotiraj animacije koje postoje za walk-right
      if (this.velocity_x > 0.1) this.changeFrameSet(this.frameSets("walk-right"), "loop", 5);
      // framesetovi za napade
      else if(this.swordDrawn && !this.attacking) this.changeFrameSet(this.frameSets("sword-drawn-r"), "loop", 5);
      else if(this.highAttack == true) this.changeFrameSet(this.frameSets("high-attack-r"), "loop", 5);
      else if(this.middleAttack == true) this.changeFrameSet(this.frameSets("middle-attack-r"), "loop", 5);
      else if(this.lowAttack == true) this.changeFrameSet(this.frameSets("low-attack-r"), "loop", 5);
      else if(this.jumpHighAttack == true) this.changeFrameSet(this.frameSets("jump-high-attack-r"), "loop", 5);
      else if(this.lowHighAttack == true) this.changeFrameSet(this.frameSets("low-high-attack-r"), "loop", 5);
      // ako stoji, onda prikaži zadani položaj za desno
      else this.changeFrameSet(this.frameSets("right"), "pause");
    }
    
    else if (this.direction == 270) {
      if (this.velocity_x < -0.1) this.changeFrameSet(this.frameSets("walk-left"), "loop", 5);
      else if(this.swordDrawn && !this.attacking) this.changeFrameSet(this.frameSets("sword-drawn-l"), "loop", 5);
      else if(this.highAttack == true) this.changeFrameSet(this.frameSets("high-attack-l"), "loop", 5);
      else if(this.middleAttack == true) this.changeFrameSet(this.frameSets("middle-attack-l"), "loop", 5);
      else if(this.lowAttack == true) this.changeFrameSet(this.frameSets("low-attack-l"), "loop", 5);
      else if(this.jumpHighAttack == true) this.changeFrameSet(this.frameSets("jump-high-attack-l"), "loop", 5);
      else if(this.lowHighAttack == true) this.changeFrameSet(this.frameSets("low-high-attack-l"), "loop", 5);
      else this.changeFrameSet(this.frameSets("left"), "pause");
    }





    this.animate();

  }

  checkFall(){
    if(this.velocity_y > 0)
      this.direction = 180;
  }

  

  drawSword(){
    this.swordDrawn = true;
    this.velocity_x = 0;
    this.jumping = true;
  }

  sheithSword(){
    this.swordDrawn = false;
  }

  HighAttack(){
    if(this.swordDrawn && !this.attacking){
      this.highAttack = true
      this.attacking = true;
      setTimeout(() => {
        this.attacking = false;
        this.highAttack =false;
      },500);
    }
  }

  MiddleAttack(){
    if(this.swordDrawn && !this.attacking){
      this.middleAttack = true
      this.attacking = true;
      setTimeout(() => {
        this.attacking = false;
        this.middleAttack = false;
      },500);
    }
  }

  LowAttack(){
    if(this.swordDrawn && !this.attacking){
      this.lowAttack = true
      this.attacking = true;
      setTimeout(() => {
        this.attacking = false;
        this.lowAttack = false;
      },500);
    }
  }

  JumpHighAttack(){
    if(this.jumping && !this.attacking){
      this.jumpHighAttack = true;
      this.attacking = true;
      setTimeout(() => {
        this.attacking = false;
        this.jumpHighAttack = false;
      },500);
    }
  }

  JumpLowAttack(){
    if(this.jumping && !this.attacking){
      this.jumpLowAttack = true;
      this.attacking = true;
      setTimeout(() => {
        this.attacking = false;
        this.jumpLowAttack = false;
      },500);
    }
  }


}//Valdyn

class Bee extends Characters{
  constructor(x,y,layer){
    super(x,y,32,32);

    this.frame_sets = {
      up: [1],
      "walk-up": [1],
      right: [1],
      "walk-right": [1,2],
      down: [1],
      "walk-down": [1],
      left: [2],
      "walk-left": [1,2],
    }

    this.layer = layer;
    this.visible = true;
    this.velocity_x = 2;
    this.damage = 2;
  }

  changeDirection(){
    if(this.x == 55*16){
      this.velocity_x = 2;
      this.direction = 90;
    }
    else if(this.x == 63*16){
      this.velocity_x = -2;
      this.direction = 270;
    }
  }

  updatePosition(){
    this.x_old = this.x;
    this.x += this.velocity_x;
  }
}

class Ghost extends Characters{
  constructor(x,y,layer){
    super(x,y,32,32);

    this.frame_sets = {
      up: [1],
      "walk-up": [1],
      right: [1],
      "walk-right": [1],
      down: [1],
      "walk-down": [1],
      left: [1],
      "walk-left": [1],
    }

    this.layer = layer;
    this.visible = true;
    this.velocity_x = 2;
    this.damage = 2;
  }

  updatePosition(){
    this.x_old = this.x;
    this.x += this.velocity_x;
  }
}

class Norka extends Characters{
  #hitPoints = 5;
  constructor(x,y,layer){
    super(x,y,32,32);

    this.frame_sets = {
      up: [1],
      "walk-up": [1],
      right: [1],
      "walk-right": [1],
      down: [1],
      "walk-down": [1],
      left: [1],
      "walk-left": [1],
    }

    this.layer = layer;
    this.invincible = false;
    this.visible = true;
    this.velocity_x = 2;
    this.damage = 2;
  }

  get hitPoints(){
    return this.#hitPoints;
  }

  set hitPoints(h){
    if(h <= 0){
      this.#hitPoints = 0;
      if(Postavke.amulet != null){
        if(Postavke.amulet.collected)
          console.log("Spasili ste princezu")
        else
          console.log("Niste spasili princezu");
      }
      gameButton.dispatchEvent(winEvent);
    }
    else
      this.#hitPoints = h;
    console.log("Norka hitPoints" + this.#hitPoints);
  }

  changeDirection(){
    if(this.x <= 1*16){
      this.velocity_x = 2;
      this.direction = 90;
    }
    else if(this.x >= 20*16){
      this.velocity_x = -2;
      this.direction = 270;
    }
  }

  updatePosition(){
    this.x_old = this.x;
    this.x += this.velocity_x;
  }
}

class Collectable extends Sprite {
  constructor(x,y,layer) {
    super(x,y,layer.width,layer.height);
    this.frame_sets = {
      up: [1],
      "walk-up": [1],
      right: [1],
      "walk-right": [1],
      down: [1],
      "walk-down": [1],
      left: [2],
      "walk-left": [1],
    };
    this.layer = layer;
  }

  updatePosition() {

  }
}

class Spike extends Collectable {
  constructor(x,y,layer) {
    super(x,y,layer);
    this.damage=1;
    this.visible = true;
  }
}

class Potion extends Collectable{
  constructor(x,y,layer){
    super(x,y,layer);
    this.value = 1;
    this.visible = true;
  }
}

class Talisman extends Collectable{
  constructor(x,y,layer){
    super(x,y,layer);
    this.value = 1;
    this.visible = true;
  }
}

class UP extends Collectable{
  constructor(x,y,layer){
    super(x,y,layer);
    this.value = 1;
    this.visible = true;
  }
}

class Lava extends Collectable{
  constructor(x, y, layer){
    super(x,y,layer);
    this.value = 1;
    this.visible = true;
  }
}

class Amulet extends Collectable{
  constructor(x, y, layer){
    super(x,y,layer);
    this.collected = false;
    this.visible = true;
  }
}
