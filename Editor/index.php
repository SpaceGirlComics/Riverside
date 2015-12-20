<!DOCTYPE html>
<html>
	<head>
		<title>Level Editor</title>
		
		<link rel="stylesheet" type="text/css" href="css/edit.css" />
		<link rel="stylesheet" type="text/css" href="css/blades.css" />
		
		<link rel="stylesheet" href="css/editor.css" type="text/css" />
		
		<script src="js/Blade.js" type="text/javascript"></script>
		<script src="js/BladeControl.js" type="text/javascript"></script>
		<script src="js/events.js" type="text/javascript"></script>
		
		<script src="js/common.js" type="text/javascript"></script>
		<script src="js/Box.js" type="text/javascript"></script>
		<script src="js/Circle.js" type="text/javascript"></script>
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
		<?php
			include("blades/File.php");
			include("blades/New.php");
			include("blades/Layers.php");
			include("blades/Tiles.php");
			include("blades/Patterns.php");
			include("blades/Objects.php");
			include("blades/Console.php");
		?>
		<div style="position:relative; left:25.5em;">
			<canvas	style="background-color:#000000; border-width:2px; border-style:inset" width="550" height="550">
				A Modern Browser Is Required
			</canvas><br />
			<input class="btype" type="radio" name="dMode" id="dEdit" checked="checked" />
			<label for="dEdit" title="Edit">&#9998;</label>
			<input class="btype" type="radio" name="dMode" id="dPan" />
			<label for="dPan" title="Pan">&#9995;</label>
		</div>
	</body>
</html>
