var bombExplode = function (bomb, player) {
    if (!gameOver) {
        var currentBomb = bombArray.shift();
        ++player.avalibleBombs;
        explosion(currentBomb);
    }
}



var explosion = function (bomb, iteration = 0, up = true, down = true, left = true, right = true, createdBombs = []) {
    if (!gameOver) {
        if (iteration == 0) {
            var newExplosion = { image: explosionImage, x: bomb.x, y: bomb.y, w: blockSize, h: blockSize };
            explosionArray.push(newExplosion);
            createdBombs.push(newExplosion);
            checkHitWithPlayer(newExplosion);
        }
        else {
            var newExplosion;
            for (var i = 0; i < 4; ++i) {
                var addExplosion = false;
                switch (i) {
                    case 0:
                        if (right) {
                            newExplosion = { image: explosionImage, x: bomb.x + (blockSize * iteration), y: bomb.y, w: blockSize, h: blockSize };
                            if (checkHitWithStaticBlock(newExplosion)) {
                                right = false;
                            } else {
                                addExplosion = true;
                                if (destroyBlocks(newExplosion)) {
                                    right = false;
                                } else {
                                    checkHitWithPlayer(newExplosion);
                                }
                            }
                        }
                        break;
                    case 1:
                        if (left) {
                            newExplosion = { image: explosionImage, x: bomb.x - (blockSize * iteration), y: bomb.y, w: blockSize, h: blockSize };
                            if (checkHitWithStaticBlock(newExplosion)) {
                                left = false;
                            } else {
                                addExplosion = true;
                                if (destroyBlocks(newExplosion)) {
                                    left = false;
                                } else {
                                    checkHitWithPlayer(newExplosion);
                                }
                            }
                        }
                        break;

                    case 2:
                        if (down) {
                            newExplosion = { image: explosionImage, x: bomb.x, y: bomb.y + (blockSize * iteration), w: blockSize, h: blockSize };
                            if (checkHitWithStaticBlock(newExplosion)) {
                                down = false;
                            } else {
                                addExplosion = true;
                                if (destroyBlocks(newExplosion)) {
                                    down = false;
                                } else {
                                    checkHitWithPlayer(newExplosion);
                                }
                            }
                        }
                        break;
                    case 3:
                        if (up) {
                            newExplosion = { image: explosionImage, x: bomb.x, y: bomb.y - (blockSize * iteration), w: blockSize, h: blockSize };
                            if (checkHitWithStaticBlock(newExplosion)) {
                                up = false;
                            } else {
                                addExplosion = true;
                                if (destroyBlocks(newExplosion)) {
                                    up = false;
                                } else {
                                    checkHitWithPlayer(newExplosion);
                                }
                            }
                        }
                        break;

                }
                if (addExplosion) {
                    if (!checkHitWithStaticBlock(newExplosion)) {
                        explosionArray.push(newExplosion);
                        createdBombs.push(newExplosion);
                    }
                }
            }
        }
        if (iteration < 2) {
            setTimeout(function () { explosion(bomb, ++iteration, up, down, left, right, createdBombs); }, 50);
        } else {
            setTimeout(function () { removeExplosion(createdBombs); }, 500);
        }
    }
}

var removeExplosion = function (createdBombs) {
    if (!gameOver) {
        for (var i = 0; i < createdBombs.length; ++i) {
            explosionArray.splice(explosionArray.indexOf(createdBombs[i]), 1);
        }
    }
}


var destroyBlocks = function (explosion) {
    var blockToDestroy = false;
    if (blockToDestroy = checkHitWithNonStBlock(explosion)) {
        nonStBlockArray.splice(nonStBlockArray.indexOf(blockToDestroy), 1);
    }
    return blockToDestroy;
}

var checkHitWithPlayer = function (explosion) {
    if (hittest(player1, explosion)) {
        winner(player2);
    } else if (hittest(player2, explosion)) {
        winner(player1);
    }
}


var winner = function (player) {
    gameOver = true;
    winner = player;
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
            return staticBlockArray[i];
        }
    }
    return result;
}

var checkHitWithNonStBlock = function (a) {
    var result = false;
    for (var i = 0; i < nonStBlockArray.length; ++i) {
        if (hittest(nonStBlockArray[i], a)) {
            return nonStBlockArray[i];
        }
    }
    return result;
}


