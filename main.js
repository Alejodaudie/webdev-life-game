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
                        <button class="button">Play</button>
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
                <div class="list-high-scores">
                    <h3>High score</h3>
                    <ul class="list-scores">
                        <li class="list-item0">
                            <p class="name0 name"></p>
                            <p class="score0"></p>
                        </li>
                        <li class="list-item1">
                            <p class="name1 name"></p>
                            <p class="score1"></p>
                        </li>
                        <li class="list-item2">
                            <p class="name2 name"></p>
                            <p class="score2"></p>
                        </li>
                    </ul>
                </div>
                <div class="buttons">
                    <div class="restart-buttons">
                        <button class="button">Play Again</button>
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

        var username = gameOverMain.querySelector('.username');
        username.innerText = usernameValue;

        var newScore = {
            username : usernameValue,
            score : score
        };

        saveScore(newScore);

        var listHighScores = JSON.parse(localStorage.getItem('scores'));

        if (listHighScores) {
            displayScores(listHighScores)
        }

    }

    function destroyGameOver() {
        if(gameOverMain) {
            gameOverMain.remove();
        }
    }

   buildSplash();

   function saveScore (score) {
        var scoreList = [];
        if(!localStorage.getItem('scores')) {
           scoreList.push(score);
           scoreList.sort(function (a , b) {
            return b.score - a.score;
           });
           localStorage.setItem('scores', JSON.stringify(scoreList)); 
        } else {
           var scoreList = JSON.parse(localStorage.getItem('scores'));
           scoreList.push(score);
           scoreList.sort(function (a , b) {
            return b.score - a.score;
           });
           localStorage.setItem('scores', JSON.stringify(scoreList));
        }

        JSON.parse(localStorage.getItem('scores'));

   }

   function displayScores (scores) {
       var numScoresToDisplay = 3;
       if (scores.length < 3) {
           numScoresToDisplay = scores.length;
       }

       for (var i = 0; i < numScoresToDisplay; i++) {
        var name =  gameOverMain.querySelector('.name' + i);
        name.innerText = scores[i].username;

        var score = gameOverMain.querySelector('.score' + i);
        score.innerText = scores[i].score;
       }
   }
}


// @todo scorescreen from splash, exit button from game
window.addEventListener('load', main);