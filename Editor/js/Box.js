// a simple 2d box class
// © 2015 spacegirl.net
// April 16, 2015 - initial submit

function Box()
{
  var x;
  var y;
  var w;
  var h;
  
  // defines/redfines the object
  // _x, _y = coordinates of the box
  // _w, _h = the dimensions of the box
  this.create = function(_x, _y, _w, _h)
  {
    x = _x;
    y = _y;
    w = _w;
    h = _h;
  }
  
  this.getX = function(){return(x);}
  this.getY = function(){return(y);}
  this.getWidth = function(){return(w);}
  this.getHeight = function(){return(h);}
  this.getArea = function(){return(w*h);}
  
  this.setX = function(_x){x = _x;}
  this.setY = function(_y){y = _y;}
  this.setPosition = function(_x, _y){x = _x; y = _y;}
  this.translate = function(_x, _y){x += _x; y += _y;}
  
  this.setWidth = function(_w){w = _w;}
  this.setHeight = function(_h){h = _h;}
  this.setDimensions = function(_w, _h){w = _w; h = _h}
  this.scale = function(_s){w *= _s; h *= _s}
}
