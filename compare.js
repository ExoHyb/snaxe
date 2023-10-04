const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const boxSize = 20;
let score = 0;
const scoreElement = document.getElementById("score");
let gameStarted = false; // Indicateur pour savoir si le jeu a commencé ou non

const grassImage = new Image();
grassImage.src = "images/patterns/grass.png";

const foods = [
    {emoji: "🍆", score: 100},
    {emoji: "💦", score: 100},
    {emoji: "🍑", score: 100},
    {emoji: "🍒", score: 100},
    {emoji: "🍌", score: 100}
];

let currentFood = randomFood();

const imagesArray = [
    "images/girl-1/step-1.jpeg",
    "images/girl-1/step-2.jpeg",
    "images/girl-1/step-3.jpeg",
    "images/girl-1/step-4.jpeg",
    "images/girl-1/step-5.jpeg",
    "images/girl-1/step-6.jpeg",
    "images/girl-1/step-7.jpeg"
];
const imageElement = document.getElementById("sideImage");

let snake = [{x: 5, y: 5}];
let food = generateRandomPosition();
let dx = 1;
let dy = 0;
let isPaused = false;

function startGame() {
    gameStarted = true;
    initializeGame();
}

function drawStartButton() {
    context.fillStyle = '#4CAF50';
    context.fillRect(canvas.width / 4, canvas.height / 2 - 30, canvas.width / 2, 60);

    context.fillStyle = 'white';
    context.font = '30px Arial';
    context.textAlign = 'center';
    context.fillText("Commencer la partie", canvas.width / 2, canvas.height / 2 + 10);
}

canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (!gameStarted && x > canvas.width / 4 && x < (canvas.width / 4) * 3 && y > canvas.height / 2 - 30 && y < canvas.height / 2 + 30) {
        startGame();
    }
});

function randomFood() {
    const randomIndex = Math.floor(Math.random() * foods.length);
    return foods[randomIndex];
}

function initializeGame() {
    snake = [{ x: 5, y: 5 }];
    score = 0;
    dx = 1;
    dy = 0;
    food = generateRandomPosition();
    currentFood = randomFood();
    scoreElement.innerText = "Score: " + score;
    document.getElementById("restartButton").style.display = 'none';
    updateImage();
    gameInterval = setInterval(drawGame, 100);
}

function updateImage() {
    imageElement.src = imagesArray[Math.min(Math.floor(score / 100), imagesArray.length - 1)];
}

function generateRandomPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)),
        y: Math.floor(Math.random() * (canvas.height / boxSize))
    };
}

document.addEventListener("keydown", changeDirection);
function changeDirection(e) {
    // ... Le code de cette fonction reste inchangé.
}

function checkCollisionWithSelf() {
    // ... Le code de cette fonction reste inchangé.
}

function gameOver() {
    // ... Le code de cette fonction reste inchangé.
}

function drawSnakePart(part) {
    // ... Le code de cette fonction reste inchangé.
}

function togglePause() {
    // ... Le code de cette fonction reste inchangé.
}

document.addEventListener("keydown", function(e) {
    if (e.code === "Space") {
        togglePause();
    }
});

function drawGame() {
    if (!gameStarted) {
        drawStartButton();
        return;
    }

    // ... Le reste du code de cette fonction.
}

document.getElementById("restartButton").addEventListener("click", function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(gameInterval);
    initializeGame();
})

drawGame(); // Appel initial pour dessiner l'écran (y compris le bouton de démarrage).
