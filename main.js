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
            <main>
                <h1>WebDeveloper life</h1>
                <div>
                    <p></p>
                </div>
                <button>Start</button>
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
                <h1>Game over</h1>
                <button>Restart</button>
            </main>
        `);

        document.body.appendChild(gameOverMain);
    }

   buildSplash();
}

window.addEventListener('load', main);