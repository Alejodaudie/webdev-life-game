'use strict';

function buildDom(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
}

function main() {
    
    var splashMain;
    var gameOverMain;
    var usernameInputElement;
    var usernameValue;

    var game;

    function buildSplash() {
        destroyGameOver();
        splashMain = buildDom(`
            <main class="container">
                <div class="intro">
                    <h1>Web <br>
                    Developer <br>
                    Life</h1>
                    <div>
                        <label>Name :</label>
                        <input type="text" placeholder='Developer name'> 
                    </div>
                    <div class="rules">
                        <p></p>
                    </div>
                    <div>
                        <button class="button">Start</button>
                    </div>
                </div>
            </main>
        `);

        document.body.appendChild(splashMain);

        usernameInputElement = document.querySelector('input');

        var button = splashMain.querySelector('button');
        button.addEventListener('click', startGame);

    }

    function destroySplash() {
        splashMain.remove();
    }

    // -- game

    function startGame() {
        destroySplash();
        destroyGameOver();

        usernameValue = usernameInputElement.value;

        game = new Game(usernameValue);
        game.start(); 
        game.onOver(function() {
            gameOverTransition(game.score);
        });
    }

    function destroyGame() {
        game.destroy();
    }

    // -- game-over
    
    function gameOverTransition(score) {
        destroyGame();
        buildGameOver(score);
    }

    function buildGameOver(score) {
        gameOverMain = buildDom(`
            <main>
            <div class="game-over">
                <h1>Game over</h1>
                <p>Hey <span class='username'></span> this is your score : <span class='score'></span></p>
                <div class="buttons">
                    <div class="restart-buttons">
                        <button class="button">Restart</button>
                    </div>
                    <p> or </p>
                    <div class="change-buttons">
                        <button class="change">Change WebDev</button>
                    </div>
                </div>
            </div>
                
            </main>
        `);

        document.body.appendChild(gameOverMain);

        var button = gameOverMain.querySelector('button');
        button.addEventListener('click', startGame);

        var buttonChange = gameOverMain.querySelector('.change');
        buttonChange.addEventListener('click', buildSplash);

        var span = gameOverMain.querySelector('.score');
        span.innerText = score;

        var name = gameOverMain.querySelector('.username');
        name.innerText = usernameValue;
    }

    function destroyGameOver() {
        if(gameOverMain) {
            gameOverMain.remove();
        }
    }

   buildSplash();
}

window.addEventListener('load', main);