using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Snake.Logic
{
    public class Board
    {
        private int[,] boardC;

        public Board(int rows, int columns)
        {
            this.Rows = rows;
            this.Columns = columns;

            boardC = new int[rows,columns];

            Fruits = new List<Position>();
        }

        public int Columns { get; set; }

        public int Rows { get; set; }

        public object this[int x,int y]
        {
            get
            {
                if(!Tools.In(x,y,Rows,Columns))
                    throw  new Exception("Fuera");

                return boardC[x, y];
            }
            set
            {
                if (!Tools.In(x, y, Rows, Columns))
                    throw new Exception("Fuera");

                boardC[x, y] = (int)value;
            }
        }


        public void GenerateFruit(Snake s)
        {
            Random r = new Random(Environment.TickCount);

            int xFruit = 0;
            int yFruit = 0;

            do
            {
                xFruit = r.Next(0, Rows);
                yFruit = r.Next(0, Columns);

            } while (Verify(xFruit,yFruit,s));

            Fruits.Add(new Position(xFruit, yFruit));
        }

        public List<Position> Fruits { get; set; }

        private bool Verify(int xFruit, int yFruit, Snake snake)
        {
            foreach (var i in snake.Body)
            {
                if (i.X == xFruit && i.Y == yFruit)
                    return true;
            }

            return false;
        }
    }
}
