'use strict';

function Game() {
    var self = this;
}

Game.prototype.start = function () {
    var self = this;

    self.gameMain = buildDom(`
        <main class="game container">
            <header>
                <div class="lives">
                    <span class="label">Lives :</span>
                    <span class="value"></span>
                </div>
                <div class="score">
                    <span class="label">Score :</span>
                    <span class="value"></span>
                </div>
            </header>
            <div class="canvas">
                <canvas></canvas>
            </div>
        </main>
    `);

    document.body.appendChild(self.gameMain);
};