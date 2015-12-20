// commands

// for tiles
var TM_NULL		= 0x00000000;		// performs no action (could be used to halt execution of enqueued commands)
var TM_DOMODAL		= 0x00000001;		// posts a request to enter a modal state into the response
var TM_ENDMODAL		= 0x00000002;		// posts a request to exit a modal state if currently in one
var TM_DODIALOG		= 0x00000003;		// posts a request to display a dialog box
var TM_CLOSEDIALOG	= 0x00000004;		// posts a request to close a dialog box
var TM_SHOP		= 0x00000005;		// posts a request to display a shop screen
var TM_BATTLECRY	= 0x00000006;		// posts a request for an enemy battle cry
var TM_BATTLE		= 0x00000007;		// posts a request to enter a battle state
var TM_BOSS		= 0x00000008;		// posts a request for a boss battle to begin
var TM_DELETE		= 0x00000009;		// posts a request to delete an actor, layer, or other item
var TM_CREATE		= 0x0000000A;		// posts a request to create an actor, layer or other item
var TM_LOADMAP		= 0x0000000B;		// posts a request to begin loading a map
var TM_LOOKAT		= 0x0000000C;		// posts a request to scroll the viewport to coordinates
var TM_TRANSLATE	= 0x0000000D;		// move destination box to a relative position
var TM_MOVETO		= 0x0000000E;		// move destination box to an absolute position 
var TM_SCALE		= 0x00000018;		// scales the size of the destination box
var TM_RESIZE		= 0x0000001A;		// absolutly resizes the destination box
var TM_REWIDTH		= 0x0000001B;		// relativly resizes the width of the destination box 
var TM_REHEIGHT		= 0x0000001C;		// relativly resizes the height of the destination box
var TM_RERESIZE		= 0x0000002D;		// posted to its own queue after any resizing of the destination box 
var TM_PUSHPOINT	= 0x00000011;		// places a point at the end of the list
var TM_POPPOINT		= 0x00000012;		// removes a point at the end of the list
var TM_ADDPOINT		= 0x00000013;		// places a point at the front of the list
var TM_REMPOINT		= 0x00000014;		// removes a point at the front of the list
var TM_INSPOINT		= 0x00000015;		// places a new point after the current
var TM_FIND		= 0x00000016;		// not implemented! same as TM_SETWAYPOINT bt will use more advanced pathfinding
var TM_SNIPPOINT	= 0x00000017;		// removes a points after the current
var TM_SETNODE		= 0x00000019;		// set the currently sought node in the path
var TM_SETWIDTH		= 0x0000001D;		// relativly resizes the width of the source box 
var TM_SETHEIGHT	= 0x0000001E;		// relativly resizes the height of the source box 
var TM_ZOOM		= 0x0000001F;		// scales the size of the source box
var TM_UV_RESIZE	= 0x00000020;		// absolutley resizes the source box
var TM_UV_REWIDTH	= 0x00000021;		// relativly resizes the width of the source box
var TM_UV_REHEIGHT	= 0x00000022;		// relativly resizes the height of the source box
var TM_UV_SETWIDTH	= 0x00000023;		// absolutly resizes the width of the source box
var TM_UV_SETHEIGHT	= 0x00000024;		// absolutly resizes the height of the source box
var TM_UV_TRANSLATE	= 0x0000000F;		// move source to a relative position
var TM_UV_MOVETO	= 0x00000010;		// move source to an absolute position
var TM_UV_RERESIZE	= 0x0000002E;		// posted to its own queue after any resizing of the source box
var TM_SETSTATE		= 0x00000025;		// sets the current state
var TM_ORSTATE		= 0x00000026;		// bitwise or the state with another value
var TM_ANDSTATE		= 0x00000027;		// bitwise and the state with another value
var TM_SETFRAME		= 0x00000028;		// set the current frame
var TM_MINFRAME		= 0x00000029;		// set the minimum frame 
var TM_MAXFRAME		= 0x0000002A;		// set the maximum frame
var TM_FRAMERATE	= 0x0000002B;		// set how often the frame changes
var TM_DECFRAME		= 0x00000030;		// decreases the current frame, if the current frame is the min frame then the value is ignored
var TM_INCFRAME		= 0x00000031;		// increases the current frame, if the current frame is the max frame then the value is ignored
var TM_DECFRAMELOOP	= 0x00000032;		// decreases the current frame, if the current frame is the min frame then the value is set to the max value
var TM_INCFRAMELOOP	= 0x00000033;		// increases the current frame, if the current frame is the max frame then the value is set to the max value
var TM_VISIBLE		= 0x0000002C;		// set the tile to draw or not
var TM_MESSAGEFOR	= 0x0000002F;		// for sending a message to another specified object
var TM_DESTROY		= 0x00000034;		// posted to its own queue before deletion
var TM_GAMETIME		= 0x00000035;		// posted when the total gametime is greater than a specified value
var TM_SCENETIME	= 0x00000036;		// posted when the currnet map time is greater than a specified value
var TM_ACTORTIME	= 0x00000037;		// posted when this tile has existed for a time greater than one specified
var TM_INTIALIZE	= 0x00000038;		// tile is defiined
var TM_STATECHANGE	= 0x00000039;		// the state is changed
var TM_COLLIDE		= 0x0000003A;		// somthing collided with this tile
var TM_PLAYER		= 0x0000003B;		// player collided with this tile
var TM_ACTIVATE		= 0x0000003C;		// the player activates this object
var TM_ENTER		= 0x0000003D;		// the mouse moves onto the tile
var TM_HOVER		= 0x0000003E;		// the mouse moves while over a tile
var TM_LEAVE		= 0x0000003F;		// the mouse moves off the tile
var TM_LBDOWN		= 0x00000040;		// the left mouse button is press while on the tile
var TM_LBUP		= 0x00000041;		// left mouse is released on the tile
var TM_RBDOWN		= 0x00000042;		// right mouse button is pressed while on the tile
var TM_RBUP		= 0x00000043;		// right mouse is released on the tile
var TM_LTENTER		= 0x00000044;		// a touch moved onto the tile
var TM_TMOVE		= 0x00000045;		// a touch moves while over the tile
var TM_TLEAVE		= 0x00000046;		// a touch moved off of the tile
var TM_TSTART		= 0x00000047;		// A touch begins on a tile
var TM_TSTOP		= 0x00000048;		// a touch is realeased on a tile
var TM_UPDATE		= 0x00000049;		// an update of the tile has ended
var TM_DRAW		= 0x0000004A;		// the drawing of this tile has ended
var TM_SHOW		= 0x0000004B;		// the tile was made visible
var TM_HIDE		= 0x0000004C;		// the tile was made hidden
var TM_KEYUP		= 0x0000004D;		// a keyboard key was released
var TM_KEYDOWN		= 0x0000004E;		// a keyboard key was pressed
var TM_FRAMECHANGE	= 0x0000004F;		// the current frame was changed
var TM_SETTILE		= 0x00000050;		// set the current number, frame values
var TM_SETFLIMIT	= 0x00000051;		// set upper and lower frames

