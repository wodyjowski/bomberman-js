//Obsługa klawiatury
var keysDown = {};
addEventListener("keydown", function (e) { keysDown[e.keyCode] = true; }, false);
addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);

addEventListener("click", function (e) { restartGame(e); }, false);

//Zmienne pomocnicze
var playerHit;

var keysUpdate = function () {
    if (!gameOver) {
        
        if (32 in keysDown) {
            plantBomb(player1);
        }

        if (13 in keysDown) {
            plantBomb(player2);
        }


        //TODO: Pozbyć się stałych]
        if (37 in keysDown) {
            movePlayerLeft(player2);
        }

        if (39 in keysDown) {
            movePlayerRight(player2);
        }


        if (38 in keysDown) {
            movePlayerUp(player2);
        }


        if (40 in keysDown) {
            movePlayerDown(player2);
        }



        if (65 in keysDown) {
            movePlayerLeft(player1);
        }

        if (68 in keysDown) {
            movePlayerRight(player1);
        }


        if (87 in keysDown) { // w
            movePlayerUp(player1);
        }


        if (83 in keysDown) {
            movePlayerDown(player1);
        }

    };

    var bombTest;
    var distancePlayerBomb;
    var distancePlayerTestBomb;

    /*
            if (!(bombTest = checkBombMovement(playerTest))
            || (distancePlayerBomb =  Math.sqrt(Math.pow(bombTest.x - player.x, 2) + Math.pow(bombTest.y - player.y, 2)))
            < (distancePlayerTestBomb = Math.sqrt(Math.pow(bombTest.x - playerTest.x, 2) + Math.pow(bombTest.y - playerTest.y, 2))))
    */

    function movePlayerUp(player) {
        var playerTest = { x: player.x, y: player.y - player.speed, w: player.w, h: player.h }
        if (player.y > 0 && !checkHitWithBlock(playerTest)) {
            if (playerOnBomb(player, playerTest)) {
                player.y -= player.speed;
                checkPowerUps(player);
            }
        }
    }

    function movePlayerDown(player) {
        var playerTest = { x: player.x, y: player.y + player.speed, w: player.w, h: player.h }
        if (player.y < gameHeight - player.h && !checkHitWithBlock(playerTest)) {
            if (playerOnBomb(player, playerTest)) {
                player.y += player.speed;
                checkPowerUps(player);
            }
        }
    }

    function movePlayerLeft(player) {
        var playerTest = { x: player.x - player.speed, y: player.y, w: player.w, h: player.h }
        player.image = player.imageLeft;
        if (player.x > 0 && !(playerHit = checkHitWithBlock(playerTest))) {
            if (playerOnBomb(player, playerTest)) {
                player.x -= player.speed;
                checkPowerUps(player);
            }
        }
    }

    function movePlayerRight(player) {
        var playerTest = { x: player.x + player.speed, y: player.y, w: player.w, h: player.h }
        player.image = player.imageRight;
        if (player.x < gameWidth - player.w && !checkHitWithBlock(playerTest)) {
            if (playerOnBomb(player, playerTest)) {
                player.x += player.speed;
                checkPowerUps(player);
            }
        }
    }


    function plantBomb(player) {
        if (player.avalibleBombs > 0 && !checkHitWithBomb(player)) {
            --player.avalibleBombs;
            newBomb = { image: bomb.image, x: Math.round(player.x / blockSize) * blockSize, y: Math.round(player.y / blockSize) * blockSize, w: bomb.w, h: bomb.h };
            bombArray.push(newBomb);
            player.onBomb = newBomb;
            setTimeout(function () { bombExplode(newBomb, player); }, 3000);
        }
    }
}