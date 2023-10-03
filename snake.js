const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const boxSize = 20;
let score = 0;
const scoreElement = document.getElementById("score");

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

function updateImage() {
    imageElement.src = imagesArray[Math.min(Math.floor(score / 100), imagesArray.length - 1)];
}

let snake = [{x: 5, y: 5}];
let food = generateRandomPosition();

function generateRandomPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)),
        y: Math.floor(Math.random() * (canvas.height / boxSize))
    };
}

let dx = 1;
let dy = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
    if (e.keyCode == 37 && dx === 0) {dx = -1; dy = 0;}
    if (e.keyCode == 38 && dy === 0) {dx = 0; dy = -1;}
    if (e.keyCode == 39 && dx === 0) {dx = 1; dy = 0;}
    if (e.keyCode == 40 && dy === 0) {dx = 0; dy = 1;}
}

function checkCollisionWithSelf() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    clearInterval(gameInterval);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "50px Arial";
    context.textAlign = "center";
    context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    document.getElementById("restartButton").style.display = 'block';
}

function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update snake position
    let head = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    // Handle wall collision
    if (head.x < 0) head.x = (canvas.width / boxSize) - 1;
    if (head.x > (canvas.width / boxSize) - 1) head.x = 0;
    if (head.y < 0) head.y = (canvas.height / boxSize) - 1;
    if (head.y > (canvas.height / boxSize) - 1) head.y = 0;

    snake.unshift(head);

    if (checkCollisionWithSelf()) {
        gameOver();
        return;
    }

    // Check for food consumption
    if (head.x === food.x && head.y === food.y) {
        food = generateRandomPosition();
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


document.getElementById("restartButton").addEventListener("click", function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(gameInterval); // Important : arrêtez l'intervalle de jeu précédent
    initializeGame();
})

updateImage();
let gameInterval = setInterval(drawGame, 100);
