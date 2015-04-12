// this file is obsolete and will be removed
function Map()
{
	var x = null;
	var y = null;
	
	var name = null;
	var width = null;
	var height = null;
	var tilemap = null;
	var bmg = null;
	
	var sw = null;
	var sh = null;
	var dw = null;
	var dh = null;
	
	var layers = null;
	
	var spec = null;
	var adndm = null;
	
	var can = null;
	var ctx = null;
	
	var def = false;
	
	var that = this;
	
	this.create = function(_mn, _mw, _mh, _sw, _sh, _dw, _dh, _tm, _bm, _can)
	{
		layers = [];
		spec = [];
		adndm = [];
		
		name = _mn;
		width = _mw;
		height = _mh;
		tilemap = new Image();
		tilemap.src = _tm;
		bgm = _bm;
		
		sw = _sw;
		sh = _sh;
		dw = _dw;
		dh = _dh;
		
		can = _can;
		ctx = can.getContext("2d");
		
		def = true;
	}
	
	this.isDefined = function(){return(def);}
	this.getWidth = function(){return(width);}
	this.getHeight = function(){return(height);}
	this.getX = function(){return(x);}
	this.getY = function(){return(y);}
	
	this.newLayer = function(_ln)
	{
		layers[_ln] = new Layer();
		layers[_ln].create(0, 0, width, height);
	}
	
	this.draw = function()
	{
		for(var x in layers)
		{
			x.draw(ctx);
		}
	}
	
}
