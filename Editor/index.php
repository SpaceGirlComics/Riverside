<!DOCTYPE html>
<html>
	<head>
		<title>SpaceEdit</title>
		<meta charset="utf-8" />
		<link href="css/edit2.css" rel="stylesheet" />
		<link href="css/menuBar.css" rel="stylesheet" />
		<link href="css/statBar.css" rel="stylesheet" />
		<link href="css/frameWindow.css" rel="stylesheet" />
		<script type="text/javascript" src="js/common.js"></script>
		<script type="text/javascript" src="js/defines.js"></script>
		<script type="text/javascript" src="js/Map/Tile.js"></script>
		<script type="text/javascript" src="js/Map/Layer.js"></script>
		<script type="text/javascript" src="js/Map/Map.js"></script>
		<script type="text/javascript" src="js/Source.js"></script>
		<script type="text/javascript" src="js/Dest.js"></script>
		<script type="text/javascript" src="js/Patterns.js"></script>
		<script type="text/javascript" src="js/edit2.js"></script>
		<script type="text/javascript" src="js/windowHandeler.js"></script>
		<script type="text/javascript" src="js/messageBox.js"></script>
		
	</head>
	<body onmousemove="onMouseMove(event)">
		<div class="menu" style="z-index:20">
			<ul>
				<li>
					<a href="#">File</a>
					<ul>
						<li class="divider"><a href="#" onclick="onWindowOpen('newBox', true)">New&hellip;</a></li>
						<li><a href="#" onclick="onWindowOpen('loadBox', true)">Open&hellip;</a></li>
						<li><a href="#" onclick="onWindowOpen('saveBox', true)">Save As&hellip;</a></li>
						<li><a href="#" onclick="onSave()">Save</a></li>
					</ul>
				</li>
				<li>
					<a href="#">Test</a>
					<ul>
						<li><a href="#" onclick="messageBox('Hi There!', 'how\'s it going', 1, BTN_OK);">Run</a></li>
						<li class="divider"><a href="#" onclick="onRun()">Run Without Console</a></li>
						<li><a href="#" onclick="onSetExec()">Set Program&hellip;</a></li>
					</ul>
				</li>
				<li>
					<a href="#">Windows</a>
					<ul>
						<li><a href="#" onclick="onWindowOpen('tileBox', false)">Tiles&hellip;</a></li>
						<li><a href="#" onclick="onWindowOpen('objectBox', false)">Objects&hellip;</a></li>
						<li><a href="#" onclick="onWindowOpen('layerBox', false)">Layers&hellip;</a></li>
						<li><a href="#" onclick="onWindowOpen('consoleBox', false)">Console&hellip;</a></li>
						<li><a href="#" onclick="onWindowOpen('patternBox', false)">Patterns&hellip;</a></li>
						<li><a href="#" onclick="onWindowOpen('shapeBox', false)">Shapes&hellip;</a></li>
					</ul>
				</li>
			</ul>
		</div>
		<div id="messageBox" style="display:none; z-index:2" onmousedown="reorderWindows(this)">
		</div>
		
		<div id="tileBox" style="display:none; z-index:3" onmousedown="reorderWindows(this)">
			<div class="titleBar" onmousedown="startDrag(this);" onmouseup="stopDrag()">
				<span>Tiles<input type="button" value="x" style="float:right" onclick="onWindowClose('tileBox')" /></span>	
			</div>
			<div class="client">
				<?php	$f = "onSourceEvent(this, event)";
					$event = "onmousemove=\"".$f."\" onmousedown=\"".$f."\" ";
					$event .= "onmouseleave=\"".$f."\" onmouseup=\"".$f."\" ";
					$event .= "oncontextmenu=\"return(false)\"";?>
				<canvas id="tSource" height="300" width="400" style="border:1px inset; background-color:#000000" <?php echo $event; ?>>
					A Modern Browser Is Required!
				</canvas><br />
				<input id="tAnimEnable" type="checkbox" onclick="onAnimationCheck(this)" />
				<label for="tAnimEnable">Animation</label><br />
				<select style="width:10em" id="tframes">
				</select>
				<input id="tRem" type="button" value="-" onclick="onRemFrame()" />
				<input id="tAdd" type="button" value="+" onclick="onAddFrame()" />
				<input id="tClear" type="button" value="X" onclick="onClearFrames()" />
				<input id="tFps" style="width:10em" type="number" min="0" placeholder="FPS" /><br />
				<input id="tFirst" style="width:10em" type="number" min="0" placeholder="Initial Frame" />
				<input id="tMin" style="width:10em" type="number" min="0" placeholder="Min Frame" />
				<input id="tMax" style="width:10em" type="number" min="0" placeholder="Max Frame" />
			</div>
		</div>
		<div id="patternBox" style="display:none; z-index:4" onmousedown="reorderWindows(this)">
			<div class="titleBar" onmousedown="startDrag(this);" onmouseup="stopDrag()">
				<span>Patterns<input type="button" value="x" style="float:right" onclick="onWindowClose('patternBox')" /></span>
			</div>
			<div class="client">
				<?php	$f = "onPatternEvent(this, event)";
					$event = "onmousemove=\"".$f."\" onmousedown=\"".$f."\" ";
					$event .= "onmouseleave=\"".$f."\" onmouseup=\"".$f."\" ";
					$event .= "oncontextmenu=\"return(false)\"";?>
				<canvas id="pSource" height="200" width="250" style="border:1px inset; background-color:#000000" <?php echo $event; ?>>
					A Modern Browser Is Required!
				</canvas><br />
				<select id="pSelect" style="width:13em;">
					<option disabled="disabled" selected="selected">Patterns</option>
				</select>
				<input id="pRemPatt" type="button" value="-" />
				<input id="pAddPatt" type="button" value="+" onclick="onWindowOpen('newPatBox', true)" /><br />
			</div>
		</div>
		<div id="layerBox" style="display:none; z-index:5" onmousedown="reorderWindows(this)">
			<div class="titleBar" onmousedown="startDrag(this);" onmouseup="stopDrag()">
				<span>Layers<input type="button" value="x" style="float:right" onclick="onWindowClose('layerBox')" /></span>
				
			</div>
			<div class="client">
				<select id="lLayers" style="width:13em;" onchange="onLayerSelect()">
				<!--option disabled="disabled" selected="selected" hidden="hidden">Layers</option-->
				</select>
				<input id="lRemove" type="button" value="-" onclick="onRemLayer()"><br />
				<input id="lRaise" type="button" value="&uarr;" onclick="onRaise()">
				<input id="lLower" type="button" value="&darr;" onclick="onLower()">
				<input id="lVisible" type="checkbox" title="Layer Visibility" onclick="onVisible(this)" />
				<label for="lVisible" title="Layer Visibility">&#x1f440;</label>
				<hr />
				<input id="lName" type="text" placeholder="New Layer Name" onblur="verifyName(this)" onkeyup="verifyName(this)" />
				<input id="lAdd" type="button" value="+" onclick="onAddLayer()"><br />
				<input id="lFillOnCreate" type="checkbox" title="Fill With Current Tile" />
				<label for="lFillOnCreate" title="Fill With Current Tile">&#x1f4a7;</label>
				
			</div>
		</div>
		<div id="objectBox" style="display:none; z-index:6" onmousedown="reorderWindows(this)">
			<div class="titleBar" onmousedown="startDrag(this);" onmouseup="stopDrag()">
				<span>Objects<input type="button" value="x" style="float:right" onclick="onWindowClose('objectBox')" /></span>
				
			</div>
			<div class="client">
				<select id="oObjects" style="width:13em;">
					<option disabled="disabled" selected="selected">Objects</option>
				</select>
			</div>
		</div>
		<div id="consoleBox" style="display:none; z-index:7" onmousedown="reorderWindows(this)">
			<div class="titleBar" onmousedown="startDrag(this);" onmouseup="stopDrag()">
				<span>Console<input type="button" value="x" style="float:right" onclick="onWindowClose('consoleBox')" /></span>
				
			</div>
			<div class="client">
				<div id="consoleScreen" style="color:#ffffff; border:1px inset; height:300px; width:450px; background-color:#000000">
					<div id="consoleOutput" style="v-align:bottom;">
					</div>
					&gt;<input id="consoleInput" type="text" placeholder="Command" style="border:0px none; color:#ffffff; background-color:rgba(0,0,0,0); outline:medium none;">
				</div>
				
			</div>
		</div>
		<div id="shapeBox" style="display:none; z-index:8" onmousedown="reorderWindows(this)">
			<div class="titleBar" onmousedown="startDrag(this);" onmouseup="stopDrag()">
				<span>Shapes<input type="button" value="x" style="float:right" onclick="onWindowClose('shapeBox')" /></span>
			</div>
			<div class="client">
				<select id="ptName" style="width:13em;">
				</select>
				<input type="button" value="-" onclick="remPath()" /><br />
				<input id="ptNewName" type="text" placeholder="Path Name" />
				<input type="button" value="+" onclick="addPath()" />
				<hr />
				<select id="shPatterns" style="width:15em">
				</select><br />
				<select id="ptPoints" style="width:13em;">
				</select>
				<input type="button" value="-" onclick="remPoint()" /><br />
				<input id="ptPointX" type="text" placeholder="X" />
				<input id="ptPointY" type="text" placeholder="Y" /><br />
				<input id="ptSet" class="twostate" type="checkbox" onclick="onPointCheck(this)" />
				<label for="ptSet">*</label>
				<input type="button" value="+" onclick="addPoint()" />
			</div>
		</div>
		<div  tyle="display:block; z-index:1; margin-top:1.5em;">
		<?php
		$event = "onmousemove=\"onDestEvent(this, event)\" onmousedown=\"onDestEvent(this, event)\" ";
		$event .= "onmouseleave=\"onDestEvent(this, event)\" onmouseup=\"onDestEvent(this, event)\" ";
		$event .= "oncontextmenu=\"return(false)\"";?>
