var DirectionToInt = 
{
    'Up' : 0 ,
    'Right':1,
    'Down':2,
    'Left':3
}

var DirectionTosrt = ['Up','Right','Down','Left'];

function DirectionTools()
{
}

DirectionTools.prototype.Front = function(d)
{
    switch (d)
    {
        case 'Up':
            return 'Down';
        case 'Right':
            return 'Left';
        case 'Down':
            return 'Up';
        case 'Left':
            return 'Right';            
    }
}

DirectionTools.prototype.Sides = function(d)
{
    switch (d)
    {
        case 'Up':
            return  ['Right','Left'];
        case 'Right':
            return [ 'Up', 'Down' ];
        case 'Down':
            return ['Right','Left'];
        case 'Left':
            return [ 'Up', 'Down' ];            
    }
}
