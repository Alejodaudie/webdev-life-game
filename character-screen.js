'use strict';

function Character(username, callbackPlay, callbackBack) {
    var self = this;

    self.username = username;
    self.letsPlay = false;
    self.cbPlay = callbackPlay;
    self.cbBack = callbackBack;
    self.characterSelected;
}

Character.prototype.display = function () {
    var self = this;

    self.characterMain = buildDom(`
        <main class="characters-screen container">
            <h1>Choose a WebDev</h1>
            <div class="characters-icons">
                <div>
                    <img src="./images/player-barbara.png" alt="character1" class="player1">
                </div>
                <div>
                    <img src="./images/player-diana.png" alt="character2" class="player2">
                </div>
                <div>
                    <img src="./images/player-caroline.png" alt="character3" class="player3">
                </div>
                <div>
                    <img src="./images/player-axel.png" alt="character4" class="player4">
                </div>
                <div>
                    <img src="./images/player-gabriela.png" alt="character5" class="player5">
                </div>
                <div>
                    <img src="./images/player-francesca.png" alt="character6" class="player6">
                </div>
                <div>
                    <img src="./images/player-yenderly.png" alt="character7" class="player7">
                </div>
                <div>
                    <img src="./images/player-jonathan.png" alt="character8" class="player8">
                </div>
                <div>
                    <img src="./images/player-mariaj.png" alt="character9" class="player9">
                </div>
            </div>
            <div class="go-game">
                <div>
                    <button class="button-back">Back</button>
                </div>
                <div>
                    <button class="button-play">Play</button>
                </div>
            </div>
        </main>
    `);

    document.body.appendChild(self.characterMain);

    var buttonBack = self.characterMain.querySelector('.button-back');
    buttonBack.addEventListener('click', self.cbBack);

    var buttonPlay = self.characterMain.querySelector('.button-play');
    buttonPlay.addEventListener('click', self.cbPlay);

    self.barbara = self.characterMain.querySelector('.player1');
    self.barbara.addEventListener('click', function(event) {
        if (event) {
            self.barbara.classList.toggle('selected');
            characterSelected = 'barbara';
        }
    });

    self.diana = self.characterMain.querySelector('.player2');
    self.diana.addEventListener('click', function(event) {
        if (event) {
            self.diana.classList.toggle('selected');
            characterSelected = 'diana';
        }
    });

    self.caroline = self.characterMain.querySelector('.player3');
    self.caroline.addEventListener('click', function(event) {
        if (event) {
            self.caroline.classList.toggle('selected');
            
        }
    });

    self.axel = self.characterMain.querySelector('.player4');
    self.axel.addEventListener('click', function(event) {
        if (event) {
            self.axel.classList.toggle('selected');
        }
    });

    self.gabriela = self.characterMain.querySelector('.player5');
    self.gabriela.addEventListener('click', function(event) {
        if (event) {
            self.gabriela.classList.toggle('selected');
        }
    });

    self.francesca = self.characterMain.querySelector('.player6');
    self.francesca.addEventListener('click', function(event) {
        if (event) {
            self.francesca.classList.toggle('selected');
        }
    });

    self.yenderly = self.characterMain.querySelector('.player7');
    self.yenderly.addEventListener('click', function(event) {
        if (event) {
            self.yenderly.classList.toggle('selected');
        }
    });

    self.jonathan = self.characterMain.querySelector('.player8');
    self.jonathan.addEventListener('click', function(event) {
        if (event) {
            self.jonathan.classList.toggle('selected');
        }
    });

    self.mariaj = self.characterMain.querySelector('.player9');
    self.mariaj.addEventListener('click', function(event) {
        if (event) {
            self.mariaj.classList.toggle('selected');
        }
    });

    
    
}

// Character.prototype.selected = function(name) {
//     var self = this;

//     self.selectedCharacter = name;

//     self.name.classList.toggle('selected');

// }

Character.prototype.toPlay = function (callback) {
    var self = this;

    self.onCharacterCallback = callback;
};

Character.prototype.toBack = function (callback) {
    var self = this;

    self.onCharacterCallback = callback;
};

Character.prototype.gameOver = function () {
    var self = this;

    self.letsPlay = true;
    self.onCharacterCallback();
};

Character.prototype.destroy = function () {
    var self = this;

    self.characterMain.remove();
};