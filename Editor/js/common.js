// common global functions
// © 2015 spacegirl.net
// April 15, 2015 - initial submit

// performs an integer division
function iDivide(num, den)
{
	var q = (num -(num%den))/den;
	//q = num/den;
	if(q>=0)
	{
	q = Math.floor(q);
	}
	else
	{
	q = Math.ceil(q);
	}
	return(q);
}


// checks if value of _n is a number. there might be better ways to do this; may remove
function isNumber(_n)
{
    return(!isNaN(_n) && isFinite(_n));
}

// parses a php style query string
function parseQuery(_query)
{
	var vars = [], hash;
	var hashes = _query.split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

// parses the query string currently in the address bar
function parseQueryFromURL()
{
	return(parseQuery(window.location.href.slice(window.location.href.indexOf('?') + 1)));
}

 // gets the coordinates of the element _t
function getElementPosition(_t)
{
	var x = [];
	x[0] = _t.offsetLeft+3;
	x[1] = _t.offsetTop+3;

	while(_t = _t.offsetParent)
	{
		
		x[0] += _t.offsetLeft;
		x[1] += _t.offsetTop;
		//_t = _t.parentNode;
	}
	return(x);
}

// gets the mouse coodinates on the element _t
// _cx, _cy = the mouse coordinates on the client window
function getElementCoordinates(_cx, _cy, _t)
{
	var x = getElementPosition(_t);
	x[0] = _cx - x[0];
	x[1] = _cy - x[1];
	return(x);
}

// checks that the string in _t is usable as a map or layer name
// if not then the control is turned red, else it is turned white.
// _t = an html input object
function verifyName(_t)
{
	if(/([^-a-zA-Z0-9\s\.\,])/g.test(_t.value))
	{
		_t.style.backgroundColor = "#ffaaaa";
	}
	else
	{
		_t.style.backgroundColor = "#ffffff";
	}
}

// checks that the string in _t is a valid url
// if not then the control is turned red, else it is turned white.
// this function is not completed
// _t = an html input object
function verifyURL(_t)
{
	
}

// checks that the value in _t can be converted into an integer value
// if not then the control is turned red, else it is turned white.
// _t = an html input object
function verifyInt(_t)
{
	if(/([^0-9])/g.test(_t.value))
	{
		_t.style.backgroundColor = "#ffaaaa";
	}
	else
	{
		_t.style.backgroundColor = "#ffffff";
	}
}

// checks that the value in _t can be converted into an floating point value
// if not then the control is turned red, else it is turned white.
// _t = an html input object
function verifyFloat(_t)
{
	if(/([^0-9\.])/g.test(_t.value) || _t.value.replace(/[^\.]/g, "").length >1)
	{
			_t.style.backgroundColor = "#ffaaaa";
	}
	else
	{
		_t.style.backgroundColor = "#ffffff";
	}
}
