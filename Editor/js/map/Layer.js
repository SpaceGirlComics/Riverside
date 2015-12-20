function Layer(_com)
{
	this.name		= "";					// Name of the layer
	this.state		= 0x00000000;				// A value indicating the current readyness
	
	this.dim			= {'x':0, 'y':0};			// Width and height of the layer in tiles. Expressed as a vertex
	this.sDim		= {'x':0, 'y':0};			// Default source box width & height in pixels. Expressed as a vertex
	this.dDim		= {'x':0, 'y':0};			// Default destination box width & height in pixels. Expressed as a vertex
	
	this.scroll		= {'x':0, 'y':0};			// The current position of the map in pixels. Expressed as a vertex
	this.speed		= {'x':0, 'y':0};			// the speed & direction of the scrolling in pixels. Expressed as a vector
	
	this.wp			= [];					// an Array of waypoints to move toward
	this.wpIndex 		= -1;					// Index of the current waypoint

	this.tiles		= [];					// 2D array of tiles on this layer
	this.tileIndex		= {'x':0, 'y':0};			// The index at which tiles that are in the view port begin. Expressed as a Vertex
	
	this.time 		= {'prev':0, 'delta':0, 'obj':0};	// contains the amount of time since instantiation; since and of last update
	
	this.events		= [];					// instructions for when an event fires
	this.commands		= [];					// queue of executing instructions

	this.shapes		= [];

	this.tw			= {'x':0, 'y':0};			// Dimensions of the tilemap. Expressed as a vertex
	this.vp			= {'x':0, 'y':0};			// viewport dimensions in tiles. Expressed as a vertex
	
	if(_com)							// put declatration instructions in the queue
	{
		if(_com.constructor.toString().indexOf("Array") > -1)
		{
			commands = commands.concat(_com);
		}
		else
		{
			commands.push(_com);
		}
	}
}

Layer.prototype.proc = function()
{
	var reply = [];
	var serial = true;
	var rq;
	
	while(this.commands.length > 0 && serial)
	{
		rq = this.commands.shift();
		switch(rq.code)
		{
			case LM_NULL:
			{
				break;
			}
			
			case LM_SETTILE:
			{
				this.tiles[iDivide(rq.target.y, this.dDim.y)][iDivide(rq.target.x, this.dDim.x)].sendMessage(TM_SETTILE, null, rq.lParam, null, 0, 5);
				break;
			}
			
			case LM_SETSCROLL:
			{
				this.scroll.x = rq.lParam;
				this.scroll.y = rq.wParam;
				
				this.tileIndex.x = -iDivide(this.scroll.x, this.dDim.x);
				this.tileIndex.y = -iDivide(this.scroll.y, this.dDim.y);
				break;
			}
			
			case LM_VISIBLE:
			{
				if(rq.lParam)
				{
					this.state |= SP_VISIBLE;
				}
				else
				{
					this.state &= 0xf0ffffff;
				}
				break;
			}
		}
		serial = rq.serial;
		delete(rq);
	}
}

Layer.prototype.sendMessage = function(_message, _target, _lParam, _wParam, _serial, _priority)
{
	this.commands.push({'code':_message, 'target':_target, 'lParam':_lParam, 'wParam':_wParam, 'serial':_serial, 'priority':_priority}); 
}

Layer.prototype.setCommand = function(_e, _message, _tagert, _lParam, _wParam, _serial, _priority)
{
	if(!this.events[_e])
	{
		this.events[_e] = [];
	}
	this.events[_e].push({'code':_message, 'lParam':_lParam, 'wParam':_wParam, 'serial':_serial, 'priority':_priority});
}

Layer.prototype.setCommands = function(_e, _messages)
{
	if(!this.events[_e])
	{
		this.events[_e] = [];
	}
	this.events = this.events[_e].concat(_messages);
}

Layer.prototype.fire = function(_e)
{
	if(this.events[_e])
	{
		this.commands = this.commands.concat(this.events[_e]);
	}
}

Layer.prototype.init = function(_name, _width,  _height, _dw, _dh, _sw, _sh, _tiles, _tw)
{
	this.state |= SP_VISIBLE | SP_INITIALIZED;
	
	this.dim.x = _width;
	this.dim.y = _height;
	this.dDim.x = _dw;
	this.dDim.y = _dh;
	this.sDim.x = _sw;
	this.sDim.y = _sh;
	
	var c = 0;
	
	for(var a = 0; a < this.dim.y; a++)
	{
		this.tiles[a] = [];
		for(var b = 0; b < this.dim.x; b++)
		{
			this.tiles[a][b] = new Tile();
			this.tiles[a][b].init([{'x': 0, 'y': 0, 'w': this.sDim.x, 'h': this.sDim.y}], {'x': this.dDim.x*b, 'y': this.dDim.y*a, 'w': this.dDim.x, 'h': this.dDim.y});
		}
	}
	
	this.tw.x = _tw.x;
	this.tw.y = _tw.y;
	
	if(this.events[LM_INITIALIZE])
	{
		this.commands = this.commands.concat(this.events[LM_INITIALIZE]);
	}
	//return(reply);
}

Layer.prototype.update = function(_delta)
{
	this.time.delta = _delta;
	this.time.prev = this.time.obj;
	this.time.obj += _delta;
	
	//tileIndex.x = -iDivide(scroll.x, dDim.x);
	//tileIndex.y = -iDivide(scroll.y, dDim.y);
	
	for(var a = 0; a < this.tiles.length; a++)
	{
		for(var b = 0; b < this.tiles[a].length; b++)
		{
			this.tiles[a][b].update(_delta);
		}
	}
	if(this.commands && this.commands.length > 0)
	{
		var reply = this.proc();
	}
	if(this.events[LM_UPDATE])
	{
		this.commands = this.commands.concat(this.events[LM_UPDATE]);
	}
	return(reply);
}

Layer.prototype.draw = function(_ctx, _image)
{
	if(this.state & SP_VISIBLE)
	{
		for(var a = this.tileIndex.y; a < this.dim.y && a < this.tileIndex.y+36; a++)
		{
			for(var b = this.tileIndex.x; b < this.dim.x && b < this.tileIndex.x+52; b++)
			{
				this.tiles[a][b].draw(_ctx, _image);
			}
		}
		if(this.events[LM_DRAW])
		{
			this.commands = this.commands.concat(this.events[LM_DRAW]);
		}
	}
}
