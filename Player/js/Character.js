// © 2015 spacegirl.net
// April 15, 2015 - initial submit

function Character()
{
	var x = 0;
	var y = 0;
	var w = 0;
	var h = 0;
	
	var s = 0;
	var t = 0;
	var u = 0;
	var v = 0;
	
	var frametime = 0.0;
	
	var i = new Image();
	
	var SOUTH = 0;
	var WEST = 1;
	var NORTH = 2;
	var EAST = 3;
	
	var LOADING = 0;
	var STANDING = 1;
	var WALKING = 2;
	var RUNNING = 3;
	
	var r = LOADING;
	var f = SOUTH;
	
	var vec = [];
	
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
	
	this.isReady = function(){return(r>LOADING);}
	
	this.getX = function(){return(x);}
	this.getY = function(){return(y);}
	this.getWidth = function(){return(w);}
	this.getHeight = function(){return(h);}
	this.getFace = function(){return(f);}
	
	this.setX = function(_x){x = _x;}
	this.setY = function(_y){y = _y;}
	this.setPosition = function(_x, _y){x = _x; y = _y;}
	this.translate = function(_x, _y){x+=_x; y+=_y;}
	this.setWidth = function(_w){w=_w;}
	this.setHeight = function(_h){h=_h;}
	this.scale = function(_s){w*=_s; h*=_s;}
	
	this.setS = function(_s){s=_s;}
	this.setT = function(_t){t=_t;}
	this.setClip = function(_s, _t){s=_s; t=_t;}
	this.shift = function(_x, _y){s+=_s; t+=_t;}
	this.setSWidth = function(_u){u =_u;}
	this.setSHeight = function(_v){v=_v;}
	this.zoom = function(_z){u*=_z; v*=_z;}
	
	this.setState = function(_s){r = _s;}
	this.setFace = function(_f){if(_f>EAST || _f < SOUTH){f=SOUTH}else{f=_f;}}
	
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
	
	function doWalking(_delta)
	{
		x += vec[0]*_delta;
		y += vec[1]*_delta;
	}
	
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
