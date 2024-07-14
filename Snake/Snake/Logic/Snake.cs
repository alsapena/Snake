using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Snake.Logic
{
    public class Snake
    {
        public Direction Heading { get; set; }

        public List<Cell> Body { get; set; }

        public Snake(int rows,int columns)
        {
            Random r = new Random(Environment.TickCount);

            Heading = (Direction) r.Next(0, 4);

            int percentR = (int) (rows*0.2f);
            int percentC = (int) (columns*0.2f);
            Body = new List<Cell>();

            Cell c = new Cell(r.Next(percentR, rows - percentR), r.Next(percentC, columns - percentC), Heading);

            Body.Add(c);

        }

        public void Move(Direction d, Board b)
        {
            if(Body.Count > 1 && d == DirectionTools.Front(Body[0].Heading) )
                return;

            Body[0].Heading = d;

            for (int i = 1; i < Body.Count; i++)
            {
                Body[i].Move.Add(new Tuple<Position, Direction>(new Position(Body[0].X, Body[0].Y), d));
            }

            //Move(b);
        }

        internal bool Move(Board b)
        {
            int countfruits = 0;

            foreach (Cell cell in Body)
            {
                if (!cell.Moving(b,this.Body))
                    return false;

                int i = -1;

                for (int j = 0;j < b.Fruits.Count; j++)
                {
                    if (b.Fruits[j].X == cell.X && b.Fruits[j].Y == cell.Y)
                    {
                        i = j;
                        break;
                    }
                }

                if (i != -1)
                {
                    b.Fruits.RemoveAt(i);
                    countfruits++;
                }

            }

            if (!AddCells(countfruits, b.Rows, b.Columns))
                return false;

            return true;
        }

        private bool AddCells(int countfruits,int rows,int columns)
        {
            while (countfruits > 0)
            {
                Cell last = Body[Body.Count - 1];

                Cell toadd = last.GetDirection(last.Heading, rows, columns);

                if (toadd == null)
                    return false;

                Body.Add(toadd);

                countfruits--;
            }

            return true;
        }
        
    }
}
