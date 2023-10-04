const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const boxSize = 20;
let score = 0;
const scoreElement = document.getElementById("score");
let gameStarted = false; 
let gameInterval;  // Declare gameInterval
let bestScore = localStorage.getItem('bestScore') || 0;
const bestScoreElement = document.getElementById("bestScore");
bestScoreElement.innerText = "Best Score: " + bestScore;
let skull = null;
let skullTimeout = null;

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
let food = generateRandomPositionForFood();
let dx = 1;
let dy = 0;
let isPaused = false;

function startGame() {
    gameStarted = true;
    initializeGame();
}

function drawStartButton() {
    context.fillStyle = '#DDD'; // Couleur de fond du bouton
    context.fillStyle = '#666'; // Couleur du texte
    context.font = "30px 'Roboto-Light', sans-serif";
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
    food = generateRandomPositionForFood();
    generateRandomPositionForSkull();
    currentFood = randomFood();
    scoreElement.innerText = "Score: " + score;
    document.getElementById("restartButton").style.display = 'none';
    updateImage();
    gameInterval = setInterval(drawGame, 100);
}

function updateImage() {
    imageElement.src = imagesArray[Math.min(Math.floor(score / 100), imagesArray.length - 1)];
}

function generateRandomPositionForFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)),
        y: Math.floor(Math.random() * (canvas.height / boxSize))
    }
}

function generateRandomPositionForSkull() {
    if (!skull && Math.random() < 0.2) { // 20% chance and only if there's no existing skull
        skull = {
            x: Math.floor(Math.random() * (canvas.width / boxSize)),
            y: Math.floor(Math.random() * (canvas.height / boxSize))
        };
        
        // Remove the skull after 20 seconds
        skullTimeout = setTimeout(() => {
            skull = null;
        }, 20000); // 20 seconds
    }
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
    context.font = "130px 'Fuggles', sans-serif";
    context.fillStyle = '#666'
    context.textAlign = "center";
    context.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    document.getElementById("restartButton").style.display = 'block';
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
        bestScoreElement.innerText = "Best Score: " + bestScore;
    }
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
    context.strokeRect(part.x * boxSize + (cornerRadius / 2), part.y * boxSize + (cornerRadius / 2), boxSize - cornerRadius, boxSize - cornerRadius);
    context.fillRect(part.x * boxSize + (cornerRadius / 2), part.y * boxSize + (cornerRadius / 2), boxSize - cornerRadius, boxSize - cornerRadius);
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
}

document.addEventListener("keydown", function(e) {
    // For direction change
    if (e.key === 'ArrowLeft' && dx === 0) {dx = -1; dy = 0; e.preventDefault();}
    if (e.key === 'ArrowUp' && dy === 0) {dx = 0; dy = -1; e.preventDefault();}
    if (e.key === 'ArrowRight' && dx === 0) {dx = 1; dy = 0; e.preventDefault();}
    if (e.key === 'ArrowDown' && dy === 0) {dx = 0; dy = 1; e.preventDefault();}

    // For pausing game
    if (e.key === " " || e.key === "Space") {  // We check for both possible values here
        e.preventDefault();
        togglePause();
    }
});

function togglePause() {
    if (isPaused) {
        isPaused = false;
        gameInterval = setInterval(drawGame, 100);
    } else {
        isPaused = true;
        clearInterval(gameInterval);
        drawGame(); // Call drawGame explicitly to draw the paused state immediately.
    }
}

function drawGame() {
    if(!gameStarted) {
        drawStartButton();
        return; // Si le jeu n'a pas démarré, on sort de la fonction après avoir dessiné le bouton
    }
    if (isPaused) {
        const pauseWindowWidth = canvas.width * 0.5;
        const pauseWindowHeight = canvas.height * 0.3;
        const x = (canvas.width - pauseWindowWidth) / 2;
        const y = (canvas.height - pauseWindowHeight) / 2;
        context.fillStyle = '#FFF';
        context.font = "150px 'Fuggles', sans-serif";
        context.textAlign = "center";
        context.fillText("Pause", canvas.width / 2, canvas.height / 2 + 15);
    
        return;
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
    generateRandomPositionForSkull();
    if (checkCollisionWithSelf()) {
        gameOver();
        return;
    }
    // Check for food consumption
    if (head.x === food.x && head.y === food.y) {
        if (currentFood.emoji === "☠️") {
            gameOver();
            return;
        }
        food = generateRandomPositionForFood();
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
    // Draw skull if it exists
    if (skull) {
        context.fillText("☠️", skull.x * boxSize, (skull.y + 1) * boxSize);
    }
    if (skull && head.x === skull.x && head.y === skull.y) {
        gameOver();
        return;
    }
}

document.getElementById("restartButton").addEventListener("click", function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(gameInterval);
    initializeGame();
})

drawGame(); // Appel initial pour dessiner l'écran (y compris le bouton de démarrage).

