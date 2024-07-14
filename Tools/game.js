function GameManager(rows,columns, InputManager, Actuator) {
    this.rows           = rows; // Size of the grid (rows)
    this.columns           = columns; // Size of the grid (columns)
    this.inputManager   = new InputManager;    
    this.actuator       = new Actuator;

    this.fruits = 10; 
   
    this.inputManager.on("move", this.move.bind(this));
    this.inputManager.on("restart", this.restart.bind(this));
    this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));
    this.over = false;
    this.won = false;
       
  
    // this.setup();
    this.Reset();
    this.actuator.Paint(this.b,this.s);
    this.Start(this);
  }

GameManager.prototype.Reset = function()
{
    
    this.b = new Board(this.rows,this.columns);;
    this.s = new Snake(this.rows,this.columns);
    this.times = this.fruits;
            
}

GameManager.prototype.Start = function(t)
{
    if (!t.s.Move(t.b))
    {
        t.over = true;

        t.actuate();

        t.Reset();
        t.actuator.Paint(t.b,t.s);
        return;
    }    

    t.times--;

    if (t.times < 0)
    {
        t.times = t.fruits;
        t.b.GenerateFruit(t.s);
    }

    t.actuator.Paint(t.b,t.s);

    setTimeout(t.Start,500,t);
}

// Move tiles on the grid in the specified direction
GameManager.prototype.move = function (direction) {
    // 0: up, 1: right, 2: down, 3: left
    var self = this;

    this.s.MoveD(DirectionTosrt[direction],this.b);

}

// Restart the game
GameManager.prototype.restart = function () {
    
    this.actuator.continueGame();
    this.Reset();
    this.Start(this);
  };
  
  // Keep playing after winning (allows going over 2048)
  GameManager.prototype.keepPlaying = function () {
    this.actuator.continueGame();
  };

GameManager.prototype.actuate = function () 
{
    this.actuator.actuate({
        score:      this.s.Body.length,
        over:       this.over,
        won:        this.won,       
        terminated: this.over
      });
  }