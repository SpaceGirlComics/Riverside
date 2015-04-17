// square cursor for canvases
// © 2015 spacegirl.net
// April 15, 2015 - initial submit

function Cursor()
{
	var b = new Box.js					// cursor rectangle
	var c = null;						// colour of cursor, expressed as a hexvalue in a string
	
	var that = this;					// references the current instance. not very useful; may remove
	
	this.create = function(_x, _y, _w, _h, _c)		// defines or redefines cursor
	{
		b.create(_x, _y, _w, _h);
		c = _c;
	}
	
	this.draw = function(_ctx)				
	{
		_ctx.strokeStyle = c;
		_ctx.beginPath()
		_ctx.rect(b.getX(), b.getY(), b.getWidth(), b.getHeight());
		_ctx.stroke();
	}
	
	// regular retrieval functions 
	this.getX = function(){return(b.getX());}
	this.getY = function(){return(b.getY());}
	this.getWidth = function(){return(b.getWidth());}
	this.getHeight = function(){return(b.getHeight());}
	this.getColor = function(){return(c);}
	
	// regular mutators
	this.setExactX = function(_x){b.setX(_x);}		// sets x without snap to grid, not very useful; may remove
	this.setExactY = function(_y){b.setY(_y);}		// sets y without snap to grid, not very useful; may remove
	this.setX = function(_x){b.setX(iDivide(_x, w)*w);}	// sets x alighned to map grid
	this.setY = function(_y){B.setY(iDivide(_y, h)*h);}	// sets y alighned to map grid
	this.translate = function(_x, _y){b.translate(_x, _y);}	// moves the cursor relative to its current position, no snap, not very useful; may remove
	this.setPosition = function(_x, _y){that.setX(_x); that.setY(_y);} // sets cursor position with respect to the point of origin, snaps
	this.setExactPosition = function(_x, _y){that.setExactX(_x); that.setExactY(_y);} // sets cursor position with respect to the point of origin, no snap; may remove
	this.setWidth = function(_w){b.setWidth(_w);}		// sets the width to _w
	this.setHeight = function(_h){b.setHeight(_h);}		// sets the height to _h
	this.resize = function(_w, _h){b.setDimesion(_w, _h);}	// resizes relative to the current size
	this.scale = function(_s){b.scale(_s);}			// resizes using a scalar value
	this.setColor = function(_c){c = _c;}			// sets the color of the cursor
}
