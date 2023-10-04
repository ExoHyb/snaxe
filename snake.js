const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const boxSize = 20;
let score = 0;
const scoreElement = document.getElementById("score");
let gameStarted = false; 
let gameInterval;  // Declare gameInterval

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
    // ... (rest of your image paths)
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
    context.fillStyle = '#4CAF50'; // Couleur de fond du bouton
    context.fillRect(canvas.width / 4, canvas.height / 2 - 30, canvas.width / 2, 60); // Dessine le bouton

    context.fillStyle = 'white'; // Couleur du texte
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

function changeDirection(e) {
    if (e.key === 'ArrowLeft' && dx === 0) {dx = -1; dy = 0;}
    if (e.key === 'ArrowUp' && dy === 0) {dx = 0; dy = -1;}
    if (e.key === 'ArrowRight' && dx === 0) {dx = 1; dy = 0;}
    if (e.key === 'ArrowDown' && dy === 0) {dx = 0; dy = 1;}
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

function drawSnakePart(part) {
    const gradient = context.createLinearGradient(part.x * boxSize, part.y * boxSize, (part.x + 1) * boxSize, (part.y + 1) * boxSize);
    gradient.addColorStop(0, "limegreen"); // Début de gradient
    gradient.addColorStop(1, "green");    // Fin de gradient

    context.fillStyle = gradient;
    context.fillRect(part.x * boxSize, part.y * boxSize, boxSize, boxSize);

    context.shadowColor = '#666666';
    context.shadowBlur = 5;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;

    const cornerRadius = 5;
    context.lineJoin = "round";
    context.lineWidth = cornerRadius;

    // Remplissage d'un rectangle arrondi
    context.strokeRect(part.x * boxSize + (cornerRadius / 2), part.y * boxSize + (cornerRadius / 2), boxSize - cornerRadius, boxSize - cornerRadius);
    context.fillRect(part.x * boxSize + (cornerRadius / 2), part.y * boxSize + (cornerRadius / 2), boxSize - cornerRadius, boxSize - cornerRadius);

    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
}

document.addEventListener("keydown", function(e) {
    // For direction change
    if (e.key === 'ArrowLeft' && dx === 0) {dx = -1; dy = 0;}
    if (e.key === 'ArrowUp' && dy === 0) {dx = 0; dy = -1;}
    if (e.key === 'ArrowRight' && dx === 0) {dx = 1; dy = 0;}
    if (e.key === 'ArrowDown' && dy === 0) {dx = 0; dy = 1;}
    
    // For pausing game
    if (e.key === " " || e.key === "Space") {  // We check for both possible values here
        console.log("Space key pressed");  
        e.preventDefault();
        togglePause();
    }
});

function togglePause() {
    if (isPaused) {
        console.log("Resuming the game");  // Log when the game resumes
        isPaused = false;
        gameInterval = setInterval(drawGame, 100);
    } else {
        console.log("Pausing the game");  // Log when the game pauses
        isPaused = true;
        clearInterval(gameInterval);
    }
}


function drawGame() {
    if(!gameStarted) {
        drawStartButton();
        return; // Si le jeu n'a pas démarré, on sort de la fonction après avoir dessiné le bouton
    }

    if (isPaused) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "50px Arial";
        context.textAlign = "center";
        context.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
        return;  // Sortie précoce pour ne pas dessiner le reste du jeu
    }
    
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

    const pattern = context.createPattern(grassImage, 'repeat');
    context.fillStyle = pattern;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach(drawSnakePart);

    // Draw food
    context.font = "20px Arial";
    context.fillText(currentFood.emoji, food.x * boxSize, (food.y + 1) * boxSize);
}


document.getElementById("restartButton").addEventListener("click", function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(gameInterval);
    initializeGame();
})

drawGame(); // Appel initial pour dessiner l'écran (y compris le bouton de démarrage).

