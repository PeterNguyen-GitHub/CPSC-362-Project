import { CANVAS_HEIGHT, COLOR_POWERUP } from "../constants";
import BoardObject from "./BoardObject"; 

class Powerup extends BoardObject
{
  attributes = {
    pointsMultiplier: 1,
  };
  speed = 10;
  
  constructor(xPos, yPos, speed) {
    const width = 20;
    const height = 20;
    super(xPos, yPos, width, height);
    this.color = COLOR_POWERUP;
    this.speed = speed;
  }

  drawShape(ctx) {
    ctx.fillStyle = COLOR_POWERUP;
    ctx.beginPath();
    ctx.arc(this.width/2, this.width/2, (this.width/2), 0, 2 * Math.PI);
    ctx.fill();
  }

  move() {
    this.yPos = this.yPos + this.speed;

    if (this.yPos > CANVAS_HEIGHT) {
      this.yPos = 0;
    }
    
    return this;
  }
}

export default Powerup;