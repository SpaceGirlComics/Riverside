function Source()
{
	var readyState 			= 0x00000000;
	var that 			= this;
	var tileMap 			= new Image();
	tileMap.onload			= function(){readyState |= 0x00000001;that.draw();};
	var canvas			= null;
	var ctx				= null;
	var cursor 			= {"x":0, "y":0, "w":0, "h":0, "c":"#ff0000"};
	var scroll 			= {"x":0, "y":0};
	//var dim				= {"x":0, "y":0};
	
	this.create = function(_c, _a)
	{
		canvas = document.getElementById(_c);
		if(canvas != null)
		{
			ctx = canvas.getContext("2d");
			if(ctx != null)
			{			
				cursor.w = _a.sDim.x;
				cursor.h = _a.sDim.y;
				tileMap.src = _a.tilePath;
			}
			else
			{
				return(-2);
			}
		}
		else
		{
			return(-1);
		}
		return(0);
	}
	
	this.draw = function()
	{
		ctx.save();
			ctx.fillStyle = "#000000";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.translate(scroll.x, scroll.y);
			ctx.drawImage(tileMap, 0, 0, tileMap.width, tileMap.height);
			ctx.strokeStyle = cursor.c;
			ctx.beginPath();
				ctx.rect(cursor.x, cursor.y, cursor.w, cursor.h);
			ctx.stroke();
		ctx.restore();
	}
	
	this.getTileValue = function()
	{
		//s = tn%iDivide(tileMap.width, cursor.w)*cursor.w;
		//t = iDivide(tn, iDivide(tileMap.width,cursor.w))*cursor.h;

		return(iDivide(tileMap.width, cursor.w) * iDivide(cursor.y, cursor.h) + iDivide(cursor.x, cursor.w));
	}
	
	this.getReadyState = function()
	{
		return(readyState);
	}
	
	this.destroy = function()
	{
		delete(tileMap);
		delete(ctx);
		delete(canvas);
		delete(cursor);
		delete(scroll);
	}
}
