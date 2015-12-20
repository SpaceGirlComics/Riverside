// controls the blades being shown
// © 2015 spacegirl.net
// May 26, 2015 - initial submit

function BladeControl()
{
	var blades;			// Array to hold the blades created
	var state = 0;			// == 1 after create is called
	
	// initialzes the controller
	this.create = function()
	{
		blades = [];
		state++;
	}
	
	// add a new blade to the array
	// _id = id of the html div
	this.addBlade = function(_id)
	{
		// check that there is an element that has the name contained in _id
		if(document.getElementById(_id) != null)
		{
			var b = new Blade();	// instanciate new blade
			b.create(_id);		// and initialize it
			b.setPosition(blades.length * 28);
			blades.push(b);		// push the new blade onto the array
		}
	}
	
	// moves the blades into or outof view depending on which on was clicked
	// _obj = the blade that was clicked
	this.doShow = function(_obj)
	{
		var c = blades.length-1;		// assume the highest blade was selected
		// cycle through each blade
		for(var a = 0; a < blades.length; a++)
		{
			// check if the blade is the last, if not
			if(a < c)
			{
				// check if the current blade is the one that was clicked 
				if(blades[a].checkObj(_obj))
				{
					c = a;			// set selected to current
					blades[a].expand();	// show the selected
				}
				// otherwise hide the blade
				else
				{
					blades[a].contract();
				}
			}
			else
			{
				// by now the the selected should be showing 
				blades[a].expand();
			}
		}
	}
	
	// returns non-zero when ready
	this.getReadyState = function()
	{
		return(state);
	}
}
