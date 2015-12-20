function Map(_com)
{
	this.name		= "";					// Name of this map
	this.state		= 0x00000000;				// A value indicating the current readyness
	
	this.dim 		= {'x':0, 'y':0};			// Width and height of this map in tiles. Expressed as a vertex
	this.sDim		= {'x':0, 'y':0};			// Default source box width & height in pixels. Expressed as a vertex
	this.dDim		= {'x':0, 'y':0};			// Default destination box width & height in pixels. Expressed as a vertex
	
	this.scroll 		= {'x':0, 'y':0};			// The current position of the map in pixels. Expressed as a vertex
	this.speed 		= {'x':0, 'y':0};			// the speed & direction of the scrolling in pixels. Expressed as a vector

	//this.wp 		= [];					// Array of waypoints to move toward
	//this.wpIndex 		= -1;					// Index of the current waypoint
	this.obj		= [];
	
	this.layers 		= [];					// Array of layers in this map

	this.time 		= {'prev':0, 'delta':0, 'obj':0};	// contains the amount of time since instantiation; since and of last update
	
	this.commands 		= [];					// Queued commands
	this.events 		= [];					// Hashmap of commands to enqueue on specified command
	
	this.tileMap 		= null;					// Tilemap path
	this.bgm 		= null;					// Background music path
	this.backdrop 		= null;					// path for the backdrop
	this.gravity 		= {'x':0, 'y':0};			// Forced direction on this map. Expressed as a vector
	this.weather 		= null;					// the Current weather

	//this.vp			= {'x':0, 'y':0};			// Viewport dimensions in tiles. Expressed as a vertex
	
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

Map.prototype.proc = function()
{
	var reply = [];
	var serial = true;
	var rq; 
	while(this.commands.length > 0 && serial) //(serial)
	{
		rq = this.commands.shift();
		switch(rq.code)
		{
			case MM_NULL:
			{
				if(events[TE_NULL])
				{
					this.commands = this.commands.concat(this.events[TE_NULL]);
				}
				break;
			}
			
			case MM_MKLAYER:
			{
				//makeLayer(rq.lParam, rq.wParam);
				if(this.state & SP_INITIALIZED != 0)
				{
					this.layers.unshift(new Layer(rq.wParam));
					this.layers[0].init(rq.lParam, this.dim.x, this.dim.y, this.dDim.x, this.dDim.y, this.sDim.x, this.sDim.y, null, {'x': 0, 'y': 0});
					slr = 0;
				}
				break;
			}
			
			case MM_RMLAYER:
			{
				//removeLayer();
				if(this.state & SP_INITIALIZED != 0)
				{
					if(this.layers.length > rq.target && rq.target >= 0)
					{
						this.layers.splice(rq.target, 1);
					}		
				}
				break;
			}
			
			case MM_VSLAYER:
			{
				this.layers[rq.target].sendMessage(LM_VISIBLE, null, rq.lParam, null, true, 5);
				break;
			}
			
			case MM_LWRLAYER:
			{
				if(rq.target >= 0 && rq.target < this.layers.length-1)
				{
					var l = this.layers[rq.target];
					this.layers[rq.target] = this.layers[rq.target+1];
					this.layers[rq.target +1] = l;
				}
				break;
			}
			
			case MM_RSELAYER:
			{
				if(rq.target > 0 && rq.target < layers.length)
				{
					var l = this.layers[rq.target];
					this.layers[rq.target] = this.layers[rq.target-1];
					this.layers[rq.target -1] = l;
				}
				break;
			}
			
			case MM_SETTILE:
			{
				if(this.layers && this.layers.length > 0)
				{
					switch(typeof(rq.target))
					{
						case "String":
						{
							//setTileByName();
							for(var a = 0; a < this.layers.length; a++)
							{
								if(this.layers[a].getName() == rq.target)
								{
									this.layers[a].sendMessage(LM_SETTILE, rq.lParam, rq.wParam, null, rq.serial, rq.priority);
								}
							}
							break;
						}
						
						case "Number":
						{
							//setTileByIndex();
							if(rq.target < 0)
							{
								for(var a = 0; a < this.layers.length; a++)
								{
									this.layers[a].sendMessage(LM_SETTILE, rq.lParam, rq.wParam, null, rq.serial, rq.priority);
								}
							}
							else if(rq.target < this.layers.length)
							{
								this.layers[rq.target].sendMessage(LM_SETTILE, rq.lParam, rq.wParam, null, rq.serial, rq.priority);
							}
							break;
						}
						
						default:
						{
							//setTileByDefault();
							this.layers[0].sendMessage(LM_SETTILE, rq.lParam, rq.wParam, null, rq.serial, rq.priority);
							break;
						}
					}
				}
				if(this.events[MM_SETTILE])
				{
					this.commands = this.commands.concat(this.events[MM_SETTILE]);
				}
				break;
			}
			
			case MM_SETSCROLL:
			{
				this.scroll.x = rq.lParam;
				this.scroll.y = rq.wParam;
				for(var a = 0; a < this.layers.length; a++)
				{
					this.layers[a].sendMessage(LM_SETSCROLL, null, rq.lParam, rq.wParam, rq.serial, rq.priority);
				}
				break;
			}
			
			case MM_ADDOBJ:
			{
				this.obj.push(_lParam);
				break;
			}
			
			case MM_REMOBJ:
			{
				switch(typeof(rq.target))
				{
					case "String":
					{
						//setTileByName();
						for(var a = 0; a < this.objs.length; a++)
						{
							if(this.objs[a].getName() == rq.target)
							{
								this.objs[a].sendMessage(LM_SETTILE, rq.lParam, rq.wParam, null, rq.serial, rq.priority);
							}
						}
						break;
					}
					
					case "Number":
					{
						//setTileByIndex();
						if(rq.target < 0)
						{
							for(var a = 0; a < this.objs.length; a++)
							{
								this.objs[a].sendMessage(LM_SETTILE, rq.lParam, rq.wParam, null, rq.serial, rq.priority);
							}
						}
						else if(rq.target < this.objs.length)
						{
							this.objs[rq.target].sendMessage(LM_SETTILE, rq.lParam, rq.wParam, null, rq.serial, rq.priority);
						}
						break;
					}
					
					default:
					{
						//setTileByDefault();
						this.objs[0].sendMessage(LM_SETTILE, rq.lParam, rq.wParam, null, rq.serial, rq.priority);
						break;
					}
				}
				break;
			}
		}
		serial = rq.serial;
		delete(rq);
	}
}

Map.prototype.sendMessage = function(_message, _target, _lParam, _wParam, _serial, _priority)
{
	this.commands.push({'code':_message, 'target':_target, 'lParam':_lParam, 'wParam':_wParam, 'serial':_serial, 'priority':_priority});
}

Map.prototype.init = function(_a)
{
	this.name = _a.name;
	
	this.dim = {'x':_a.dim.x, 'y':_a.dim.y};
	this.sDim = {'x':_a.sDim.x, 'y':_a.sDim.y};
	this.dDim = {'x':_a.dDim.x, 'y':_a.dDim.y};
	
	this.scroll = {'x':0, 'y':0};
	this.speed = {'x':_a.speed.x, 'y':_a.speed.y};

	//tilemap = new Image();
	this.tileMap = _a.tilepath;
	this.bgm = _a.bgm;
	this.gravity = {'x':_a.gravity.x, 'y':_a.gravity.y};
	if(_a.backdrop && _a.backdrop != "None")
	{
		this.backdrop = new Image();
		this.backdrop.src = _a.backdrop;
	}
	this.weather = _a.weather;
	
	this.layers = [];
	
	this.state = SP_VISIBLE | SP_INITIALIZED;
	
	if(this.events[MM_INITIALIZE])
	{
		this.commands = this.commands.concat(this.events[MM_INITIALIZE]);
	}
}

Map.prototype.update = function(_delta)
{
	this.time.delta = _delta;
	this.time.prev = this.time.obj;
	this.time.obj += _delta;
	
	if(this.layers && this.layers.length >0)
	{
		for(var a = 0; a < this.layers.length; a++)
		{
			this.layers[a].update(_delta);
		}
	}
	
	if(this.commands.length >0)
	{
		var reply = this.proc();
		return(reply);
	}
}

Map.prototype.draw = function(_ctx, _tm)
{
	if(this.state & SP_VISIBLE && this.layers.length > 0)
	{
		if(this.backdrop)
		{
			_ctx.drawImage(this.backdrop, 0, 0, this.backdrop.width, this.backdrop.height);
		}
		for(var a = this.layers.length-1; a >=0; a--)
		{
			this.layers[a].draw(_ctx, _tm);
		}
	}
}
