function Tile(_com)
{
	this.state 		= 0x00000000;

	this.sDim		= {'x':0, 'y':0, 'w':0, 'h':0};			// Default source box width & height in pixels. Expressed as a vertex
	this.f			= null; //{'c': 0, 'min': 0, 'max': 0, 'lastUpdate': 0, 'fps': 0, 'xy': []};
	this.dDim		= {'x':0, 'y':0, 'w':0, 'h':0};			// Default destination box width & height in pixels. Expressed as a vertex
	
	
	
	this.events		= [];					// instructions to push to the command queue when an event fires
	this.commands		= [];					// enqueued commands, change to priority queue later
	
	
	this.speed		= null;					// speed if the tile moves
	this.wp			= [];					// list of waypoints to move to
	this.wpIndex		= -1;					// current waypoint
	
	this.time		= {'prev':0, 'delta':0, 'obj':0};	// contains the amount of time since instantiation;
									// since and of last update in miliseconds
									
	this.num		= 0;
	
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

Tile.prototype.proc = function()
{
	var reply = [];
	var serial = true;
	var rq;
	while(this.commands.length > 0 && serial)
	{
		rq = this.commands.shift();
		switch(rq.code)
		{
			case TM_NULL:		// null
			{
				if(this.events[TM_NULL])
				{
					this.commands = this.commands.concat(this.events[TM_NULL]);
				}
				break;
			}
			
			case TM_DOMODAL:	// post modal state request
			case TM_ENDMODAL:	// post end modal state request
			case TM_DODIALOG:	// post display dialog request
			case TM_CLOSEDIALOG:	// post close dialog request
			case TM_SHOP:		// post open shop request
			case TM_BATTLECRY:	// post battle cry request
			case TM_BATTLE:		// post open battle request
			case TM_BOSS:		// post boss battle request
			case TM_DELETE:		// post delete request
			case TM_CREATE:		// post create request;
			case TM_LOADMAP:	// post load map request
			case TM_LOOKAT:		// post scroll request
			{
				reply.push(rq);
				break;
			}
			
			case TM_TRANSLATE:	// xy translate
			{
				this.dDim.x += rq.lParam;
				this.dDim.y += rq.wParam;
				break;
			}
			case TM_MOVETO:		// set xy position
			{
				this.dDim.x = rq.lParam;
				this.dDim.y = rq.wParam;
				break;
			}
			
			case TM_SETTILE:
			{
				//sDim = rq.lParam;
				this.sDim.x = rq.lParam.x;
				this.sDim.y = rq.lParam.y;
				if(rq.lParam.f)
				{
					if(this.f)
					{
						delete(this.f);
						this.f = null;
					}
					this.f = {'c': rq.lParam.f.c, 'min':rq.lParam.f.min, 'max': rq.lParam.f.max, 'lastUpdate': 0, 'fps': rq.lParam.f.fps, 'xy': []};
					for(var a = 0; a < rq.lParam.f.xy.length; a++)
					{
						this.f.xy.push({'x':rq.lParam.f.xy[a].x, 'y':rq.lParam.f.xy[a].y});
					}
				}
				else
				{
					delete(this.f);
					this.f = null;
				}
				break;
			}
			
			case TM_UV_TRANSLATE:	// uv translate
			{
				this.sDim.x += rq.lParam;
				this.sDim.y += rq.wParam;
				break;
			}
			case TM_UV_MOVETO:	// set uv position
			{
				this.sDim.x = rq.lParam;
				this.sDim.y = rq.wParam;
				break;
			}
			
			case TM_PUSHPOINT:
			{
				if(this.wpIndex < 0)
				{
					this.wpIndex = 0;
				}
				this.wp.push(rq.lParam);
				break;
			}
			case TM_POPPOINT:
			{
				if(this.wp.length)
				{
					delete(this.wp.pop());
					if(this.wp.length <1)
					{
						this.wpIndex = -1;
					}
					else if(this.wpIndex >= this.wp.length)
					{
						this.wpIndex = 0;
					}
				}
				break;
			}
			case TM_ADDPOINT:
			{
				if(this.wpIndex < 0)
				{
					this.wpIndex = 0;
				}
				this.wp.unshift(rq.lParam);
				break;
			}
			case TM_REMPOINT:
			{
				if(this.wp.length > 0)
				{
					delete(this.wp.shift());
					if(this.wp.length <1)
					{
						this.wpIndex = -1;
					}
					else if(this.wpIndex >= this.wp.length)
					{
						this.wpIndex = 0;
					}
				}
				break;
			}
			case TM_INSPOINT:	// set Destination
			case TM_FIND:		// set Destination (in future this will use better pathfinding)
			{
				if(this.wpIndex < 0)
				{
					this.wpIndex = 0;
				}
				this.wp.splice(this.wpIndex, 0, rq.lParam);
				break;
			}
			case TM_SNIPPOINT:
			{
				if(this.wpIndex >= 0)
				{
					this.wp.splice(this.wpIndex, rq.lParam);
				}
				break;
			}
			case TM_SETNODE:	// set path index
			{
				this.wpIndex = rq.lParam;
				break;
			}
			
			case TM_SCALE:		// xy scale
			{
				this.dDim.w *= rq.lParam;
				this.dDim.h *= rq.wParam;
				break;
			}
			
			
			case TM_RESIZE:		// absolute resize
			{
				this.dDim.w = rq.lParam;
				this.dDim.h = rq.wParam;
			}
			case TM_RERESIZE:	// relative resize
			{
				this.dDim.w += rq.lParam;
				this.dDim.h += rq.wParam;
			}
			case TM_REWIDTH:	// relative resize width
			{
				this.dDim.w += rq.lParam;
				break;
			}
			case TM_REHEIGHT:	// relative resize height
			{
				this.dDim.h += rq.lParam;
				break;
			}
			case TM_SETWIDTH:	// set Width
			{
				this.dDim.w = rq.lParam;
				break;
			}
			case TM_SETHEIGHT:	// set height
			{
				this.dDim.h = rq.lParam;
				break;
			}
			
			case TM_ZOOM:		// uv scale
			{
				this.sDim.w *= rq.lParam;
				this.sDim.h *= rq.wParam;
				break;
			}
			case TM_UV_RESIZE:	// absolute resize source box
			{
				this.sDim.w = rq.lParam;
				this.sDim.h = rq.wParam;
				break;
			}
			case TM_UV_RERESIZE:	// relative resize source box
			{
				this.sDim.w += rq.lParam;
				this.sDim.h += rq.wParam;
				break;
			}
			case TM_UV_REWIDTH:	// relative resize u
			{
				this.sDim.w += rq.lParam;
				break;
			}
			case TM_UV_REHEIGHT:	// relative resize v
			{
				this.sDim.h += rq.lParam;
				break;
			}
			case TM_UV_SETWIDTH:	// set uv width
			{
				this.sDim.w = rq.lParam;
				break;
			}
			case TM_UV_SETHEIGHT:	// set uv height
			{
				this.sDim.h = rq.lParam;
				break;
			}
			
			case TM_SETSTATE:	// set state
			{
				if(this.events[TM_STATECHANGE])
				{
					this.commands = this.commands.concat(this.events[TM_STATECHANGE]);
				}
				this.state = rq.lParam;
				break;
			}
			case TM_ORSTATE:	// "or" state
			{
				if(this.events[TM_STATECHANGE])
				{
					this.commands = this.commands.concat(this.events[TM_STATECHANGE]);
				}
				this.state |= rq.lParam;
				break;
			}
			case TM_ANDSTATE:	// "and" state
			{
				if(this.events[TM_STATECHANGE])
				{
					this.commands = this.commands.concat(this.events[TM_STATECHANGE]);
				}
				this.state &= rq.lParam;
				break;
			}
			
			case TM_SETFRAME:	// set current frame
			{
				if(this.f && rq.lParam >= this.f.min && rq.lParam < this.f.max)
				{
					this.f.c = rq.lParam;
					this.sDim.x = this.f.xy[this.f.c].x;
					this.sDim.y = this.f.xy[this.f.c].y;
				}
				break;
			}
			case TM_INCFRAME:
			{
				if(this.f)
				{
					this.f.c++;
					if(this.f.c >this.f.max)
					{
						this.f.c = this.f.max;
					}
					this.sDim.x = this.f.xy[this.f.c].x;
					this.sDim.y = this.f.xy[this.f.c].y;
				}
			}
			case TM_DECFRAME:
			{
				if(this.f)
				{
					this.f.c--;
					if(this.f.c < this.f.min)
					{
						this.f.c = this.f.min;
					}
					this.sDim.x = this.f.xy[this.f.c].x;
					this.sDim.y = this.f.xy[this.f.c].y;
				}
			}
			case TM_INCFRAMELOOP:
			{
				if(this.f)
				{
					this.f.c++;
					if(this.f.c > this.f.max)
					{
						this.f.c = this.f.min;
					}
					this.sDim.x = this.f.xy[this.f.c].x;
					this.sDim.y = this.f.xy[this.f.c].y;
				}
			}
			case TM_DECFRAMELOOP:
			{
				if(this.f)
				{
					this.f.c--;
					if(this.f.c < this.f.min)
					{
						this.f.c = this.f.max;
					}
					this.sDim.x = this.f.xy[this.f.c].x;
					this.sDim.y = this.f.xy[this.f.c].y;
				}
			}
			case TM_MAXFRAME:	// set max frame
			{
				if(this.f && rq.lParam > this.f.min && rq.lParam < this.f.xy.length)
				{
					this.f.max = rq.lParam;
				}
				break;
			}
			case TM_MINFRAME:
			{
				if(this.f && rq.lParam < this.f.max && rq.lParma >= 0)
				{
					this.f.min = rq.lParam;
				}
				break;
			}
			case TM_SETFLIMIT:
			{
				if(this.f && rq.lParam >= 0 && rq.wParam < this.f.xy.length && rq.lParam <= rq.wParam)
				{
					this.f.min = rq.lParam;
					this.f.max = rq.wParam;
					if(this.f.c < this.f.min || this.f.c >= this.f.max)
					{
						this.f.c = this.f.min;
					} 
					this.sDim.x = this.f.xy[this.f.c].x;
					this.sDim.y = this.f.xy[this.f.c].y;
				}
				break;
			}
			case TM_FRAMERATE:	// set frame Rate
			{
				if(this.f)
				{
					this.f.fps = rq.lParam;
				}
				break;
			}
			
			case TM_VISIBLE:	// visible
			{
				if(rq.lParam)
				{
					if(this.events[TM_HIDE])
					{
						this.commands = this.commands.concat(this.events[TM_HIDE]);
					}
					if(this.events[TM_STATECHANGE])
					{
						this.commands = this.commands.concat(this.events[TM_STATECHANGE]);
					}
					this.state ^= SP_VISIBLE;
				}
				else
				{
					if(this.events[TM_SHOW])
					{
						this.commands = this.commands.concat(this.events[TM_SHOW]);
					}
					if(this.events[TM_STATECHANGE])
					{
						this.commands = this.commands.concat(this.events[TM_STATECHANGE]);
					}
					this.state |= SP_VISIBLE;
				}
				break;
			}
			
			case TM_DESTROY:	// 
			{
				break;
			}
		}
		serial = rq.serial;
		delete(rq);
	}
	return(reply);
}

Tile.prototype.sendMessage = function(_message, _target, _lParam, _wParam, _serial, _priority)
{
	this.commands.push({'code':_message, 'target':_target, 'lParam':_lParam, 'wParam':_wParam, 'serial':_serial, 'priority':_priority}); 
}

Tile.prototype.setCommand = function(_e, _target, _message, _lParam, _wParam, _serial, _priority)
{
	if(!this.events[_e])
	{
		this.events[_e] = [];
	}
	this.events[_e].push({'target':_target, 'code':_message, 'lParam':_lParam, 'wParam':_wParam, 'serial':_serial, 'priority':_priority});
}

Tile.prototype.setCommands = function(_e, messages)
{
	if(!this.events[_e])
	{
		this.events[_e] = [];
	}
	this.events = this.events[_e].concat(messages);
}

Tile.prototype.fire = function(_e)
{
	if(this.events[_e])
	{
		this.commands = this.commands.concat(this.events[_e]);
	}
}

Tile.prototype.init = function(_s, _d, _f)
{
	this.dDim = {'x':_d.x, 'y':_d.y, 'w':_d.w, 'h':_d.h};
	this.sDim = {'x':_s[0].x, 'y':_s[0].y, 'w':_s[0].w, 'h':_s[0].h};
	
	if(_f)
	{
		this.f = {'c': _f.c, 'min': _f.min, 'max': _f.amx, 'lastUpdate': 0, 'fps': _f.fps, 'xy': []};
		for(var a = 0; a < _f.xy.length; a++)
		{
			this.f.xy.push({'x':_f.xy[a].x, 'y':_f.xy[a].y});
		}
	}
	else
	{
		this.f = null;
	}
	
	this.speed = {'x':0, 'y':0};
	
	this.state = SP_VISIBLE | SP_INITIALIZED;
	
	if(this.events[TM_INTIALIZE])
	{
		this.commands = this.commands.concat(this.events[TM_INTIALIZE]);
	}
}

Tile.prototype.update = function(_delta)
{
	this.time.prev = this.time.obj;
	this.time.obj += _delta;
	this.time.delta = _delta;
	
	var reply =[];
	
	if(this.wpIndex >=0)
	{
		if(this.wp[this.wpIndex].x > this.dDim.x)
		{
			this.dDim.x += this.speed.x * this.time.delta;
		}
		else if(this.wp[this.wpIndex].x < this.dDim.x)
		{
			this.dDim.x -= this.speed.x * this.time.delta;
		}
		
		if(this.wp[this.wpIndex].y > this.dDim.y)
		{
			this.dDim.y += this.speed.y * this.time.delta;
		}
		else if(this.wp[this.wpIndex].y < this.dDim.y)
		{
			this.dDim.y -= this.speed.y * this.time.delta;
		}
	}
	
	if(this.f && this.time.obj - this.f.lastUpdate >= this.f.fps)
	{
		this.f.lastUpdate = this.time.obj;
		this.f.c++;
		if(this.f.c > this.f.max)
		{
			this.f.c = this.f.min;
		}
		this.sDim.x = this.f.xy[this.f.c].x;
		this.sDim.y = this.f.xy[this.f.c].y;
		if(this.events[TM_FRAMECHANGE])
		{
			this.commands = this.commands.concat(this.events[TM_FRAMECHANGE]);
		}
	}
	
	if(this.commands.length >0)
	{
		reply = reply.concat(this.proc());
	}
	
	if(this.events[TM_UPDATE])
	{
		this.commands = this.commands.concat(this.events[TM_UPDATE]);
	}
	
	return(reply);
}

Tile.prototype.draw = function(_ctx, _image)
{
	if(this.state & SP_VISIBLE)
	{
		_ctx.drawImage(_image, this.sDim.x, this.sDim.y, this.sDim.w, this.sDim.h, this.dDim.x, this.dDim.y, this.dDim.w, this.dDim.h);
		if(this.events[TM_DRAW])
		{
			this.commands = this.commands.concat(this.events[TM_DRAW]);
		}
	}
}
