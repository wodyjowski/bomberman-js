//stałe
var gameWidth = 880;
var gameHeight = 880;

var blockSize = 80;
var playerSize = 75;

var gameOver = false;
var winner;

var playerStartSpeed = 5;
var bombsOnStart = 1;
var startExplosionSize = 1;


//Utworzenie płótna - canvas
var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
canvas.width = gameWidth;
canvas.height = gameHeight;
document.body.appendChild(canvas);

//Tło gry
var bgImage = new Image();
bgImage.src = "images/background.png";

//Player1
var player1;
var player2;
var initPlayer = function () {

    var player1ImageLeft = new Image();
    player1ImageLeft.src = "images/player1Left.png";
    var player1ImageRight = new Image();
    player1ImageRight.src = "images/player1Right.png";
    player1 = {
        image: player1ImageRight, imageLeft: player1ImageLeft, imageRight: player1ImageRight, x: 0, y: gameHeight - playerSize,
        w: playerSize, h: playerSize, speed: playerStartSpeed, avalibleBombs: bombsOnStart, onBomb: null, explosionSize: startExplosionSize
    };

    //Player2
    var player2ImageLeft = new Image();
    player2ImageLeft.src = "images/player2Left.png";
    var player2ImageRight = new Image();
    player2ImageRight.src = "images/player2Right.png";
    player2 = {
        image: player2ImageLeft, imageLeft: player2ImageLeft, imageRight: player2ImageRight, x: gameWidth - playerSize, y: 0,
        w: playerSize, h: playerSize, speed: playerStartSpeed, avalibleBombs: bombsOnStart, onBomb: null, explosionSize: startExplosionSize
    };
}

//Niezniszczalny klocek
var staticBlockImage = new Image();
staticBlockImage.src = "images/staticBlock.png";
var staticBlock = { image: staticBlockImage, x: 0, y: 0, w: blockSize, h: blockSize };
var staticBlockArray = [];

//Zniszczalny klocek
var nonStBlockImage = new Image();
nonStBlockImage.src = "images/nonStBlock.png";
var nonStBlock = { image: nonStBlockImage, x: 0, y: 0, w: blockSize, h: blockSize };
var nonStBlockArray = [];


//Bomba
var bombImage = new Image();
bombImage.src = "images/bomb.png";
var bomb = { image: bombImage, x: 0, y: 0, w: blockSize, h: blockSize };
var bombArray = [];


//Wybuch
var explosionImage = new Image();
explosionImage.src = "images/explosion.png";
var explosion = { image: explosionImage, x: 0, y: 0, w: blockSize, h: blockSize };
var explosionArray = [];

//Dodanie boomby
var bombAddImage = new Image();
bombAddImage.src = "images/bombAdd.png";
var bombUpImage = new Image();
bombUpImage.src = "images/bombUp.png";
var speedUpImage = new Image();
speedUpImage.src = "images/speedUp.png";
var powerUp = { image: bombAddImage, x: 0, y: 0, w: blockSize, h: blockSize, type: "bombAdd" };
var powerUpArray = [];

//Obrazy na koniec gry
var winImageSize = { w: 228, h: 274 };
var restarImageSize = { w: 180, h: 180 }
restarImageSize.x = (gameWidth / 2) - restarImageSize.w / 2;
restarImageSize.y = (gameHeight / 2) + (restarImageSize.h / 3);

var player1WinImage = new Image();
player1WinImage.src = "images/player1Win.png";

var player2WinImage = new Image();
player2WinImage.src = "images/player2Win.png";

var restartImage = new Image();
restartImage.src = "images/restart.png";