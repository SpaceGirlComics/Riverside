// collision block
// © 2015 spacegirl.net
// April 15, 2015 - initial submit

function Block()
{
	var b = new Box();
	var s = true;						// true if box is selected
	var v = true;						// true if visible
	
	var name;						// name of the object

	// defines or redefine new block
	this.create = function(_name, _x, _y, _tw, _th)
	{
		name = _name;
		b.create(_x, _y, _tw, _th);
	}
	
	// draws the block if visible
	this.draw = function(_ctx)
	{
		_ctx.fillStyle = "#5555aa";
		_ctx.strokeStyle = "#aaaaff";
		if(s)
		{
			_ctx.fillStyle = "#66ff66";		// uses a different colour if selected
			_ctx.strokeStyle = "#aaffaa";
		}
		_ctx.beginPath();
		_ctx.rect(b.getX(), b.getY(), b.getWidth(), b.getHeight());
		_ctx.globalAlpha = 0.5;
		_ctx.fill();
		_ctx.globalAlpha = 1.0;
		_ctx.stroke();
	}

	// regular mutator and retrieval functions
	
	this.setX = function(_x){b.setX(_x);}				// sets x position (left side) to the value of _x
	this.setY = function(_y){b.setY(_y);}				// sets y position (top side) to the vale of _y
	this.setWidth = function(_w){if(_w > 0){b.setWidth(_w);}}	// sets width of the block to _w
	this.setHeight = function(_h){if(_h > 0){b.setHeight(_h);}}	// sets height of the block to _h
	
	this.getX = function(){return(b.getX());}			// gets the x position (left side) of the block
	this.getY = function(){return(b.getY());}			// gets the y position (top side) of the block
	this.getWidth = function(){return(b.getWidth());}		// gets the width of the block
	this.getHeight = function(){return(b.getHeight());}		// gets the height of the block
	
	this.setSelected = function(_s){s = _s;}		// enables or disables selected state
	this.isSelected = function(){return(s);}		// returns if the block is selected	
	this.isVisible = function(){return(v);}			// returns if the block is visible
	this.setVisible = function(_v){v = _v;}			// makes block visible or invisible
}
