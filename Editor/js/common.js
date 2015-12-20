// common global functions
// © 2015 spacegirl.net
// April 15, 2015 - initial submit
// November 11, 2015 - latest update
// - Added verifyName()</li>
// - Added verifyInt()</li>
// - added verifyFloat()</li>

/**
* <p>Performs an integer division</p>
*
* @function
* @name iDivide
* @param {Number} num A divisor value
* @param {number} den A dividend value
* @return {number} whole number quotient
*/
function iDivide(num, den)
{
	var q = (num -(num%den))/den;									// divide the subtact the remainder from the numerator and then divide normally
	if(q>=0)											// if the quotient is greater or equal to zero
	{
	q = Math.floor(q);										// return the lowest value of q
	}
	else												// otherwise
	{
	q = Math.ceil(q);										// return the highest value
	}
	return(q);
}


/**
* <p>Checks if value of _n is a number.</p>
* <p>There might be better ways to do this; may remove</p>
*
* @function
* @name isNumber
* @param _n a value
* @returns {boolean} true if _n is a number
*/
function isNumber(_n)
{
    return(!isNaN(_n) && isFinite(_n));
}

/**
* <p>Parses a php style query string</p>
*
* @function
* @name parseQuery
* @param {String} _query A query string
* @returns {Array} values parsed from the string
*/
function parseQuery(_query)
{
	var vars = [], hash;										// declare an Array
	var hashes = _query.split('&');									// tokenize the string
	for(var i = 0; i < hashes.length; i++)								// for each token
	{
		hash = hashes[i].split('=');								// tokenize the token
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];								// put the value in the associated element
	}
	return vars;											// return the array
}

/**
* <p>Parses the query string currently in the address bar</p>
*
* @function
* @name parseQueryFromURL
* @returns {Array} Values parsed from the address
*/
function parseQueryFromURL()
{
	return(parseQuery(window.location.href.slice(window.location.href.indexOf('?') + 1)));
}

/**
* <p>Gets the coordinates of an element on the page</p>
*
* @function
* @name getElementPosition
* @param An HTML Element
* @returns {Array} The coordinates of the element
*/
function getElementPosition(_t)
{
	var x = [];											// declare an Array
	x[0] = _t.offsetLeft+3;										// get the offset of the left of the element and add 3
	x[1] = _t.offsetTop+3;										// get the offset of the top plus 3

	while(_t = _t.offsetParent)									// while there is a parent node. this is wrong, Rem: remove or rewrite
	{	
		x[0] += _t.offsetLeft;									// add the parent offset
		x[1] += _t.offsetTop;
	}
	return(x);											// return the array
}

/**
* <p>Gets the mouse coodinates on the element _t
*
* @function
* @name getElementCoordinates
* @param {Number} _cx X position of the mouse in the client area
* @param {Number} _cy Y position of the mouse in the client area
* @param The HTML element the mouse is hovering over
* @returns {Array.number} The coordinates of the mouse on the element
*/
function getElementCoordinates(_cx, _cy, _t)
{
	var x = getElementPosition(_t);									// get the element position
	x[0] = _cx - x[0];										// minus the element postion from the client coordinates of the mouse
	x[1] = _cy - x[1];
	return(x);
}

/**
* <p>Checks that the string in _t is usable as a map or layer name.
* If not then the control is turned red, else it is turned white.</p>
*
* @function
* @name verifyName
* @param {HTMLInputElement} _t An html text input object
*/
function verifyName(_t)
{
	if(/([^-a-zA-Z0-9\s\.])/g.test(_t.value))							// if the string contains only leters and numbers
	{
		_t.style.backgroundColor = "#ffaaaa";							// set the background colour red
	}
	else												// otherwise
	{
		_t.style.backgroundColor = "#ffffff";							// make sure the background is white
	}
}

/**
* <p>Checks that the string in _t is a valid url.
* if not then the control is turned red, else it is turned white.</p>
* <p>this function is not completed</p>
*
* @function
* @name verifyURL
* @param {HTMLInputElement} _t An html text input object
*/
function verifyURL(_t)
{
	
}

/**
* <p>Checks that the string in _t can be converted into an integer value.
* if not then the control is turned red, else it is turned white.</p>
*
* @function
* @name verifyInt
* @param {HTMLInputElement} _t An html text input object
*/
function verifyInt(_t)
{
	if(/([^0-9])/g.test(_t.value))									// check that the string only contains numbers
	{
		_t.style.backgroundColor = "#ffaaaa";							// set the background colour to red
	}
	else												// otherwise
	{
		_t.style.backgroundColor = "#ffffff";							// make sure the background color is white
	}
}

/**
* <p>Checks that the value in _t can be converted into an floating point value.
* if not then the control is turned red, else it is turned white.</p>
*
* @function
* @name verifyFloat
* @param {HTMLInputElement} _t An html input object
*/
function verifyFloat(_t)
{
	if(/([^0-9\.])/g.test(_t.value) || _t.value.replace(/[^\.]/g, "").length >1)			// check that the string only contains numbers and one dot
	{
		_t.style.backgroundColor = "#ffaaaa";							// set the background colour to red
	}
	else
	{
		_t.style.backgroundColor = "#ffffff";							// make sure the background color is white
	}
}
