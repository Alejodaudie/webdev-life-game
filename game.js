'use strict';

function Game() {
    var self = this;

    self.gameIsOver = false;
}

Game.prototype.start = function () {
    var self = this;

    self.gameMain = buildDom(`
        <main class="game">
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

    self.canvasParentElement = self.gameMain.querySelector('.canvas');
    self.canvasElement = self.canvasParentElement.querySelector('canvas');

    // self.width = self.canvasParentElement.offsetWidth;
    // self.height = self.canvasParentElement.offsetHeight;

    self.width = 700;
    self.height = 400;


    self.canvasElement.setAttribute('width', self.width);
    self.canvasElement.setAttribute('height', self.height);

    self.player = new Player(self.canvasElement, 5);

    self.handleKeyDown = function(event) {
        if (event.key === 'ArrowLeft') {
          self.player.setDirection(-1);
        } else if (event.key === 'ArrowRight') {
          self.player.setDirection(1);
        }
    }

    document.body.addEventListener('keydown', self.handleKeyDown)

    self.starLoop();

    self.enemies = [];
    // self.timeLeft = setTimeout( function() {
    //     self.gameOver();
    // }, 3000)
};

Game.prototype.starLoop = function () {
    var self = this;

    

    function loop () {

        self.ctx = self.canvasElement.getContext('2d');

        if (Math.random() > 0.95) {
            var x = self.canvasElement.width * Math.random();
            self.enemies.push(new Enemy(self.canvasElement, x, 5));
          }
          
        //update positions
        self.player.update();

        self.enemies.forEach(function(item) {
            item.update();
        });


        self.enemies = self.enemies.filter(function(item) {
        return item.isInScreen();
        });


        //erase canvas
        self.ctx.clearRect(0, 0, self.width, self.height);

        

        //draw
        self.player.draw();

        self.enemies.forEach(function(item) {
            item.draw();
        });

        // if game is not over
        if(!self.gameIsOver) {
            window.requestAnimationFrame(loop);
          }
    }

    window.requestAnimationFrame(loop);
};

Game.prototype.onOver = function (callback) {
    var self = this;

    self.onGameOverCallback = callback;
};

Game.prototype.gameOver = function () {
    var self = this;

    self.gameIsOver = true;
    self.onGameOverCallback();
};

Game.prototype.destroy = function () {
    var self = this;

    self.gameMain.remove();
};