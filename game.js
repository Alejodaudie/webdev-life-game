'use strict';

function Game(username, character) {
    var self = this;

    self.gameIsOver = false;
    self.username = username;
    self.score = 0;
    self.isPause = false;
    self.highScore = 0;
    self.character = character;
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
                <div class='username'>
                    <p></p>
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

    self.usernameElement = self.gameMain.querySelector('.username p');
    self.usernameElement.innerText = self.username;

    self.livesElement = self.gameMain.querySelector('.lives .value');
    self.scoreElement = self.gameMain.querySelector('.score .value');
    

    // self.width = self.canvasParentElement.offsetWidth;
    // self.height = self.canvasParentElement.offsetHeight;

    self.width = 700;
    self.height = 400;


    self.canvasElement.setAttribute('width', self.width);
    self.canvasElement.setAttribute('height', self.height);

    self.player = new Player(self.canvasElement, 5, self.character);

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
    self.points = [];
    self.lives = [];
};

Game.prototype.starLoop = function () {
    var self = this;

    self.ctx = self.canvasElement.getContext('2d');
    
    document.body.addEventListener('keyup', function(event) {
        if(event.key === ' ') {
            self.isPause = !self.isPause;
            if(!self.isPause) {
                loop();
            }
        }
    });

    function loop () {

        // create more enemies now and then
        if (Math.random() > 0.95) {
            var x = self.canvasElement.width * Math.random();
            self.enemies.push(new Enemy(self.canvasElement, x, 5));
        }
        
        // create more points now and then
        if (Math.random() > 0.99) {
            var x = self.canvasElement.width * Math.random();
            self.points.push(new Point(self.canvasElement, x, 6));
        }
        
        // create more lives now and then
        if (Math.random() > 0.999) {
            var x = self.canvasElement.width * Math.random();
            self.lives.push(new Live(self.canvasElement, x, 8));
        }

        //update positions
        self.player.update();

        self.enemies.forEach(function(item) {
            item.update();
        });

        self.points.forEach(function(item) {
            item.update();
        });

        self.lives.forEach(function(item) {
            item.update();
        });

        //check positions
        self.enemies = self.enemies.filter(function(item) {
        return item.isInScreen();
        });

        self.points = self.points.filter(function(item) {
            return item.isInScreen();
        });

        self.lives = self.lives.filter(function(item) {
            return item.isInScreen();
          });


        // check if player collide with enemy
        self.checkIfEnemiesCollidedPlayer();
        self.checkIfPointsCollidedPlayer();
        self.checkIfLivesCollidedPlayer();

        // - loose life or win points
        self.livesElement.innerText = self.player.lives;
        self.scoreElement.innerText = self.score;

        //erase canvas
        self.ctx.clearRect(0, 0, self.width, self.height);

        

        //draw
        self.player.draw();

        self.enemies.forEach(function(item) {
            item.draw();
        });

        self.points.forEach(function(item) {
            item.draw();
        });

        self.lives.forEach(function(item) {
            item.draw();
        });

        // if game is not over
        if(!self.gameIsOver && !self.isPause) {
            window.requestAnimationFrame(loop);
          }
    }


    window.requestAnimationFrame(loop);
};

// Game.prototype.getHighScore = function (score) {
//     var self = this;
    
//     self.highScore = localStorage.getItem(score)
// };

// Game.prototype.compareHighScore = function () {
//     if (self.player.score > self.highScore) {
//         localStorage.setItem('self.highScore', 'self.player.score');
//     }
// }


Game.prototype.checkIfEnemiesCollidedPlayer = function() {
    var self = this;

    self.enemies.forEach(function (item, index) {
        if (self.player.collidesWithEnemy(item)) {
            self.player.collided();
            self.enemies.splice(index,1);

            if (!self.player.lives) {
                self.gameOver();
            }
        }
    });
};

Game.prototype.checkIfPointsCollidedPlayer = function () {
    var self = this;
  
    self.points.forEach(function (item, index) {
      if (self.player.collidesWithEnemy(item)) {
        self.points.splice(index, 1);
        self.score++;
      };
    });
};

Game.prototype.checkIfLivesCollidedPlayer = function () {
    var self = this;
  
    self.lives.forEach(function (item, index) {
      if (self.player.collidesWithLives(item)) {
        self.player.collidedLive();
        self.lives.splice(index, 1);
      };
    });
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