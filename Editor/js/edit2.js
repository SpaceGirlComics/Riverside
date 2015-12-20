var source 		= null;							// The wrapper for the source canvas
var dest 		= null;							// The wrapper for the destination canvas
var patterns		= null;

var state 		= 0x00000000;						// A value indicating the current readyness

var mouse 		= {"x":0, "y":0, "px":0, "py":0, "dx":0, "dy":0};	// Mouse Information
var time 		= {'delta':0, 'prev':0, 'obj':0};			// Time Information
var tilemap		= null;							// The tilemap

var tile		= []; //null;

var connection 		= new XMLHttpRequest();

connection.onreadystatechange = function()
{
	var stat = document.getElementById("status");
	switch(connection.readyState)
	{
		case 0:
		{
			stat.innerHTML = "<span style=\"margin-right:10px\">Request Not Initialized.</span>";
			break;
		}
		
		case 1:
		{
			stat.innerHTML = "<span style=\"margin-right:10px\">Connection Established.</span>";
			break;
		}
		
		case 2:
		{
			stat.innerHTML = "<span style=\"margin-right:10px\">Request Recieved.</span>";
			break;
		}
		
		case 3:
		{
			stat.innerHTML = "<span style=\"margin-right:10px\">Processing...</span>";
			break;
		}
		
		case 4:
		{
			switch(connection.status)
			{
				case 200:
				{
					var response = JSON.parse(connection.responseText);
					//var response = JSON.parse("{\"type\":\"temp\"}");
					switch(response.type)
					{
						case "error":
						{
							stat.innerHTML = "<span style=\"margin-right:10px\">"+response.message+"</span>";
							break;
						}
						
						case "success":
						{
							stat.innerHTML = "<span style=\"margin-right:10px\">"+response.message+"</span>";
							break;
						}
						
						case "map":
						{
							stat.innerHTML = "<span style=\"margin-right:10px\">"+response.message+"</span>";
							if(source)
							{
								delete(source);
							}
							if(dest)
							{
								delete(dest);
							}
							source = new Source(null);
							source.init(response.dat);
							dest = new Dest(null);
							dest.init(response.dat);
							break;
						}
						
						default:
						{
							stat.innerHTML = "<span style=\"margin-right:10px\">Unrecognised Response Type. File Load Canceled</span>";
							break;
						}
					}
					break;
				}
				
				case 404:
				{
					stat.innerHTML = "<span style=\"margin-right:10px\">Server Side Script Not Found</span>";
					break;
				}
				
				default:
				{
					stat.innerHTML = "<span style=\"margin-right:10px\">Unrecognised Status Encountered. Request Canceled</span>";
					break;
				}
			}
			break;
		}
		
		default:
		{
			stat.innerHTML = "<span style=\"margin-right:10px\">Unrecognised State Encountered. Request Canceled</span>";
			break;
		}
	}
}

/**
* <p>function to handel when the mouse moves</p>
* <p>mouse info is also added to the status bar</p>
*
* @function
* @name onMouseMove
* @param {EventObject} _e A Mouse Event Object
*/
function onMouseMove(_e)
{
	mouse.px = mouse.x;
	mouse.py = mouse.y;
	mouse.x = _e.clientX;
	mouse.y = _e.clientY;
	mouse.dx = mouse.x - mouse.px;
	mouse.dy = mouse.y - mouse.py;
	var stat = document.getElementById("status");
	stat.innerHTML = "<span style=\"margin-right:10px\">x:"+mouse.x+"</span>";
	stat.innerHTML += "<span style=\"margin-right:10px\">y:"+mouse.y+"</span>";
	stat.innerHTML += "<span style=\"margin-right:10px\">px:"+mouse.px+"</span>";
	stat.innerHTML += "<span style=\"margin-right:10px\">py:"+mouse.py+"</span>";
	stat.innerHTML += "<span style=\"margin-right:10px\">dx:"+mouse.dx+"</span>";
	stat.innerHTML += "<span style=\"margin-right:10px\">dy:"+mouse.dy+"</span>";
	if(drag!=null)
	{
		var box = document.getElementById(drag);
		box.style.top = parseInt(box.style.top)+mouse.dy + "px";
		box.style.left = parseInt(box.style.left)+mouse.dx + "px";
		stat.innerHTML += "<span style=\"margin-right:10px\">Dragging:"+drag+"</span>";
	}
	stat.innerHTML += "<span style=\"margin-right:10px\">state:"+state+"</span>";
	stat.innerHTML += "<span style=\"margin-right:10px\">delta:"+time.delta+"</span>";
	if(dest && dest.getSLR)
	{
		if(document.getElementById("lLayers").options.length > 0)
		{
			stat.innerHTML += "<span style=\"margin-right:10px\">layer:"+document.getElementById("lLayers").options[dest.getSLR()].value+"</span>";
		}
		else
		{
			stat.innerHTML += "<span style=\"margin-right:10px\">layer:</span>";
		}
		stat.innerHTML += "<span style=\"margin-right:10px\">value:"+dest.getSLR()+"</span>";
	}
}

