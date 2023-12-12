class Postavke {

  constructor() {
    if (this instanceof Postavke) {
      throw new Error("Statička klasa nema instance!");
    }
  }

  /** @type {Racoon} */
  static racoon = null;


  static hero = null;
  static bee = null;
  static potion = null;
  static up = [];
  static talisman = null;
  static spike = [];
  static lava = null;
  static ghost = null;
  static amulet = null;
  static floor = null;
  static norka = null;
  
  static random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}