// run length encoding functions
// © 2015 spacegirl.net
// April 15, 2015 - initial submit

// regular length/value encode
function type1RLE(_tiles)
{
	var rletiles = [];
	var cur = _tiles[0];
	var length = 0;
	con.warning("Running RLE1 Algorythm");
	for(var x = 0; x < _tiles.length; x++)
	{
		if(cur == _tiles[x])
		{
			length++;
		}
		else
		{
			if(length >= 2)
			{
				rletiles.push(-1*length);
				rletiles.push(cur);
				cur = _tiles[x];
				length = 1;
			}
			else
			{
				rletiles.push(cur);
				cur = _tiles[x];
				length = 1;
			}
		}
	}
	if(length >= 2)
	{
		rletiles.push(-1*length);
		rletiles.push(cur);
	}
	else
	{
		rletiles.push(cur);
	}
	return(rletiles);
}

// length/value decode
function type1RLD(_rletiles)
{
	var tiles = [];
	con.warning("Running RLD1 Algorythm");
	for(x = 0; x < _rletiles.length; x++)
	{
		if(_rletiles[x] < 0)
		{
			for(var y = _rletiles[x]; y<0; y++)
			{
				tiles.push(_rletiles[x+1]);
			}
			x++;
		}
		else
		{
			tiles.push(_rletiles[x]);
		}
	}
	return(tiles);
}

// inline command encode
function type2RLE(_tiles)
{
	var rletiles = [];
	var cur = _tiles[0];
	var length = 0;
	con.warning("Running RLE2 Algorythm");
	for(var x = 0; x < _tiles.length; x++)
	{
		if(cur == _tiles[x])
		{
			length++;
		}
		else
		{
			if(length > 4)
			{
				rletiles.push(-1);
				rletiles.push(length);
				rletiles.push(cur);
				cur = _tiles[x];
				length = 1;
			}
			else
			{
				for(var y = length; y >0; y--)
				{ 
					rletiles.push(cur);
				}
				cur = _tiles[x];
				length = 1;
			}
		}
	}
	if(length > 4)
	{
		rletiles.push(-1);
		rletiles.push(length);
		rletiles.push(cur);
	}
	else
	{
		for(var y = length; y >0; y--)
		{ 
			rletiles.push(cur);
		}
	}
	return(rletiles);
}

// inline command decode
function type2RLD(_rletiles)
{
	var tiles = [];
	 con.warning("Running RLD2 Algorythm");
	for(x = 0; x < _rletiles.length; x++)
	{
		switch(_rletiles[x])
		{
			case -1:
			{
				x++;
				for(var y = _rletiles[x]; y>0; y--)
				{
					tiles.push(_rletiles[x+1]);
				}
				x++;
				break;
			}
			
			default:
			{
				tiles.push(_rletiles[x]);
			}
		}
	}
	return(tiles);
}
