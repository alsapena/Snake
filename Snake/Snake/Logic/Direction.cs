using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Snake.Logic
{
    public enum Direction
    {
        Up,Right,Down,Left
    }

    public class DirectionTools
    {
        public static Direction Front(Direction d)
        {
            switch (d)
            {
                case Direction.Up:
                    return Direction.Down;
                case Direction.Right:
                    return Direction.Left;
                case Direction.Down:
                    return Direction.Up;
                case Direction.Left:
                    return Direction.Right;
                default:
                    throw new ArgumentOutOfRangeException("d");
            }
        }

        public static List<Direction> Sides(Direction d)
        {
            switch (d)
            {
                case Direction.Up:
                    return new List<Direction>(){Direction.Right,Direction.Left};
                case Direction.Right:
                    return new List<Direction>() { Direction.Up, Direction.Down };
                case Direction.Down:
                    return new List<Direction>() {Direction.Right, Direction.Left};
                case Direction.Left:
                    return new List<Direction>() {Direction.Up, Direction.Down};
                default:
                    throw new ArgumentOutOfRangeException("d");
            }
        }
    }
}
