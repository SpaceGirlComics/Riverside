<?php

if(isset($_POST['n']))
{
	$n = "maps/".$_POST['n'];
	$f = fopen($n, "r");
	if($f)
	{
		$s = fread($f, filesize($n));
		fclose($f);
		echo $s;
	}
}

?>
