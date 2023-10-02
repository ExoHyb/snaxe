const canvas = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");
    const boxSize = 20;
    let score = 0;

    const foods = [{
            emoji: "🍆",
            score: 10
        },
        {
            emoji: "💦",
            score: 15
        },
        {
            emoji: "🍑",
            score: 20
        },
        {
            emoji: "🍒",
            score: 25
        },
        {
            emoji: "🍌",
            score: 30
        }
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
    let snake = [{
        x: 5,
        y: 5
    }];
    let food = {
        x: Math.floor(Math.random() * 30),
        y: Math.floor(Math.random() * 30)
    };
    let dx = 1;
    let dy = 0;
    const scoreElement = document.getElementById("score");

    document.addEventListener("keydown", changeDirection);

    function changeDirection(e) {
        if (e.keyCode == 37 && dx === 0) {
            dx = -1;
            dy = 0;
        } // Left
        if (e.keyCode == 38 && dy === 0) {
            dx = 0;
            dy = -1;
        } // Up
        if (e.keyCode == 39 && dx === 0) {
            dx = 1;
            dy = 0;
        } // Right
        if (e.keyCode == 40 && dy === 0) {
            dx = 0;
            dy = 1;
        } // Down
    }

    function updateImage() {
        imageElement.src = imagesArray[Math.floor(score / 100) % imagesArray.length];
    }

    function drawGame() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Check if the snake hits the border
        if (snake[0].x < 0) {
            dx = 1;
            dy = 0;
        } // Left border
        if (snake[0].x > (canvas.width / boxSize) - 1) {
            dx = -1;
            dy = 0;
        } // Right border
        if (snake[0].y < 0) {
            dx = 0;
            dy = 1;
        } // Top border
        if (snake[0].y > (canvas.height / boxSize) - 1) {
            dx = 0;
            dy = -1;
        } // Bottom border

        // Move the snake
        const head = {
            x: snake[0].x + dx,
            y: snake[0].y + dy
        };
        snake.unshift(head);

        if (snake[0].x === food.x && snake[0].y === food.y) {
            food = {
                x: Math.floor(Math.random() * 30),
                y: Math.floor(Math.random() * 30)
            };
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

    updateImage(); // to set the initial image based on the score
    setInterval(drawGame, 100);