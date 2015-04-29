// Layer for maps
// © 2015 spacegirl.net
// April 15, 2015 - initial submit

function Layer()
{
	var name;				// string, name of the layer
	var width = 0;				// int, width of the layer in tiles
	var height = 0;				// int, height of the layer in tiles
	var sw;					// source tile width
	var dw;					// destination tile width
	var sh;					// source tile height
	var dh;					// destination tile height
	var tiles = [];				// array of tile objects
	
	// used to skip drawing tiles that are not on sreen
	var dx = 0;				// index of the leftmost tiles to appear
	var dy = 0;				// index of the topmost tiles to appear
	
	// defines the layer
	// _n = string, the layer's name
	// _tn = int, the tile value loaded from the map file
	// _tw = int, the width of the texturemap being used
	// _w = int, width of the layer in tiles
	// _h = int, height of the layer in tiles
	// _sw = int, source tile width
	// _sh = int, source tile height
	// _dw = int, destination tile width
	// _dh = int, destination tile height
	this.create = function(_n, _tn, _tw, _w, _h, _sw, _sh, _dw, _dh)
	{
		name = _n;
		width = _w;
		height = _h;
		sw = _sw;
		sh = _sh;
		dw = _dw;
		dh = _dh;
		
		var f = 0;
		var m = 0;
		var s = 0;
		var t = 0;
		for(var y = 0; y < height; y++)
		{
			tiles[y] = [];
			for(var x = 0; x < width; x++)
			{
				s = (_tn[y*width+x]%iDivide(_tw, sw))*sw;
				t = iDivide(_tn[y*width+x], iDivide(_tw, sw))*sh;
				if(t == sh)
				{
					f = iDivide(s, sw);
					m = 7;
				//alert(f+", "+m);
				}
				tiles[y][x] = new Tile();
				tiles[y][x].define(x*dw, y*dh, dw, dh, s, t, sw, sh, f, m);
				f = m = 0;
			}
		}
		
	}
	
	//checkes what tiles atre being collided with _obj, obj must have getX and getY functions
	this.check = function(_obj)
	{
	var b = iDivide(_obj.getX(), dw);
		var a = iDivide(_obj.getY(), dh);
		var c = iDivide(_obj.getWidth(), dw);
		var d = iDivide(_obj.getHeight(), dh);
		
		for(var f = a; f <= a+d; f++)
		{
			for(var g= b; g<= b+c; g++)
			{
				if(f >=0 && g >=0 && f < height && g < width && tiles[f][g])
				{
					if(_obj.isWalking() && (tiles[f][g].getS() > 0 && tiles[f][g].getT() > 0))
					{
						switch(_obj.getFace())
						{
							case 0:
							{
								if(_obj.getY()+ _obj.getHeight() > tiles[f][g].getY() && _obj.getY()+ _obj.getHeight() < tiles[f][g].getY() + tiles[f][g].getHeight())
								{
									tiles[f][g].mark();
									_obj.setY(tiles[f][g].getY()-_obj.getHeight()-1);
								}
								break;
							}
							
							case 1:
							{
								if(_obj.getX() > tiles[f][g].getX() && _obj.getX() < tiles[f][g].getX() + tiles[f][g].getWidth())
								{
									tiles[f][g].mark();
									_obj.setX(tiles[f][g].getX()+tiles[f][g].getWidth()+1);
								}
								break;
							}
							
							case 2:
							{
								if(_obj.getY() > tiles[f][g].getY() && _obj.getY() < tiles[f][g].getY() + tiles[f][g].getHeight())
								{
									tiles[f][g].mark();
									_obj.setY(tiles[f][g].getY() + tiles[f][g].getHeight()+1);
								}
								break;
							}
							
							case 3:
							{
								if(_obj.getX() + _obj.getWidth() > tiles[f][g].getX() && _obj.getX() + _obj.getWidth() < tiles[f][g].getX() + tiles[f][g].getWidth())
								{
									tiles[f][g].mark();
									_obj.setX(tiles[f][g].getX()-_obj.getWidth()-1);
								}
								break;
							}
						}
					}
				}
			}
		}
	}
	
	this.draw = function(_img, _ctx)
	{
		for(var y = dy; y < height && y < dy+36; y++)
		{
			for(var x = dx; x < width && x < dx+52; x++)
			{
				if(tiles[y][x].getT() > 0)
				{
					tiles[y][x].draw(_img, _ctx);
				}
			}
		}
	}
	
	// cyclic update
	// _delta = float, delta time
	// _dx = int, x translation
	// _dy = int, y translation
	this.update = function(_delta, _dx, _dy)
	{
		dx = iDivide(-_dx, dw);
		if(dx < 0)
		{
			dx = 0;
		}
		dy = iDivide(-_dy, dh);
		if(dy < 0)
		{
			dy = 0;
		}
		
		for(var y = 0; y < height; y++)
		{
			for(var x = 0; x < width; x++)
			{
				//alert(_delta);
				tiles[y][x].update(_delta);
			}
		}
	}
}