var checkHitWithBlock = function (a) {
    var result = false;
    result = checkHitWithStaticBlock(a);
    if (!result) {
        result = checkHitWithNonStBlock(a);
    }
    return result;
}


var checkHitWithBomb = function (a) {
    var result = false;
    for (var i = 0; i < bombArray.length; ++i) {
        if (hittest(bombArray[i], a)) {
            return bombArray[i];
        }
    }
    return result;
}




var initEnvironment = function () {
    var k = 0;
    for (var j = 0; j < Math.floor((gameHeight / blockSize) / 2); ++j) {
        for (var i = 0; i < Math.floor((gameHeight / blockSize) / 2); ++i) {
            staticBlockArray[k++] = { image: staticBlockImage, x: (i * (blockSize * 2) + blockSize), y: (j * (blockSize * 2) + blockSize), w: blockSize, h: blockSize };
        }
    }
}

var initBlocks = function () {
    var k = 0;
    for (var j = 0; j < gameHeight / blockSize; ++j) {
        for (var i = 0; i < gameHeight / blockSize; ++i) {
            if ((i * blockSize > (blockSize) || (j * blockSize > blockSize) && (j * blockSize < gameHeight - (blockSize * 2))) && (i * blockSize) < (gameHeight - (blockSize * 2)) || (j * blockSize > blockSize) && (j * blockSize < gameHeight - (blockSize * 2))) {
                var curX = i * blockSize;
                var curY = j * blockSize;
                var newStBlock = { image: nonStBlockImage, x: curX, y: curY, w: blockSize, h: blockSize };

                if (!checkHitWithStaticBlock(newStBlock)) {
                    nonStBlockArray[k++] = newStBlock;
                }
            }
        }
    }
}


var drawStaticBlock = function () {
    for (var i = 0; i < staticBlockArray.length; i++) {
        context.drawImage(staticBlockArray[i].image, staticBlockArray[i].x, staticBlockArray[i].y, staticBlockArray[i].w, staticBlockArray[i].h);
    }
}

var drawNonStaticBlock = function () {
    for (var i = 0; i < nonStBlockArray.length; i++) {
        context.drawImage(nonStBlockArray[i].image, nonStBlockArray[i].x, nonStBlockArray[i].y, nonStBlockArray[i].w, nonStBlockArray[i].h);
    }
}

var drawBombs = function () {
    for (var i = 0; i < bombArray.length; i++) {
        context.drawImage(bombArray[i].image, bombArray[i].x, bombArray[i].y, bombArray[i].w, bombArray[i].h);
    }
}

var drawExplosions = function () {
    for (var i = 0; i < explosionArray.length; i++) {
        context.drawImage(explosionArray[i].image, explosionArray[i].x, explosionArray[i].y, explosionArray[i].w, explosionArray[i].h);
    }
}


var drawPlayers = function () {
    context.drawImage(player1.image, player1.x, player1.y, player1.w, player1.h);
    context.drawImage(player2.image, player2.x, player2.y, player2.w, player2.h);
}

var drawWinner = function () {
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.strokeStyle = 'black';
    context.lineWidth = 2.5;
    context.font = "bolder 78px Arial";
    switch (winner) {
        case player2:
            context.fillStyle = "red";
            context.fillText("Wygrał gracz czerwony", gameWidth / 2, gameHeight / 2);
            context.strokeText("Wygrał gracz czerwony", gameWidth / 2, gameHeight / 2);
            break;
        case player1:
            context.fillStyle = "green";
            context.fillText("Wygrał gracz zielony", gameWidth / 2, gameHeight / 2);
            context.strokeText("Wygrał gracz zielony", gameWidth / 2, gameHeight / 2);
            break;
    }
}


var render = function () {
    context.drawImage(bgImage, 0, 0);

    drawStaticBlock();
    drawNonStaticBlock();
    drawBombs();
    drawPlayers();
    drawExplosions();

    if (gameOver) {
        drawWinner();
    }
}

function main() {
    render();
    keysUpdate();
    requestAnimationFrame(main);
};


function startGame() {
    initEnvironment();
    initBlocks();
    main();
}