function Circle()
{
  var x;
  var y;
  var r;
  
  this.create = function(_x, _y, _r)
  {
    x = _x;
    y = _y;
    r = _r;
  }
  
  this.getX = function(){return(x);}
  this.getY = function(){return(y);}
  this.getRadius = function(){return(r);}
  this.getDiameter = function(){return(2*r);}
  this.getArea = function(){return(Math.PI*r*r);}
  this.getCircumfance = function(){return(2*r*Math.PI);}
  
  this.setX = function(_x){x = _x;}
  this.setY = function(_y){y = _y;}
  this.setPosition = function(_x, _y){x = _x; y = _y;}
  this.translate = function(_x, _y){x += _x; y += _y;}
  
  this.setRadius = function(_r){r = _r;}
}
