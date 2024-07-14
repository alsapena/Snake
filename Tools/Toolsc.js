function Toolsc()
{}

Toolsc.prototype.In = function(x, y, Rows,Columns)
{
    return x >= 0 && x < Rows && y >= 0 && y < Columns;
}

Toolsc.prototype.getRandomInt = function(max)
{
    return Math.floor(Math.random()*max);
}

Toolsc.prototype.getRandomIntInterval= function(min,max)
{
    return min + Math.floor(Math.random()*(max - min));
}