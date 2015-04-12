function Source()
{
	var can = null;
	var ctx = null;
	
	var sw = null;
	var sh = null;
	var w = null;
	var h = null;
	
	var sx = 0;
	var sy = 0;
	var mx = 0;
	var my = 0;
	
	var map = null;
	
	var selecting = false;
	var dragging = false;
	
	var crs = null;
	
	var that = this;
	
	this.create = function(_tm, _sw, _sh, _sc)
	{
		can = _sc;
		ctx = can.getContext('2d');
		
		sw = _sw;
		sh = _sh;
		w = iDivide(_tm.width, sw);
		h = iDivide(_tm.height, sh);
		
		crs = new Cursor();
		crs.create(0, 0, _sw, _sh, "#ff0000");
		//con.message("Source Cursor Created.");
		
	}
	
	this.draw = function(_tm)
	{
		ctx.save();
		ctx.fillStyle = "#000000";
		ctx.fillRect(0,0,can.width,can.height);
		ctx.translate(sx, sy);
		
		ctx.drawImage(_tm, 0, 0);
		crs.draw(ctx);
		ctx.restore();
		
	}
	
	this.onSelectStart = function(_x, _y)
	{
		selecting = true;
		crs.setPosition(_x-sx, _y-sy);
		//con.message("Set Cursor Position "+_x+", "+_y);
	}
	
	this.onSelectEnd = function(_x, _y)
	{
		selecting = false;
	}
	
	this.onScrollStart = function(_x, _y)
	{
		dragging = true;
		mx = _x;
		my = _y;
	}
	
	this.onScrollEnd = function(_x, _y)
	{
		dragging = false;
	}
	
	this.onMouseMove = function(_x, _y)
	{
		if(selecting)
		{
			crs.setPosition(_x-sx, _y-sy);
		}
		else if(dragging)
		{
			sx -= (mx-_x);
			if(sx > 0){sx=0;}
			else if(sx < -1*(w * sw - can.width)){sx = -1*(w * sw - can.width);}
			sy -= (my-_y);
			if(sy > 0){sy=0;}
			else if(sy < -1*(h * sh - can.height)){sy = -1*(h * sh - can.height);}
		}
		mx = _x;
		my = _y;
	}
	
	this.onMouseOut = function()
	{
		selecting = dragging = false;
	}
	
	this.getX = function(){return(crs.getX());}
	this.getY = function(){return(crs.getY());}
}
