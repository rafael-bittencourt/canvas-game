const CANVAS_W = 505; 
const CANVAS_H = 606;
const TILE_WIDTH = 101; 
const TILE_HEIGHT = 83;
const N_ROWS = 5; 
const MAX_SPEED = 500;
const MIN_SPEED = 100;

var enemiesQty = 4;

var startX = 2; // player starting Col
var startY = 5; // player staring Row

var endGame = false;
var startGame = false;


// Enemies our player must avoid
var Enemy = function() {
    this.generate();
};
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
Enemy.prototype.generate = function() {
    this.x = -TILE_WIDTH * 2;
    this.y = sortRow(1,3);
    this.speed = sortNumber(MAX_SPEED, MIN_SPEED); 
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    this.checkCollisions();
    if (this.x > CANVAS_W) {
        this.x = -TILE_WIDTH * 2; //
        this.speed = sortNumber(MAX_SPEED, MIN_SPEED); //sort a new speed for the enemy reappear
        this.y = sortRow(1,3); //sort a row for the enemy reappear
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
    if( this.y == player.y && // player and enemy are on the same row
        (player.x - TILE_WIDTH/2) < this.x && // player and enemy are on the same col
        (player.x + TILE_WIDTH/2) > this.x) { // player and enemy are on the same col
        player.reset(startX, startY); // reset player to the start position
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = startX * TILE_WIDTH;
    this.y = (startY * TILE_HEIGHT) - TILE_HEIGHT/2;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// function to reset the player to a determined position
Player.prototype.reset = function(nCol, nRow) { 
    this.x = nCol * TILE_WIDTH;
    this.y = (nRow * TILE_HEIGHT) - TILE_HEIGHT/2;
};

Player.prototype.update = function() {
    if(this.dir == 'left' && this.x > 0) {
        this.x -= TILE_WIDTH;
    }
    else if(this.dir == 'right' && this.x < (CANVAS_W - TILE_WIDTH)) {
        this.x += TILE_WIDTH;
    }
    else if(this.dir == 'up') {
        if (this.y + TILE_HEIGHT/2 == TILE_HEIGHT) {
            this.reset(startX, startY);
            endGame = true;
        }
        else {
            this.y -= TILE_HEIGHT;
        }
    }
    else if(this.dir == 'down' && ((this.y + TILE_HEIGHT/2) < TILE_HEIGHT * N_ROWS)) {
        this.y += TILE_HEIGHT;
    }
    this.dir = null;
};

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

function sortNumber (maxNum, minNum) {
    maxNum++;
    minNum--;
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function sortRow (topRow, bottomRow) {
    var startRow = sortNumber(topRow+1, bottomRow-1);
    return (startRow * TILE_HEIGHT) - TILE_HEIGHT/2;
}


function setEnemies() {
    for(var i=0; i<enemiesQty; i++) {
        allEnemies.push(new Enemy());
    }
}