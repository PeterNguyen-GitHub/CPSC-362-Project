class BoardObject
{

  constructor(xPos, yPos, width, height, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  // should not be overriden.
  // if making a new shape, override drawShape function
  paint(ctx) {
    // save current canvas x and y origin coordinates
    ctx.save();
    // move x and y origin to where the object will start
    ctx.translate(this.xPos, this.yPos);
    this.drawShape(ctx);
    // set origin back to canvas top left corner.
    ctx.restore();
    return this;
  }

  // draw on canvas the shape of this object
  // object will now be painted as if upper left corner is the (0,0) coordinate
  // will overriden by sub classes of different shape
  drawShape(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  detectCollisionWith(otherObject) {
    if (
      this.xPos + this.width  >= otherObject.xPos                      &&
      this.xPos               <= otherObject.xPos + otherObject.width  &&
      this.yPos + this.height >= otherObject.yPos                      &&
      this.yPos               <= otherObject.yPos + otherObject.height
    ) {
      return true;
    }
    return false;
  }
}

export default BoardObject;
