<?php
// Sends data from specified file to the client

if(isset($_POST['n']))					// get the file name from the string
{
	$n = "maps/".$_POST['n'];
	$f = fopen($n, "r");				// open the specified file
	if($f)
	{
		$s = fread($f, filesize($n));		// read the file contents
		fclose($f);				// close th file
		echo $s;				// echo contents back to client
	}
}

?>
