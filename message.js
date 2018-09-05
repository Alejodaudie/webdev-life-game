function Message (canvas, text) {
    var self = this;

    self.canvasElement = canvas;
    self.ctx = self.canvasElement.getContext('2d');
    self.x = 200;
    self.y = 100;
    self.text = text;
}

Message.prototype.draw = function () {
    var self = this;
    self.ctx.font = "50px VT323"
    self.ctx.fillStyle = "#222"
    self.ctx.fillText(self.text, self.x, self.y, 300);
}