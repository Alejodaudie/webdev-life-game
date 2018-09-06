'use strict';
// var characterSelected;

function buildDom(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
}

function main() {
    
    var splashMain;
    var gameOverMain;
    var highScoreMain;
    var usernameInputElement;
    var usernameValue;
    var characterScreen;
    

    var game;
    

    function buildSplash() {
        destroyGameOver();
        destroyHighScoreScreen();
        destroyCharacterScreen();

        splashMain = buildDom(`
            <main class="container">
                <div class="intro">
                    <h1>Web <br>
                    Developer <br>
                    Life</h1>
                    <div class="input">
                        <label>Name :</label>
                        <input type="text" placeholder='Developer name'> 
                    </div>
                    <div class="buttons">
                        <div>
                            <button class="button">Play</button>
                        </div>
                        <div>
                            <button class="high-score-button">High Scores</button>
                        </div>
                        <div>
                            <button class="rules">Rules</button>
                        </div>
                    </div>
                </div>
            </main>
        `);

        document.body.appendChild(splashMain);

        usernameInputElement = document.querySelector('input');

        var button = splashMain.querySelector('.button');
        button.addEventListener('click', choseCharacter);

        var buttonHighscore = splashMain.querySelector('.high-score-button');
        buttonHighscore.addEventListener('click', highScoreScreen);

    }

    function destroySplash() {
        splashMain.remove();
    }

    function choseCharacter() {
        destroySplash();

        usernameValue = usernameInputElement.value;

        characterScreen = new Character(usernameValue, characterTransitionToPlay, characterTransitionToBack);
        characterScreen.display();

        characterScreen.toPlay(function() {
            characterTransitionToPlay();
        });

        characterScreen.toBack(function() {
            characterTransitionToBack();
        });
    }

    function destroyCharacterScreen() {
        if (characterScreen) {
            characterScreen.destroy();
        }
    }

    function characterTransitionToPlay() {
        destroyCharacterScreen();
        startGame();
    }

    function characterTransitionToBack() {
        destroyCharacterScreen();
        buildSplash();
    }

    // -- game

    function startGame() {
        destroySplash();
        destroyGameOver();
        destroyHighScoreScreen();

        
        game = new Game(usernameValue, characterScreen);
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
            <main class="container">
                <div class="game-over">
                    <h1>Game over</h1>
                    <p class="message">Hey <span class='username'></span> this is your score : <span class='score'></span></p>
                    <div class="list-high-scores">
                        <h2>High score</h2>
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

        

        var newScore;

        if (!usernameValue || '') {
            newScore = {
                username : 'Diva',
                score : score
            };
        } else {
            newScore = {
                username : usernameValue,
                score : score
            };
        }

        saveScore(newScore);

        var listHighScores = JSON.parse(localStorage.getItem('scores'));

        if (listHighScores) {
            displayScores(3, listHighScores, gameOverMain)
        }

        var audioGameOver = new Audio('./music/game-over.mp3')
        audioGameOver.play();

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

   function displayScores (n, scores, whatMain) {
       var numScoresToDisplay = n;
       if (scores.length < n) {
           numScoresToDisplay = scores.length;
       }

       for (var i = 0; i < numScoresToDisplay; i++) {
        var name =  whatMain.querySelector('.name' + i);
        name.innerText = scores[i].username;

        var score = whatMain.querySelector('.score' + i);
        score.innerText = scores[i].score;
       }
   }

    // ---- Top10 Screen

    function highScoreScreen() {
        destroySplash();

        highScoreMain = buildDom(`
            <main class="container">
                <div class="high-score-screen">
                    <div class="button-esc">
                        <button class="esc">x</button>
                    </div>
                    <h1>Top 10</h1>
                    <div class="list-high-scores">
                        <ul class="list-scores">
                            <li>
                                <p class="name0 name"></p>
                                <p class="score0"></p>
                            </li>
                            <li>
                                <p class="name1 name"></p>
                                <p class="score1"></p>
                            </li>
                            <li>
                                <p class="name2 name"></p>
                                <p class="score2"></p>
                            </li>
                            <li>
                                <p class="name3 name"></p>
                                <p class="score3"></p>
                            </li>
                            <li>
                                <p class="name4 name"></p>
                                <p class="score4"></p>
                            </li>
                            <li>
                                <p class="name5 name"></p>
                                <p class="score5"></p>
                            </li>
                            <li>
                                <p class="name6 name"></p>
                                <p class="score6"></p>
                            </li>
                            <li>
                                <p class="name7 name"></p>
                                <p class="score7"></p>
                            </li>
                            <li>
                                <p class="name8 name"></p>
                                <p class="score8"></p>
                            </li>
                            <li>
                                <p class="name9 name"></p>
                                <p class="score9"></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        `);

        document.body.appendChild(highScoreMain);

        var esc = highScoreMain.querySelector('.esc');
        esc.addEventListener('click', buildSplash);

    

        var listHighScores = JSON.parse(localStorage.getItem('scores'));

        if (listHighScores) {
            displayScores(10, listHighScores, highScoreMain)
        }
    }

    function destroyHighScoreScreen() {
        if(highScoreMain) {
            highScoreMain.remove();
        }
    }

}




// @todo scorescreen from splash, exit button from game
window.addEventListener('load', main);
// window.screen.lockOrientation("landscape");