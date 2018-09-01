'use strict';

function buildDom(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
}

function main() {
    
    var splashMain;
    var gameOverMain;
    var game;

    function buildSplash() {
        splashMain = buildDom(`
            <main class="container">
                <div class="intro">
                    <h1>Web <br>
                    Developer <br>
                    Life</h1>
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

        game = new Game();
        game.start(); 
        game.onOver(function() {
            gameOverTransition();
        });
    }

    function destroyGame() {
        game.destroy();
    }

    // -- game-over
    
    function gameOverTransition() {
        destroyGame();
        buildGameOver();
    }

    function buildGameOver() {
        gameOverMain = buildDom(`
            <main>
            <div class="intro container">
                <h1>Game over</h1>
                <div>
                    <p></p>
                </div>
                <div>
                    <button class="button">Restart</button>
                </div>
            </div>
                
            </main>
        `);

        document.body.appendChild(gameOverMain);

        var button = gameOverMain.querySelector('button');
        button.addEventListener('click', startGame);
    }

    function destroyGameOver() {
        if(gameOverMain) {
            gameOverMain.remove();
        }
    }

   buildSplash();
}

window.addEventListener('load', main);