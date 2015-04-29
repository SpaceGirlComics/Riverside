// contains data for a level
// © 2015 spacegirl.net
// April 15, 2015 - initial submit

function Map()
{
	var layers = [];		// the array of layers that comprse this map
	var tm = new Image();		// the tilemap texture (externalize this?)
	var bm = new Audio();		// the background music (this too?)
	
	var name = "";			// name of the map
	var src = null;			// map file name
	var width = 0;			// width of the map in tiles
	var height = 0;			// height of the map in tiles
	var sw = 0;			// source tile width
	var sh = 0;			// source tile height
	var dw = 0;			// destination tile width
	var dh = 0;			// destination tile height
	
	// i dont remember what these are for; may remove
	var sx = 0;
	var sy = 0;
	
	// map states; rem. try to find a way to make thes values static
	var UNDEFINED = 0;
	var REQUEST = 1;
	var WAITING = 2;
	var LOADING = 3;
	var PROCESSING = 4;
	var READY = 5;
	var ERRORED = 6;
	
	var state = UNDEFINED;			// the current state of the map
	var data;				// holds the data received from the server
	var lastError = "OK";			// string describing the last error if we encounter an ERRORED state
	
	this.isReady = function(){return(state == READY);}	// returns true if the map is ready
	this.getReadyState = function(){return(state);}		// gets the current state of the map
	this.getLastError = function(){return(lastError);}	// returns a description of the most recent error
	
	this.getName = function(){return(name);}		// returns the name of the map
	this.getWidth = function(){return(width);}		// returns the width of the map in tiles
	this.getHeight = function(){return(height);}		// returns the height of the map in tiles
	this.getSourceWidth = function(){return(sw);}		// returns the default width of source tiles for this map
	this.getSourceHeight = function(){return(sh);}		// returns the default height of source tiles for this map
	this.getDestinationWidth = function(){return(dw);}	// returns the default width of destination tiles for this map
	this.getDestinationHeight = function(){return(dh);}	// returns the default height of destination tiles for this map
	this.getPixelWidth = function(){return(width*dw);}	// returns the width of the map in pixels
	this.getPixelHeight = function(){return(height*dh);}	// returns the height of the map in pixels
	this.getTilemap = function(){return(tm.src);}		// returns the url of the tilemap
	this.getBgm = function(){if(bm==null){return("None");}return(bm.src);}	// returns the url of the background music
	
	// loads a new map
	// _map = string, map file name 
	this.load = function(_map)
	{
		src = _map;
		state = REQUEST;
	}
	
	this.draw = function(_ctx)
	{

		for(var x = layers.length-1; x >= 0; x--)
		{
			layers[x].draw(tm, _ctx);
			if(x ==1){player.draw(_ctx);}
		}
	}
	
	// makes a request for map data from the server
	function doRequest()
	{
		var rq = new XMLHttpRequest();
		rq.onreadystatechange = function()
		{
			switch(rq.readyState)
			{
				case 0:
				case 1:
				case 2:
				case 3:
				{
					state = WAITING;
					break;
				}
				
				case 4:
				{
					switch(rq.status)
					{
						case 404:
						{
							state = ERRORED;
							lastError = "Server Side Error, Page Not Found: "+rq.status;
							break;
						}
						
						case 200:
						{
							data = JSON.parse(rq.responseText);
							tm.src = "tilemaps/"+data.tilemap;
							if(data.bgm != "None")
							{
								bm.src = data.bgm;
							}
							state = LOADING;
							break;
						}
						
						default:
						{
							state = ERRORED;
							lastError = "Undefined Status In Ajax Request: "+rq.status;
							break;
						}
					}
					
					break;
				}
				
				default:
				{
					state = ERRORED;
					lastError = "Undefined Ready State In Ajax Request: "+rq.readyState;
					break;
				}
			}
		}
		
		rq.open("POST", "doLoad.php", true)
		rq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		rq.send("n="+src);
	}
	
	// processes data received from the server
	// _delta = float, delta time, not used; may remove
	function doProcessing(_delta)
	{
		name = data.name;
		width = data.width;
		height = data.height;
		sw = data.sourceWidth;
		sh = data.sourceHeight;
		dw = data.destinationWidth;
		dh = data.destinationHeight;		
		
		for(var x = 0; x < data.layers.length; x++)
		{
			layers[x] = new Layer();
			switch(data.encode)
			{
				case 0:
				{
					layers[x].create(data.layers[x].name, data.layers[x].tiles, tm.width, width, height, sw, sh, dw, dh);
					break;
				}
				
				case 1:
				{
					layers[x].create(data.layers[x].name, type1RLD(data.layers[x].tiles), tm.width, width, height, sw, sh, dw, dh);
					break;
				}
				
				case 2:
				{
					layers[x].create(data.layers[x].name, type2RLD(data.layers[x].tiles), tm.width, width, height, sw, sh, dw, dh);
					break;
				}
				
				default:
				{
					state = ERRORED;
					lastError = "Unrecognised Decode Type";
					break;
				}
			}
		}
		delete(data);
		state = READY;	
	}
	
	// get x translation
	this.getDX = function()
	{
		return(sx);
	}
	
	// get y translation
	this.getDY = function()
	{
		return(sy);
	}
	
	// cyclic update
	// _delta = float, delta time
	// _dx, _dy, = tranlated xy
	this.update = function(_delta, _dx, _dy)
	{
		sx = _dx;
		sy = _dy;
		switch(state)
		{
			case REQUEST:
			{
				doRequest();
				break;
			}
			
			case WAITING:
			{
				break;
			}
			
			case LOADING:
			{
				if(tm.complete == true)
				{
					state = PROCESSING;
				}
				
				
				break;
			}
			
			case PROCESSING:
			{
				doProcessing(_delta);
				break;	
			}
			
			case READY:
			{
				for(var x = 0; x < layers.length; x++)
				{
					if(x==1 && player)
					{
						layers[x].check(player);
					}
					layers[x].update(_delta, _dx, _dy);
					
				}
				
				break;
			}
			
			case ERRORED:
			{
				break;
			}
		}
	}

}