/**
* <p>fills the <em>map</em> form width details for a usual map.</p>
* <p>this function is called when the &ldquo;Auto&rdquo; button in the <em>newBox</em> is pressed</p>
*
* @function
* @name onAuto
*/
function onAuto()
{
	var d = document.forms["map"];
	d["mName"].value = "New Map";
	d["mWidth"].value = "128";
	d["mHeight"].value = "128";
	d["mGravX"].value = "0";
	d["mGravY"].value = "0";
	d["mScrollX"].value = "0";
	d["mScrollY"].value = "0";
	d["mTileMap"].selectedIndex = 1;
	d["mSWidth"].value = "16";
	d["mDWidth"].value = "16";
	d["mSHeight"].value = "16";
	d["mDHeight"].value = "16";
	d["mBgm"].selectedIndex = 1;
	d["mFG"].selectedIndex = 1;
	d["mBG"].selectedIndex = 1;
}

/**
* <p>clears the <em>map</em> form of any input.</p>
* <p>this function is called when the &ldquo;Reset&rdquo; button in the <em>newBox</em is pressed</p>
*
* @function
* @name onReset
*/
function onReset()
{
	var d = document.forms["map"];
	d["mName"].value = "";
	d["mWidth"].value = "";
	d["mHeight"].value = "";
	d["mGravX"].value = "";
	d["mGravY"].value = "";
	d["mScrollX"].value = "";
	d["mScrollY"].value = "";
	d["mTileMap"].selectedIndex = 0;
	d["mSWidth"].value = "";
	d["mDWidth"].value = "";
	d["mSHeight"].value = "";
	d["mDHeight"].value = "";
	d["mBgm"].selectedIndex = 0;
	d["mFG"].selectedIndex = 0;
	d["mBG"].selectedIndex = 0;
}

/**
* <p>plays the music selected.</p>
* <p>changes the value of the button so that the appropriat symbol is displayed when playing/stopped</p>
*
* @function
* @name onPlay
* @param {HTMLInputElement} _t The Calling Object, The <em>Play<em> button
* @param {eventObject} _e Event object
*/
function onPlay(_t, _e)
{
	var aud = document.getElementById("mAudio");
	var bm = document.getElementById("mBgm");
	var ext = ".ogg";
	if(aud.canPlayType("audio/ogg") == "")
	{
		ext = ".mp3";
	}
	if(bm.value != "None" && bm.value != "BGM")
	{
		if(_t.value == ">")
		{
			aud.src = "music/"+bm.value+ext;
			aud.play();
			_t.value = "[]";
		}
		else
		{
			aud.pause();
			aud.currentTime = 0;
			_t.value = ">";
		}
	}
}

/**
* <p>resets the <em>play</em> button when the music stops playing</p>
*
* @function
* @name onAudioEnd
* @param {HTMLAudioElement} _t Audio Tag 
*/
function onAudioEnd(_t)
{
	var pb = document.getElementById("mPlay");
	pb.value = ">";
	_t.currentTime = 0;
}

