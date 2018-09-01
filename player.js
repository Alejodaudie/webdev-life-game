'use strict';

function Player (canvas, lives) {
    var self = this;
    self.canvasElement = canvas;
    self.x = self.canvasElement.width / 2;
    self.y = self.canvasElement.height - 30;
    self.direction = 0;
    self.size = 50;
    self.speed = 5;
    self.lives = lives;
    self.ctx = self.canvasElement.getContext('2d');
}

Player.prototype.setDirection = function(direction) {
    var self = this;

    self.direction = direction;
};


Player.prototype.update = function() {
    var self = this;

    self.x = self.x + self.direction * self.speed;

    if (self.x <0) {
        self.direction = 1;
    }

    if (self.x > self.canvasElement.width) {
        self.direction = -1;
    }
};

Player.prototype.draw = function() {
    var self = this;

    self.ctx.fillStyle = '#FEF246';

    // center the center
    self.xPosition = self.x - (self.size/2);
    self.yPosition = self.y - (self.size/2);
    self.ctx.fillRect(self.xPosition, self.yPosition, self.size, self.size);
};