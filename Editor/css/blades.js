div.blade
{
	width:225px;
	height:600px;
	border-radius: 10px;
	position:absolute;
	top:5px;
	-webkit-transition: left 0.5s ease-out;
transition: left 0.5s ease-out;
}

div.blade div:nth-child(1)
{
	width:200px;
	left:0px;
	padding: 5px;
}

div.blade div:nth-child(2)
{
	-webkit-transform: rotate(90deg);
	-webkit-transform-origin: left top 0;
	transform: rotate(90deg);
	transform-origin: left top 0;
	position:absolute;
	top:0px;
	left:225px;
	padding-left:15px;
	padding-top:3px;
	border-bottom:1px solid black;
	width:585px;
	font-family:Arial;
	height:25px;
	color:#ffffff;
	text-shadow: 2px 2px 2px #000000;
	cursor:pointer;
}

div.blade:nth-child(1)
{
	background-color: rgba(255, 0, 0, 1.0);
	z-index:100;
}

div.blade:nth-child(2)
{
	background-color: rgba(0, 255, 0, 1.0);
	z-index:99;
}

div.blade:nth-child(3)
{
	background-color: rgba(0, 0, 255, 1.0);
	z-index:98;
}

div.blade:nth-child(4)
{
	background-color: rgba(255, 255, 255, 1.0);
	z-index:97;
}

div.blade:nth-child(5)
{
	background-color: rgba(0, 255, 255, 1.2);
	z-index:96;
}

div.blade:nth-child(6)
{
	background-color: rgba(255, 0, 255, 1.0);
	z-index:95;
}

div.blade:nth-child(7)
{
	background-color: rgba(255, 255, 0, 1.0);
	z-index:94;
}
