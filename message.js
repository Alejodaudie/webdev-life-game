function Message (canvas, text) {
    var self = this;

    self.canvasElement = canvas;
    self.x = 200;
    self.y = 100;
    self.text = text;
}

Message.prototype.draw = function () {
    var self = this;

    self.fillStyle = "#222"
    self.canvasElement.fillText(self.text, self.x, self.y, 300);
}