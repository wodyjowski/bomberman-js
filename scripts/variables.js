//stałe
var gameWidth = 880;
var gameHeight = 880;

var blockSize = 80;
var staticBlockSize = 80;
var playerSize = 75;

var gameOver = false;

var player1Speed = 5;


var enemy_speed = 2;
var enemy_bullets = 5;
var bullet_speed = 3;
var scroll_speed = 1;
var scroll_step = 2;
var score = 0;
var life = 3;


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
var player1 = { image: player1Image, x: 0, y: gameHeight - playerSize, w: playerSize, h: playerSize, speed: player1Speed };

//Player2
var player2Image = new Image();
player2Image.src = "images/player2.png";
var player2 = { image: player2Image, x: gameWidth - playerSize, y: 0, w: playerSize, h: playerSize, speed: player1Speed };

//Niezniszczalny klocek
var staticBlockImage = new Image();
staticBlockImage.src = "images/staticBlock.png";
var staticBlock = { image: staticBlockImage, x: 0, y: 0, w: blockSize, h: blockSize };


var staticBlockArray = [];
