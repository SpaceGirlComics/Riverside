// pseudo console for outputting messages
// _c = a div element onto which messages will appear
function Console(_c)
{
	var con = _c;
	
	this.message = function(_m)			// outputs a message (_m) with white text and begins a new line
	{
		con.innerHTML += _m + "<br />";
		con.scrollTop = con.scrollHeight;
	}

	this.warning = function(_m)			// outputs a message (_m) with yellow text and begins a new line
	{
		con.innerHTML += "<span class=\"warning\">" +_m + "</span><br />";
		con.scrollTop = con.scrollHeight;
	}

	this.serious = function(_m)			// outputs a message (_m) with red text and begins a new line
	{
		con.innerHTML += "<span class=\"serious\">" +_m + "</span><br />"; 
		con.scrollTop = con.scrollHeight;
	}

	this.undec = function(_m)			// outputs a message without any added markup
	{
		con.innerHTML += _m; 
		con.scrollTop = con.scrollHeight;
	}
	
	this.clear = function()				// clears all text from console
	{
		con.innerHTML = "";
	}
}
