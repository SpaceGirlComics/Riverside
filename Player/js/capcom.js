// character that appears on screen
// © 2015 spacegirl.net
// April 29, 2015 - initial submit

// functions for the command console

// outputs to the console
// _m = the message to output
function consoleOut(_m)
{
  var msg = document.getElementById("msgs").getElementsByTagName('li');
  msg[0].innerHTML = msg[1].innerHTML;
	msg[1].innerHTML = msg[2].innerHTML;
	msg[2].innerHTML = "&gt;"+_m;
}

// Interperets command and sends to the game object via the send message function
function command()
{
	var cmd = document.getElementById("com").value.split(" ");
	switch(cmd[0].toUpperCase())
	{
		case "IDDQD":
		{
			consoleOut("devMode");
			g.sendMessage(0, 0,0);
			break;
		}
		
		default:
		{
			consoleOut(Hey, Stupid! \"" +cmd[0] + "\" Is Not A Valid Command");
			break;
		}
	}
	document.getElementById("com").value = "";
}
