// © 2015 spacegirl.net
// April 15, 2015 - initial submit

function iDivide(num, den)
{
    var q = (num -(num%den))/den;

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

function isNumber(_n)
{
    return(!isNaN(_n) && isFinite(_n));
}

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

function parseQueryFromURL()
{
	return(parseQuery(window.location.href.slice(window.location.href.indexOf('?') + 1)));
}

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

function getClickOnElementPosition(_cx, _cy, _t)
{
	var x = getElementPosition(_t);
	x[0] = _cx - x[0];
	x[1] = _cy - x[1];
	return(x);
}