// for maps
var MM_NULL		= 0x000000B0;		// no operation
var MM_MKLAYER		= 0x000000B1;		// create a new layer
var MM_RMLAYER		= 0x000000B2;		// remove an existing layer
var MM_LWRLAYER		= 0x000000B3;		// lower an existing layer, by one level, if it is not at the bottom
var MM_RSELAYER		= 0x000000B4;		// raise an existing layer, by one level, if it is not already on top
var MM_SETTILE		= 0x000000B5;		// set the value of a tile, if target is null then the change occurs on the currently selected layer 
var MM_SLLAYER		= 0x000000B7;		// selects a the layer specified in target
var MM_INITIALIZE	= 0x000000B8;		// map has been defined
var MM_SETSCROLL	= 0x000000B9;
var MM_SLAYER		= 0x000000BA;
var MM_VSLAYER		= 0x000000BB;
var MM_ADDPATH		= 0x000000BC;
var MM_REMPATH		= 0x000000BD;

// for layers
var LM_NULL		= 0x000000d0;		// no operation
var LM_SETTILE		= 0x000000d1;		// set a tile value
var LM_SETSCROLL	= 0x000000d2;		// the absolute scroll value
var LM_INITIALIZE	= 0x000000d3;		// layer has been defined
var LM_DRAW		= 0x000000d4;		// after layer has been drawn
var LM_UPDATE		= 0x000000d5;
var LM_VISIBLE		= 0x000000d6;

// commands
/*var CO_MAKE		= 0x00000100;
var CO_DESTROY		= 0x00000200;
var CO_ADD		= 0x00000300;
var CO_REMOVE		= 0x00000400;
var CO_SET		= 0x00000500;*/

var MB_LEFT		= 0x00000100;		// when this flag is true, the left mouse button is down
var MB_MIDDLE		= 0x00000400;		// when this flag is true, the middle mouse button is down
var MB_RIGHT		= 0x00000200;		// when this flag is true, the right mouse button is down
var MB_BACK		= 0x00000800;		// when this flag is true, the back mouse button is down
var MB_FORWARD		= 0x00001000;		// when this flag is true, the forward mouse button is down

// engine
var SM_MOUSEMOVE	= 0x000000F0;		// the mouse hase moved onto the canvas (viewport or view)
var SM_MBDOWN		= 0x000000F1;		// a mouse button has been pushed while over the canvas
var SM_MBUP		= 0x000000F2;		// a mouse button has been released while over the canvas
var SM_MOUSEOUT		= 0x000000F3;		// the mouse has moved off the canvas
var SM_MKLAYER		= 0x000000F4;		// create a new layer
var SM_SLAYER		= 0x000000F5;		// select layer on map
var SM_RMLAYER		= 0x000000F6;		// remove layer from map
var SM_VSLAYER		= 0x000000F7;		// make layer visible/invisible
var SM_RSLAYER		= 0x000000F8;		// raise layer
var SM_LWLAYER		= 0x000000F9;		// lower layer
var SM_COMMAND		= 0x000000FA;

// states / properties
var SP_VISIBLE		= 0x01000000;		// when this flag is ture in a state value then the object is visible
var SP_INITIALIZED	= 0x00000001;		// when this flag is true in a state value then the init function has been called
var SP_LOOPS		= 0x02000000;
