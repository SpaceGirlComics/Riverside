// © 2015 spacegirl.net
// April 15, 2015 - initial submit

function Map()
{
	var layers = [];
	var tm = new Image();
	var bm = new Audio();
	
	var name = "";
	var src = null;
	var width = 0;
	var height = 0;
	var sw = 0;
	var sh = 0;
	var dw = 0;
	var dh = 0;
	
	
	var sx = 0;
	var sy = 0;
	
	
	var UNDEFINED = 0;
	var REQUEST = 1;
	var WAITING = 2;
	var LOADING = 3;
	var PROCESSING = 4;
	var READY = 5;
	var ERRORED = 6;
	
	var state = UNDEFINED;
	var data;
	var lastError = "OK";
	
	
	
	this.isReady = function(){return(state == READY);}
	this.getReadyState = function(){return(state);}
	this.getLastError = function(){return(lastError);}
	
	this.getName = function(){return(name);}
	this.getWidth = function(){return(width);}
	this.getHeight = function(){return(height);}
	this.getSourceWidth = function(){return(sw);}
	this.getSourceHeight = function(){return(sh);}
	this.getDestinationWidth = function(){return(dw);}
	this.getDestinationHeight = function(){return(dh);}
	this.getPixelWidth = function(){return(width*dw);}
	this.getPixelHeight = function(){return(height*dh);}
	this.getTilemap = function(){return(tm.src);}
	this.getBgm = function(){if(bm==null){return("None");}return(bm.src);}
	
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
	
	this.update = function(_delta, _dx, _dy)
	{
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
