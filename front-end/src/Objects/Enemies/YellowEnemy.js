import { CANVAS_HEIGHT, CANVAS_WIDTH, COLOR_ENEMY_YELLOW, BULLET_DIRECTION_UP_DOWN, COLOR_ENEMY_BULLET } from "../../constants";
import Enemy from "../Enemy";
import Bullet from "../../Objects/Bullet";

class YellowEnemy extends Enemy
{
  moveXCounter = 2;

  constructor(xPos, yPos, speed) {
    const width            = 30;
    const height           = 30;
    const color            = COLOR_ENEMY_YELLOW;
    const pointsMultiplier = 4;
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
    // in a left horizontal diagonal
    if (this.moveXCounter === 0) {
      this.moveXCounter = 2;              // reset counter

      const newXpos = this.xPos - this.speed;
      if (newXpos < CANVAS_WIDTH && newXpos > 0) {
        this.xPos = newXpos;
      } else {
        this.xPos = CANVAS_WIDTH;
      }
    }

    this.moveXCounter--;
    return this;
  }

  // firing intervals
  setIntervalID(id) {
    this.firingIntervalID = id;
  }

  getIntervalID() {
    return this.firingIntervalID;
  }

  shootEnemyBullet(inGameBulletsArray) {
    inGameBulletsArray.push(new Bullet(
      this.xPos,
      this.yPos,
      1,
      20,
      COLOR_ENEMY_BULLET,
      BULLET_DIRECTION_UP_DOWN
    ))
  }
}


export default YellowEnemy;