/**
* <p>Called when the <em>Build</em> button is pushed, gets the input from the &ldquo;map&rdquo; form
* and creates a new map</p>
*
* @function
* @name onBuild
*/
function onBuild()
{
	if(state==3)
	{
		var d = document.forms["map"];
		var att = {"name":d["mName"].value,
		       "dim":{"x":parseInt(d["mWidth"].value),
		       	      "y":parseInt(d["mHeight"].value)},
		       "gravity":{"x":parseFloat(d["mGravX"].value),
		       		  "y":parseFloat(d["mGravY"].value)},
		       "speed":{"x":parseFloat(d["mScrollX"].value),
		       		"y":parseFloat(d["mScrollY"].value)},
		       "tilePath":"img/tm/"+d["mTileMap"].value,
		       "sDim":{"x":parseInt(d["mSWidth"].value),
		       	       "y":parseInt(d["mSHeight"].value)},
		       "dDim":{"x":parseInt(d["mDWidth"].value),
		       	       "y":parseInt(d["mDHeight"].value)},
		       "bgm":d["mBgm"].value,
		       "weather":d["mFG"].value,
		       "backdrop":d["mBG"].value};
		tilemap.src = att.tilePath;
		source.init("tSource", att);
		dest.init("destination", att);
		patterns.init("pSource", att.sDim.x, att.sDim.y);
		state = 0x00000004;
		onWindowClose('newBox');
		onWindowOpen('tileBox', false);
	}
}

/**
* <p>updates the status the time and state of the program</p>
*
* @function
* @name update
* @param {DOMHighResTimeStamp} _ticks The amount of time the page has been loaded
*/
function update(_ticks)
{
	time.prev = time.obj;
	time.obj = _ticks;
	time.delta = time.obj-time.prev;
	switch(state & 0x000000ff)
	{
		case 0x00000000:
		{
			if(source == null)
			{
				source = new Source();
				tilemap = new Image();
				
				state++;
			}
			break;
		}
		case 0x00000001:
		{
			if(dest == null)
			{
				dest = new Dest();
				state++;
			}
			break;
		}
		
		case 0x00000002:
		{
			if(patterns == null)
			{
				patterns = new Patterns();
				state++;
			}
			break;
		}
		
		case 0x00000003:
		{
			break;
			
		}
		
		case 0x00000004:
		{
			if(tilemap.complete == true)
			{
				source.tw.x = tilemap.width;
				source.tw.y = tilemap.height;
				state++;
				source.draw(tilemap);
			}
			break;
		}
		
		case 0x00000005:
		{
			
			source.update(time.delta);
			dest.update(time.delta);
			dest.draw(tilemap);
			break;
		}
	}
	
	requestAnimationFrame(update);
}

function onPatternEvent(_t, _e)
{
	switch(_e.type)
	{
		case "mousemove":
		{
			var ec = getElementCoordinates(_e.clientX, _e.clientY, _t);
			var a = {'x': ec[0], 'y': ec[1], 'buttons':_e.buttons};
			patterns.onEvent(SM_MOUSEMOVE, a, null);
			break;
		}
	}
	patterns.draw(0);
}

/**
* <p>Called to handel events for the source canvas and redraws it</p>
*
* @function
* @name onSourceEvent
* @param {HTMLCanvasElement} _t the source canvas; the function caller
* @param {EventObject} _e the event object
*/
function onSourceEvent(_t, _e)
{
	
	switch(_e.type)
	{
		case "mousemove":
		{
			var ec = getElementCoordinates(_e.clientX, _e.clientY, _t);
			var a = {'x': ec[0], 'y': ec[1], 'buttons':_e.buttons};
			source.onEvent(SM_MOUSEMOVE, a, null);
			break;
		}
		
		case "mousedown":
		{
			var ec = getElementCoordinates(_e.clientX, _e.clientY, _t);
			var a = {'x': ec[0], 'y': ec[1], 'buttons':_e.buttons};
			source.onEvent(SM_MBDOWN, a, null);
			break;
		}
		
		case "mouseup":
		{
			var ec = getElementCoordinates(_e.clientX, _e.clientY, _t);
			var a = {'x': ec[0], 'y': ec[1], 'buttons':_e.buttons};
			source.onEvent(SM_MBUP, a, null);
			break;
		}
		
		case "mouseleave":
		{
			source.onEvent(SM_MOUSEOUT, null, null);
			break
		}
	}
	source.draw(tilemap);
}

