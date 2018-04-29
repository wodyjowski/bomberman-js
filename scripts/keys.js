//Obsługa klawiatury
var keysDown = {};
addEventListener("keydown", function (e) { keysDown[e.keyCode] = true; }, false);
addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);

//Zmienne pomocnicze
var playerHit;


var keysUpdate = function () {
    if (32 in keysDown) {
        if (!bullet.visible) {
            bullet.visible = true;
            bullet.x = player1.x + 10;
            bullet.y = player1.y - 25;
        }
    }



    //TODO: Pozbyć się stałych]
    if (37 in keysDown) {
        movePlayerLeft(player2);
    }

    if (39 in keysDown){
        movePlayerRight(player2);
    }


    if (38 in keysDown){
        movePlayerUp(player2);
    }


    if (40 in keysDown){
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



function movePlayerUp(player) {
    var playerTest = { x: player.x, y: player.y - player.speed, w: player.w, h: player.h }
    if (player.y > 0 && !checkHitWithStaticBlock(playerTest))
        player.y -= player.speed;
}

function movePlayerDown(player) {
    var playerTest = { x: player.x, y: player.y + player.speed, w: player.w, h: player.h }
    if (player.y < gameHeight - player.h && !checkHitWithStaticBlock(playerTest))
        player.y += player.speed;
}

function movePlayerLeft(player) {
    var playerTest = { x: player.x - player.speed, y: player.y, w: player.w, h: player.h }
    if (player.x > 0 && !(playerHit = checkHitWithStaticBlock(playerTest))) {
        player.x -= player.speed;
    } else
        if (playerHit !== "undefined") {


        }
}

function movePlayerRight(player) {
    var playerTest = { x: player.x + player.speed, y: player.y, w: player.w, h: player.h }
    if (player.x < gameWidth - player.w && !checkHitWithStaticBlock(playerTest))
        player.x += player.speed;
}
