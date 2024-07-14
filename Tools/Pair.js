
function Pair(item1,  item2)
{
    this.item1 = item1;
    this.item2 = item2;
}

Pair.prototype.Item1 = function()
{
    return this.item1;
}   

Pair.prototype.Item2 = function()
{
    return this.item2;
}