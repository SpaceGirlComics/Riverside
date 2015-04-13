// collision block
// © 2015 spacegirl.net
function Block()
{
	var x;							// left coordinate
	var y;							// top coordinate
	var w;							// width of the block
	var h;							// height of the block
	
	var s = true;						// true if box is selected
	var v = true;						// true if visible
	
	var name;						// name of the object

	this.create = function(_name, _x, _y, _tw, _th)		// defines or redefine new block
	{
		name = _name;
		x = _x;
		y = _y;
		w = _tw;
		h = _th;
	}
	
	this.draw = function(_ctx)				// draws the block if visible
	{
		_ctx.fillStyle = "#5555aa";
		_ctx.strokeStyle = "#aaaaff";
		if(s)
		{
			_ctx.fillStyle = "#66ff66";		// uses a different colour if selected
			_ctx.strokeStyle = "#aaffaa";
		}
		_ctx.beginPath();
		_ctx.rect(x, y, w, h);
		_ctx.globalAlpha = 0.5;
		_ctx.fill();
		_ctx.globalAlpha = 1.0;
		_ctx.stroke();
	}

	// regular mutator and retrieval functions
	
	this.setX = function(_x){x = _x;}			// sets x position (left side) to the value of _x
	this.setY = function(_y){y = _y;}			// sets y position (top side) to the vale of _y
	this.setWidth = function(_w){w = _w;}			// sets width of the block to _w
	this.setHeight = function(_h){h = _h;}			// sets height of the block to _h
	
	this.getX = function(){return(x);}			// gets the x position (left side) of the block
	this.getY = function(){return(y);}			// gets the y position (top side) of the block
	this.getWidth = function(){return(w);}			// gets the width of the block
	this.getHeight = function(){return(h);}			// gets the height of the block
	
	this.setSelected = function(_s){s = _s;}		// enables or disables selected state
	this.isSelected = function(){return(s);}		// returns if the block is selected
	this.isVisible = function(){return(v);}			// returns if the block is visible
	this.setVisible = function(_v){v = _v;}			// makes block visible or invisible
}
