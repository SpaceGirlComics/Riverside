function Project()
{
	var s;
	var d;

	this.create = function(_a, _s, _d)
	{
		s = new Source();
		s.create(_s, _a);
		d = new Destination();
		d.create(_d, _a);
	}
	
	this.onSourceEvent = function(_t, _e)
	{
		if(s)
		{
			switch(_e.type)
			{
				case "touchstart":
				{
					break;
				}
								
				case "touchmove":
				{
					break;
				}
				
				case "touchenter":
				{
					break;
				}
				
				case "touchleave":
				{
					break;
				}
				
				case "touchend":
				{
					break;
				}

			}
		}
	}
	
	this.onDestEvent = function(_t, _e)
	{
		if(d)
		{
			switch(_e.type)
			{
				case "touchstart":
				{
					break;
				}
								
				case "touchmove":
				{
					break;
				}
				
				case "touchenter":
				{
					break;
				}
				
				case "touchleave":
				{
					break;
				}
				
				case "touchend":
				{
					break;
				}

			}
		}
	}
	
	this.modeChange = function(_c, _m)
	{
		switch(_c)
		{
			case 0:
			{
				break;
			}
			
			case 1:
			{
				break;
			}
		}
	}
	
	this.getMode = function(_c)
	{
		switch(_c)
		{
			case 0:
			{
				break;
			}
			
			case 1:
			{
				break;
			}
		}
		return(0);
	}
}
