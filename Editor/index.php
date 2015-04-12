<!DOCTYPE html>
<html>
	<head>
		<title>
			SG Editor
		</title>
		
		<link rel="stylesheet" href="css/editor.css" type="text/css" />
		
		<script src="js/common.js" type="text/javascript"></script>
		<script src="js/Block.js" type="text/javascript"></script>
		<script src="js/rle.js" type="text/javascript"></script>
		<script src="js/Console.js" type="text/javascript"></script>
		<script src="js/Cursor.js" type="text/javascript"></script>
		<script src="js/Tile.js" type="text/javascript"></script>
		<script src="js/Layer.js" type="text/javascript"></script>
		<!--script src="js/Map.js" type="text/javascript"--></script>
		<script src="js/Source.js" type="text/javascript"></script>
		<script src="js/Dest.js" type="text/javascript"></script>
		<script src="js/Project.js" type="text/javascript"></script>
		<script src="js/edit.js" type="text/javascript"></script>
		<script src="js/snl.js" type="text/javascript"></script>
	</head>
	<body onload="onLoad()">
		<table>
			<table>
				<tr>
					<td colspan="2">
						<canvas id="source" width="450" height="300" oncontextmenu="return(false);" onmousedown="onSourceDown(event, this)" onmouseup="onSourceUp(event, this)" onmouseout="onSourceOut(event, this)" onmousemove="onSourceMove(event, this)">
							A Modern Browser Is Required
						</canvas>
					</td>
					<td colspan="3">
						<canvas id="dest" width="450" height="300" oncontextmenu="return(false);" onmousedown="onDestDown(event, this)" onmouseup="onDestUp(event, this)" onmouseout="onDestOut(event, this)" onmousemove="onDestMove(event, this)">
							A Modern Browser Is Required
						</canvas>
					</td>
				</tr>
				<tr id="menu">
					<th onclick="onSelect(this, event)" class="selected">File</th>
					<th onclick="onSelect(this, event)">New</th>
					<th onclick="onSelect(this, event)">Layers</th>
					<th onclick="onSelect(this, event)">Objs</th>
					<th onclick="onSelect(this, event)">Console</th>
				</tr>
				<tr>
					<td colspan="5">
						<div style="display:none; height:200px;" id="Objs">
							<select>
								<option>Chest</option>
								<option>Switch</option>
								<option>Character</option>
								<option>Sprite</option>
								<option>Block</option>
							</select>
							<!--div id="Chest" style="margin:5px; display:block;">
								<div style="width:33%; float:left;">
									<input type="text" style="width:75px;" placeholder="X" />
									<input type="text" style="width:75px;" placeholder="Y" /><br/>
									<select>
										<option disabled="disabled" selected="selected" />Layer</option>
									</select><br />
									<select>
										<option disabled="disabled" selected="selected" />Contains</option>
									</select><br />
									<input name="locked" type="radio" checked="checked" />Unlocked<br />
									<input name="locked" type="radio" />Locked<br />
									<input name="locked" type="radio" />Sealed<br />
									<input name="locked" type="radio" />Opened<br />
								</div>
								<div style="width:33%; float:right">
									<textarea placeholder="On Activate" style="resize:none;"></textarea>
								</div>
								
							</div-->
						</div>
						<div style="display:none; height:200px;" id="New">
							<input id="mName" style="width:167px;" onchange="onNameChange(this)" type="text" placeholder="Map Name"  /><br />
							<input id="mWidth" style="width:75px;" onchange="onNumberChange(this)" type="text" placeholder="Map Width" />
							<input id="mHeight" style="width:75px;" onchange="onNumberChange(this)" type="text" placeholder="Map Height" /><br />
							<input id="sWidth" style="width:75px;" onchange="onNumberChange(this)" type="text" placeholder="Source Width" />
							<input id="sHeight" style="width:75px;" onchange="onNumberChange(this)" type="text" placeholder="Source Height" /><br />
							<input id="dWidth" style="width:75px;" onchange="onNumberChange(this)" type="text" placeholder="Dest Width" />
							<input id="dHeight" style="width:75px;" onchange="onNumberChange(this)" type="text" placeholder="Dest Height" /><br />
							<select style="width:167px;" id="mTileMap">
								<option disabled="disabled" selected="selected" />Tile Map</option>
								<?php
									$d = scandir("tilemaps");
									foreach($d as $f)
									{
										if($f != "." && $f != "..")
										{
											echo "\t\t\t\t\t\t\t<option>".$f."</option>\n";
										}
									}
								?>
							</select><br />
							<select style="width:130px;" id="mBgm">
								<option disabled="disabled" selected="selected" />BGM</option>
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
							</select><input id="mPlay" type="button" value=">" onclick="onPlay(this, event)" /><br />
							<input id="mBuild" type="button" value="Build" onclick="onBuild()" />
							<input id="mAuto" type="button" value="Auto" onclick="onAuto()" />
						</div>
						<div style="display:none; height:200px;" id="Layers">
							<select style="width:167px;" id="lSelected" height="5" disabled="disabled" onchange="onLayerChange(event, this)">
							</select>
							<input id="lVisable" type="checkbox" disabled="disabled" onchange="onSetLayerVisible(event, this)" /><br />
							<input id="lName" type="text" placeholder="New Layer Name" disabled="disabled" />
							<input id="lFill" type="checkbox" disabled="disabled" /><br />
							<input id="lRaise" style="width:35px;" type="button" value="&uarr;" onclick="onRaiseLayer(event)" disabled="disabled" />
							<input id="lLower" style="width:35px;" type="button" value="&darr;" onclick="onLowerLayer(event)" disabled="disabled" />
							<input id="lRemove" style="width:35px;" type="button" value="-" onclick="onRemLayer(event)" disabled="disabled" />
							<input id="lAdd" style="width:35px;" type="button" value="+" onclick="onAddLayer(event)" disabled="disabled" />
						</div>
						<div style="display:block; height:200px;" id="File">
							<input id="fName" style="width:100px;" type="text" placeholder="File Name" />
							<input id="fSaveAs" type="button" value="Save As" onclick="onSaveAs()" /><br />
							<select style="width:167px;" id="fSelect">
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
							<input id="fLoad" type="button" value="Load" onclick="onLoadFile()" />
							<input id="fSave" type="button" value="Save" onclick="onSave()" /><br />
							<input id="fRaw" name="encode" type="radio" value="0" checked="checked" />Raw<br />
							<input id="fRLE1" name="encode" type="radio" value="1" />RLE1<br />
							<input id="fRLE2" name="encode" type="radio" value="2" />RLE2<br />
							<div id ="reply"></div>
						</div>
						<div style="display:none; height:200px;" id="Console">
							<div id="con" class="console">
							</div>
							<textarea id="command" style="resize:none; width:600px; height:80px; margin-top:5px" placeholder="Command" /></textarea>
							<input id="return" type="button" onclick="onCommand(event)" value="&#9166;" />
						</div>
					</td>
				</tr>
			</table>
		</table>
		<audio id="mAudio" onended="onAudioEnd(this)"></audio>
	</body>
</html>
