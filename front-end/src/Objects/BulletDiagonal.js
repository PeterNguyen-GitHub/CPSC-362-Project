import { BULLET_DIRECTION_DOWN_UP } from "../constants";
import Bullet from "./Bullet"

class BulletDiagonal extends Bullet
{
  speed = 2
  move() {
    if (this.direction === BULLET_DIRECTION_DOWN_UP) {
      this.yPos = this.yPos - this.speed;
    } else {
      this.yPos = this.yPos + this.speed;
      this.xPos = this.xPos + 1;
    }
    return this;    
  }
}

export default BulletDiagonal;