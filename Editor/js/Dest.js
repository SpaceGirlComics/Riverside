// wraps around the destination canvas element
function Dest()
{
	var can = null;				// destination canvas
	var ctx = null;				// destination canvas context
	
	var w = null;				// width of the map being created in tiles
	var h = null;				// height of the map being created in tiles
	
	var sw = null;				// width of the source rectangle
	var sh = null;				// height of the source rectangle
	
	var dw = null;				// width of the destination rectangle (tile)
	var dh = null;				// height of the destination rectangle (tile)
	
	var sx = null;				// delta mouse x coordinate 
	var sy = null;				// delta mouse y coordinate
	
	var mx = null;				// previous mouse coordinate
	var my = null;				// previous mouse coordinate
	
	var layers = [];			// array for the layers that comprise the map
	var sLay = null;			// the index of the current layer
	
	var selecting = false;			// true if user is placing tiles
	var dragging = false;			// true if user is moving the map
	
	var csr = new Cursor();			// cursor that appears on the destination canvas
	
	var that = this;			// references the containing instance; may remove
	
	var stline = "";			// doesnt appear to be used remove in future
	
	var objs = 0;				// number of game objects in the map. not very useful; may remove
	
	// defines or redefines a "Destination Canvas"
	// _dc = canvas element to be used as the destination
	// _w = width of the map being created in tiles
	// _h = height of map in tiles
	// _sw = source rectangle width
	// _sh = source rectangle height
	// _dw = destination rectangle width
	// _dh = destination rectangle height
	this.create = function(_dc, _w, _h, _sw, _sh, _dw, _dh)
	{							
		can = _dc;
		can.style = "cursor:none;";
		ctx = can.getContext('2d');
		con.message(_dw+", "+_dh);		// removing console in future, this line will be too
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
	
	// creates a new layer using an array of numbers
	// _n = 
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
