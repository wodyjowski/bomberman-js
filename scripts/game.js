var areVisibleEnemies = function () {
    for (var i = 0; i < enemies.length; ++i)
        if (enemies[i].visible)
            return true;

    return false;

}

var drawScope = function () {
    //TODO dobrać kolor i tym czcionki

    context.fillStyle = "rgb(250,250,250)";
    context.font = "24px Helvetica";
    context.textAlign = "left";
    context.textBaseline = "top";
    //TODO: Sparametryzowane w zależności od rozmiaru tła
    context.fillText("Score: " + score, 5, 5);
    context.fillText("Life: " + life, canvas.width - 80, 5);

}



var hittest = function (a, b) {
    if (((a.x < (b.x + b.w)) && ((a.x + a.w) > b.x) && (a.y < (b.y + b.h)) && ((a.y + a.h) > b.y))) {
        return true;
    } else {
        return false;
    }
}


var checkHitWithStaticBlock = function (a) {
    var result = false;
    for (var i = 0; i < staticBlockArray.length; ++i) {
        if (hittest(staticBlockArray[i], a)) {
            return  staticBlockArray[i];
        }
    }
    return result;
}


var initEnvironment = function () {
    var k = 0;
    for (var j = 0; j < Math.floor((gameHeight / blockSize) / 2); ++j) {
        for (var i = 0; i < Math.floor((gameHeight / blockSize) / 2); ++i) {
            staticBlockArray[k++] = { image: staticBlockImage, x: (i * (blockSize * 2) + blockSize), y: (j * (blockSize * 2) + blockSize), w: staticBlockSize, h: staticBlockSize };
        }
    }
}

var drawStaticBlock = function () {
    for (var i = 0; i < staticBlockArray.length; i++) {
        context.drawImage(staticBlockArray[i].image, staticBlockArray[i].x, staticBlockArray[i].y, staticBlockArray[i].w, staticBlockArray[i].h);
    }
}


var render = function () {
    context.drawImage(bgImage, 0, 0);


    if (!gameOver) {

        context.drawImage(player1.image, player1.x, player1.y, player1.w, player1.h);
        context.drawImage(player2.image, player2.x, player2.y, player2.w, player2.h);
        drawStaticBlock();


    }
    else {
        context.fillStyle = "rgb(250,250,250)";
        context.font = "48px Helvetica";
        context.fillText("Game over", 300, 300);
    }

};

function main() {
    render();
    keysUpdate();
    requestAnimationFrame(main);
};


function startGame() {
    initEnvironment();
    main();
}