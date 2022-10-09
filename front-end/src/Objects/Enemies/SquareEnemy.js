import { COLOR_ENEMY_BLUE } from "../../constants";
import Enemy from "../Enemy";

class SquareEnemy extends Enemy
{
  constructor(xPos, yPos, speed) {
    const width            = 20;
    const height           = 20;
    const color            = COLOR_ENEMY_BLUE;
    const pointsMultiplier = 1;
    super(xPos, yPos, width, height, color, pointsMultiplier, speed);
  }

  // Override base class drawShape function to customize this enemy's shape
  // draw on canvas the shape of this object
  // object will now be painted as if upper left corner is the (0,0) coordinate
  drawShape(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
  }
}

export default SquareEnemy;
