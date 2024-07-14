
const xs = [-1, 0, 1, 0];
const ys = [0, 1, 0, -1];

function Cell(x, y,d)
{
    this.X = x;
    this.Y = y;
    this.Heading = d;
    this.Move = [];

    
}

Cell.prototype.X = function()
{
    return this.X;
}

Cell.prototype.Y = function()
{
    return this.Y;
}

Cell.prototype.Move = function()
{ 
    return this.Move; 
}

Cell.prototype.Heading = function()
{ 
    return this.Heading 
}

Cell.prototype.Moving = function (board, body)
{
    if (!this.Moved(this.Heading, board.Rows(), board.Columns(),body))
        return false;

    if(this.Move.length > 0)
    {
        if (this.Move[0].Item1().X == this.X && this.Move[0].Item1().Y == this.Y)
        {
            this.Heading = this.Move[0].Item2();
            this.Move.splice(0,1);
        }
    }

    return true;

}

Cell.prototype.Moved = function(d, rows, columns, body)
{
    var newX = this.X + xs[DirectionToInt[d]];
    var newY = this.Y + ys[DirectionToInt[d]];

    if (this.Any(body,newX,newY))
        return false;

    var t = new Toolsc();

    if (!t.In(newX, newY, rows, columns))
        return false;

    this.X = newX;
    this.Y = newY;

    return true;

}

Cell.prototype.Any = function(body,newX,newY)
{
    for(var c in body)
    {
        var cell = body[c];
        
        if(cell.X == newX && cell.Y == newY)
            return true;
    }

    return false;
}

Cell.prototype.GetDirection = function(heading, rows, columns)
{
    var posible = [];

    var di = new DirectionTools();

    posible.push(di.Front(heading));

    var si = di.Sides(heading); 

    for(var s in si)
        posible.push(si[s]);    

    var t = new Toolsc(); 
    
    for (d in posible)
    {
        var dir = posible[d];

        var newX = this.X + xs[DirectionToInt[dir]];
        var newY = this.Y + ys[DirectionToInt[dir]];        

        if (t.In(newX, newY, rows, columns))
        {
            var c = new Cell(newX,newY,heading);

            //c.Move.Add(new Tuple<Position, Direction>(new Position(X, Y), heading));

            for (m in this.Move)
            {
                var mo = this.Move[m];

                c.Move.push(new Pair(new Position(mo.Item1().X, mo.Item1().Y), mo.Item2()));
            }

            //c.Move.Add(new Tuple<Position, Direction>(new Position(X, Y), heading));

            return c;
        }
    }

    return null;

}