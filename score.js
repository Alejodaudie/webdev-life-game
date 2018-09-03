function Score (username) {
    var self = this;

    self.score = 0;
    self.username = username;
    self.list = {};


}

Score.prototype.saveScore = function() {
    if(!localStorage.getItem('highest-score')) {
        localStorage.setItem('highest-score', self.score);
        localStorage.setItem('username', self.username);

    } else if (localStorage.getItem('highest-score')) {
        if(self.score > localStorage.getItem('highest-score')) {
            localStorage.setItem('highest-score', self.score);
        }
    }

    self.list.push({ name : self.username, score : self.score})
    localStorage.getItem('self.list');
}