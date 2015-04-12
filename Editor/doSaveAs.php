<?php
if(isset($_POST['n']))
{
	$fname = $_POST['n'];
	$fdata = $_POST['m'];
	$f = fopen("maps/".$fname, "w");
	if($f)
	{
		if(fwrite($f, $fdata))
		{
			echo "File Saved As ".$fname;
		}
		else
		{
			echo "File Save Failed";
		}
		fclose($f);
	}
}
?>
