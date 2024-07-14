using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Snake.Logic
{
    public class Cell
    {
        public int X { get; set; }
        public int Y { get; set; }
        public List<Tuple<Position, Direction>> Move { get; set; }

        public Direction Heading { get; set; }

        public Cell(int x, int y,Direction d)
        {
            X = x;
            Y = y;
            Heading = d;
            Move = new List<Tuple<Position, Direction>>();
        }

        private int[] xs = {-1, 0, 1, 0};
        private int[] ys = {0, 1, 0, -1};

        public bool Moving(Board board, List<Cell> body)
        {
            if (!Moved(Heading, board.Rows, board.Columns,body))
                return false;

            if(Move.Count > 0)
            {
                if (Move[0].Item1.X == X && Move[0].Item1.Y == Y)
                {
                    Heading = Move[0].Item2;
                    Move.RemoveAt(0);
                }
            }

            return true;

        }

        public bool Moved(Direction d, int rows, int columns, List<Cell> body)
        {
            int newX = X + xs[(int) d];
            int newY = Y + ys[(int) d];

            if (body.Any(x => x.X == newX && x.Y == newY))
                return false;

            if (!Tools.In(newX, newY, rows, columns))
                return false;

            X = newX;
            Y = newY;

            return true;

        }

        public Cell GetDirection(Direction heading,int rows,int columns)
        {
            List<Direction> posible = new List<Direction>(){};

            posible.Add(DirectionTools.Front(heading));

            DirectionTools.Sides(heading).ForEach(posible.Add);
            
            foreach (var d in posible)
            {
                int newX = X + xs[(int)d];
                int newY = Y + ys[(int)d];

                if (Tools.In(newX, newY, rows, columns))
                {
                    Cell c = new Cell(newX,newY,heading);

                    //c.Move.Add(new Tuple<Position, Direction>(new Position(X, Y), heading));

                    foreach (var m in Move)
                    {
                        c.Move.Add(new Tuple<Position, Direction>(new Position(m.Item1.X, m.Item1.Y), m.Item2));
                    }

                    //c.Move.Add(new Tuple<Position, Direction>(new Position(X, Y), heading));

                    return c;
                }
            }

            return null;


        }

        
    }
}
