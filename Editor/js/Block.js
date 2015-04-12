function Block()
{
	var x;
	var y;
	var w;
	var h;
	
	var s = true;
	var v = true;
	
	var name;
	
	this.create = function(_name, _x, _y, _tw, _th)
	{
		name = _name;
		x = _x;
		y = _y;
		w = _tw;
		h = _th;
	}
	
	this.draw = function(_ctx)
	{
		_ctx.fillStyle = "#5555aa";
		_ctx.strokeStyle = "#aaaaff";
		if(s)
		{
			_ctx.fillStyle = "#66ff66";
			_ctx.strokeStyle = "#aaffaa";
		}
		_ctx.beginPath();
		_ctx.rect(x, y, w, h);
		_ctx.globalAlpha = 0.5;
		_ctx.fill();
		_ctx.globalAlpha = 1.0;
		_ctx.stroke();
	}
	
	this.setX = function(_x){x = _x;}
	this.setY = function(_y){y = _y;}
	this.setWidth = function(_w){w = _w;}
	this.setHeight = function(_h){h = _h;}
	
	this.getX = function(){return(x);}
	this.getY = function(){return(y);}
	this.getWidth = function(){return(w);}
	this.getHeight = function(){return(h);}
	
	this.setSelected = function(_s){s = _s;}
	this.isSelected = function(){return(s);}
	this.isVisible = function(){return(v);}
	this.setVisible = function(_v){v = _v;}
}
