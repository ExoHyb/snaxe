<?php include 'header.php'; ?>

<div id="gameContainer">
    <canvas id="gameCanvas" width="600" height="600"></canvas>
    <img id="sideImage" src="images/girl-1/step-1.jpeg" alt="Une image tellement cool qu'elle a besoin de lunettes de soleil">
</div>

<div id="gameMenu">
    <p id="score">Score: 0</p>
    <button id="restartButton" style="display:none;">Restart</button>
</div>

<div id="game">
    <script src="snake.js"></script>
</div>

</body>

</html>