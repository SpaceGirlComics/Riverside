function Layer()
{
	var name;
	var width = 0;
	var height = 0;
	var sw;
	var dw;
	var sh;
	var dh;
	var tiles = [];
	
	var dx = 0;
	var dy = 0;
	
	
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
