
<!DOCTYPE html>

<?php 
	$mInput = "oncontextmenu=\"return(false);\" onmousedown=\"onMouseDown(event, this)\" onmouseup=\"onMouseUp(event, this)\" onmouseout=\"onMouseOut(event, this)\" onmousemove=\"onMouseMove(event, this)\"";
	$kInput = "onkeyup=\"onKeyUp(event)\" onkeydown=\"onKeyDown(event)\"";
?>

<html>
	<head>
		<title>
			RPG POC
		</title>
		<link rel="stylesheet" type="text/css" href="css/game.css" />
		<script type="text/javascript" src="js/RPG1.js"></script>
		<script type="text/javascript" src="js/Waypoint.js"></script>
		<script type="text/javascript" src="js/Character.js"></script>
		<script type="text/javascript" src="js/Tile.js"></script>
		<script type="text/javascript" src="js/Layer.js"></script>
		<script type="text/javascript" src="js/Map.js"></script>
		<script type="text/javascript" src="js/Game.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
	</head>
	<body <?php echo $kInput;?>>
		<div class="screen">
			<canvas id="can" width="800" height="550" <?php echo $mInput;?>>
				A Modern Browser Is Required
			</canvas>
		</div>
	</body>
</html>
