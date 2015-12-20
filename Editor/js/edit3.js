var blades;
var project;

// initializes the page
function init()
{
	// check if the page is complete
	if(document.getElementById("f") != null)
	{
		blades = new BladeControl();		// instanciate a new blade controller
		blades.create();			// initialize it, and add blades
		blades.addBlade("f");
		blades.addBlade("g");
		blades.addBlade("p");
		blades.addBlade("e");
		blades.addBlade("o");
		blades.addBlade("c");
		
	}
	// if not
	else
	{
		// try again next frame
		requestAnimationFrame(init);
	}
}

// fires when a blade is selected
function onBladeSelect(_e, _t)
{
	blades.doShow(_t.parentNode);
}

// fires when the user presses the play button on the "level" blade
function onPlay(_t, _e)
{
	var bgm = document.getElementById("mAudio");
	switch(_t.value)
	{
		case ">":
		{
			if(document.forms["map"]["mBgm"].value != "None" && document.forms["map"]["mBgm"].value != "BGM")
			{
				if(bgm != null)
				{
					bgm.src = "music/"+ document.forms["map"]["mBgm"].value + ".mp3";
					_t.value = "[]";
					bgm.play();
				}
				else
				{
					alert("bgm not defined");
				}
			}
			break;
		}
		
		case "[]":
		{
			if(bgm != null)
			{
				_t.value = ">";
				bgm.pause();
			}
			else
			{
				alert("bgm not defined");
			}
			break;
		}
	}
}

// fires when the music preview ends
function onAudioEnd(_t)
{
	_t.value = ">";
}

// fires when the auto button is pushed, for quickly making a map
function onAuto()
{
	var d = document.forms["map"];
	d["mName"].value = "Auto Map";
	d["mWidth"].value = "128";
	d["mHeight"].value = "128";
	d["mSWidth"].value = "16";
	d["mSHeight"].value = "16";
	d["mDWidth"].value = "16";
	d["mDHeight"].value = "16";
	d["mTileMap"].selectedIndex = 1;
	d["mBgm"].selectedIndex = 1;
	d["mFG"].selectedIndex = 1;
	d["mBG"].selectedIndex = 1;
	d["mScrollX"].value = "0.0";
	d["mScrollY"].value = "0.0";
	d["mGravX"].value = "0.0";
	d["mGravY"].value = "0.0";
}

// fires when the reset button is pushed, resets the controls on the "new" blade
function onReset()
{
	var d = document.forms["map"];
	d["mName"].value = "";
	d["mWidth"].value = "";
	d["mHeight"].value = "";
	d["mSWidth"].value = "";
	d["mSHeight"].value = "";
	d["mDWidth"].value = "";
	d["mDHeight"].value = "";
	d["mTileMap"].selectedIndex = 0;
	d["mBgm"].selectedIndex = 0;
	d["mFG"].selectedIndex = 0;
	d["mBG"].selectedIndex = 0;
	d["mScrollX"].value = "";
	d["mScrollY"].value = "";
	d["mGravX"].value = "";
	d["mGravY"].value = "";
}

function onBuild()
{
	var d = document.forms["map"];
	var a = {"name":d["mName"].value,
		"dim":{"x":parseInt(d["mWidth"].value),
			"y":parseInt(d["mHeight"].value)},
		"sDim":{"x":parseInt(d["mSWidth"].value),
			"y":parseInt(d["mSHeight"].value)},
		"dDim":{"x":parseInt(d["mDWidth"].value),
			"y":parseInt(d["mDHeight"].value)},
		"tilePath":"img/tm/"+d["mTileMap"].value,
		"bgm":"music/"+d["mBgm"].value,
		"weather":d["mFG"].value,
		"backdrop":"img/bd/"+d["mBG"].value,
		"speed":{"x":parseInt(d["mScrollX"].value),
			"y":parseInt(d["mScrollY"].value)},
		"gravity":{"x":parseInt(d["mGravX"].value),
			"y":parseInt(d["mGravY"].value)}};
			
	project = new Project();
	project.create(a, "source", "destination");
	blades.doShow(document.getElementById("e"));
}

requestAnimationFrame(init);
