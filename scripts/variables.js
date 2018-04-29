//stałe
var gameWidth = 880;
var gameHeight = 880;

var blockSize = 80;
var playerSize = 75;

var gameOver = false;

var player1Speed = 5;

var bombsOnStart = 2;


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
var player1Image = new Image();
player1Image.src = "images/player1.png";
var player1 = { image: player1Image, x: 0, y: gameHeight - playerSize, w: playerSize, h: playerSize, speed: player1Speed, avalibleBombs: bombsOnStart };

//Player2
var player2Image = new Image();
player2Image.src = "images/player2.png";
var player2 = { image: player2Image, x: gameWidth - playerSize, y: 0, w: playerSize, h: playerSize, speed: player1Speed, avalibleBombs: bombsOnStart };

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


