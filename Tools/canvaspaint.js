function Drawing()
{
	return this;
}

Drawing.prototype.FillRectangle = function(canvas,color,x,y,width,height)
{
	var graphic = canvas.getContext("2d");
	
	graphic.fillStyle = color;
	graphic.fillRect(x,y,width,height);
}

Drawing.prototype.FillCircle = function(canvas,color,x,y,radius)
{
	var graphic = canvas.getContext("2d");
	
	graphic.fillStyle = color;
	graphic.beginPath();
	graphic.arc(x,y,radius,0,Math.PI*2,true);
	graphic.closePath();
	graphic.fill();
}

// Rounded rectangle with zero radius (specified as a number)
Drawing.prototype.DrawRectangle = function(canvas,color,x,y,width,height)
{
	var graphic = canvas.getContext("2d");

	graphic.strokeStyle = color;
	graphic.beginPath();
	graphic.roundRect(x, y, width, height, 0);
	graphic.closePath();
	graphic.stroke();
}



// ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)

Drawing.prototype.DrawEllipse = function(canvas,color,x,y,radiusX,radiusY, rotation,startAngle, endAngle)
{
	var graphic = canvas.getContext("2d");
	
	graphic.strokeStyle = color;
	graphic.beginPath();
	graphic.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
	graphic.closePath();
	graphic.stroke();
}

Drawing.prototype.FillEllipse = function(canvas,color,x,y,radiusX,radiusY, rotation,startAngle, endAngle)
{
	var graphic = canvas.getContext("2d");
	
	graphic.fillStyle = color;
	graphic.beginPath();
	graphic.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
	graphic.closePath();
	graphic.fill();
}

// Rounded rectangle with zero radius (specified as a number)
Drawing.prototype.DrawRectangleRounded = function(canvas,color,x,y,width,height,borders)
{
	var graphic = canvas.getContext("2d");

	graphic.strokeStyle = color;
	graphic.beginPath();
	graphic.roundRect(x, y, width, height, borders);
	graphic.closePath();
	graphic.stroke();
}

Drawing.prototype.DrawText = function(canvas,color,text,font,fontsize,x,y)
{
	var graphic = canvas.getContext("2d");
	graphic.strokeStyle = color;
	graphic.font = fontsize + " " + font;
	graphic.strokeText(text, x, y);
}

Drawing.prototype.FillText = function(canvas,color,text,font,fontsize,x,y)
{
	var graphic = canvas.getContext("2d");
	graphic.fillStyle = color;
	graphic.font = fontsize + " " + font;
	graphic.fillText(text, x, y);
}

Drawing.prototype.DrawImage = function(canvas,image,sx,sy,swidth,sheight,dx,dy,dwidth,dheight)
{
	var graphic = canvas.getContext("2d");
	graphic.drawImage(image, sx, sy, swidth, sheight, dx, dy, dwidth,dheight);
}

Drawing.prototype.DrawLine = function(canvas,color,thickness,x1,y1,x2,y2)
{
	var graphic = canvas.getContext("2d");
	graphic.strokeStyle = color;
    graphic.lineWidth = thickness; 
    graphic.beginPath();
    graphic.moveTo(x1,y1);
    graphic.lineTo(x2,y2);
	graphic.closePath();
	graphic.stroke();
}