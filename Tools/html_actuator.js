function HTMLActuator() {
  
  this.canvas  = document.getElementById("canvas");  
  this.cherry = document.getElementById("source");
  this.messageContainer = document.querySelector(".game-message");
}

HTMLActuator.prototype.Paint = function(b,s)
{
  this.Clear();

  this.PaintSnake(b,s);

  this.PaintBoard(b);
}

HTMLActuator.prototype.Clear = function()
{
  const context = this.canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}

HTMLActuator.prototype.PaintSnake = function(b,s)
{
  var sheet = this.canvas;

  var w = sheet.width;
  var h = sheet.height;

  var columns = b.Columns();
  var rows = b.Rows();

  var wr = w/columns;
  var hr = h/rows;

  var fiveW = Math.floor(wr*0.2);
  var fiveH = Math.floor(hr*0.2);

  var d = new Drawing();

  let color = "#A0A0A0";

  for (var i = 0; i < s.Body.length; i++)
  {
    var x = s.Body[i].X;
    var y = s.Body[i].Y;
    
    d.FillRectangle(sheet,color, y*wr + fiveW, x*hr + fiveH, wr - 2*fiveW,hr - 2*fiveH);
  }
}

HTMLActuator.prototype.PaintBoard = function(b)
{
  var sheet = this.canvas;

  var w = sheet.width;
  var h = sheet.height; 

  var columns = b.Columns();
  var rows = b.Rows();

  var wr = w/columns;
  var hr = h/rows;

  var d = new Drawing();	
  
  let colorLine = "#F0F0F0";

  for(var i = 1 ; i < rows;i++)
    d.DrawLine(sheet,colorLine,2,0,i*hr,w,i*hr);
  
  for(var i = 1 ; i < columns;i++)
    d.DrawLine(sheet,colorLine,2,i*wr,0,i*wr,h);
  
  var wi = this.cherry.naturalWidth;
  var hi = this.cherry.naturalHeight;

  for ( f in b.Fruits)
  {
    var fr = b.Fruits[f];

    d.DrawImage(sheet,this.cherry,0,0,wi,hi,fr.Y*wr, fr.X*hr, wr, hr);  
  }
}

HTMLActuator.prototype.actuate = function (metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
    // self.clearContainer(self.tileContainer);

    // grid.cells.forEach(function (column) {
    //   column.forEach(function (cell) {
    //     if (cell) {
    //       self.addTile(cell);
    //     }
    //   });
    // });

    // self.updateScore(metadata.score);
    // self.updateBestScore(metadata.bestScore);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
};

HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won" : "game-over";
  var message = won ? "You win!" : "Game over!";

  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "end", type, this.score);
  }

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;

  // this.clearContainer(this.sharingContainer);
  // this.sharingContainer.appendChild(this.scoreTweetButton());
  // twttr.widgets.load();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function () {
  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "restart");
  }

  this.clearMessage();
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};