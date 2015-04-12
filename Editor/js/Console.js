function Console(_c)
{
	var con = _c;
	
	this.message = function(_m){con.innerHTML += _m + "<br />"; con.scrollTop = con.scrollHeight;}
	this.warning = function(_m){con.innerHTML += "<span class=\"warning\">" +_m + "</span><br />"; con.scrollTop = con.scrollHeight;}
	this.serious = function(_m){con.innerHTML += "<span class=\"serious\">" +_m + "</span><br />"; con.scrollTop = con.scrollHeight;}
	this.undec = function(_m){con.innerHTML += _m; con.scrollTop = con.scrollHeight;}
	
	this.clear = function(){con.innerHTML = "";}
}
