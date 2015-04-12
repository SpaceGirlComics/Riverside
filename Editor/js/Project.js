function Project()
{
	var so = null;
	var de = null;
	var n = null;
	
	var tm = null;
	var bm = null;
	
	var that = this;
	
	this.create = function(_n, _w, _h, _sw, _sh, _dw, _dh, _tm, _bm, _sc, _dc)
	{
		tm = new Image()
		tm.onload = function()
		{
			bm = _bm;
			n = _n;
			so = new Source();
			so.create(tm, _sw, _sh, _sc);
			con.message(tm.src);
			so.draw(tm);
			de = new Dest();
			de.create(_dc, _w, _h, _sw, _sh, _dw, _dh);
			if(that.decode)
			{
				that.decode();
			}
		}
		tm.src = _tm;
	}
	
	this.forceDraw = function()
	{
		if(de !=null)
		{
			de.draw(tm);
		}
	}
	
	this.addLayer = function(_ln, _f)
	{
		if(_f == "fill")
		{
			de.addLayer(_ln, tm, so.getX(), so.getY());
		}
		else
		{
			de.addLayer(_ln, tm, 0, 0);
		}
		de.draw(tm);
	}
	
	this.addLayerFromArray = function(_n, _a)
	{
		de.addLayerFromArray(_n, _a, tm);
	}
	
	this.removeLayer = function(_i)
	{
		return(de.removeLayer(_i));
		de.draw(tm);
	}
	
	this.setLayerVisible = function(_v)
	{
		de.setLayerVisible(_v);
		de.draw(tm);
	}
	
	this.getLayerVisible = function()
	{
		return(de.getLayerVisible());
	}
	
	this.setSelectedLayer = function(_i)
	{
		de.setSelectedLayer(_i);
	}
	
	this.raiseSelectedLayer = function()
	{
		de.raiseSelectedLayer();
		de.draw(tm);
	}
	
	this.lowerSelectedLayer = function()
	{
		de.lowerSelectedLayer();
		de.draw(tm);
	}
	
	this.onSourceLBDown = function(_x, _y)
	{
		so.onSelectStart(_x, _y);
		so.draw(tm);
	}
	
	this.onSourceLBUp = function(_x, _y)
	{
		so.onSelectEnd(_x, _y);
	}
	
	this.onSourceRBDown = function(_x, _y)
	{
		so.onScrollStart(_x, _y);
	}
	
	this.onSourceRBUp = function(_x, _y)
	{
		so.onScrollEnd(_x, _y);
	}
	
	this.onSourceOut = function()
	{
		so.onMouseOut();
	}
	
	this.onSourceMove = function(_x, _y)
	{
		so.onMouseMove(_x, _y);
		so.draw(tm);
	}
	/////////////////////
	this.onDestLBDown = function(_x, _y)
	{
		de.onSelectStart(_x, _y, so.getX(), so.getY());
		de.draw(tm);
	}
	
	this.onDestLBUp = function(_x, _y)
	{
		de.onSelectStop(_x, _y, so.getX(), so.getY());
	}
	
	this.onDestRBDown = function(_x, _y)
	{
		de.onScrollStart(_x, _y, so.getX(), so.getY());
	}
	
	this.onDestRBUp = function(_x, _y)
	{
		de.onScrollStop(_x, _y, so.getX(), so.getY());
	}
	
	this.onDestOut = function()
	{
		de.onMouseOut();
	}
	
	this.onDestMove = function(_x, _y)
	{
		de.onMouseMove(_x, _y, so.getX(), so.getY());
		de.draw(tm);
	}
	
	this.getJsonMap = function(_encode)
	{
		return("{\"name\": \""+n+"\", \"encode\":"+_encode+",\"tilemap\": \""+tm.src.slice(tm.src.lastIndexOf("/")+1)+"\", \"bgm\": \""+bm.slice(bm.lastIndexOf("/")+1)+"\", "+de.getJsonMap(_encode)+"}");
	}
	
	this.destroy = function()
	{
	}
	
	this.addObject = function(_obj, _args)
	{
		de.addObject(_obj, _args);
	}
}
