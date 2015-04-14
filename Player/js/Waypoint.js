// © 2015 spacegirl.net
// April 15, 2015 - initial submit

function Waypoint()
{
	var x = 300;
	var y = 300;
	
	var rad = 400;
	
	var pinned = false;
	var active = false;
	
	this.getX = function(){return(x);}
	this.getY = function(){return(y);}
	this.isActive = function(){return(active);}
	this.isPinned = function(){return(pinned);}
	
	this.setX = function(_x){x = _x;}
	this.setY = function(_y){y = _y;}
	this.set = function(_x, _y){x=_x; y=_y;}
	this.translate = function(_x, _y){x+=_x; y+=_y;}
	this.setActive = function(_a){active = _a;}
	this.setPinned = function(_p){pinned = _p;}
	
	this.check = function(_obj)
	{
		var leg = (_obj.getX()+8)-x;
		var arm = (_obj.getY()+16)-y;
		
		leg *= leg;
		arm *= arm;
		
		if(leg < rad)
		{
			x = _obj.getX();
			leg = 0;
		}
		
		if(arm < rad)
		{
			y = _obj.getY();
			arm = 0;
		}
		
		if(arm+leg < rad)
		{
			active = false;
			_obj.setState(1);
			return(true);
		}
		return(false);
	}
	
	this.draw = function(_ctx)
	{
		_ctx.beginPath();
		_ctx.arc(x, y, 20, 0, Math.PI*2, false);
		_ctx.strokeStyle = "#ffffff";
		if(active)
		{
			_ctx.fill();
		}
		else
		{
			_ctx.lineWidth = 1;
			_ctx.stroke();
		}
	}
}
