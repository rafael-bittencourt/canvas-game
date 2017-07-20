// func to draw the starting and select option screen for the game
function drawStartScreen(canvas, ctx, imageToChange) {
    var image = new Image();
    image.src = imageToChange;
    colorRect(ctx, 0, 0, canvas.width, canvas.height, 'black');
    // game title and general instructions
    colorText(ctx, "XXI FROGGER", canvas.width/2, 150, 'yellow', "bold 50px Verdana");
    colorText(ctx, "PRESS ENTER TO PLAY", canvas.width/2, 250, 'yellow', "bold 25px Verdana");
    colorText(ctx, "USE ARROWS TO SELECT OPTIONS", canvas.width/2, canvas.height-50, 'white', "18px Verdana");
    // player selection functions
    colorText(ctx, "CHOOSE CHARACTER", canvas.width/4, (canvas.height/2)+50, 'white', "bold 15px Verdana"); // draw text description
    colorTriang(ctx, 30, (canvas.height/2)+130, 50, (canvas.height/2)+115, 50, (canvas.height/2)+145, 'white'); //draw left triangle
    colorRect(ctx, 66, canvas.height/2+80, 120, canvas.height/5, 'white'); // draw back rectangle
    ctx.drawImage(image, 75, canvas.height/2+40); // draw character image
    colorTriang(ctx, canvas.width/2-30, (canvas.height/2)+130, canvas.width/2-50, (canvas.height/2)+115, canvas.width/2-50, (canvas.height/2)+145, 'white'); //draw right triangle

    // difficulty selection functions
    colorText(ctx, "CHOOSE DIFFICULTY", canvas.width*0.75, (canvas.height/2)+50, 'white', "bold 15px Verdana");
    colorTriang(ctx, canvas.width/2+100, (canvas.height/2)+105, canvas.width/2+120, (canvas.height/2)+90, canvas.width/2+140, (canvas.height/2)+105, 'white'); //draw up triangle
    colorText(ctx, difficultyName, canvas.width/2+120, (canvas.height/2)+145, 'yellow', "bold 28px Verdana"); // draw text description
    colorTriang(ctx, canvas.width/2+100, (canvas.height/2)+165, canvas.width/2+120, (canvas.height/2)+180, canvas.width/2+140, (canvas.height/2)+165, 'white'); //draw down triangle
}

// draw the canvas black background with the updated player's lives on the top right corner
function drawGameScreen(canvas, ctx) {
    colorRect(ctx, 0, 0, canvas.width, canvas.height, 'black');
    colorText(ctx, "LIVES: " + lives, canvas.width - 100, 35, 'yellow', "25px Verdana");
    var timeElapsed = (currentDate-startDate)/1000;
    // verify if the record is null and the game was won
    if(record == null && endGame) {
        record = timeElapsed;
    // verify if the record the greater than the current run 
    } else if (record > timeElapsed && endGame) {
        record = timeElapsed;
    }
    // overflow control
    if(timeElapsed > 999) {
        timeElapsed = 999;
    } 
    if(record > 999) {
        record = 999;
    } 
    var timeWrite = "Time: " + timeElapsed.toFixed(2) + "s ";
    if(record == null) {
        var recordWrite = "Record: -----";
    } else {
        var recordWrite = "Record: " + record.toFixed(2) + "s";
    }
    colorText(ctx, timeWrite + recordWrite, canvas.width/3, 35, 'lime', "20px Verdana");
}

// draw the restart game screen when the players reach the goal or loses all lives
function drawEndScreen(canvas, ctx, result) {
    colorRect(ctx, 0, (canvas.height/2)-100, canvas.width, 200, 'black');
    if(result == 0) { // result == 0 -> victory, result != 0 -> loss 
        colorText(ctx, "YOU WON", canvas.width/2, canvas.height/2, 'yellow', "bold 30px Verdana");
    } else {
        colorText(ctx, "YOU LOST", canvas.width/2, canvas.height/2, 'yellow', "bold 30px Verdana");
    }
    colorText(ctx, "PRESS ENTER TO RESTART", canvas.width/2, (canvas.height/2)+50, 'white', "18px Verdana");
}

// draw a rectangle over the canvas
function colorRect(ctx, topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

// draw the text in showWords
function colorText(ctx, showWords, textX, textY, fillColor, fontStyle) {
    ctx.font= fontStyle;
    ctx.fillStyle = fillColor;
    ctx.textAlign = "center";
    ctx.fillText(showWords, textX, textY);
}

// draw a triangle based on 3 points
function colorTriang(ctx, startX, startY, midX, midY, endX, endY, fillColor) {
    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.moveTo(startX, startY);
    ctx.lineTo(midX, midY);
    ctx.lineTo(endX, endY);
    ctx.fill();
}