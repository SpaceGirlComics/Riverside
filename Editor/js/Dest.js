function Dest()
{
	var readyState			= 0x00000000;
	var tileMap			= new Image();
	tileMap.onload			= function(){readyState &= 0xfffffff2;};
	var canvas			= null;
	var ctx 			= null;
	var cursor			= {'x':0, 'y':0, 'w':0, 'h':0, 'c':"#5555ff"};
	var scroll			= {'x':0, 'y':0};
	
	var map				= null;
	
	this.create = function(_a, _d)
	{
		canvas = document.getElementById(_d);
		if(canvas != null)
		{
			ctx = canvas.getContext("2d");
			
			map = {'name':_a.name,
			       'dim':{'x':_a.dim.x, 'y':_a.dim.y},
			       'sDim':{'x':_a.sDim.x, 'y':_a.sDim.y},
			       'dDim':{'x':_a.dDim.x, 'y':_a.dDim.y},
			       'tilePath':_a.tilePath,
			       'bgm':_a.bgm,
			       'weather':_a.weather,
			       'backdrop':_a.backdrop,
			       'speed':{'x':_a.speed.x, 'y':_a.speed.y},
			       'gravity':{'x':_a.gravity.x, 'y':_a.gravity.y}
			       'layers':[]};
			
			tileMap.src = map.tilePath;
			cursor.w = map.dDim.x;
			cursor.h = map.dDim.y;
			canvas.style.cursor = "none";
			readyState |= 0x00000001;
		}
	}
	
	this.onMouseDown = function(_t, _e)
	{
	}
	
	this.onMouseMove = function(_t, _e)
	{
		var ec = getElementCoordinates(_e.clientX, _e.clientY, _t);
		if((readyState & 0x00000002) != 0)
		{			
			cursor.x = (iDivide(ec[0]-scroll.x, map.dDim.x)*map.dDim.x);
			cursor.y = (iDivide(ec[1]-scroll.y, map.dDim.y)*map.dDim.y);
		}
	}
	
	this.onMouseIn = function(_t, _e)
	{
	}
	
	this.onMouseOut = function(_t, _e)
	{
	}
	
	this.onMouseUp = function(_t, _e)
	{
	}
	
	this.draw = function()
	{
		ctx.save();
		ctx.fillStyle = "0x00000000";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.translate(scroll.x, scroll.y);
		ctx.beginPath();
		ctx.strokeStyle = cursor.c;
		ctx.rect(cursor.x, cursor.y, cursor.w, cursor.h);
		ctx.stroke();
		ctx.restore();
	}
	
	this.destroy = function()
	{
	}
}
