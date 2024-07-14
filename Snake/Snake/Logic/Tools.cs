using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Snake.Logic
{
    public class Tools
    {
        public static bool In(int x, int y,int Rows,int Columns)
        {
            return x >= 0 && x < Rows && y >= 0 && y < Columns;
        }
    }
}
