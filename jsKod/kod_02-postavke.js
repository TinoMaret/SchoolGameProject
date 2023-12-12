//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion
/// <reference path="kod_00-staticka.js"/>
/// <reference path="kod_01-likovi.js"/>
let gameButton = document.getElementById("btnGame");

let gameOverEvent = new CustomEvent("gameover", {
  detail:{
    message: "Izgubili ste!!!"
  }
});

let winEvent = new CustomEvent("gameover", {
  detail:{
    message: "Pobijedili ste"
  }
})

let levelUpEvent = new Event("levelup");

let levelUp3 = new Event("levelup3");
let levelUp4 = new Event("levelup4");

gameButton.addEventListener("gameover", (ev) => {
  console.log(ev.detail.message);
  btnStop_click();
});

gameButton.addEventListener("levelup", () => {
  console.log("Prešli ste na iduću razinu");
  btnStop_click();
  GAME.setActiveWorldMap("Lionheart-2");
  setupLionheart2();
  btnStart_click();
});

gameButton.addEventListener("levelup3", () => {
  console.log("Otkrili ste tajnu razinu");
  btnStop_click();
  GAME.setActiveWorldMap("Lionheart-3");
  setupLionheart3();
  btnStart_click();
});

gameButton.addEventListener("levelup4", () => {
  console.log("Boss fight");
  btnStop_click();
  GAME.setActiveWorldMap("Lionheart-4");
  setupLionheart4();
  btnStart_click();
})

let btnSetupGame = document.getElementById("btnSetupGame");
btnSetupGame.addEventListener("click", setup);

function setup() {

  GAME.clearSprites();

  let odabrana = GAME.activeWorldMap.name;
  GameSettings.output(odabrana);

  switch (odabrana) {
    case "v10":
      setupVjezbe10();
      break;
    
    case "Lionheart":
      setupLionheart();
      break;

    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
      break;
  }

  render_main();
}

/* LEVELS */
function setupVjezbe10() {
  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("platforme");

  let r = new Racoon(0, 0, GAME.getSpriteLayer("racoon"));
  GAME.addSprite(r);

  Postavke.racoon = r;

}

function setupLionheart(){
  console.log("setup");

  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("Platofrme");

  let valdyn = new Valdyn(0,0, GAME.getSpriteLayer("Valdyn"));
  GAME.addSprite(valdyn);

  let bee = new Bee(55*16,10*16, GAME.getSpriteLayer("Bee"));
  GAME.addSprite(bee);

  let spike1 = new Spike(1183.50,275.50, GAME.getSpriteLayer("spike1"));
  GAME.addSprite(spike1);

  let spike2 = new Spike(1168.50,275.50, GAME.getSpriteLayer("spike2"));
  GAME.addSprite(spike2);

  let potion = new Potion(1087,273, GAME.getSpriteLayer("potion"));
  GAME.addSprite(potion);

  let talisman = new Talisman(973,209,GAME.getSpriteLayer("Talisman"));
  GAME.addSprite(talisman);

  let up = new UP(1263,204, GAME.getSpriteLayer("up"));
  GAME.addSprite(up);

  Postavke.up.push(up);
  Postavke.talisman = talisman;
  Postavke.potion = potion;
  Postavke.spike.push(spike1);
  Postavke.spike.push(spike2);
  Postavke.bee = bee;
  Postavke.hero = valdyn;
}

function setupLionheart2(){
  console.log("setup");

  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("Platforme");

  let valdyn = new Valdyn(0,0, GAME.getSpriteLayer("Valdyn"));
  GAME.addSprite(valdyn);

  let potion = new Potion(481,255, GAME.getSpriteLayer("Potion"));
  GAME.addSprite(potion);

  let talisman = new Talisman(400,257,GAME.getSpriteLayer("Talisman"));
  GAME.addSprite(talisman);

  let up1 = new UP(546,271, GAME.getSpriteLayer("up1"));
  GAME.addSprite(up1);

  let up2 = new UP(593,143, GAME.getSpriteLayer("up2"));
  GAME.addSprite(up2);

  let lava1 = new Lava(290,287, GAME.getSpriteLayer("lava1"));
  GAME.addSprite(lava1);

  let lava2 = new Lava(528,288, GAME.getSpriteLayer("lava2"));
  GAME.addSprite(lava2);

  Postavke.lava = [lava1, lava2];
  Postavke.up = [];
  Postavke.up.push(up1);
  Postavke.up.push(up2);
  Postavke.talisman = talisman;
  Postavke.potion = potion;
  Postavke.hero = valdyn;
}

function setupLionheart3(){
  console.log("setup");

  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("Platforme");

  let valdyn = new Valdyn(3*16, 10*16, GAME.getSpriteLayer("Valdyn"));
  GAME.addSprite(valdyn);

  let talisman = new Talisman(64,128,GAME.getSpriteLayer("talisman"));
  GAME.addSprite(talisman);

  let up = new UP(590,90, GAME.getSpriteLayer("up"));
  GAME.addSprite(up);

  let ghost = new Ghost(0,200, GAME.getSpriteLayer("Ghost"));
  GAME.addSprite(ghost);

  let amulet = new Amulet(235,150, GAME.getSpriteLayer("amulet"));
  GAME.addSprite(amulet);

  let floor = new Collectable(143,319, GAME.getSpriteLayer("floor"));
  GAME.addSprite(floor);

  Postavke.ghost = ghost;
  Postavke.amulet = amulet;
  Postavke.up = [];
  Postavke.up.push(up);
  Postavke.talisman = talisman;
  Postavke.hero = valdyn;
  Postavke.floor = floor;
}

function setupLionheart4(){
  console.log("setup");

  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("Platforme");

  let valdyn = new Valdyn(0,0, GAME.getSpriteLayer("Valdyn"));
  GAME.addSprite(valdyn);

  let norka = new Norka (1*16, 20*16, GAME.getSpriteLayer("Norka"));
  GAME.addSprite(norka);

  Postavke.hero = valdyn;
  Postavke.norka = norka;
  Postavke.lava = null;
}