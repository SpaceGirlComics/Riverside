function onSaveAs()
{
	con.message("Saving...");
	var nm = document.getElementById("fName").value;
	if(nm ==null || nm.length <1)
	{
		con.serious("Transmission Not Sent:");
		con.warning("No File Name Specified");
		return(1);
	}
	doPost(nm)
	return(0);
}

function onSave()
{
	con.message("Saving...");
	var nm = document.getElementById("fSelect").options[document.getElementById("fSelect").selectedIndex].value;
	if(nm ==null || nm.length <1)
	{
		con.serious("Transmission Not Sent:");
		con.warning("No File Name Specified");
		return(1);
	}
	doPost(nm)
	return(0);
}

function doPost(_nm)
{
	var rp = document.getElementById("reply");
	
	var rq = new XMLHttpRequest();
	rq.onreadystatechange = function()
	{
		switch(rq.readyState)
		{
			case 0:
			{
				rp.innerHTML = "Request Not Initialized";
				//con.warning(rq.statusText);
				break;
			}
			
			case 1:
			{
				rp.innerHTML = "Connection Established";
				//con.warning(rq.statusText);
				break;
			}
			
			case 2:
			{
				rp.innerHTML = "Request Received";
				//con.warning(rq.statusText);
				break;
			}
			
			case 3:
			{
				rp.innerHTML = "Processing";
				//con.warning(rq.statusText);
				break;
			}
			
			case 4:
			{
				rp.innerHTML = "Reply Received";
				switch(rq.status)
				{
					case 200:
					{
						rp.innerHTML = rq.responseText;
						break;
					}
					
					case 404:
					{
						rp.innerHTML = "Page Not Found";
						break;
					}
					
					default:
					{
						rp.innerHTML = "Contingency not accounted for status "+ rq.status;
						break;
					}
				}
				break;
			}
			
			deafult:
			{
				rp.innerHTML = "Unknown Ready State Encountered<br />Operation Cancelled";
				break
			}
		}
	}
	
	var en = document.getElementsByName("encode");
	var encode = 0;
	for(var x = 0; x < en.length; x++)
	{
		if(en[x].checked)
		{
			encode = parseInt(en[x].value);
		}
	}
	
	rq.open("POST", "doSaveAs.php", true);
	rq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	rq.send("m="+proj.getJsonMap(encode)+"&n="+_nm);
	
	return(0);
}

function onLoadFile()
{
	con.message("Loading...");
	var d = document;
	var nm = d.getElementById("fSelect").options[d.getElementById("fSelect").selectedIndex].value;
	
	var rq = new XMLHttpRequest();
	var rp = d.getElementById("reply");
	rq.onreadystatechange = function()
	{
		switch(rq.readyState)
		{
			case 0:
			{
				rp.innerHTML = "Request Not Initialized";				
				break;
			}
			
			case 1:
			{
				rp.innerHTML = "Connection Established";
				break;
			}
			
			case 2:
			{
				rp.innerHTML = "Request Received";
				break;
			}
			
			case 3:
			{
				rp.innerHTML = "Processing";
				break;
			}
			
			case 4:
			{
				rp.innerHTML = "Reply Received";
				switch(rq.status)
				{
					case 200:
					{
						dl = JSON.parse(rq.responseText);
						var s = d.getElementById("lSelected");
						setLayersActivate(true);
						s.innerHTML = "";
						d.getElementById("mName").value = dl.name;
						d.getElementById("mWidth").value = dl.width;
						d.getElementById("mHeight").value = dl.height;
						d.getElementById("sWidth").value = dl.sourceWidth;
						d.getElementById("sHeight").value = dl.sourceHeight;
						d.getElementById("dWidth").value = dl.destinationWidth;
						d.getElementById("dHeight").value = dl.destinationHeight;
						for(var x = 0; x < d.getElementById("mTileMap").options.length; x++)
						{
							if(d.getElementById("mTileMap").options[x].value == dl.tilemap)
							{
								d.getElementById("mTileMap").selectedIndex = x;
							}
							else if(x == d.getElementById("mTileMap").options.length-1)
							{
								con.serious("File Load Failed, Tile map "+dl.tilemap+" Was Not Found");
								return(-1);
							}
						}
						for(var x = 0; x < d.getElementById("mBgm").options.length; x++)
						{
							if(d.getElementById("mBgm").options[x].value == dl.bgm)
							{
								d.getElementById("mBgm").selectedIndex = x;
							}
							else if(x == d.getElementById("mBgm").options.length-1)
							{
								con.warning("Warning, Sound File "+dl.bmg+" Was Not Found");
							}
						}
						onBuild();
						
						proj.decode = function()
						{
							switch(dl.encode)
							{
								case 0:
								{
									for(var x = 0; x < dl.layers.length; x++)
									{
										//con.message(dl.layers[x].name);
										proj.addLayerFromArray(dl.layers[x].name, dl.layers[x].tiles);
										s.innerHTML += "<option>"+dl.layers[x].name+"</option>";
									}
									
									break;
								}
								
								case 1:
								{
									for(var x = 0; x < dl.layers.length; x++)
									{
										//con.message(dl.layers[x].name);
										dl.layers[x].tiles = type1RLD(dl.layers[x].tiles);
										proj.addLayerFromArray(dl.layers[x].name, dl.layers[x].tiles);
										s.innerHTML += "<option>"+dl.layers[x].name+"</option>";
									}
									break;
								}
								
								case 2:
								{
									for(var x = 0; x < dl.layers.length; x++)
									{
										con.message(dl.layers[x].name);
										dl.layers[x].tiles = type2RLD(dl.layers[x].tiles);
										proj.addLayerFromArray(dl.layers[x].name, dl.layers[x].tiles);
										s.innerHTML += "<option>"+dl.layers[x].name+"</option>";
									}
									break;
								}
								
								default:
								{
									con.warning("Unknown EncodeType, I'll Try Ignoring it. I Hope This Works");
									break;
								}
								
								
							}
							if(dl.width*dl.height != dl.layers[0].tiles.length)
							{
								con.serious("File Load Failed, Tile Count Does Not Match("+(dl.width*dl.height)+" : "+dl.layers[0].tiles.length+")");
								return(-1); 
							}
							rp.innerHTML = "Data Load and Expantion Successful";
							proj.forceDraw();
						}
						break;
					}
					
					case 404:
					{
						rp.innerHTML = "Page Not Found";
						break;
					}
					
					default:
					{
						rp.innerHTML = "Contingency not accounted for status "+ rq.status;
						break;
					}
				}
				break;
			}
			
			deafult:
			{
				rp.innerHTML = "Unknown Ready State Encountered<br />Operation Cancelled";
				break
			}
		}
	}
	
	rq.open("POST", "doLoad.php", true);
	rq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	rq.send("n="+nm);
	
	return(0);
}
