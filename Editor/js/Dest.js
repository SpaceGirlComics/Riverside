function Dest()
{
	this.state 		= 0x00000000;						// A value indicating the current readyness

	this.map 		= new Map(null);					// The map being edited

	this.cursor 		= {'x':0, 'y':0, 'w':0, 'h':0, 'c':"#5555ff"};		// A cursor showing the currently selected tile

	this.scroll 		= {'x':0, 'y':0};					// The offset of the map on the canvas
	
	this.can 		= null;							// The HTML canvas this class wraps around
	this.ctx 		= null;							// The canvas Context
}

Dest.prototype.init = function(_c, _a)
{
	this.can = document.getElementById(_c);
	if(this.can)
	{
		this.can.style.cursor = "none";
		this.ctx = this.can.getContext('2d');
		this.map.init(_a);
		this.cursor.w = _a.sDim.x;
		this.cursor.h = _a.sDim.y;
		this.state |= SP_INITIALIZED;
	}
}

Dest.prototype.update = function(_delta)
{
	switch(this.state)
	{
		case 0:
		{
			break;
		}
		
		default:
		{
			this.map.update(_delta);
			break;
		}
	}
}

Dest.prototype.draw = function(_tm)
{
	if((this.state & SP_INITIALIZED) != 0)
	{
		this.ctx.save();
			this.ctx.fillStyle = "#000000";
			this.ctx.fillRect(0, 0, this.can.width, this.can.height);
			this.ctx.translate(this.scroll.x, this.scroll.y);
			this.map.draw(this.ctx, _tm);
			this.ctx.strokeStyle = this.cursor.c;
			this.ctx.beginPath();
			this.ctx.rect(this.cursor.x, this.cursor.y, this.cursor.w, this.cursor.h);
			this.ctx.stroke();
		this.ctx.restore();
		return(0);
	}
	return(1);
}

Dest.prototype.onEvent = function(_event, _lParam, _wParam)
{
	switch(_event)
	{
		case SM_MOUSEMOVE:
		{
			if((this.state & SP_INITIALIZED) != 0)
			{
				_lParam.x -= this.scroll.x;
				_lParam.y -= this.scroll.y;

				this.cursor.x = iDivide(_lParam.x, this.cursor.w)*this.cursor.w;
				this.cursor.y = iDivide(_lParam.y, this.cursor.h)*this.cursor.h;
									
				if((this.state & MB_LEFT) != 0)
				{
					this.map.sendMessage(MM_SETTILE, _lParam.layer, {'x':_lParam.x, 'y':_lParam.y}, _wParam, 1, 5);
				}
				if((this.state & MB_RIGHT) != 0)
				{
					this.scroll.x += mouse.dx;
					if(this.scroll.x > 0)
					{
						this.scroll.x = 0;
					}
					else if(this.scroll.x < this.can.width - this.map.width)
					{
						this.scroll.x = this.can.width - this.map.width;
					}
					
					this.scroll.y += mouse.dy; //_lParam.y;
					if(this.scroll.y > 0)
					{
						this.scroll.y = 0;
					}
					else if(this.scroll.y < this.can.height - this.map.height)
					{
						this.scroll.y = this.can.height - this.map.height;
					}
					this.map.sendMessage(MM_SETSCROLL, null, this.scroll.x, this.scroll.y, 1, 5);
				}
			}
			break;
		}
		
		case SM_MBDOWN:
		{
			this.state &= 0xffff00ff;
			this.state |= (_lParam.buttons << 8);
			if((this.state & MB_LEFT) != 0)
			{
				this.map.sendMessage(MM_SETTILE, _lParam.layer, {'x':_lParam.x-this.scroll.x, 'y':_lParam.y-this.scroll.y}, _wParam, 1, 5);
			}
			break;
		}
		
		case SM_MBUP:
		{
			this.state &= 0xffff00ff;
			this.state |= (_lParam << 8);
			break;
		}
		
		case SM_MOUSEOUT:
		{
			this.state &= 0xffff00ff;
			break;
		}
		
		case SM_MKLAYER:
		{
			this.map.sendMessage(MM_MKLAYER, null, _lParam, null, 0, 5);
			break;
		}
		
		case SM_RMLAYER:
		{
			this.map.sendMessage(MM_RMLAYER, _lParam, null, null, 0, 5);
			break;
		}
		
		case SM_SLAYER:
		{
			this.map.sendMessage(MM_SLAYER, null, _lParam, null, 0, 5);
			break;
		}
		
		case SM_VSLAYER:
		{
			this.map.sendMessage(MM_VSLAYER, _wParam, _lParam, null, 0, 5);
			break;
		}
		
		case SM_RSLAYER:
		{
			this.map.sendMessage(MM_RSELAYER, _lParam, null, null, 0, 5);
			break;
		}
		
		case SM_LWLAYER:
		{
			this.map.sendMessage(MM_LWRLAYER, _lParam, null, null, 0, 5);
			break;
		}
		
		case SM_COMMAND:
		{
			this.map.sendMessage(_lParam.message, _lParam.target, _wparam, null, 0, 5);
			break;
		}
	}
}
