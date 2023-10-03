<?php include 'header.php'; ?>

<div class="container" id="game">
    <div id="gameMenu">
        <ul>
            <li>
                <a href="index.php">Retour aux choix d'un modèle</a>
            </li>
            <li id="score">Score: 0</li>
        </ul>
        <button id="restartButton" style="display:none;">Restart</button>
    </div>
    <div id="gameContainer">
        <canvas id="gameCanvas" width="500" height="500"></canvas>
        <img id="sideImage" src="images/girl-1/step-1.jpeg" alt="Une image tellement cool qu'elle a besoin de lunettes de soleil">
    </div>
    <script src="snake.js"></script>
</div>

<?php include 'footer.php'; ?>