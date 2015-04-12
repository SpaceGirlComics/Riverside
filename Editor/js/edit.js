var proj = null;
var con = null;
var ob = false;

function verifyName(_s)
{
	var s = typeof(_s);
	if(!(s.toUpperCase() == "STRING"))
	{
		con.warning("Names Must Be Of Type String Not Type "+s);
		return(1);
	}
	else if(_s.length < 1)
	{
		con.warning("Names Must Be At Least One Charater");
		return(1);
	}
	else if(_s.length > 30)
	{
		con.warning("Names Must Be Less Than 30 Charaters");
		return(1);
	}
	else if(_s.charAt(0).toUpperCase() == _s.charAt(0).toLowerCase())
	{
		con.warning("Names Must Start With A Letter");
		return(1);
	}
	else if(/^[a-zA-Z0-9- ]*$/.test(_s) == false)
	{
    		con.warning("Names Cannot Contain Special Charaters");
		return(1);
	}
	return(0);
}

function verifyDimension(_n)
{
	if(!isNumber(_n))
	{
		con.warning("Dimensions Must Be A Number");
		return(1);
	}
	else if(_n < 0)
	{
		con.warning("Dimensions Must be Greater Than Zero");
		return(1)
	}
	return(0);
}

function onLoad()
{
	con = new Console(document.getElementById("con"));
	con.message("Console Initialized");
	setLayersActivate(true);
}

function onBuild()
{
	var d = document;
	
	var p = parseInt;
	var fail = false;
	var mn = d.getElementById("mName").value;
	var tm = d.getElementById("mTileMap").value;
	var bm = d.getElementById("mBgm").value;

	var dh = p(d.getElementById("dHeight").value);
	if(verifyDimension(dh) != 0)
	{
		con.serious("Destination Height Not Acceptable:");
		fail = true;
	}
	
	var dw = p(d.getElementById("dWidth").value);
	if(verifyDimension(dw) != 0)
	{
		con.serious("Destination Width Not Acceptable:");
		fail = true;
	}
	
	var sh = p(d.getElementById("sHeight").value);
	if(verifyDimension(sh) != 0)
	{
		con.serious("Source Height Not Acceptable:");
		fail = true;
	}
	
	var sw = p(d.getElementById("sWidth").value);
	if(verifyDimension(sw) != 0)
	{
		con.serious("Source Width Not Acceptable:");
		fail = true;
	}
	
	var mh = p(d.getElementById("mHeight").value);
	if(verifyDimension(mh) != 0)
	{
		con.serious("Map Height Not Acceptable:");
		fail = true;
	}
	
	var mw = p(d.getElementById("mWidth").value);
	if(verifyDimension(mw) != 0)
	{
		con.serious("Map Width Not Acceptable:");
		fail = true;
	}
	
	if(verifyName(mn) != 0)
	{
		con.serious("Map Name Not Acceptable:");
		fail = true;
	}
	
	if(fail)
	{
		con.serious("!!!!Map Build Failed!!!!");
		return(-1);
	}
	else
	{	
		if(proj != null)
		{
			proj.destroy();
			delete(proj);
			proj = null;
		}
		
		proj = new Project();
		proj.create(mn, mw, mh, sw, sh, dw, dh, "tilemaps/"+tm, "music/"+bm, d.getElementById("source"), d.getElementById("dest"));
		setLayersActivate(false);
	}
}

function onNumberChange(_t)
{
	if(_t.value.length > 0 && verifyDimension(parseInt(_t.value)) != 0)
	{
		_t.style = "width: 75px; background-color: red; color: white;";
	}
	else
	{
		_t.style = "width: 75px;"
	}
}

function onNameChange(_t)
{
	if(_t.value.length > 0 && verifyName(_t.value) != 0)
	{
		_t.style = "width: 167px; background-color: red; color: white;";
	}
	else
	{
		_t.style = "width: 167px;"
	}
}

function onPlay(_t, _e)
{
	var aud = document.getElementById("mAudio");
	var bm = document.getElementById("mBgm");
	var ext = ".ogg";
	if(aud.canPlayType("audio/ogg") == "")
	{
		ext = ".mp3";
	}
	if(bm.value != "None" && bm.value != "BGM")
	{
		if(_t.value == ">")
		{
			aud.src = "music/"+bm.value+ext;
			aud.onplaying = function(){con.message("Playing: " + aud.src);}
			aud.onerror = function(){con.serious("Cannot Play "+aud.src); _t.value = ">";}
			con.warning("Loading: "+aud.src);
			aud.play();
			_t.value = "[]";
		}
		else
		{
			con.message("Stopped");
			aud.pause();
			aud.currentTime = 0;
			_t.value = ">";
		}
	}
}

