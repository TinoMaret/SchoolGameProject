//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

/// <reference path="kod_01-likovi.js"/>
/// <reference path="kod_02-postavke.js"/>

/**
 * Promjena stanja likova - interakcije
 */
function update_main() {

  if (GAME.activeWorldMap.name == "v10")
    vjezbe10();
  
  if (GAME.activeWorldMap.name == "Lionheart")
    Lionheart();

  if (GAME.activeWorldMap.name == "Lionheart-2");
    Lionheart2();
  
  if (GAME.activeWorldMap.name == "Lionheart-3");
    Lionheart3();
  
  if (GAME.activeWorldMap.name == "Lionheart-4");
    Lionheart4();

  
  GAME.update();

};

function vjezbe10() {
  if (SENSING.right.active) {
    Postavke.racoon.moveRight();
  }

}

function Lionheart(){
  Postavke.bee.changeDirection();
  Postavke.bee.updatePosition(0,0);

  Postavke.hero.checkFall();

  if(Postavke.hero.touching(Postavke.potion)){
    Postavke.potion.visible = false;
    Postavke.hero.hitPoints += Postavke.potion.value;
  }

  if(Postavke.hero.touching(Postavke.talisman)){
    Postavke.talisman.visible = false;
    Postavke.hero.lockedHitPoints -= Postavke.talisman.value;
  }

  if(Postavke.hero.touching(Postavke.up[0])){
    Postavke.hero.lives += Postavke.up.value;
    gameButton.dispatchEvent(levelUpEvent);
  }

  if(Postavke.hero.touching(Postavke.spike[0]) || Postavke.hero.touching(Postavke.spike[1])){
    if(!Postavke.hero.invincible){
      Postavke.hero.hitPoints--;
      Postavke.hero.invincible = true;
      setTimeout(() => {
        Postavke.hero.invincible = false;
      },1000);
    }
  }

  if(Postavke.hero.touching(Postavke.bee)){
    if(Postavke.hero.jumpHighAttack || Postavke.hero.jumpLowAttack){
      Postavke.bee.visible = false;
    }
    else if(!Postavke.hero.invincible){
      Postavke.hero.hitPoints -= Postavke.bee.damage;
      Postavke.hero.invincible = true;
      setTimeout(() => {
        Postavke.hero.invincible = false;
      },1000);
    }
  }
  

  if(SENSING.up.active){
    Postavke.hero.jump();
  }

  if(SENSING.right.active){
    Postavke.hero.moveRight();
  }

  if(SENSING.left.active){
    Postavke.hero.moveLeft();
  }

  if(SENSING.keyD.active && !Postavke.hero.jumping){
    Postavke.hero.drawSword();
  }

  if(!SENSING.keyD.active){
    Postavke.hero.sheithSword();
  }

  if(SENSING.keyA.active){
    Postavke.hero.MiddleAttack();
  }

  if(SENSING.keyS.active){
    Postavke.hero.LowAttack();
    Postavke.hero.JumpLowAttack();
  }

  if(SENSING.keyW.active){
    Postavke.hero.HighAttack()
    Postavke.hero.JumpHighAttack();
  }
}

function Lionheart2(){

  Postavke.hero.checkFall();

  if(Postavke.hero.touching(Postavke.potion)){
    Postavke.potion.visible = false;
    Postavke.hero.hitPoints += Postavke.potion.value;
  }

  if(Postavke.hero.touching(Postavke.talisman)){
    Postavke.talisman.visible = false;
    Postavke.hero.lockedHitPoints -= Postavke.talisman.value;
  }

  
  if(Postavke.lava !== null){
    if(Postavke.hero.touching(Postavke.lava[0]) || Postavke.hero.touching(Postavke.lava[1])){
      Postavke.hero.y = 0;
      Postavke.hero.x = 0;
      Postavke.hero.lives--;
    }
  }

  if(Postavke.up.length == 2){
    if(Postavke.hero.touching(Postavke.up[0])){
      Postavke.hero.lives += Postavke.up.value;
    gameButton.dispatchEvent(levelUp3);
    }
  

    if(Postavke.hero.touching(Postavke.up[1])){
      Postavke.hero.lives += Postavke.up.value;
      gameButton.dispatchEvent(levelUp4);
    }
  }

  if(SENSING.up.active){
    Postavke.hero.jump();
  }

  if(SENSING.right.active){
    Postavke.hero.moveRight();
  }

  if(SENSING.left.active){
    Postavke.hero.moveLeft();
  }

  if(SENSING.keyD.active && !Postavke.hero.jumping){
    Postavke.hero.drawSword();
  }

  if(!SENSING.keyD.active){
    Postavke.hero.sheithSword();
  }

  if(SENSING.keyA.active){
    Postavke.hero.MiddleAttack();
  }

  if(SENSING.keyS.active){
    Postavke.hero.LowAttack();
    Postavke.hero.JumpLowAttack();
  }

  if(SENSING.keyW.active){
    Postavke.hero.HighAttack()
    Postavke.hero.JumpHighAttack();
  }
}

