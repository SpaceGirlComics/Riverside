// Control Blade
// © 2015 spacegirl.net
// May 26, 2015 - initial submit

function Blade()
{
	var b;					// the dive element that is used
	
	var UNDEFINED = 0;			// default state before create is called
	var EXPANDED = 1;			// state when this blade or one befor it is showing
	var CONTRACTED = 2;			// state when this blade is hidden
	
	var state = UNDEFINED;			// current state of the blade
	
	var ct;					// position to move to when state = contracted
	
	// initializes the blade
	// _id = div element
	this.create = function(_id)
	{
		// assign the div to b
		b = document.getElementById(_id);
		
		// if b is real
		if(b != null)
		{
			state = EXPANDED;			// set the state to expanded
			ct = parseInt(b.style.left) - 200;	// set ct to the position of b minus 200 pixels
		}
	}
	
	// moves the blade onto the screen
	this.expand = function()
	{
		// make sure the blade is hidden
		if(state == CONTRACTED)
		{
			b.style.left = (ct + 200) + "px";	// move b to ct + 200px
			state = EXPANDED;			// set state to expanded
		}
	}
	
	// moves the blade off screen
	this.contract = function()
	{
		// check to see if the blade is showing
		if(state == EXPANDED)
		{
			b.style.left = ct + "px";		// move b to ct;
			state = CONTRACTED;			// set state to contracted
		}
	}
	
	// returns true if this class is wrapped around _obj
	this.checkObj = function(_obj)
	{
		return(b === _obj);
	}
	
	this.setPosition = function(_px)
	{
		if(b)
		{
			b.style.left = _px + "px";
			ct = parseInt(b.style.left) - 200;	// set ct to the position of b minus 200 pixels
		}
	}
}
