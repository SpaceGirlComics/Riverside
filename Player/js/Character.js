// © 2015 spacegirl.net
// April 15, 2015 - initial submit

// character that appears on screen
function Character()
{
	var x = 0;					// integer, x coordinate of the destination rectangle
	var y = 0;					// integer, y coordinate of the destination rectangle
	var w = 0;					// integer, width of the destination rectangle
	var h = 0;					// integer, height of the destination rectangle
	
	var s = 0;					// integer, source rectangle x position
	var t = 0;					// integer, source rectangle y position
	var u = 0;					// integer, source rectangle width
	var v = 0;					// integer, source rectangle height
	
	var frametime = 0.0;				// float, time since last frame update
	
	var i = new Image();				// Image, spritesheet, should be externalized
	
	//state values, it would be nice if these were static
	var SOUTH = 0;
	var WEST = 1;
	var NORTH = 2;
	var EAST = 3;
	
	var LOADING = 0;				// state before the create function is called and i has finished loading
	var STANDING = 1;				// when the character is idle on screen
	var WALKING = 2;				// when the character is walking
	var RUNNING = 3;				// when the character is running
	
	var r = LOADING;				// current state of the character
	var f = SOUTH;					// direction the character is facing
	
	var vec = [];					// direction/speed the character is moving
	
	// initializes the object
	// _x = integer, initial x coordinate of the destination rect
	// _y = integer, initial y coordinate of the destination rect
	// _w = integer, width of the character of the destination rect
	// _h = integer, height of the character of the destination rect
	// _s = integer, initial x coordinate of the source rect
	// _t = integer, initial y coordinate of the source rect
	// _u = integer, width of the character of the source rect
	// _v = integer, height of the character of the source rect
	// _i = string, url of the spritesheet
	this.create = function(_x, _y, _w, _h, _s, _t, _u, _v, _i)
	{
		x = _x;
		y = _y;
		w = _w;
		h = _h;
		
		s = _s;
		t = _t;
		u = _u;
		v = _v;
		
		i.src = _i;
	}
	
	this.isReady = function(){return(r>LOADING);}		// returns true if character is ready to be drawn
	
	this.getX = function(){return(x);}			// returns the x coordinate of the destination rect
	this.getY = function(){return(y);}			// returns the y coordinate of the destination rect
	this.getWidth = function(){return(w);}			// returns the width of the destination rect
	this.getHeight = function(){return(h);}			// returns the height of the destination rect
	this.getFace = function(){return(f);}			// returns an integer indicating the direction character is facing
	
	this.setX = function(_x){x = _x;}			// sets the x coordinate of the destination rect
	this.setY = function(_y){y = _y;}			// sets the y coordinate of the destination rect
	this.setPosition = function(_x, _y){x = _x; y = _y;}	// sets the coordinates of the destination rect
	this.translate = function(_x, _y){x+=_x; y+=_y;}	// sets the coordinates of the destination rect relative to the current position
	this.setWidth = function(_w){w=_w;}			// sets the width of the destination rect
	this.setHeight = function(_h){h=_h;}			// sets the height of the destination rect
	this.scale = function(_s){w*=_s; h*=_s;}		// scales the destination rect
	
	this.setS = function(_s){s=_s;}				// sets the x coordinate of the source rect
	this.setT = function(_t){t=_t;}				// sets the y coordinate of the source rect
	this.setClip = function(_s, _t){s=_s; t=_t;}		// sets the coordinates of the source rect
	this.shift = function(_x, _y){s+=_s; t+=_t;}		// sets the relative position of the source rect
	this.setSWidth = function(_u){u =_u;}			// sets the width of the source rect
	this.setSHeight = function(_v){v=_v;}			// sets the height of the source rect
	this.zoom = function(_z){u*=_z; v*=_z;}			// scales the source rectangle 
	
	this.setState = function(_s){r = _s;}			// sets the state of the character
	this.setFace = function(_f){if(_f>EAST || _f < SOUTH){f=SOUTH}else{f=_f;}}	// set the direction the character is facing
	
	// meant for executing scripts; may remove
	// op = integer, denotes an operation
	// _wparam, _lparam = operands
	this.sendMessage = function(_op, _wparam, _lparam)
	{
		switch(_op)
		{
			case 0:
			{
				if(_lparam == 38)
				{
					f = NORTH;
					r = WALKING;
					vec[1] = -100;
				}
				else if(_lparam == 40)
				{
					f = SOUTH;
					r = WALKING;
					vec[1] = 100;
				}
				
				if(_lparam == 39)
				{
					f = EAST;
					r = WALKING;
					vec[0] = 100;
				}
				else if(_lparam == 37)
				{
					f = WEST;
					r = WALKING;
					vec[0] = -100;
				}
				break;
			}
			
			case 1:
			{
				if(_lparam == 38 || _lparam == 40)
				{
					vec[1] = 0;
					if(vec[0] < 0)
					{
						f = WEST;
					}
					else if(vec[0] > 0)
					{
						f = EAST;
					}					
				}
				else if(_lparam == 37 || _lparam == 39)
				{
					vec[0] = 0;
					if(vec[1] < 0)
					{
						f = NORTH;
					}
					else if(vec[1] > 0)
					{
						f = SOUTH;
					}
					
				}
				
				if(vec[0] == 0 && vec[1] == 0)
				{
					r = STANDING;
				}
				break;
			}
		}
	}

	this.draw = function(_ctx)
	{
		if(r != LOADING)
		{
			_ctx.drawImage(i, s, t, u, v, x, y, w, h);
		}
	}
	
	// adds the delta time to the frame time then updates the frame if enough time has passed
	// _delta = float, delta time
	function doAnimate(_delta)
	{
		frametime += _delta;
		if(frametime > 0.05)
		{
			frametime = 0.0;
			s += u;
			if(s > 8*u)
			{
				s = u;
			}
		}
	}
	
	// moves character according to the values in vec
	// _delta = delta time
	function doWalking(_delta)
	{
		x += vec[0]*_delta;
		y += vec[1]*_delta;
	}
	
	// cyclic update function
	// _delta = delta time
	this.update = function(_delta)
	{
		t = f*v;
		switch(r)
		{
			case LOADING:
			{
				vec[0] = vec[1] = 0;
				if(i.complete)
				{
					r++;
				}
				break;
			}
			
			case STANDING:
			{
				s = 0;
				break;
			}
			
			case WALKING:
			{
				doAnimate(_delta);
				doWalking(_delta);
				break;
			}
			
			case RUNNING:
			{
				s += 2*u;
				if(s > 8*u)
				{
					s = u;
				}
				break;
			}
		}
	}
	
}
