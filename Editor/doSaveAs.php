<?php
// server script.
// © 2015 spacegirl.net
// April 15, 2015 - initial submit

// check if a file name is specified
if(isset($_POST['n']))
{
	$fname = $_POST['n'];				// get the file name from the qstring
	$fdata = $_POST['m'];				// get the map data from the qstring
	$f = fopen("maps/".$fname, "w");		// open (create) the file
	if($f)
	{
		if(fwrite($f, $fdata))			// write data to the file
		{
			echo "File Saved As ".$fname;	// echo success back to the client
		}
		else
		{
			echo "File Save Failed";	// echo failure
		}
		fclose($f);				// close the file
	}
}
?>
