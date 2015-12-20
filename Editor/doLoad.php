<?php
if(isset($_POST['fname']))
{
	$file = fopen("maps/".$_POST['fname'], "r");
	if($file)
	{
		$block = fread($file, filesize("maps/".$_POST['fname']));
		fclose($file);
		//echo $block;
		echo "{\"type\":\"map\", \"message\":\"File Load Successful\", \"data\":".$block."}";
	}
	else
	{
		echo "{\"type\":\"error\", \"message\":\"Could Not Find File ".$_POST['fname']."\"}";
	}
}
else
{
	echo "{\"type\":\"error\", \"message\":\"File Name Not Specified\"}";
}
?>
