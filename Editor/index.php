<!DOCTYPE html>
<html>
	<head>
		<title>SpaceEdit</title>
		
		<link rel="stylesheet" type="text/css" href="css/edit3.css" />
		<link rel="stylesheet" type="text/css" href="css/blades.css" />
		<link rel="stylesheet" type="text/css" href="css/buttons.css" />
		
		<script type="text/javascript" src="js/common.js"></script>
		<script type="text/javascript" src="js/Blade.js"></script>
		<script type="text/javascript" src="js/BladeControl.js"></script>
		<script type="text/javascript" src="js/edit3.js"></script>
		<script type="text/javascript" src="js/Source.js"></script>
		<script type="text/javascript" src="js/Dest.js"></script>
		<script type="text/javascript" src="js/Project.js"></script>
	</head>
	<body>
		<?php
			include("blades/File.php");
			include("blades/Level.php");
			include("blades/Patterns.php");
			include("blades/Tiles.php");
			include("blades/Obj.php");
			include("blades/Console.php");
		?>
		<div style="position:relative; left:25.5em;">
			<canvas	id="destination" style="background-color:#000000; border-width:2px; border-style:inset" width="550" height="550">
				A Modern Browser Is Required
			</canvas><br />
			<input class="btype" type="radio" name="dMode" id="dEdit" checked="checked" />
			<label for="dEdit" title="Edit">&#9998;</label>
			<input class="btype" type="radio" name="dMode" id="dPan" />
			<label for="dPan" title="Pan">&#9995;</label>
		</div>
	</body>
</html>
