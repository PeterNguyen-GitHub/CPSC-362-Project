import { COLOR_ENEMY_ORANGE, BULLET_DIRECTION_UP_DOWN, COLOR_ENEMY_BULLET } from "../../constants";
import Enemy from "../Enemy";
import BulletDiagonal from "../BulletDiagonal";

class OrangeEnemy extends Enemy
{
    constructor(xPos, yPos, speed) {
    const width            = 30;
    const height           = 30;
    const color            = COLOR_ENEMY_ORANGE;
    const pointsMultiplier = 5;
    super(xPos, yPos, width, height, color, pointsMultiplier, speed);   
    }

  // Override base class drawShape function to customize this enemy's shape
  // draw on canvas the shape of this object
  // object will now be painted as if upper left corner is the (0,0) coordinate
  drawShape(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  //firing intervals
  setIntervalID(id) {
    this.firingIntervalID = id;
  }

  shootEnemyBullet(inGameBulletsArray) {
    inGameBulletsArray.push(new BulletDiagonal(
        this.xPos + this.width,
        this.yPos,
        -1,
        20,
        COLOR_ENEMY_BULLET,
        BULLET_DIRECTION_UP_DOWN
    ))
  }
}
export default OrangeEnemy;