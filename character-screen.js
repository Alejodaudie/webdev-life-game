'use strict';

function Character(username, callback) {
    var self = this;

    self.username = username;
    self.letsPlay = false;
    self.cb = callback;
}

Character.prototype.display = function () {
    var self = this;

    self.characterMain = buildDom(`
        <main class="character">
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
                <button class="button">Play</button>
            </div>
        </main>
    `);

    document.body.appendChild(self.characterMain);

    var button = self.characterMain.querySelector('.button');
    button.addEventListener('click', self.cb);
}

Character.prototype.onOver = function (callback) {
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