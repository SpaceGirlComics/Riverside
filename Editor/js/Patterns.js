function Patterns()
{
	this.state = 0x00000000;
	
	this.can = null;
	this.ctx = null;
	
	this.scroll = {'x':0, 'y':0};
	
	this.patterns = [];
	this.cursor = {'x':0, 'y':0, 'w':0, 'h':0, 'c':"#ffff00"};
	
	this.commands = [];
	this.events = [];
}

Patterns.prototype.init = function(_c, _w, _h)
{
	this.can = document.getElementById(_c);
	if(this.can && this.can.getContext)
	{
		this.ctx = this.can.getContext('2d');
		
		this.cursor.w = _w;
		this.cursor.h = _h;
		
		this.state |= SP_INITIALIZED;
	}
}

Patterns.prototype.draw = function(_selected)
{
	if(this.state & SP_INITIALIZED)
	{
		this.ctx.save()
			this.ctx.clearRect(0, 0, this.can.width, this.can.height);
			this.ctx.translate(this.scroll.x, this.scroll.y);
			this.ctx.strokeStyle = this.cursor.c;
			this.ctx.beginPath();
			this.ctx.rect(this.cursor.x, this.cursor.y, this.cursor.w, this.cursor.h);
			this.ctx.stroke();
		this.ctx.restore();
	}
}

Patterns.prototype.onEvent = function(_event, _lParam, _wParam)
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
			}
			break;
		}
	}
}
