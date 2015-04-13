// square cursor for canvases
// © 2015 spacegirl.net
function Cursor()
{
	var x = null;						// left side coordinate
	var y = null;						// top side coordinate
	var w = null;						// width of cursor
	var h = null;						// height of cursor
	var c = null;						// colour of cursor, expressed as a hexvalue in a string
	
	var that = this;					// references the current instance. not very useful; may remove
	
	this.create = function(_x, _y, _w, _h, _c)		// defines or redefines cursor
	{
		x = _x;
		y = _y;
		w = _w;
		h = _h;
		c = _c;
	}
	
	this.draw = function(_ctx)				
	{
		_ctx.strokeStyle = c;
		_ctx.beginPath()
		_ctx.rect(x, y, w, h);
		_ctx.stroke();
	}
	
	// regular retrieval functions 
	this.getX = function(){return(x);}
	this.getY = function(){return(y);}
	this.getWidth = function(){return(w);}
	this.getHeight = function(){return(h);}
	this.getColor = function(){return(c);}
	
	// regular mutators
	this.setExactX = function(_x){x = _x;}			// sets x without snap to grid, not very useful; may remove
	this.setExactY = function(_y){y = _y;}			// sets y without snap to grid, not very useful; may remove
	this.setX = function(_x){x = iDivide(_x, w)*w;}		// sets x alighned to map grid
	this.setY = function(_y){y = iDivide(_y, h)*h;}		// sets y alighned to map grid
	this.translate = function(_x, _y){x += _x; y +=_y}	// moves the cursor relative to its current position, no snap, not very useful; may remove
	this.setPosition = function(_x, _y){that.setX(_x); that.setY(_y);} // sets cursor position with respect to the point of origin, snaps
	this.setExactPosition = function(_x, _y){that.setExactX(_x); that.setExactY(_y);} // sets cursor position with respect to the point of origin, no snap; may remove
	this.setWidth = function(_w){w = _w;}			// sets the width to _w
	this.setHeight = function(_h){h = _h;}			// sets the height to _h
	this.resize = function(_w, _h){w+=_w; h+=_h}		// resizes relative to the current size
	this.scale = function(_s){w*=_s; h*=_s;}		// resizes using a scalar value
	this.setColor = function(_c){c = _c;}			// sets the color of the cursor
}