<canvas id="destination" width="800" height="500" style="background-color:#000000; position:relative; top:20px; border:1px solid white;" <?php echo $event; ?>>
</canvas>
		</div>
		<div id="status" class="statBar" style="z-index:20">
		</div> 
		<div id="modal" style="display:none; z-index:100">
			<div id="modalBox" style="display:none">
			</div>
			<div id="newBox" style="display:none">
				<div class="titleBar" onmousedown="startDrag(this);" onmouseup="stopDrag()">
					<span>New Map</span>
				</div>
				<div class="client" id="newBoxClient">
					<form name="map">
						<input id="mName" type="text" placeholder="Map Name" style="width:26.5em;" onblur="verifyName(this)" onkeyup="verifyName(this)" /><br />
						<input id="mWidth" type="text" placeholder="Map Width" onblur="verifyInt(this)" onkeyup="verifyInt(this)" />
						<input id="mHeight" type="text" placeholder="Map Height" onblur="verifyInt(this)" onkeyup="verifyInt(this)" /><br />
						<input id="mGravX" type="text" placeholder="X Gravity" onblur="verifyFloat(this)" onkeyup="verifyFloat(this)" />
						<input id="mGravY" type="text" placeholder="Y Gravity" onblur="verifyFloat(this)" onkeyup="verifyFloat(this)" /><br />
						<input id="mScrollX" type="text" placeholder="X Scroll Speed" onblur="verifyFloat(this)" onkeyup="verifyFloat(this)" />
						<input id="mScrollY" type="text" placeholder="Y Scroll Speed" onblur="verifyFloat(this)" onkeyup="verifyFloat(this)" /><hr />
						<select id="mTileMap" style="width:26.5em;">
							<option disabled="disabled" selected="selected">Tile Map</option>
							<?php
								$d = scandir("img/tm");
								foreach($d as $f)
								{
									if($f != "." && $f != "..")
									{
										echo "\t\t\t\t\t\t\t<option>".$f."</option>\n";
									}
								}
							?>
						</select><br />
						<input id="mSWidth" type="text" placeholder="Source Width" onblur="verifyInt(this)" onkeyup="verifyInt(this)" />
						<input id="mDWidth" type="text" placeholder="Destination Width" onblur="verifyInt(this)" onkeyup="verifyInt(this)" /><br />
						<input id="mSHeight" type="text" placeholder="Source Height" onblur="verifyInt(this)" onkeyup="verifyInt(this)" />
						<input id="mDHeight" type="text" placeholder="Destination Height" onblur="verifyInt(this)" onkeyup="verifyInt(this)" /><hr />
						<select id="mBgm" style="width:24em;" >
							<option disabled="disabled" selected="selected">BGM</option>
							<option>None</option>
							<?php
								$d = scandir("music");
								$s = "";
								foreach($d as $f)
								{
									
									$f=substr($f, 0, (strlen ($f)) - (strlen (strrchr($f,'.'))));
									if($f != "." && $f != ".." && strlen($f)>0 && !strstr($s, $f))
									{
										$s .= "\t\t\t\t\t\t\t<option>".$f."</option>\n";
									}
								}
								echo $s;
							?>
						</select>
						<audio id="mAudio" src="" onended="onAudioEnd(this)"></audio>
						<input id="mPlay" type="button" value=">" onclick="onPlay(this, event)" /><br />
						<select id="mFG" style="width:173px;">
							<option disabled="disabled" selected="selected">Weather</option>
							<option>Clear</option>
							<option>Rainy</option>
							<option>Stromy</option>
							<option>Flurries</option>
							<option>Blizzard</option>
						</select>
						<select id="mBG" style="width:173px;">
							<option disabled="disabled" selected="selected">Backdrop</option>
							<option>None</option>
							<?php
								$d = scandir("img/bd");
								$s = "";
								foreach($d as $f)
								{
									
									$f=substr($f, 0, (strlen ($f)) - (strlen (strrchr($f,'.'))));
									if($f != "." && $f != ".." && strlen($f)>0 && !strstr($s, $f))
									{
										$s .= "\t\t\t\t\t\t\t<option>".$f."</option>\n";
									}
								}
								echo $s;
							?>
						</select><hr />
						<input id="mAuto" type="button" value="Auto" onclick="onAuto()" />
						<input id="mReset" type="button" value="Reset" onclick="onReset()" />
						<input id="mCancel" type="button" value="Cancel" onclick="onWindowClose('newBox')" style="float:right;" />
						<input id="mBuild" type="button" value="Build" onclick="onBuild()" style="float:right;" />
					</form>
				</div>
			</div>
			<div id="saveBox" style="display:none">
				<div class="titleBar" onmousedown="startDrag(this);" onmouseup="stopDrag()">
					<span>Save As&hellip;</span>
				</div>
				<div class="client">
					<form name="saveAs">
						<select id="sFileSelect" style="width:25em;" size="10">
						<?php
							$d = scandir("maps");
							foreach($d as $f)
							{
								if($f != "." && $f != "..")
								{
									echo "\t\t\t\t\t\t\t<option>".$f."</option>\n";
								}
							}
						?>
						</select><br />
						<input id="sName" style="width:24.3em;" type="text" placeholder="Save As" onkeyup="onMapSettingChange(this,0)" onchange="onMapSettingChange(this,0)" /><br />
						<select id="sType" style="width:167px;">
							<option value="0">json, Raw &ndash; .rjn</option>
							<option value="1">json, Run-length Encoded &ndash; .ljn</option>
							<option value="2">json, Inline Command &ndash; .cjn</option>
						</select>
						<input id="sSave" type="button" value="Save" onclick="onSaveAs()" />
						<input id="sCancel" type="button" value="Cancel" onclick="onWindowClose('saveBox')" />
					</form>
				</div>
			</div>
			<div id="loadBox" style="display:none">
				<div class="titleBar" onmousedown="startDrag(this);" onmouseup="stopDrag()">
					<span>Open&hellip;</span>
				</div>
				<div class="client">
					<form name="load">
						<select id="lFileSelect" style="width:25em;" size="10">
						<?php
							$d = scandir("maps");
							foreach($d as $f)
							{
								if($f != "." && $f != "..")
								{
									echo "\t\t\t\t\t\t\t<option>".$f."</option>\n";
								}
							}
						?>
						</select><br />
						<input id="lCancel" type="button" value="Cancel" onclick="onWindowClose('loadBox')" style="float:right" />
						<input id="lOpen" type="button" value="Open" onclick="onOpen()" style="float:right" />
					</form>
				</div>
			</div>
			
			<div id="newPatBox" style="display:none">
				<div class="titleBar" onmousedown="startDrag(this);" onmouseup="stopDrag()">
					<span>New Pattern&hellip;</span>
				</div>
				<div class="client">
					<form name="newPattern">
						<input id="npName" type="text" placeholder="Pattern Name" style="width:26.5em;" onblur="verifyName(this)" onkeyup="verifyName(this)" /><br />
						<input id="npWidth" type="text" placeholder="Map Width" onblur="verifyInt(this)" onkeyup="verifyInt(this)" />
						<input id="npHeight" type="text" placeholder="Map Height" onblur="verifyInt(this)" onkeyup="verifyInt(this)" /><br />
						<input id="npCancel" type="button" value="Cancel" onclick="onWindowClose('newPatBox')" style="float:right" />
						<input id="npBuild" type="button" value="Build" onclick="onWindowClose('newPatBox')" style="float:right" />
					</form>
				</div>
			</div>
		</div>
		
	</body>
</html>
