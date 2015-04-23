// core game object
// © 2015 spacegirl.net
// April 15, 2015 - initial submit

function Game()
{
	// game states; more to come
	var INIT	= 0x00000000;
	var TITLE	= 0x00000001;
	var INGAME	= 0x00000002;
	var LOADING	= 0x00000003;
	
	// game states as strings for when dev mode is on
	var states	= ["INIT", "TITLE", "INGAME", "LOADING"];

	var devMode	= false;			// when true displays info for debugging and refinement purposes
	
	var state = INIT;				// current came state
	var phase = 0;					// sub state, not used yet but most likeley will be
	
	var images = [];				// array of images in use, not used yet but most likeley will be
	
	var totalTime = 0;				// time passed since game started
	var prevTime = 0;				// time of the previous cycle
	var delta = 0;					// time since the previous cyle
	
	var dx = 0;
	var dy = 0;
	
	var can;					// canvas element
	var ctx;					// its context
	
	var map = null;					// map object
	
	var that = this;				// self reference; trying to get rid of these
	
	// retruns the current map
	this.getMap = function()
	{
		return(map);
	}
	
	// writes info to the canvas
	function drawDevMode()
	{
		ctx.fillStyle = "#ffffff";
		ctx.fillText("Total \nTime: "+totalTime, 10, 10);
		ctx.fillText("Previous Time: "+prevTime, 10, 26);
		ctx.fillText("Delta: "+delta, 10, 42);
		ctx.fillText("State: "+states[state]+"("+state+")", 10, 58);
		
		ctx.fillText("Map: "+map.getName(), 210, 10);
		ctx.fillText("Map Error: "+map.getLastError(), 210, 26);
		ctx.fillText("Map RDST: "+map.isReady()+"("+map.getReadyState()+")", 210, 42);
		ctx.fillText("Width: "+map.getWidth(), 210, 58);
		ctx.fillText("Height: "+map.getHeight(), 210, 74);
		ctx.fillText("TileMap: "+map.getTilemap(), 210, 90);
		ctx.fillText("BGM: "+map.getBgm(), 210, 106);
		ctx.fillText("SWidth: "+map.getSourceWidth(), 310, 26);
		ctx.fillText("SHeight: "+map.getSourceHeight(), 310, 42);
		ctx.fillText("DWidth: "+map.getDestinationWidth(), 310, 58);
		ctx.fillText("DHeight: "+map.getDestinationHeight(), 310, 74);
		ctx.fillText("Position: "+player.getX()+", "+player.getY(), 410, 10);
		ctx.fillText("dx, dy: "+dx+", "+dy, 410, 26);
		ctx.fillText("Waypoint: "+wp.isActive()+", "+wp.isPinned(), 410, 42);
		
		wp.draw(ctx);
	}
	
	// initializes the game
	function doInitialize()
	{
		can = document.getElementById("can")
		if(can != null)
		{
			ctx = can.getContext('2d');
			var args = parseQueryFromURL();
			state = LOADING;
			if(args["devMode"] != null && args["devMode"] != true)
			{
				devMode = args["devMode"];
				ctx.fillText("State: "+states[state]+"("+state+")", 600, 500);
			}
		}
	}
	
	// loads resources
	function doLoading()
	{
		if(map == null)
		{
			map = new Map();
			map.load("kak2");
			player.create(300, 100, 32, 48, 0, 0, 32, 48, "sprites/link2.png");
		}
		else if(map.isReady() && player.isReady())
		{
			state = INGAME;
			phase = 0;
		}
		
		if(devMode)
		{
			drawDevMode();
		}
		player.update(delta);
		map.update(delta, dx, dy);
	}
	
	function doWhileInGame()
	{
		ctx.save();
		ctx.fillStyle = "#000000";
		ctx.fillRect(-1, -1, 901, 600);
		
		player.update(delta);
		
		dx = -(player.getX() - (can.width/2 - player.getWidth()/2));
		dy = -(player.getY() - (can.height/2 - player.getHeight()/2));
		
		if(dx < -(map.getPixelWidth() - can.width)){dx = -(map.getPixelWidth() - can.width);}
		if(dy < -(map.getPixelHeight() - can.height)){dy = -(map.getPixelHeight() - can.height);}
		if(dx > 0){dx = 0;}
		if(dy > 0){dy = 0;}
		
		if(wp.isActive())
		{
			if(player.getX() > wp.getX())
			{
				player.sendMessage(0, 0, 37);
			}
			else if(player.getX() < wp.getX())
			{
				player.sendMessage(0, 0, 39);
			}
			
			if(player.getY() > wp.getY())
			{
				player.sendMessage(0, 0, 38);
			}
			else if(player.getY() < wp.getY())
			{
				player.sendMessage(0, 0, 40);
			}

			/*if(wp.isPinned())
			{
				wp.translate((-dx/2)*delta, (-dy/2)*delta);
			}*/
				
			if(player.getX() - wp.getX() < 2 && player.getX() - wp.getX() > -2)
			{
				wp.setX(player.getX());
				player.sendMessage(1, 0, 39);
			}
			if(player.getY() - wp.getY() < 2 && player.getY() - wp.getY() > -2)
			{
				wp.setY(player.getY());
				player.sendMessage(1, 0, 38);
			}
		}
		
		ctx.translate(iDivide(dx, 1), iDivide(dy, 1));
		
		map.update(delta, dx, dy);
		if(map.getReadyState() == 5)
		{
			
			map.draw(ctx);
			if(devMode)
			{
				wp.draw(ctx);
			}
			
		}
		ctx.restore();
		
		if(devMode)
		{
			drawDevMode();			
		}
		
	}
	
	
	// cyclic update function
	// _time = time stamp
	this.update = function(_time)
	{
		delta = (_time - prevTime)/1000.0;
		totalTime += delta;
		prevTime = _time;
		if(delta > 1)
		{
			delta = 1;
		}
		
		switch(state)
		{
			case INIT:
			{
				doInitialize();
				break;
			}
			
			case LOADING:
			{
				doLoading();
				break;
			}
			
			case INGAME:
			{
				doWhileInGame();
				break;
			}
		}
		
		requestAnimationFrame(g.update);
	}
}
