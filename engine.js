/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        // game state 
        if(!endGame && !youLose){
             /* Call our update/render functions, pass along the time delta to
             * our update function since it may be used for smooth animation.
             */
            var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
            updateEntities(dt);
            drawGameScreen(canvas, ctx);
            render();

            /* Set our lastTime variable which is used to determine the time delta
            * for the next time this function is called.
            */
            lastTime = now;

            /* Use the browser's requestAnimationFrame function to call this
             * function again as soon as the browser is able to draw another frame.
             */
            win.requestAnimationFrame(main);
        }
        // game ended 
        if(endGame) {
            restartGame(0);
        }
        if(youLose) {
            restartGame(1);
        }
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        lastTime = Date.now();
        // call the pre-game settings
        startScreen();
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * TILE_WIDTH, row * TILE_HEIGHT);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    // draw the initial screen of the game, with the possibility to change player's sprite and game difficulty 
    function startScreen() {
        drawStartScreen(canvas, ctx, playerImagePath);
        // wait for keyboard inputs to change settings or start the game
        document.addEventListener('keyup', function(e) {
            if(!startGame) {
                if(e.keyCode == 13) { // enter is pressed
                    setEnemies(); // populate the enemies array
                    startGame = true; // set the condition to start the game
                }
                if(e.keyCode == 37 || e.keyCode == 39) { // left or right arrows pressed
                    chooseCharacter(e.keyCode); // call the function to change player's sprite
                    drawStartScreen(canvas, ctx, playerImagePath); // update the initial screen with the changes
                }
                else if(e.keyCode == 38 || e.keyCode == 40) { // up or down arrows pressed
                    chooseDifficulty(e.keyCode); // call the function to change game difficulty
                    drawStartScreen(canvas, ctx, playerImagePath); // update the initial screen with the changes
                }
            }
            // when game is ready to start, call the main function
            if(startGame) {
                main();
            }
        });
        
    }

    // function to change player's sprite based on the keyboard input passed
    function chooseCharacter(code) {
        // update the index to player's sprites 
        if(code == 37) {
            imgCharIndex--;
            if(imgCharIndex < 0) {
                imgCharIndex = imgCharLength-1;
            }
        }
        else if(code == 39) {
            imgCharIndex++;
            if(imgCharIndex > imgCharLength-1) {
                imgCharIndex = 0;
            }
        }
        // choose the new image based on the current index 
        switch(imgCharIndex) {
            case 0:
                playerImagePath = 'images/char-boy.png';
                break;
            case 1:
                playerImagePath = 'images/char-cat-girl.png';
                break;
            case 2:
                playerImagePath = 'images/char-horn-girl.png';
                break;
            case 3:
                playerImagePath = 'images/char-pink-girl.png';
                break;
            case 4:
                playerImagePath = 'images/char-princess-girl.png';
                break;
        }
        player.updateSprite(playerImagePath);
    }

    // function to change player's sprite based on the keyboard input passed
    function chooseDifficulty(code) {
        // update the index to game difficulty
        if(code == 38) {
            difficultyLevel++;
            if(difficultyLevel > 2) {
                difficultyLevel = 0;
            }
        }
        else if(code == 40) {
            difficultyLevel--;
            if(difficultyLevel < 0) {
                difficultyLevel = 2;
            }
        }

        // based on the index, choose between 3 difficulties
        switch(difficultyLevel) {
            case 0:
                difficultyName = "EASY";
                break;
            case 1:
                difficultyName = "MEDIUM";
                break;
            case 2:
                difficultyName = "HARD";
                break;
        }
        // defines 2 enemies for easy, 4 for medium and 6 for hard
        enemiesQty = difficultyLevel*2 + 2; 
    }

    // draw ending screen and wait for game restart 
    function restartGame(result) {
        drawEndScreen(canvas, ctx, result);
        document.addEventListener('keyup', function(e) {
            if(endGame || youLose) {
                if(e.keyCode == 13) { // when enter pressed, set conditions back to restart the game
                    win.requestAnimationFrame(main);
                    endGame = false;
                    youLose = false;
                    lives = 3;
                }
            }
        });
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/char-horn-girl.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
