var BTN_OK		 = 0x00000001;
var BTN_CANCEL		 = 0x00000002;
var BTN_YES		 = 0x00000004;
var BTN_NO		 = 0x00000008;

/**
* <p>Displays a dialog box</p>
*
* @function
* @name messageBox
* @param {String} _title The text in the title bar
* @param {String} _message The text that appears in the client area
* @param {Boolean} _modal If true, the page enters a modal state while the dialog is open
* @param {Number} _btn Code for respone buttons
*/
function messageBox(_title, _message, _modal, _btn)
{
	var box;
	
	_message += "<br />";
	
	if(_btn & BTN_OK)
	{
		_message += "<input type=\"button\" value=\"Ok\" />";
	}
	if(_btn & BTN_CANCEL)
	{
		_message += "<input type=\"button\" value=\"Cancel\" />";
	}
	if(_btn & BTN_YES)
	{
		_message += "<input type=\"button\" value=\"Yes\" />";
	}
	if(_btn & BTN_NO)
	{
		_message += "<input type=\"button\" value=\"No\" />";
	}
	
	
	if(_modal)
	{
		_message = "<div class=\"titleBar\" onmousedown=\"startDrag(this);\" onmouseup=\"stopDrag()\"><span>"+_title+"</span></div><div class=\"client\">"+_message+"</div>";
		box = document.getElementById("modalBox");
		box.innerHTML = _message;
		onWindowOpen("modalBox", _modal);
	}
	else
	{
		_message = "<div class=\"titleBar\" onmousedown=\"startDrag(this);\" onmouseup=\"stopDrag()\"><span>"+_title+"<input type=\"button\" value=\"x\" style=\"float:right\" onclick=\"onWindowClose('messageBox')\" /></span></div><div class=\"client\">"+_message+"</div>";
		box = document.getElementById("messageBox");
		box.innerHTML = _message;
		onWindowOpen("messageBox", _modal);
	}
}
