function Source()
{
	this.state		= 0x00000000;					// A value indicating the current readyness
	
	this.cursor		= {'x':0, 'y':0, 'w':0, 'h':0, 'c':"#ff0000"};	// A cursor showing the currently selected tile
	
	this.scroll		= {'x':0, 'y':0};				// The offset of the tilemap on the canvas
	
	this.can		= null;						// The HTML canvas this class wraps around
	this.ctx		= null;						// The canvas Context
	
	this.tw 		= {'x':0, 'y':0};
}

Source.prototype.init = function(_canvas, _attributes)
{
	this.can = document.getElementById(_canvas);						// get the canvas element
	if(this.can && this.can.getContext)							// verify that an element vad retrived and it can give us a context
	{
		this.ctx = this.can.getContext("2d");						// get the context
		this.cursor.w = _attributes.sDim.x;						// set the width of the cursor
		this.cursor.h = _attributes.sDim.y;						// set the height of the cursor
		this.state |= 0x00000001;							// set the state to show that this has been initialized
		return(0);									// return code for success
	}
	return(-1);										// if the canvas cannot be verified return code for failure
}

Source.prototype.update = function(_delta)
{
	
}

Source.prototype.draw = function(_tm)
{
	if(this.state & SP_INITIALIZED != 0)									// check that this class has been initialized
	{
		this.ctx.save();										// push the current matrix
			this.ctx.fillStyle = "#000000";								// set the fill style to black
			this.ctx.fillRect(0, 0, this.can.width, this.can.height);				// blank the canvas by drawing a black rectangle over the whole viewport
			this.ctx.translate(this.scroll.x, this.scroll.y);					// move the point of origin so that things will be drawn in their proper place
			if(_tm)											// check that there is a tilemap
			{
				this.ctx.drawImage(_tm, 0, 0, _tm.width, _tm.height);				// draw the tilemap
			}
			else
			{
				return(-1);									// if it cant be drawn return a fail code
			}
			this.ctx.strokeStyle = this.cursor.c;							// set the stroke style to the cursors
			this.ctx.beginPath();									// discontinue any previous paths
				this.ctx.rect(this.cursor.x, this.cursor.y, this.cursor.w, this.cursor.h);	// make the path outlining the highlighted tile
			this.ctx.stroke();									// stroke the path
		this.ctx.restore();										// pop the current matrix
		return(0);											// report a success
	}
	return(1);												// if the state does not allow drawing return a code saying it was ignored
}

Source.prototype.onEvent = function(_event, _lParam, _wParam)
{
	
	switch(_event)													// check what kind of event is happening
	{
		case SM_MOUSEMOVE:											// if its the mouse moving
		{
			if((this.state & SP_INITIALIZED) != 0)								// check that this has been initialized
			{
				if((this.state & MB_LEFT) != 0)								// if the left mouse button is pressed
				{											// get the mouse coordinates on the canvas 
					this.cursor.x = iDivide(_lParam.x-this.scroll.x, this.cursor.w)*this.cursor.w;	// reposition the cursor
					this.cursor.y = iDivide(_lParam.y-this.scroll.y, this.cursor.h)*this.cursor.h;
				}
				if((this.state & MB_RIGHT) != 0)							// if the right mouse button is pushed
				{
					this.scroll.x += mouse.dx;							// move the scroll offset the same amount as the mouse has moved
					if(this.scroll.x > 0)								// if the offset is greater than zero
					{
						this.scroll.x = 0;							// set the offset to zero
					}
					else if(this.scroll.x < -(this.tw.x - this.can.width))			// otherwise if the offset is less than the width of the negation of tilemap width minus the canvas width
					{
						this.scroll.x = -(this.tw.x - this.can.width);			// set the offset to the negation of the tilemap width minus the canvas width
					}
					
					this.scroll.y += mouse.dy;
					if(this.scroll.y > 0)
					{
						this.scroll.y = 0;
					}
					else if(this.scroll.y < -(this.tw.y - this.can.height))
					{
						this.scroll.y = -(this.tw.y - this.can.height);
					}
				}
			}
			break;
		}
		
		case SM_MBDOWN:												// If a mouse button has been pushed
		{
			if((this.state & SP_INITIALIZED) != 0)								// if this class has been initialized
			{
				this.state &= 0xffff00ff;								// clear the mouse byte in the state value
				this.state |= _lParam.buttons << 8;							// 'or' the new button value to the state value
				
				if((this.state & MB_LEFT) != 0)								// if the left mouse button is being pushed
				{											// get the coordinates of the mouse on the canvas
					this.cursor.x = iDivide(_lParam.x-this.scroll.x, this.cursor.w)*this.cursor.w;	// reposition the cursor
					this.cursor.y = iDivide(_lParam.y-this.scroll.y, this.cursor.h)*this.cursor.h;
				}
			}
			break;
		}
		
		case SM_MBUP:												// If a mouse button is released
		{
			if((this.state & SP_INITIALIZED) != 0)								// if this class is initialized
			{
				this.state &= 0xffff00ff;								// clear the mouse byte of the state
				this.state |= _lParam.buttons << 8;							// 'or' the new mouse value 
			}
			break;
		}
		
		case SM_MOUSEOUT:											// if the mouse leaves the canvas
		{
			this.state &= 0xffff00ff;									// clear the mouse byte
			break;
		}
	}
}
