// pseudo console for outputting messages
// © 2015 spacegirl.net
// April 15, 2015 - initial submit

// _c = a div element onto which messages will appear
function Console(_c)
{
	var con = _c;
	
	// outputs a message (_m) with white text and begins a new line
	this.message = function(_m)
	{
		con.innerHTML += _m + "<br />";
		con.scrollTop = con.scrollHeight;
	}

	// outputs a message (_m) with yellow text and begins a new line
	this.warning = function(_m)
	{
		con.innerHTML += "<span class=\"warning\">" +_m + "</span><br />";
		con.scrollTop = con.scrollHeight;
	}

	// outputs a message (_m) with red text and begins a new line
	this.serious = function(_m)
	{
		con.innerHTML += "<span class=\"serious\">" +_m + "</span><br />"; 
		con.scrollTop = con.scrollHeight;
	}

	// outputs a message without any added markup
	this.undec = function(_m)
	{
		con.innerHTML += _m; 
		con.scrollTop = con.scrollHeight;
	}
	
	// clears all text from console
	this.clear = function()
	{
		con.innerHTML = "";
	}
}