function onAudioEnd(_t)
{
	var pb = document.getElementById("mPlay");
	con.warning("Playback Has Ended");
	pb.value = ">";
	_t.currentTime = 0;
}

function onClear()
{
	con.clear();
}

function onSelect(_t, _e)
{
	var a = document.getElementById("menu");
	for(var b = 0; b < a.cells.length; b++)
	{
		a.cells[b].className = "";
	}
	_t.className = "selected";
	
	document.getElementById("File").style.display = "none";
	document.getElementById("Objs").style.display = "none";
	document.getElementById("New").style.display = "none";
	document.getElementById("Layers").style.display = "none";
	document.getElementById("Console").style.display = "none";
	
	if(_t.innerHTML == "Objs")
	{
		ob = true;
	}
	else
	{
		ob = false;
	}
	
	a = document.getElementById(_t.innerHTML);
	a.style.display = "block";
	a.style.height = "200px";
}

function onCommand(_e)
{
	var ta = document.getElementById("command");
	var cmd = ta.value;
	ta.value = "";
	switch(cmd)
	{
		case "CLS":
		case "Cls":
		case "cls":
		{
			onClear();
			break;
		}
		
		default:
		{
			con.serious("Command "+cmd+" Is Not Valid!");
		}
	}
}



function setLayersActivate(_t)
{
	var d = document;
	
	d.getElementById("lSelected").disabled = _t;
	d.getElementById("lName").disabled = _t;
	d.getElementById("lVisable").disabled = _t;
	d.getElementById("lRaise").disabled = _t;
	d.getElementById("lLower").disabled = _t;
	d.getElementById("lRemove").disabled = _t;
	d.getElementById("lAdd").disabled = _t;
	d.getElementById("lFill").disabled = _t;
}

function onAddLayer(_e)
{
	var d = document;
	var nm = d.getElementById("lName");
	if(verifyName(nm.value) == 0)
	{
		var lis = d.getElementById("lSelected");
		for(var a = 0; a < lis.options.length; a++)
		{
			if(lis.options[a].value == nm.value)
			{
				con.serious("New Layer Name Rejected:");
				con.warning("Layer Names Must Be Unique");
				nm.value ="";
				return;
			}
		}
		lis.innerHTML = "<option>"+nm.value+"</option>"+lis.innerHTML;
		lis.selectedIndex = 0;
		d.getElementById("lVisable").checked = true;
		if(d.getElementById("lFill").checked == true)
		{
			proj.addLayer(nm.value, "fill");
		}
		else
		{
			proj.addLayer(nm.value);
		}
	}
	else
	{
		con.serious("Layer Name \""+nm.value+"\" Rejected");
		nm.value ="";
		return;
	}
	nm.value ="";
	con.message("Added Layer: "+lis.options[0].value);

}

function onRemLayer(_e)
{
	var d = document;
	var lis = d.getElementById("lSelected");
	if(lis.selectedIndex < 0)
	{
		con.serious("Layer Not Removed:");
		con.warning("Selected Layer Was Not Valid");
	}
	var b = lis.selectedIndex;
	var a = lis.options[b].value;
	lis.remove(b);
	delete(proj.removeLayer(b));
	con.message("removed layer :" +a);
}

function onRaiseLayer(_e)
{
	var d = document;
	var lis = d.getElementById("lSelected");
	
	if(lis.selectedIndex >0)
	{
		var a = lis.options[lis.selectedIndex].innerHTML;
		lis.options[lis.selectedIndex].innerHTML = lis.options[lis.selectedIndex-1].innerHTML;
		lis.options[lis.selectedIndex-1].innerHTML = a;
		lis.selectedIndex--;
		proj.raiseSelectedLayer();
		con.message("Raised Layer " + a);
	}
	else
	{
		con.warning("Selected Layer Cannot Be Raised, It Is At The Top Of The Stack");
	}
}

function onLowerLayer(_e)
{
	var d = document;
	var lis = d.getElementById("lSelected");
	
	if(lis.selectedIndex < lis.options.length-1)
	{
		var a = lis.options[lis.selectedIndex].innerHTML;
		lis.options[lis.selectedIndex].innerHTML = lis.options[lis.selectedIndex+1].innerHTML;
		lis.options[lis.selectedIndex+1].innerHTML = a;
		lis.selectedIndex++;
		proj.lowerSelectedLayer();
		con.message("Lowered Layer " + a);
	}
	else
	{
		con.warning("Selected Layer Cannot Be Lowered, It Is At The Bottom Of The Stack");
	}
}

