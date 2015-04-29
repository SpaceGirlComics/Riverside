<!DOCTYPE html>

<?php 
	$mInput = "oncontextmenu=\"return(false);\" onmousedown=\"onMouseDown(event, this)\" onmouseup=\"onMouseUp(event, this)\" onmouseout=\"onMouseOut(event, this)\" onmousemove=\"onMouseMove(event, this)\"";
	$kInput = "onkeyup=\"onKeyUp(event)\" onkeydown=\"onKeyDown(event)\"";
?>

<html>
	<style>
		div.console
		{
			background: linear-gradient(RGBA(136, 0, 255, 0), RGBA(50, 0, 255, 130));
			color:#ffffff;	
	    		height: 100px;
	    		position: relative;
	    		top:-70px; opacity:0.0; display:none;
	    		-webkit-transition: opacity 3s, top 3.1s;
	    		transition: opacity 3s, top 3.1s;
		}
		
		div.console ul
		{
			margin-bottom:0px;
			list-style-type:none;
		}
		
		div.console input[type=text]
		{
			color:#ffffff;
			background:RGBA(0,0,0,0);
			border:0px solid black;
			outline:none;
			width:80%;
			margin-left:10px;
		}
		
		div.console input[type=button]
		{
			height:22px;
		}
		
		.VisCons
		{top:-100px; opacity:1.0; display:block;
		}
	</style>
	<head>
		<title>
			RPG POC
		</title>
		<link rel="stylesheet" type="text/css" href="css/game.css" />
		<script type="text/javascript" src="js/common.js"></script>
		<script type="text/javascript" src="js/Waypoint.js"></script>
		<script type="text/javascript" src="js/Character.js"></script>
		<script type="text/javascript" src="js/Tile.js"></script>
		<script type="text/javascript" src="js/Layer.js"></script>
		<script type="text/javascript" src="js/Map.js"></script>
		<script type="text/javascript" src="js/Game.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
		<script type="text/javascript" src="js/camcom.js"></script>
	</head>
	<body <?php echo $kInput;?>>
		<div class="screen">
			<canvas id="can" width="800" height="550" <?php echo $mInput;?>>
				A Modern Browser Is Required
			</canvas>
			<div id="cons" class="console" style="">
				<ul id="msgs">
					<li>&gt;</li>
					<li>&gt;</li>
					<li>&gt;</li>
					<li>&gt;<input id="com" type="text" style="" placeholder="" /><input type="button" value="&crarr;" onclick="command()" /><li>
				
				</ul>
			</div>
		</div>
	</body>
</html>
