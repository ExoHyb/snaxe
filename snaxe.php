<?php include 'header.php'; ?>

<div class="container" id="game">
    <div id="gameMenu">
        <ul>
            <li>
                <a href="index.php">Choisir un nouveau modèle</a>
            </li>
            <li id="score">Score: 0</li>
            <li id="bestScore"></li>
            <div id="popup" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border: 1px solid black; z-index: 10;">
                <img id="randomGif" src="" alt="Random Gif" width="300">
                <button onclick="closePopup()">Close</button>
            </div>
        </ul>
        <button id="restartButton" style="display:none;">Restart</button>
    </div>
    <div id="gameContainer">
        <canvas id="gameCanvas" width="500" height="500"></canvas>
        <img id="sideImage" src="images/girl-1/step-1.jpeg" alt="Une image tellement cool qu'elle a besoin de lunettes de soleil">
    </div>
    <script src="snake.js"></script>

    <div id="discover">
        <h2>Découvrir ce modèle !</h2>
        <div class="affiliate">
            <a href="#"><img src="images/svg/onlyfans.svg" alt="logo Onlyfans"></a>
            <a href="#"><img src="images/svg/mym.svg" alt="logo Mym for Fans"></a>
        </div>
        <div class="affiliate">
            <a href="#"><img src="images/logos/twitter.png" alt="logo Twitter"></a>
            <a href="#"><img src="images/logos/instagram.png" alt="logo Instagram"></a>
            <a href="#"><img src="images/logos/telegram.png" alt="logo Telegram"></a>
        </div>
    </div>

</div>

<?php include 'footer.php'; ?>