function Lionheart3(){

  if(Postavke.ghost !== null){
    if(Postavke.hero.touching(Postavke.ghost)){
      if(Postavke.hero.highAttack || Postavke.hero.lowAttack || Postavke.hero.middleAttack){
        Postavke.ghost.visible = false;
      }
      else if(!Postavke.hero.invincible){
        Postavke.hero.hitPoints -= Postavke.ghost.damage;
        Postavke.hero.invincible = true;
        setTimeout(() => {
          Postavke.hero.invincible = false;
        },1000);
      }
    }
  }

  if(Postavke.amulet !== null){
    if(Postavke.hero.touching(Postavke.amulet)){
      Postavke.amulet.visible = false;
      Postavke.amulet.collected = true;;
    }
  }

  if(Postavke.hero.touching(Postavke.talisman)){
    Postavke.talisman.visible = false;
    Postavke.hero.lockedHitPoints -= Postavke.talisman.value;
  }

  if(Postavke.hero.touching(Postavke.up[0])){
    Postavke.hero.lives += Postavke.up.value;
  gameButton.dispatchEvent(levelUp4);
  }

  if(Postavke.floor !== null){
    if(Postavke.hero.touching(Postavke.floor)){
      Postavke.hero.lives--;
      Postavke.hero.y = 0;
    }
  }


  if(SENSING.up.active){
    Postavke.hero.jump();
  }

  if(SENSING.right.active){
    Postavke.hero.moveRight();
  }

  if(SENSING.left.active){
    Postavke.hero.moveLeft();
  }

  if(SENSING.keyD.active && !Postavke.hero.jumping){
    Postavke.hero.drawSword();
  }

  if(!SENSING.keyD.active){
    Postavke.hero.sheithSword();
  }

  if(SENSING.keyA.active){
    Postavke.hero.MiddleAttack();
  }

  if(SENSING.keyS.active){
    Postavke.hero.LowAttack();
    Postavke.hero.JumpLowAttack();
  }

  if(SENSING.keyW.active){
    Postavke.hero.HighAttack()
    Postavke.hero.JumpHighAttack();
  }
}

function Lionheart4(){



  if(Postavke.norka !== null){

    Postavke.norka.changeDirection();
    if(Postavke.hero.touching(Postavke.norka)){
      if((Postavke.hero.highAttack || Postavke.hero.lowAttack || Postavke.hero.middleAttack)&&!Postavke.norka.invincible){
        Postavke.norka.hitPoints--;
        Postavke.norka.invincible = true;
        setTimeout(() => {
          Postavke.norka.invincible = false;
        },500);

      }
      else if(!Postavke.hero.invincible){
        Postavke.hero.hitPoints -= Postavke.norka.damage;
        Postavke.hero.invincible = true;
        setTimeout(() => {
          Postavke.hero.invincible = false;
        },1000);
      }
    }
  }

  if(SENSING.up.active){
    Postavke.hero.jump();
  }

  if(SENSING.right.active){
    Postavke.hero.moveRight();
  }

  if(SENSING.left.active){
    Postavke.hero.moveLeft();
  }

  if(SENSING.keyD.active && !Postavke.hero.jumping){
    Postavke.hero.drawSword();
  }

  if(!SENSING.keyD.active){
    Postavke.hero.sheithSword();
  }

  if(SENSING.keyA.active){
    Postavke.hero.MiddleAttack();
  }

  if(SENSING.keyS.active){
    Postavke.hero.LowAttack();
    Postavke.hero.JumpLowAttack();
  }

  if(SENSING.keyW.active){
    Postavke.hero.HighAttack()
    Postavke.hero.JumpHighAttack();
  }
}