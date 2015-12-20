function Batch()
{
	var readyState = 0x00000000;
	var name = "";
	var bahavior = "repeat"
	var base = document.createElement("canvas");
	var ctx = base.getContext("2d");
	var pattern;
	var polygons = [];
	
	this.create = function(_name, _can)
	{
		name = _name;
	}
	
	this.refresh = function()
	{
		pattern = ctx.createPattern(base, behavior);
	}
}
