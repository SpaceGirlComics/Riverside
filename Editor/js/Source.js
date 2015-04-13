// Wraps around the source canvas element
// © 2015 spacegirl.net
function Source()
{
	var can = null;						// source canvas element
	var ctx = null;						// source canvas context
	
	var sw = null;						// integer, width of the source rectangle
	var sh = null;						// integer, height of the source rectangle
	var w = null;						// integer, width of the texture map in tiles
	var h = null;						// integer, height of the texture map in tiles
	
	var sx = 0;						// integer, layers x offset
	var sy = 0;						// integer, layers y offset
	var mx = 0;						// integer, current mouse x coordinate
	var my = 0;						// integer, current mouse y coordinate
	
	var map = null;						// I dont think this is used, remove later
	
	var selecting = false;					// boolean, true when selecting a source tile
	var dragging = false;					// boolean, true when scrolling
	
	var crs = null;						// cursor
	
	var that = this;					// I dont think this is used, remove later
	
	// defines instance
	// _tm = Image, texture map
	// _sw = integer, source rectangle width
	// _sh = integer, source rectangle height
	// _sc = source canvas element
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
	
	// starts selection mode and selects tile the is pointed to
	// _x, _y = integer, mouse coordinates
	this.onSelectStart = function(_x, _y)
	{
		selecting = true;
		crs.setPosition(_x-sx, _y-sy);
		//con.message("Set Cursor Position "+_x+", "+_y);
	}
	
	// ends selection mode
	// _x, _y = integer, mouse coordinated, not useful; may remove
	this.onSelectEnd = function(_x, _y)
	{
		selecting = false;
	}
	
	// starts dragg mode, takes note of current mouse position
	// _x, _y = integer, mouse coodinates
	this.onScrollStart = function(_x, _y)
	{
		dragging = true;
		mx = _x;
		my = _y;
	}
	
	// ends drag mode
	// _x, _y = integer, mouse coordinates, not useful; may remove
	this.onScrollEnd = function(_x, _y)
	{
		dragging = false;
	}
	
	// if selecting then select the tile the cursor has moved onto
	// if dragging add the distance the mouse travelled to the scrolling total
	// takees note of the new mouse coordiantes
	// _x, _y = integer, mouse coordinates
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
	
	// stops selection and dragging when mouse leaves the canvas
	this.onMouseOut = function()
	{
		selecting = dragging = false;
	}
	
	this.getX = function(){return(crs.getX());}		// gets the x coordinate of the cursor
	this.getY = function(){return(crs.getY());}		// gets the y coordinate of the cursor
}
