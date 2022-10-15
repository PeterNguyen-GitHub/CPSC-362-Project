import { CANVAS_HEIGHT } from "../constants";
import BoardObject from "./BoardObject";

class Enemy extends BoardObject
{
  attributes = {
    pointsMultiplier: 1,
  };
  speed = 10;
  firingIntervalID;
  
  constructor(xPos, yPos, width, height, color, pointsMultiplier, speed) {
    super(xPos, yPos, width, height, color);
    this.speed = speed
    this.attributes.pointsMultiplier = pointsMultiplier;
  }

  // firing intervals
  setIntervalID(id) {
    this.firingIntervalID = id;
  }

  getIntervalID() {
    return this.firingIntervalID;
  }

  move() {
    this.yPos = this.yPos + this.speed;

    if (this.yPos > CANVAS_HEIGHT) {
      this.yPos = 0;
    }
    
    return this;
  }
}

export default Enemy;
