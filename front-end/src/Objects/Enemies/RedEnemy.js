import { CANVAS_HEIGHT, CANVAS_WIDTH, COLOR_ENEMY_RED } from "../../constants";
import Enemy from "../Enemy";

class RedEnemy extends Enemy
{
  moveXCounter = 2;

  constructor(xPos, yPos, speed) {
    const width            = 15;
    const height           = 25;
    const color            = COLOR_ENEMY_RED;
    const pointsMultiplier = 2;
    super(xPos, yPos, width, height, color, pointsMultiplier, speed);
  }

  // Override base class drawShape function to customize this enemy's shape
  // draw on canvas the shape of this object
  // object will now be painted as if upper left corner is the (0,0) coordinate
  drawShape(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  move() {
    this.yPos = this.yPos + this.speed;
    if (this.yPos > CANVAS_HEIGHT) {
      this.yPos = 0;
    }

    // move in the x direction every 2 paints so that it looks like moving 
    // in a horizontal diagonal
    if (this.moveXCounter === 0) {
      this.moveXCounter = 2;              // reset counter

      const newXpos = this.xPos + this.speed;
      if (newXpos < CANVAS_WIDTH && newXpos > 0) {
        this.xPos = newXpos;
      } else {
        this.xPos = 0;
      }
    }

    this.moveXCounter--;
    return this;
  }
}

export default RedEnemy;
