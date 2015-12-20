<?php
if($_POST['fname'])
{
	if($_POST['dat'])
	{
		$file = fopen($_POST['fname'], "w");
		if($file)
		{
			fwrite($file, $_POST['dat']);
			fclose($file);
			echo "{\"type\":\"success\", \"message\":\"File Successfully Saved As".$_POST['fname']."\"}";
		}
		else
		{
			echo "{\"type\":\"error\", \"message\":\"File Write Has Failed, Check File Name And Try Again\"}";
		}
	}
	else
	{
		echo "{\"type\":\"error\", \"message\":\"File Is Empty.\"}";
	}
}
else
{
	echo "{\"type\":\"error\", \"message\":\"File Name Not Specified.\"}";
}
?>
