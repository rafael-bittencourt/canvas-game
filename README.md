XXI Frogger
===============================
This game is a inspiration of the classic arcade from SEGA and Konami. The game is developed with **JavaScript** and **HTML5 Canvas**.

## Execution
To run the application, just open the `index.html` file in a web browser.

## Starting Screen
The initial screen presents the game title and gives the possibility to change game difficulty and player's character.
### Controls:
 - `←`, `→`: alternate between player's sprite options;
 - `↑`, `↓`: alternate between game difficulties;
 - `enter`: start the game.
## Gameplay
### Goal
Reaching the water with your character, avoiding the bugs running through the screen.
### Rules
You start with 3 lives, each enemy collision takes off one life and reset the player to the starting position. If you lose all your lives the game is over.
### Controls:
 - `↑`: move the player one tile up;
 - `↓`: move the player one tile down;
 - `←`: move the player one tile to the left;
 - `→`: move the player one tile to the right.
## Ending Screen
The ending screen presents your result and waits to restart the game.
### Possible Conditions:
- You reached the water and won the game;
- You are out of lives and the game is over.
### Controls:
 - `enter`: lives are set back to 3 and the game restarts.