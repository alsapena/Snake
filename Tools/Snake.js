

function Snake( rows, columns)
{
    var t = new Toolsc();

    this.Heading = DirectionTosrt[t.getRandomInt(4)];

    var percentR = Math.floor(rows*0.2);
    var percentC = Math.floor(columns*0.2);
    this.Body = [];

    var c = new Cell(t.getRandomIntInterval(percentR, rows - percentR), t.getRandomIntInterval(percentC, columns - percentC), this.Heading);

    this.Body.push(c);

}

Snake.prototype.Heading = function()
{ 
    return this.Heading;
}

Snake.prototype.Body = function()
{ 
    return this.Body;
}    

Snake.prototype.MoveD = function(d, b)
{
    var dt = new DirectionTools();

    // if(this.Body.length > 1 && this.FindCollision(d,b))
    //     return;

    this.Body[0].Heading = d;

    for (var i = 1; i < this.Body.length; i++)
    {
        this.Body[i].Move.push(new Pair(new Position(this.Body[0].X, this.Body[0].Y), d));
    }

    //Move(b);
}

Snake.prototype.FindCollision = function(d, b)
{
    //d == dt.Front(this.Body[0].Heading);
	
	//ver si alreves

    var newX = this.Body[0].X + xs[DirectionToInt[d]];
    var newY = this.Body[0].Y + ys[DirectionToInt[d]];     
    
    var t = new Toolsc();

    if (!t.In(newX, newY, b.Rows(), b.Columns()))
        return true;

    for(var c in this.Body)
    {
        var cell = this.Body[c];

        if(cell.X == newX && cell.Y == newY)
            return true;
    }

    return false;
}

// Snake.prototype.VerifyHeading = function(d,cell)
// {
//     var dt = new DirectionTools();

//     var f = dt.Front(d);

//     if(f == DirectionTosrt[0] && this.Body[0].Y == cell.Y)
//         return true;
// }

Snake.prototype.Move  = function(b)
{
    var countfruits = 0;

    for(c in this.Body)
    {
        var cell = this.Body[c];
        
        if (!cell.Moving(b,this.Body))
            return false;

        var i = -1;

        for (var j = 0;j < b.Fruits.length; j++)
        {
            if (b.Fruits[j].X == cell.X && b.Fruits[j].Y == cell.Y)
            {
                i = j;
                break;
            }
        }

        if (i != -1)
        {
            b.Fruits.splice(i,1);
            countfruits++;
        }

    }

    if (!this.AddCells(countfruits, b.Rows(), b.Columns()))
        return false;

    return true;
}

Snake.prototype.AddCells = function(countfruits, rows, columns)
{
    while (countfruits > 0)
    {
        var last = this.Body[this.Body.length - 1];

        var toadd = last.GetDirection(last.Heading, rows, columns);

        if (toadd == null)
            return false;

        this.Body.push(toadd);

        countfruits--;
    }

    return true;
}