# SchoolGameProject
JavaScript game I made for a school project

1. **Basic Idea**

   It's about a 2D platformer game that primarily focuses on melee combat and precise obstacle traversal, which is an integral part of the map.

2. **Story**

   Valdyn is the name of a protagonist with nihilistic traits who has been ordered by the Cat-People King to retrieve a stolen relic called Lionheart. Furthermore, the same criminal who stole the Norka relic turned Valdyn's beloved Ilene into a stone figure. In his domains, Valdyn must find a necklace to undo this evil magic.

3. **Objective**

   Valdyn must defeat various evil creatures residing in the domains of the villain Norka and skillfully avoid traps on his way to ultimately confront and defeat Norka.

4. **Game Logic**

   Valdyn starts from the left end of the map and defeats evil creatures with his sword as he progresses to the right. He navigates obstacles such as water, spikes, lava, holes, and projectiles. The game consists of four maps that Valdyn advances by reaching the end of the previous one. The "boss-fight" occurs at the end of the fourth map. One of the four maps is hidden, and in it, Valdyn finds the sought-after necklace.

5. **Mechanics**

   Valdyn can run and jump on specific parts of the map, attack with his sword in various ways, and attack from a crouched position. Valdyn must stop and draw his sword to use it. While jumping, he can use the sword. Valdyn starts with three lives, four health points, and four locked health points that can be unlocked by collecting crystals. When Valdyn, for example, steps on spikes or comes into contact with enemy creatures, he loses a health point. When Valdyn's health points reach zero, he loses one life. If, for example, Valdyn falls into a hole or deep water, he loses a life.

6. **Points**

   The game does not have a special way of collecting points. Collecting objects in the game affects Valdyn's health points and lives.

7. **Progression**

   Progress in the game is achieved by Valdyn defeating all enemies, overcoming all obstacles, and reaching the end of the map to move on to the next one.

8. **Environment**

   The game takes place on four maps in order: Swamps, Spider Cave, Volcano, Ancient City.

9. **Characters**

   The game can only be played as Valdyn.

10. **Non-playable Characters**

    Bee - Flies
    Ghost - Flies towards Valdyn
    Norka - Boss fight

11. **Resource Collection**

    Collected resources include crystals for unlocking additional health points, Energy Drinks that replenish lost health points, Energy Spheres that add lives, and the Necklace to complete the game 100%.

12. **Game Control**

    Left - Valdyn moves left
    Right - Valdyn moves right
    Down - Valdyn crouches
    Up - Valdyn jumps
    Up and Right - Valdyn jumps to the right
    Up and Left - Valdyn jumps to the left

    D - Valdyn draws the sword (the sword is drawn only while "D" is pressed, when "D" is released, Valdyn sheaths the sword)
    (While "D" is pressed)
    A - Horizontal sword swing
    W - Overhead sword swing
    A - Kick

    (While Valdyn is in the air)
    W - Overhead sword swing
    S - Valdyn directs the sword below him

13. **Game End**

    The game is over when Valdyn defeats the final boss, and a message is displayed to the player indicating the successful return of the relic to the King. Depending on whether Valdyn collected an amulet on his journey, he may have succeeded in undoing the magic cast on Ilene.
