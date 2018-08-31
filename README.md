# WebDeveloper's Life

## Description
WebDeveloper's Life is a very simple game where the player can inpersonate a webdev and try to survive his typical day.
The player will try to avoid all the enemies(the things that affect the webdev life ad errors etc, and that will make him loose lives), and to catch the things that will give him points.
The player will be able to choose what characters he wants to play with.
In the first level the player will have onli a type of enemies and a type of points, but in the next levels every characters is going to have different enemies and different points and good enemies that will add him lives.
There's no winning condition but the losing condition is: no more lives.


## MVP (DOM - CANVAS)
*CANVAS*
The MVP version will be the first level of the game: a player and one kind of enemy.

## Backlog
- Add points + score
- Add username
- Add going back to splash if new player
- Add pause
- Add Win Screen
- Storage HighScore
- Design
- Images
- Music
- Choose Characters
- Levels (with differents enemies and points and good enemies)
- Levels (with differents enemies, points and good enemies for each character)
- Mobile version


## Data structure
### game.js
```javascript
Game() {
  self.gameIsOver
  self.score
}

Game.prototype.start(
  buildDom()
  self.lives
  self.score
  self.input
  self.canvas
  self.width
  self.height
  webDev = new Player()
  addEventListener
  self.startLoop()
)

Game.prototype.startLoop(
  ctx
  loop() {
    //create enemies now and then
    enemies = new Enemy()
    
    //update positions
    self.player.update()
    self.enemies.update()
    
    //check if player collided with enemies and if true remove
    self.checkIfEnemiesCollidedPlayer()
    
    //loose point
    
    //forget enemies outside the screen
    self.enemies.filter(isInScreen())
    
    //erase canvas
    ctx.clearRect()
    
    //draw
    self.player.draw()
    self.enemies.draw()
    Frame(loop)
   }
   Frame(loop)
)


```
### player.js
```javascript
Player(canvas, lives) {
  self.x
  self.y
  self.direction 0
  self.size
  self.speed
  self.canvas
  self.ctx
}

Player.prototype.setDirection()
Player.prototype.collidesWithEnemies() //than it will be also for the points
Player.prototype.collided()
Player.prototype.update()
Player.prototype.draw()


```
### enemy.js
```javascript
Enemy(canvas, x, speed) {
  self.x
  self.y
  self.direction 0
  self.size
  self.speed
  self.canvas
  self.ctx
}

Enemy.prototype.update()
Enemy.prototype.draw()
Enemy.prototype.isInScreen()

```


## States y States Transitions
Definition of the different states and their transition (transition functions)
```javascript
- splashScreen()
  - destroyGameOver(if)
  - buildSplash()
  - addEventListener(startGame)
  
  
- starGame()
  - destroySplash()
  - destroyGameOver()
  - create new Game()
  - game.start()
  
  
- gameOver()
  - destroyGame()
  - buildGameOver()
  - addEventListener( if splashScreen, else starGame) 
```

## Task
- create files javascript
- Main - builDom
- Main - create main()
- Main - buildSplash
- Main - addEventListener
- Main - destroySplash
- Main - startGame
- Game - buildDom
- Main - GameOver
- Main - destroy Game
- Main - GameOver RESTART
- Main - removeGameOver
- Game - addEventListener
- Game - create player
- Player - create
- Player - directions
- Game - loop
- Game - create enemies
- Game - player and enemies position 
- Game - collision + remove
- Game - lives 
- Game - clear
- Game - gameOver

## Links


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/francescaropolo/webdev-life)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
