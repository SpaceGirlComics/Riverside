function Layer()
{
	var tiles = null;
	var n = null;
	var w = null;
	var h = null;
	var sh = null;
	var sw = null;
	var dw = null;
	var dh = null;
	var tw = null;
	
	var vis = null;
	
	var that = this;
	var def = false;

	var obj = [];

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
	
	this.isVisible = function(){return(vis);}
	this.setVisible = function(_v){vis = _v;}
	
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
	
	this.addObject = function(_o)
	{
		obj.push(_o);
	}
	
	this.removeObject = function(_i)
	{
		return(obj.splice(_i, 1));
	}
	
	this.setTile = function(_x, _y, _s, _t)
	{
		tiles[_y][_x].setClip(_s, _t);
		//con.message(tiles[_y][_x].getS()+", "+tiles[_y][_x].getT());
		//con.message(tiles[0][0].getS()+", "+tiles[0][0].getT());
	}
	
	this.getName = function()
	{
		return(n);
	}
	
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