/**
* <p>Called to handel events for the destination canvas</p>
*
* @function
* @name onSourceEvent
* @param {HTMLCanvasElement} _t the source canvas; the function caller
* @param {EventObject} _e the event object
*/
function onDestEvent(_t, _e)
{
	switch(_e.type)
	{
		case "mousemove":
		{
			var ec = getElementCoordinates(_e.clientX, _e.clientY, _t);
			var l = document.getElementById("lLayers").selectedIndex;
			var nt = {'x':source.cursor.x, 'y': source.cursor.y, 'f': null};
			switch(state & 0x0000ff00)
			{
				case 0x00000100:
				{
					 nt.f = {'c': parseInt(document.getElementById("tFirst").value),
					 'min': parseInt(document.getElementById("tMin").value),
					 'max': parseInt(document.getElementById("tMax").value),
					 'lastUpdate': 0,
					 'fps': parseInt(document.getElementById("tFps").value),
					 'xy': []};
					 for(var a = 0; a < tile.length; a++)
					 {
					 	nt.f.xy.push({'x': tile[a].x, 'y': tile[a].y});
					 }
					 break;
				}
				
				case 0x00000200:
				{
					document.getElementById("ptPointX").value = ec[0];
					document.getElementById("ptPointY").value = ec[1];
					break;
				}
			}
			var b = {'x': ec[0], 'y': ec[1], 'buttons':_e.buttons, 'layer':l};
			dest.onEvent(SM_MOUSEMOVE, b, nt);
			break;
		}
		
		case "mousedown":
		{
			var ec = getElementCoordinates(_e.clientX, _e.clientY, _t);
			var l = document.getElementById("lLayers").selectedIndex;
			var nt = {'x':source.cursor.x, 'y': source.cursor.y, 'f': null};
			switch(state & 0x0000ff00)
			{
				case 0x00000100:
				{
					 nt.f = {'c': parseInt(document.getElementById("tFirst").value),
					 'min': parseInt(document.getElementById("tMin").value),
					 'max': parseInt(document.getElementById("tMax").value),
					 'lastUpdate': 0,
					 'fps': parseInt(document.getElementById("tFps").value),
					 'xy': []};
					 for(var a = 0; a < tile.length; a++)
					 {
					 	nt.f.xy.push({'x': tile[a].x, 'y': tile[a].y});
					 }
					 break;
				}
				
				case 0x00000200:
				{
					document.getElementById("ptPoints").innerHTML += "<option>"+document.getElementById("ptPointX").value+", "+document.getElementById("ptPointY").value+"</option>";
					break
				}
			}
			var a = {'x': ec[0], 'y': ec[1], 'buttons':_e.buttons, 'layer':l};
			dest.onEvent(SM_MBDOWN, a, nt);
			break;
		}
		
		case "mouseup":
		{
			var ec = getElementCoordinates(_e.clientX, _e.clientY, _t);
			var l = document.getElementById("lLayers").selectedIndex;
			var a = {'x': ec[0], 'y': ec[1], 'buttons':_e.buttons, 'layer':l};
			dest.onEvent(SM_MBUP, a, null);
			break;
		}
		
		case "mouseleave":
		{
			dest.onEvent(SM_MOUSEOUT, null, null);
			break
		}
	}
}

/**
* <p>Creates A new Layer on the map. called when the user presses the <em>plus</em> button in <em>layerBox.</em></p>
* <p>The name of the new layer is taken from the <em>lName</em> and added to the <em>lLayers</em> control</p>
* 
* @function
* @name onAddLayer
*/
function onAddLayer()
{
	if(dest)
	{
		var name = document.getElementById("lName");
		if(name.value.length > 0 && name.style.backgroundColor == "rgb(255, 255, 255)")
		{
			var list = document.getElementById("lLayers");
			for(var a = 0; a < list.options.length; a++)
			{
				if(list.options[a].value == name.value)
				{
					var stat = document.getElementById("status");
					stat.innerHTML = "<span style=\"margin-right:10px\">ERROR: Layer Name Is Already Used.</span>";
					return;
				}
			}
			dest.onEvent(SM_MKLAYER, name.value, null);
			list.innerHTML = "<option>"+name.value+ "</option>" + list.innerHTML;
			list.selectedIndex = 0;
			document.getElementById("lVisible").checked = true;
			name.value = "";
		}
		else
		{
			var stat = document.getElementById("status");
			stat.innerHTML = "<span style=\"margin-right:10px\">ERROR: Layer Name Not Accepted.</span>";
		}
	}
}

/**
* <p>Removes the selected layer from the map and <em>lLayers</em> control.</p>
* <p>called when the user presses the &ldquo;-&rdquo;</p>
* 
* @function
* @name onRemLayer
*/
function onRemLayer()
{
	if(dest)
	{
		var list = document.getElementById("lLayers");
		if(list.options.length > 0)
		{
			var a = list.selectedIndex;
			dest.onEvent(SM_RMLAYER, a, null);
			list.remove(a);
			if(list.options.length > 0)
			{
				if(list.selectedIndex < 0)
				{
					list.selectedIndex = 0;
				}
			}
		}
	}
}

