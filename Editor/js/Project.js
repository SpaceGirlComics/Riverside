// © 2015 spacegirl.net
// April 15, 2015 - initial submit

function Project()
{
	var so = null;					// source canvas
	var de = null;					// destination canvas
	var n = null;					// project name
	
	var tm = null;					// texture map
	var bm = null;					// background music
	
	var that = this;				// self reference; may remove
	
	// creates a new project
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
	
	// draws the destination canvas
	this.forceDraw = function()
	{
		if(de !=null)
		{
			de.draw(tm);
		}
	}
	
	// adds a new layer to the map
	// then redraws the destination
	// _ln = string, the new layers name
	// _f = string, if "fill" than the new map is filled with the tile seleced on the souce canvas
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
	
	// creates a new layer from an array of integers
	// _n = string new layer name
	// _a = array of integers
	this.addLayerFromArray = function(_n, _a)
	{
		de.addLayerFromArray(_n, _a, tm);
	}
	
	// removes the layer at index _i
	// then redraws the destination
	this.removeLayer = function(_i)
	{
		return(de.removeLayer(_i));
		de.draw(tm);
	}
	
	// sets the visibility property of the current layer to _v
	// then redraws the destination
	this.setLayerVisible = function(_v)
	{
		de.setLayerVisible(_v);
		de.draw(tm);
	}
	
	// gets if the currentl;y selected layer is visible
	this.getLayerVisible = function()
	{
		return(de.getLayerVisible());
	}
	
	// sets the selected layer the one at index _i
	this.setSelectedLayer = function(_i)
	{
		de.setSelectedLayer(_i);
	}
	
	// raises the selected layer
	this.raiseSelectedLayer = function()
	{
		de.raiseSelectedLayer();
		de.draw(tm);
	}
	
	// lowers the selected layer
	this.lowerSelectedLayer = function()
	{
		de.lowerSelectedLayer();
		de.draw(tm);
	}
	
	// lets the source canvas know the left mouse button is down
	// _x, _y = mouse coordinates
	this.onSourceLBDown = function(_x, _y)
	{
		so.onSelectStart(_x, _y);
		so.draw(tm);
	}
	
	// lets the source canvas know the left mouse button is up
	// _x, _y = mouse coordinates
	this.onSourceLBUp = function(_x, _y)
	{
		so.onSelectEnd(_x, _y);
	}
	
	// lets the source canvas know the right mouse button is down
	// _x, _y = mouse coordinates
	this.onSourceRBDown = function(_x, _y)
	{
		so.onScrollStart(_x, _y);
	}
	
	// lets the source canvas know the right mouse button is up
	// _x, _y = mouse coordinates
	this.onSourceRBUp = function(_x, _y)
	{
		so.onScrollEnd(_x, _y);
	}
	
	// lets the source canvaser know the cursor has left it
	// _x, _y = mouse coordinates
	this.onSourceOut = function()
	{
		so.onMouseOut();
	}
	
	// lests the source canvas know the mouse has moved
	// _x, _y = mouse coordinates
	this.onSourceMove = function(_x, _y)
	{
		so.onMouseMove(_x, _y);
		so.draw(tm);
	}
	/////////////////////
	
	// lets the destination canvas know the left mouse button is down
	// _x, _y = mouse coordinates
	this.onDestLBDown = function(_x, _y)
	{
		de.onSelectStart(_x, _y, so.getX(), so.getY());
		de.draw(tm);
	}
	
	// lets the destination canvas know the left mouse button is up
	// _x, _y = mouse coordinates
	this.onDestLBUp = function(_x, _y)
	{
		de.onSelectStop(_x, _y, so.getX(), so.getY());
	}
	
	// lets the destination canvas know the right mouse button is down
	// _x, _y = mouse coordinates
	this.onDestRBDown = function(_x, _y)
	{
		de.onScrollStart(_x, _y, so.getX(), so.getY());
	}
	
	// lets the destination canvas know the right mouse button is up
	// _x, _y = mouse coordinates
	this.onDestRBUp = function(_x, _y)
	{
		de.onScrollStop(_x, _y, so.getX(), so.getY());
	}
	
	// lets the destination canvas know the mouse has left it
	// _x, _y = mouse coordinates
	this.onDestOut = function()
	{
		de.onMouseOut();
	}
	
	// lets the destination canvas know the mouse has moved
	// _x, _y = mouse coordinates
	this.onDestMove = function(_x, _y)
	{
		de.onMouseMove(_x, _y, so.getX(), so.getY());
		de.draw(tm);
	}
	
	// gets a json formatted string containing all the data for this project
	// _encode = integer, selects compression type, 1 = rle, 2 = in line command, else is raw
	this.getJsonMap = function(_encode)
	{
		return("{\"name\": \""+n+"\", \"encode\":"+_encode+",\"tilemap\": \""+tm.src.slice(tm.src.lastIndexOf("/")+1)+"\", \"bgm\": \""+bm.slice(bm.lastIndexOf("/")+1)+"\", "+de.getJsonMap(_encode)+"}");
	}
	
	// meant to tie up loose ends. not used; remove later
	this.destroy = function()
	{
	}
	
	// inserts an oject selected by the user into the map
	// _obj = string, object to add
	// _args = array, object attributes
	this.addObject = function(_obj, _args)
	{
		de.addObject(_obj, _args);
	}
}
