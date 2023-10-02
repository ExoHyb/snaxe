const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const boxSize = 20;
let score = 0;

const foods = [
    {emoji: "🍆", score: 10},
    {emoji: "💦", score: 15},
    {emoji: "🍑", score: 20},
    {emoji: "🍒", score: 25},
    {emoji: "🍌", score: 30}
];

let currentFood = randomFood();

function randomFood() {
    const randomIndex = Math.floor(Math.random() * foods.length);
    return foods[randomIndex];
}

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
let food = {x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30)};
let dx = 1;
let dy = 0;
const scoreElement = document.getElementById("score");

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
    if (e.keyCode == 37 && dx === 0) {dx = -1; dy = 0;}
    if (e.keyCode == 38 && dy === 0) {dx = 0; dy = -1;}
    if (e.keyCode == 39 && dx === 0) {dx = 1; dy = 0;}
    if (e.keyCode == 40 && dy === 0) {dx = 0; dy = 1;}
}

function updateImage() {
    imageElement.src = imagesArray[Math.floor(score / 100) % imagesArray.length];
}

let gameInterval;

function checkCollisionWithSelf() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    clearInterval(gameInterval); // Arrêtez le jeu
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "50px Arial";
    context.textAlign = "center";
    context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
}

function initializeGame() {
    snake = [
        { x: 5, y: 5 }
    ];
    score = 0;
    dx = 1;
    dy = 0;
    food = {
        x: Math.floor(Math.random() * 30),
        y: Math.floor(Math.random() * 30)
    };
    currentFood = randomFood();
    document.getElementById("restartButton").style.display = 'none';
    gameInterval = setInterval(drawGame, 100);
}

function gameOver() {
    clearInterval(gameInterval); // Arrêtez le jeu
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "50px Arial";
    context.textAlign = "center";
    context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    document.getElementById("restartButton").style.display = 'block'; // Affiche le bouton
}

document.getElementById("restartButton").addEventListener("click", function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    initializeGame(); // Initialisez le jeu à nouveau
});

function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Determine next position
    const nextX = snake[0].x + dx;
    const nextY = snake[0].y + dy;

    // Handle wall passage
    let head;
    if (nextX < 0) {
        head = {x: canvas.width / boxSize - 1, y: Math.floor(Math.random() * (canvas.height / boxSize))};
    } else if (nextX > (canvas.width / boxSize) - 1) {
        head = {x: 0, y: Math.floor(Math.random() * (canvas.height / boxSize))};
    } else if (nextY < 0) {
        head = {x: Math.floor(Math.random() * (canvas.width / boxSize)), y: canvas.height / boxSize - 1};
    } else if (nextY > (canvas.height / boxSize) - 1) {
        head = {x: Math.floor(Math.random() * (canvas.width / boxSize)), y: 0};
    } else {
        head = {x: nextX, y: nextY};
    }
    snake.unshift(head);

    if (checkCollisionWithSelf()) {
        gameOver();
        return;
    }

    // Check for food consumption
    if (head.x === food.x && head.y === food.y) {
        food = {x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30)};
        score += currentFood.score;
        scoreElement.innerText = "Score: " + score;
        currentFood = randomFood();
        updateImage();
    } else {
        snake.pop();
    }

    // Draw snake
    snake.forEach(part => {
        context.fillStyle = "green";
        context.fillRect(part.x * boxSize, part.y * boxSize, boxSize, boxSize);
    });

    // Draw food
    context.font = "20px Arial";
    context.fillText(currentFood.emoji, food.x * boxSize, (food.y + 1) * boxSize);
}

updateImage();
gameInterval = setInterval(drawGame, 100);

