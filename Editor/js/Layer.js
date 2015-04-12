// Layer for maps
// © 2015 C. M. Turner
function Layer()
{
	var tiles = null;				// array of tiles on this layer
	var n = null;					// String, name of this layer
	var w = null;					// integer, width of this layer in tiles
	var h = null;					// integer, height of the map in tiles
	var sh = null;					// integer, height of source rectangles
	var sw = null;					// integer, width of the source rectangles
	var dw = null;					// integer, width of the destination rectangles
	var dh = null;					// integer, height of the destination rectangles 
	var tw = null;					// integer, width of the texturemap
	
	var vis = null;					// boolean, true if the layer is visible
	
	var that = this;				// self reference; may remove later
	var def = false;				// boolean, true if a create function has been called

	var obj = [];					// arrat, game objects on this layer 

	// creates tiles from an array
	// _n = string, layer name
	// _r = array, integers to make into tiles
	// _im = Image, texture map
	// _w = width of the map in tiles
	// _h = height of the map in tiles
	// _sw = source rectangle width
	// _sh = source rectangle height
	// _dw = destination rectangle width
	// _dh = destination re3ctangle height
	this.createFromArray = function(_n, _r, _im, _w, _h, _sw, _sh, _dw, _dh)
	{
		tiles = [];
		tiles.length = _h;
		n = _n;
		w = _w;
		h = _h;
		sw = _sw;
		sh = _sh;
		dw = _dw;
		dh = _dh;
		tw = _im.width;
		var ti = 0;
		
		for(var a = 0; a < h; a++)
		{
			
			tiles[a] = [];
			tiles[a].length = _w;
			for(var b = 0; b < w; b++)
			{
				tiles[a][b] = new Tile();
				tiles[a][b].create((_r[ti] % iDivide(tw, sw))*sw, iDivide(_r[ti], iDivide(tw, sw))*sh, sw, sh, b*dw, a*dh, dw, dh);
				ti++;
			}
		}
		vis = true;
		def = true;
	}
	
	// creates tiles from an array
	// _n = string, layer name
	// _ctx = canvas context; not useful, remove at later date
	// _im = Image, texture map
	// _w = width of the map in tiles
	// _h = height of the map in tiles
	// _sw = source rectangle width
	// _sh = source rectangle height
	// _dw = destination rectangle width
	// _dh = destination re3ctangle height
	// _fx, _fy = coordinates for source rectangle to fill the map with
	this.create = function(_n, _ctx, _im, _w, _h, _sw, _sh, _dw, _dh, _fx, _fy)
	{
		tiles = [];
		n = _n;
		w = _w;
		h = _h;
		sw = _sw;
		sh = _sh;
		dw = _dw;
		dh = _dh;
		tw = _im.width;
		
		for(var a = 0; a < h; a++)
		{
			
			tiles[a] = [];
			for(var b = 0; b < w; b++)
			{
				tiles[a][b] = new Tile();
				tiles[a][b].create(_fx, _fy, sw, sh, b*dw, a*dh, dw, dh);
			}
		}
		vis = true;
		def = true;
	}
	
	// self explanitory
	this.isVisible = function(){return(vis);}
	this.setVisible = function(_v){vis = _v;}
	
	// _ctx = canvas context
	// _im = Image, texture map
	// _dx = leftmost index to draw
	// _sy = topmost index to draw
	this.draw = function(_ctx, _im, _dx, _dy)
	{
		var c = _ctx;
		for(var a = -_dy; a < -_dy+20; a++) //for(var a = _dy; a < _dy+20; a++)
		{
			for(var b =  -_dx; b < -_dx+32 && b >=0; b++) //for(var b = _dx; b < _dx+32; b++)
			{
				if(a < tiles.length && b < tiles[a].length)
				{
					tiles[a][b].draw(_ctx, _im);
				}
			}
		}
		for(var a = 0; a < obj.length; a++)
		{
			if(obj[a].isVisible())
			{
				obj[a].draw(_ctx);
			}
		}
		_ctx = c;
	}
	
	// adds a game object to the object list
	// _o = game object
	this.addObject = function(_o)
	{
		obj.push(_o);
	}
	
	// removes object at _i and returns it
	this.removeObject = function(_i)
	{
		return(obj.splice(_i, 1));
	}
	
	// sets the tile at index _x, _y to _s, _t
	this.setTile = function(_x, _y, _s, _t)
	{
		tiles[_y][_x].setClip(_s, _t);
		//con.message(tiles[_y][_x].getS()+", "+tiles[_y][_x].getT());
		//con.message(tiles[0][0].getS()+", "+tiles[0][0].getT());
	}
	
	// gets the name of the layer
	this.getName = function()
	{
		return(n);
	}
	
	// gets the tiles as an array of integers
	this.getTileNumbers = function()
	{
		var tileNumbers = [];
		var c =0;
		for(var a = 0; a < tiles.length; a++)
		{
			for(var b = 0; b < tiles[a].length; b++)
			{
				tileNumbers[c++] = tiles[a][b].getTileNumber(tw);
			}
		}
		return(tileNumbers);
	}
	
	// gets the tiles as integers in a json formatted string
	this.getJsonTileNumbers = function()
	{
		con.message("texture Width:"+tw);
		var tileNumbers = "";
		var c =0;
		for(var a = 0; a < tiles.length; a++)
		{
			for(var b = 0; b < tiles[a].length; b++)
			{
				tileNumbers += tiles[a][b].getTileNumber(tw)+", ";
			}
		}
		
		return(tileNumbers.substring(0, tileNumbers.lastIndexOf(",")));
	}
}
