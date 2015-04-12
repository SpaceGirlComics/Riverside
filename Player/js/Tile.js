function Tile()
{
	var x = 0;	//x coordinate
	var y = 0;	//y coordinate
	var w = 0;	// width
	var h = 0;	// height
	
	var s = 0;	// source x coordinate
	var t = 0;	// source y coordinate
	var u = 0;	// source width coordinate
	var v = 0;	// source height coordinate
	
	var f = 0;	// current frame;
	var m = 0;	// max frame;
	
	var frametime =	0.0; 
	
	var state = 0;   // current state
	var that = this;
	
	this.getX = function(){return(x);}
	this.getY = function(){return(y);}
	this.getWidth = function(){return(w);}
	this.getHeight = function(){return(h);}
	this.getS = function(){return(s);}
	this.getT = function(){return(t);}
	this.getSWidth = function(){return(u);}
	this.getHeight = function(){return(v);}
	this.getFrame = function(){return(f);}
	this.getMaxFrame = function(){return(m);}
	
	this.setX = function(_x){x = _x;}
	this.setY = function(_y){y = _y;}
	this.setPosition = function(_x, _y){that.setX(_x); that.setY(_y);}
	this.translate = function(_x, _y){that.setX(x+_x); that.setY(y+_y);}
	this.setWidth = function(_w){w = _w;}
	this.setHeight = function(_h){h = _h;}
	this.scale = function(_s){w*=_s; h*=_s;}
	this.dim = function(_w, _h){that.setWidth(_w); that.setHeight(_h);}
	this.setS = function(_s){s = _s;}
	this.setT = function(_t){t = _t;}
	this.setClip = function(_s, _t){that.setS(_s); that.setT(_t);}	
	this.shift = function(_s, _t){that.setS(s+_s); that.setT(t+_t);}
	this.setSWidth = function(_w){u = _w;}
	this.setSHeight = function(_h){v = _h;}
	this.zoom = function(_z){u*=_z; v*=_z;}
	this.dimClip = function(_u, _v){that.setSWidth(_u); that.setSHeight(_v);}
	this.setFrame = function(_f){f = _f;}
	this.setMaxFrame = function(_m){m = _m;}
	
	//this.animate = function(){f++; if(f > m){f=0;}}
	
	this.define = function(_x, _y, _w, _h, _s, _t, _u, _v, _f, _m)
	{
		
		that.setPosition(_x, _y);
		that.dim(_w, _h);
		that.setClip(_s, _t);
		that.dimClip(_u, _v);
		that.setFrame(_f);
		that.setMaxFrame(_m);
	}
	
	this.draw = function(_img, _ctx)
	{
		_ctx.drawImage(_img, s, t, u, v, x, y, w, h); 
	}
	
	this.update = function(_delta)
	{
		frametime += _delta;
		//alert(frametime);
		if(frametime > 0.1)
		{
			frametime = 0.0;
			s+=u;
			f++;
			
			if(f >= m)
			{
				s-=(f*u);
				f=0;
			}
		
		}
	}
}
