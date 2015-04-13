// © 2015 C. M. Turner
function Tile()
{
	var x = null;					// integer, x coordinate of the destination rectangle
	var y = null;					// integer, y coordinate of the destination rectangle
	var s = null;					// integer, x coordinate of the source rectangle
	var t = null;					// integer, y coordinate of the source rectangle
	
	var dw = null;					// integer, width of the destination rectangle
	var dh = null;					// integer, height of the destination rectangle
	var sw = null;					// integer, width of the source rectangle
	var sh = null;					// integer, height of the source rectangle
	
	var hlColor = "#ffffff";			// I dont think these are used may remove
	var slColor = "#ff0000";
	
	var hover = false;				// I dont think these are used may remove
	var selected = false;				// I dont think these are used may remove

	var def = false;				// true if create has been called
	
	var that = this;
	
	// defines or redefines the tile
	// _x, _y = coordinates of the destination rectangle
	// _dw, _dh = dimensions of the destination rectangle
	// _s, _t = coordinates of the source rectangle
	// _sw, _sh = dimensions of the source rectangle
	this.create = function(_x, _y, _dw, _dh, _s, _t, _sw, _sh)
	{
		if(isNumber(_x+_y+_dw+_dh+_s+_t+_sw+_sh))
		{
			x = _x;
			y = _y;
			s = _s;
			t = _t;
			dw = _dw;
			dh = _dh;
			sw = _sw;
			sh = _sh;
			def = true;
			return(0);
		}
		return(1);
	}
	
	// _ctx = destination context
	// _im = Image, texture map
	this.draw = function(_ctx, _im)
	{
		if(x>0||y>0)
		{
			_ctx.drawImage(_im, x, y, dw, dh, s, t, sw, sh);
		}
	}
	
	this.isDefined = function(){return(def);}
	
	this.getX = function(){return(x);}
	this.getY = function(){return(y);}
	this.getS = function(){return(s);}
	this.getT = function(){return(t);}
	this.getDw = function(){return(dw);}
	this.getDh = function(){return(dh);}
	this.getSh = function(){return(sh);}
	this.getSw = function(){return(sw);}
	
	this.setX = function(_x){if(isNumber(_x)){x = _x;}}
	this.setY = function(_y){if(isNumber(_y)){y = _y;}}
	this.setS = function(_s){if(isNumber(_s)){s = _s;}}
	this.setT = function(_t){if(isNumber(_t)){t = _t;}}
	this.setDw = function(_w){if(isNumber(_w)){dw = _w;}}
	this.setDh = function(_h){if(isNumber(_h)){dh = _h;}}
	this.setSh = function(_h){if(isNumber(_h)){sh = _h;}}
	this.setSw = function(_w){if(isNumber(_w)){sw = _w;}}
	this.setDimensions = function(_x, _y){if(isNumber(_x+_y)){that.setX(_x);that.setY(_y);}}
	this.setClip = function(_x, _y){if(isNumber(_x+_y)){that.setX(_x);that.setY(_y);}}
	
	this.translate = function(_x, _y){if(isNumber(_x+_y)){x+=_x; y+=_y;}}
	this.resize = function(_s){if(isNumber(_s)){x*=_s; y*=_s;}}
	
	this.shift = function(_x, _y){if(isNumber(_x+_y)){s+=_x; t+=_y;}}
	this.zoom = function(_s){if(isNumber(_s)){s*=_s; t*=_s;}}
	
	this.setSelected = function(_s){selected = _s;}
	
	this.getTileNumber = function(_tw)
	{
		return(iDivide(y, sh)*iDivide(_tw, sw)+iDivide(x, sw));
	}
	
	this.destroy = function()
	{
	}
}
