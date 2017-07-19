// constants for game sizing
const CANVAS_W = 505; 
const CANVAS_H = 606;
const TILE_WIDTH = 101; 
const TILE_HEIGHT = 83;
const N_ROWS = 5; 

// define enemies' max and min speed
const MAX_SPEED = 800;
const MIN_SPEED = 200;

// gameplay default values
var enemiesQty = 4;
var difficultyLevel = 1;
var difficultyName = "MEDIUM";
var lives = 3; 

// player's default values
var startX = 2; // player's starting Col
var startY = 5; // player's starting Row
var playerImagePath = 'images/char-boy.png'; // player's default pic
var imgCharIndex = 0;
var imgCharLength = 5;

// variables to control game state
var endGame = false;
var youLose = false;
var startGame = false;


// enemies class
var Enemy = function() {
    this.generate();
};

// fill the enemy's initial conditions
Enemy.prototype.generate = function() {
    this.x = -TILE_WIDTH * 2;
    this.y = sortRow(1,3); // possible rows for the enemy movement
    this.speed = sortNumber(MAX_SPEED, MIN_SPEED); // sort a initial speed for the enemy
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiply movement by the dt parameter to ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    this.checkCollisions();
    // check if the enemy reached the right side of the canvas
    if (this.x > CANVAS_W) {
        this.x = -TILE_WIDTH * 2; // restart the enemy on the left side of the canvas 
        this.speed = sortNumber(MAX_SPEED, MIN_SPEED); // sort a new speed for the enemy reappear
        this.y = sortRow(1,3); // sort a row for the enemy reappear
    }
};

// draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// check if the enemy is "nearby" the player
Enemy.prototype.checkCollisions = function() {
    if( this.y == player.y && // player and enemy are on the same row
        (player.x - TILE_WIDTH/2) < this.x && // player and enemy are on the same col
        (player.x + TILE_WIDTH/2) > this.x) { // player and enemy are on the same col
        player.reset(startX, startY); // reset player to the start position
        // player loses one life if a condition is verified
        if(lives > 0) {
            lives--;
        }
        //if lives come to zero, player lost the game
        if(lives == 0) {
            youLose = true;
        }
    }
};

// player class
var Player = function() {
    this.x = startX * TILE_WIDTH;
    this.y = (startY * TILE_HEIGHT) - TILE_HEIGHT/2;
    this.sprite = playerImagePath; 
};

// update the player's sprite with nSprite
Player.prototype.updateSprite = function(nSprite) { 
    this.sprite = nSprite;
};

// draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// function to reset the player to a determined position
Player.prototype.reset = function(nCol, nRow) { 
    this.x = nCol * TILE_WIDTH;
    this.y = (nRow * TILE_HEIGHT) - TILE_HEIGHT/2;
};

// function to update player's location based on the current player.dir
Player.prototype.update = function() {
    if(this.dir == 'left' && this.x > 0) { // check left border
        this.x -= TILE_WIDTH;
    }
    else if(this.dir == 'right' && this.x < (CANVAS_W - TILE_WIDTH)) { // check right border
        this.x += TILE_WIDTH;
    }
    else if(this.dir == 'up') {
        if (this.y + TILE_HEIGHT/2 == TILE_HEIGHT) { // if water is reached, game is won and player's position is reset
            this.reset(startX, startY);
            endGame = true;
        }
        else {
            this.y -= TILE_HEIGHT;
        }
    }
    else if(this.dir == 'down' && ((this.y + TILE_HEIGHT/2) < TILE_HEIGHT * N_ROWS)) { // check down border
        this.y += TILE_HEIGHT;
    }
    this.dir = null;
};

// update the player current's direction with the input passed
Player.prototype.handleInput = function(direction) {
    this.dir = direction;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// function to sort a number between minNum and maxNum
function sortNumber (maxNum, minNum) {
    maxNum++; // adjust to include edge values
    minNum--; // adjust to include edge values
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

// function to sort a row between bottomRow and topRow
function sortRow (topRow, bottomRow) {
    var startRow = sortNumber(topRow+1, bottomRow-1);
    return (startRow * TILE_HEIGHT) - TILE_HEIGHT/2;
}

// populate the enemies array based on the enemies quantity 
function setEnemies() {
    for(var i=0; i<enemiesQty; i++) {
        allEnemies.push(new Enemy());
    }
}