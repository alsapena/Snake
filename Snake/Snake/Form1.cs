using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Snake.Logic;
using Snake.Properties;

namespace Snake
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            Reset();
        }

        private void Reset()
        {
            b = new Board(15, 15);
            s = new Logic.Snake(15, 15);
            times = fruits;
            
        }

        private Board b;
        private Logic.Snake s;

        private void pictureBox1_Paint(object sender, PaintEventArgs e)
        {
            PaintSnake(e.Graphics);

            PaintBoard(e.Graphics);
            
        }

        private void PaintSnake(Graphics graphics)
        {
            float width = pictureBox1.Width / (float)b.Columns;
            float height = pictureBox1.Height / (float)b.Rows;

            int fiveW = (int) (width*0.2f);
            int fiveH = (int) (height*0.2f);

            for (int i = 0; i < s.Body.Count; i++)
            {
                int x = s.Body[i].X;
                int y = s.Body[i].Y;

                graphics.FillRectangle(Brushes.DarkSlateGray, y*width + fiveW, x*height + fiveH, width - 2*fiveW,
                    height - 2*fiveH);
            }
        }

        private void PaintBoard(Graphics graphics)
        {
            float width = pictureBox1.Width/(float)b.Columns;
            float height = pictureBox1.Height / (float)b.Rows;

            Pen p = new Pen(Color.WhiteSmoke, 2);

            for (int i = 0; i < b.Rows; i++)
                graphics.DrawLine(p, 0, i*height, pictureBox1.Width, i*height);

            for (int j = 0; j < b.Columns; j++)
                graphics.DrawLine(p, j*width, 0, j*width, pictureBox1.Height);

            foreach (var f in b.Fruits)
                graphics.DrawImage(Resources.cherrywhite, f.Y*width, f.X*height, width, height);
        }

        private void Form1_KeyDown(object sender, KeyEventArgs e)
        {
            switch (e.KeyCode)
            {
                case Keys.Left:
                    s.Move(Direction.Left,b);
                    break;
                case Keys.Right:
                    s.Move(Direction.Right, b);
                    break;
                case Keys.Up:
                    s.Move(Direction.Up, b);
                    break;
                case Keys.Down:
                    s.Move(Direction.Down, b);
                    break;
                defaul:
                    return;
            }

            //pictureBox1.Invalidate();
        }

        private int fruits = 10;

        private int times;

        private void timer1_Tick(object sender, EventArgs e)
        {
            if (!s.Move(b))
            {
                timer1.Enabled = false;
                MessageBox.Show("Lost");

                Reset();
                pictureBox1.Invalidate();
                return;
            }

            pictureBox1.Invalidate();

            times--;
            if (times < 0)
            {
                times = fruits;
                b.GenerateFruit(s);
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (!timer1.Enabled)
                timer1.Enabled = true;
        }

        private void button1_KeyDown(object sender, KeyEventArgs e)
        {
            Form1_KeyDown(sender, e);
        }
    }
}
