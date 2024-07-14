
function Board(rows, columns)
{
    this.rows = rows;
    this.columns = columns;

    this.boardC = [];

    this.Fruits = [];
}

Board.prototype.Columns = function() 
{ 
    return this.columns; 
}

Board.prototype.Rows = function()
{ 
    return this.rows;
}

Board.prototype.index = function( x, y)
{
    
    if(!Toolsc.In(x,y,this.rows,this.columns))
        throw  new Exception("Fuera");

    return this.boardC[x, y];
    
}

Board.prototype.setindex = function( x, y,value)
{
    
    if(!Toolsc.In(x,y,this.rows,this.columns))
        throw  new Exception("Fuera");

    this.boardC[x, y] = value;
    
}


Board.prototype.GenerateFruit = function(s)
{
    var xFruit = 0;
    var yFruit = 0;

    var t = new Toolsc();

    do
    {
        xFruit = t.getRandomInt(this.rows);
        yFruit = t.getRandomInt(this.columns);

    } while (this.Verify(xFruit,yFruit,s));

    this.Fruits.push(new Position(xFruit, yFruit));
}

Board.prototype.Fruits = function() 
{ 
    return this.Fruits;
}

Board.prototype.Verify = function( xFruit,  yFruit,  snake)
{
    for ( c in snake.Body)
    {
        var i = snake.Body[c];

        if (i.X == xFruit && i.Y == yFruit)
            return true;
    }

    for ( f in this.Fruits)
    {
        var fr = this.Fruits[f];

        if (fr.X == xFruit && fr.Y == yFruit)
            return true;
    }

    return false;
}