function onSetLayerVisible(_e, _t)
{
	con.message("Setting Layer visibility to: "+_t.checked);
	if(proj != null)
	{
		proj.setLayerVisible(_t.checked);
	}
}

function onLayerChange(_e, _t)
{
	if(_t.selectedIndex > -1 && proj != null)
	{
		proj.setSelectedLayer(_t.selectedIndex);
		con.message("Layer changed to "+_t.selectedIndex);
		con.message(proj.getLayerVisible());
		document.getElementById("lVisable").checked = proj.getLayerVisible();
	}
}

function onAuto()
{
	d = document;
	d.getElementById("mName").value = "AutoMap";
	d.getElementById("mTileMap").selectedIndex = 1;
	d.getElementById("mBgm").selectedIndex = 1;
	d.getElementById("dHeight").value = "16";
	d.getElementById("dWidth").value = "16";
	d.getElementById("sHeight").value = "16";
	d.getElementById("sWidth").value = "16";
	d.getElementById("mHeight").value = "50";
	d.getElementById("mWidth").value = "50";
}

function onSourceDown(_e, _t)
{
	var a = getClickOnElementPosition(_e.clientX, _e.clientY, _t);
	con.message("Mouse Button "+_e.button+" Pressed @ "+a[0]+", "+a[1]+" On The Source Element");
	
	if(proj != null && _e.button == 0)
	{
		proj.onSourceLBDown(a[0], a[1]);
		
	}
	else if(proj != null && _e.button == 2)
	{
		proj.onSourceRBDown(a[0], a[1]);
	}
}

function onSourceUp(_e, _t)
{
	var a = getClickOnElementPosition(_e.clientX, _e.clientY, _t);
	con.message("Mouse Button "+_e.button+" Pressed @ "+a[0]+", "+a[1]+" On The Source Element");
	
	if(proj != null && _e.button == 0)
	{
		proj.onSourceLBUp(a[0], a[1]);
		
	}
	else if(proj != null && _e.button == 2)
	{
		proj.onSourceRBUp(a[0], a[1]);
	}
}

function onSourceMove(_e, _t)
{
	var a = getClickOnElementPosition(_e.clientX, _e.clientY, _t);
	if(proj != null && _e.button == 2)
	{
		proj.onSourceMove(a[0], a[1]);
		
	}
}

function onSourceOut(_e, _t)
{
	if(proj != null)
	{
		proj.onSourceOut();
	}
}

//////////////////////

function onDestDown(_e, _t)
{
	var a = getClickOnElementPosition(_e.clientX, _e.clientY, _t);
	if(!ob)
	{
		if(proj != null)
		{
			if(_e.button == 0)
			{
				proj.onDestLBDown(a[0], a[1]);
			}
			else if(_e.button == 2)
			{
				proj.onDestRBDown(a[0], a[1]);
			}
		}
	}
	else
	{
		proj.addObject(0, ["block", a[0], a[1], 16, 16]);
	}
	//con.message("Mouse Button "+_e.button+" Pressed @ "+_e.clientX+", "+_e.clientY+" On The Destination Element");
}

function onDestUp(_e, _t)
{
	var a = getClickOnElementPosition(_e.clientX, _e.clientY, _t);
	if(proj != null)
	{
		if(_e.button == 0)
		{
			proj.onDestLBUp(a[0], a[1]);
		}
		else if(_e.button == 2)
		{
			proj.onDestRBUp(a[0], a[1]);
		}
	}
	//con.message("Mouse Button "+_e.button+" Released @ "+_e.clientX+", "+_e.clientY+" On The Destination Element");
}

function onDestMove(_e, _t)
{
	var a = getClickOnElementPosition(_e.clientX, _e.clientY, _t);
	if(proj != null)
	{
		proj.onDestMove(a[0], a[1]);
	}
	//con.message("Mouse Moved To "+_e.clientX+", "+_e.clientY+" On The Destination Element");
}

function onDestOut(_e, _t)
{
	if(proj != null)
	{
		proj.onDestOut();
	}
	//con.message("The Mouse Has Left The Destination Element");
}

////////////////////

function onSourceTouchStart(_e){}
function onSourceTouchEnd(_e){}
function onSourceTouchChange(_e){}
function onSourceTouchOut(_e){}
function onDestTouchStart(_e){}
function onDestTouchEnd(_e){}
function onDestTouchChange(_e){}
function onDestTouchOut(_e){}
