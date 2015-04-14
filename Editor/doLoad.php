<?php
// server script. Loads a map as a string and sends it to the clients
// © 2015 spacegirl.net
// April 15, 2015 - initial submit

// check for the file name in the qstring
if(isset($_POST['n']))
{
	$n = "maps/".$_POST['n'];
	$f = fopen($n, "r");				// opens the file
	if($f)
	{
		$s = fread($f, filesize($n));		// read its contents
		fclose($f);				// close the file
		echo $s;				// echo the data to the client
	}
}

?>