/**
* <p>Changes the selected layer. Called when the user selects a layer form the <em>lLayers</em></p>
* 
* @function
* @name onLayerSelect
*/
function onLayerSelect()
{
	if(dest)
	{
		var list = document.getElementById("lLayers");
		//alert((list.options.length-1) - list.selectedIndex);
		dest.onEvent(SM_SLAYER, list.selectedIndex, null);
		/*if(dest.isLayerVisible())
		{
			document.getElementById("lVisible").checked = true;
		}
		else
		{
			document.getElementById("lVisible").checked = false;
		}*/
	}
}

/**
* <p>Makes the selected layer visible/invisible.</p>
* <p>Called when the user clicks the <em>lVisible</em></p>
*
* @function
* @name onVisible
* @param {HTMLInputElement} _t The calling element
*/
function onVisible(_t)
{
	if(dest)
	{
		var list = document.getElementById("lLayers");
		if(list.selectedIndex >=0)
		{
			dest.onEvent(SM_VSLAYER, _t.checked, list.selectedIndex);
		} 
	}
}

function onRaise()
{
	if(dest)
	{
		var list = document.getElementById("lLayers");
		
		if(list.selectedIndex > 0)
		{
			dest.onEvent(SM_RSLAYER, list.selectedIndex, null);
			var raise = list.options[list.selectedIndex].innerHTML;
			list.options[list.selectedIndex].innerHTML = list.options[list.selectedIndex--].innerHTML;
			list.options[list.selectedIndex].innerHTML = raise;
		}
	}
}

function onLower()
{
	if(dest)
	{
		var list = document.getElementById("lLayers");
		
		if(list.selectedIndex < list.options.length)
		{
			dest.onEvent(SM_LWLAYER, list.selectedIndex, null);
			var raise = list.options[list.selectedIndex].innerHTML;
			list.options[list.selectedIndex].innerHTML = list.options[list.selectedIndex++].innerHTML;
			list.options[list.selectedIndex].innerHTML = raise;
		}
	}
}

function onOpen()
{
	var qs = "fname="+document.getElementById("lFileSelect").value;
	
	connection.open("POST", "doOpen.php", true);
	connection.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	connection.send(qs);
}

function onAnimationCheck(_t)
{
	if(_t.checked)
	{
		state &= 0xffff00ff;
		state |= 0x00000100;
	}
	else
	{
		delete(tile);
		state &= 0xffff00ff;
	}
}

function onAddFrame()
{
	var a = {'x':source.cursor.x, 'y':source.cursor.y, 'w':source.cursor.w, 'h':source.cursor.h};
	tile.push(a);
	document.getElementById("tframes").innerHTML += "<option>"+tile[tile.length-1].x+", "+tile[tile.length-1].y+"</option>";
	document.getElementById("tframes").selectedIndex = document.getElementById("tframes").options.length - 1;
}

function onRemFrame()
{
	tile.splice(document.getElementById("tframes"), 1);
	document.getElementById("tframes").remove(document.getElementById("tframes").selectedIndex);
	document.getElementById("tframes").selectedIndex = document.getElementById("tframes").options.length - 1;
}

function onClearFrames()
{
	document.getElementById("tframes").selectedIndex = -1;
	document.getElementById("tframes").innerHTML = "";
	delete(tile);
	tile = [];
}

function onCommand(_t)
{
	var out = document.getElementById("consoleOutput");
	var tok = _t.split();
	switch(tok[0])
	{
		case "addpoint":
		{
			dest.onEvent(SM_COMMAND, {'x': ec[0], 'y': ec[1], 'buttons':_e.buttons, 'layer':l}, nt);
			break;
		}
	}
}

function addPath()
{
	var list = document.getElementById("ptName");
	var input = document.getElementById("ptNewName");
	
	if(input.value.length >0)
	{
		list.innerHTML += "<option>"+input.value+"</option>";
	}
}

function onPointCheck(_t)
{
	if(_t.checked)
	{
		state &= 0xffff00ff;
		state |= 0x00000200;
	}
	else
	{
		state &= 0xffff00ff;
	}
}

requestAnimationFrame(update);
