// the smallest map element
// © 2015 spacegirl.net
// April 15, 2015 - initial submit

function Tile()
{
	var d = new Box();
	var s = new Box();

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
			d.create(_x, _y, _dw, _dh);
			s.create(_s, _t, _sw, _sh);
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
			_ctx.drawImage(_im, 
					s.getX(),
					s.getY(),
					s.getWidth(),
					s.getHeight(),
					d.getX(),
					d.getY(),
					d.getWidth(),
					d.getHeight());
		}
	}
	
	this.isDefined = function(){return(def);}
	
	this.getSourceBox = function(){return(s);}
	this.getDestinationBox = function(){return(d);}
	
	this.getX = function(){return(d.getX());}
	this.getY = function(){return(d.getY());}
	this.getDw = function(){return(d.getWidth());}
	this.getDh = function(){return(d.getHeight());}
	
	this.getS = function(){return(s.getX());}
	this.getT = function(){return(s.getY());}
	this.getSw = function(){return(s.getWidth());}
	this.getSh = function(){return(s.getHeight());}
	
	this.setX = function(_x){d.setX(_x);}
	this.setY = function(_y){d.setY(_y);}
	this.setDw = function(_w){d.setWidth(_w);}
	this.setDh = function(_h){d.setHeight(_h);}
	
	this.setS = function(_s){s.setX(_s);}
	this.setT = function(_t){s.setY(_t);}
	this.setSw = function(_w){s.setWidth(_w);}
	this.setSh = function(_h){s.setHeight(_h);}
	
	this.setDimensions = function(_x, _y){d.setDimensions(_x, _y);}
	this.translate = function(_x, _y){d.translate(_x, _y);}
	this.resize = function(_s){d.scale(_s);}
	
	this.setClip = function(_x, _y){s.setDimensions(_x, _y);}
	this.shift = function(_x, _y){s.translate(_x, _y);}
	this.zoom = function(_s){s.scale(_s);}
	
	this.getTileNumber = function(_tw)
	{
		return(iDivide(s.getY(), s.getWidth())*iDivide(_tw, s.getWidth())+iDivide(s.getX(), s.getWidth()));
	}
	
	this.destroy = function()
	{
	}
}
