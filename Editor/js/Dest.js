function Dest()
{
	var can = null;
	var ctx = null;
	
	var w = null;
	var h = null;
	
	var sw = null;
	var sh = null;
	
	var dw = null;
	var dh = null;
	
	var sx = null;
	var sy = null;
	
	var mx = null;
	var my = null;
	
	var layers = [];
	var sLay = null;
	
	var selecting = false;
	var dragging = false;
	
	var csr = new Cursor();
	
	var that = this;
	
	var stline = "";
	
	var objs = 0;
	
	this.create = function(_dc, _w, _h, _sw, _sh, _dw, _dh)
	{
		can = _dc;
		can.style = "cursor:none;";
		ctx = can.getContext('2d');
		con.message(_dw+", "+_dh);
		w = _w;
		h = _h;
		sw = _sw;
		sh = _sh;
		dw = _dw;
		dh = _dh;
		sx = mx = 0;
		sy = my = 0;
		csr.create(0, 0, _dw, _dh, "#0000ff");
		sLay = -1;
	}
	
	this.addLayerFromArray = function(_n, _a, _tm)
	{
		var t = new Layer();
		t.createFromArray(_n, _a, _tm, w, h, sw, sh, dw, dh);
		layers.push(t);
		sLay = 0;
	}
	
	this.addLayer = function(_ln, _im, _fx, _fy)
	{
		var t = new Layer();
		t.create(_ln, ctx, _im, w, h, sw, sh, dw, dh, _fx, _fy);
		layers.splice(0, 0, t);
		sLay = 0;
	}
	
	this.removeLayer = function(_i)
	{
		return(layers.splice(_i,1));
	}
	
	this.raiseSelectedLayer = function()
	{
		if(sLay >0)
		{
			var t = layers[sLay];
			layers[sLay] = layers[--sLay];
			layers[sLay] = t;
		}
	}
	
	this.lowerSelectedLayer = function()
	{
		if(sLay < layers.length-1)
		{
			var t = layers[sLay];
			layers[sLay] = layers[++sLay];
			layers[sLay] = t;
		}
	}
	
	this.setLayerVisible = function(_v)
	{
		layers[sLay].setVisible(_v);
	}
	
	this.getLayerVisible = function()
	{
		return(layers[sLay].isVisible());
	}
	
	this.setSelectedLayer = function(_i)
	{
		sLay = _i;
	}
	
	this.draw = function(_tm)
	{
		ctx.save()
		ctx.fillStyle = "#000000";
		ctx.fillRect(0,0,can.width,can.height);
		ctx.translate(sx, sy);
		
		for(var a = layers.length-1; a >=0 ; a--)
		{
			if(layers[a].isVisible())
			{
				layers[a].draw(ctx, _tm, iDivide(sx, dw), iDivide(sy, dh));
			}
		}
		csr.draw(ctx);
		ctx.restore();
		ctx.fillStyle = "#ffffff";
		ctx.fillText(sLay, 10,10);
	}
	
	this.getTileNumbers = function(_l)
	{
		return(layers[_l].getTileNumbers());
	}
	
	this.addObject = function(_obj, _arg)
	{
		switch(_obj)
		{
			case 0:
			{
				var t = new Block();
				t.create(_arg[0], csr.getX(), csr.getY(), _arg[3], _arg[4]);
				layers[sLay].addObject(t);
				objs++;
			}
		}
	}

	this.onSelectStart = function(_x, _y, _s, _t)
	{
		layers[sLay].setTile(iDivide(csr.getX(), dw), iDivide(csr.getY(), dh), _s, _t);
		stline = _s+", "+_t;
		selecting = true;
	}
	
	this.onSelectStop = function(_x, _y, _s, _t)
	{
		selecting = false;
	}
	
	this.onScrollStart = function(_x, _y, _s, _t)
	{
		dragging = true;
		mx = _x;
		my = _y;
	}
	
	this.onScrollStop = function(_x, _y, _s, _t)
	{
		dragging = false;
	}
	
	this.onMouseMove = function(_x, _y, _s, _t)
	{
	
		if(dragging)
		{
			sx -= (mx-_x);
			if(sx > 0){sx=0;}
			else if(sx < -1*(w * dw - can.width)){sx = -1*(w * dw - can.width);}
			sy -= (my-_y);
			if(sy > 0){sy=0;}
			else if(sy < -1*(h * sh - can.height)){sy = -1*(h * sh - can.height);}/**/		
		}
		mx = _x;
		my = _y;
		
		if(selecting)
		{
			layers[sLay].setTile(iDivide(csr.getX(), dw), iDivide(csr.getY(), dh), _s, _t);
			
		}
		
			csr.setPosition(_x-sx, _y-sy);
		
	}
	
	this.onMouseOut = function()
	{
		selecting = dragging = false;
	}
	
	this.getJsonMap = function(_encode)
	{
		var b = "\"width\":"+w+", \"height\":"+h+", \"sourceWidth\":"+sw+", \"sourceHeight\":"+sh+", \"destinationWidth\":"+sw+", \"destinationHeight\":"+sh+", \"layers\":[";
		switch(_encode)
		{
			case 1:
			{
				for(var a = 0; a < layers.length; a++)
				{
					b += "{\"name\": \""+layers[a].getName()+"\", \"tiles\":[";
					c = type1RLE(layers[a].getTileNumbers());
					for(var d = 0; d < c.length;d++)
					{
						b+= c[d]+",";
					}
					b=b.substring(0, b.lastIndexOf(","))+"]},";
				}
				
				break;
			}
			
			case 2:
			{
				for(var a = 0; a < layers.length; a++)
				{
					b += "{\"name\": \""+layers[a].getName()+"\", \"tiles\":[";
					c = type2RLE(layers[a].getTileNumbers());
					for(var d = 0; d < c.length;d++)
					{
						b+= c[d]+",";
					}
					b=b.substring(0, b.lastIndexOf(","))+"]},";
				}
				
				break;
			}
			
			default:
			{
				for(var a = 0; a < layers.length; a++)
				{
					b += "{\"name\": \""+layers[a].getName()+"\", \"tiles\":["+layers[a].getJsonTileNumbers()+"]},";
				}
				break;
			}
		}
		return(b.substring(0, b.lastIndexOf(","))+"]");
	}
}
