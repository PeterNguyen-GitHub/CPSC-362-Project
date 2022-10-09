import { 
  BULLET_DIRECTION_DOWN_UP,
  CANVAS_WIDTH,
  COLOR_BULLET,
  COLOR_PLANE,
  MOVE_LEFT,
  PLANE_HEIGHT,
  PLANE_MOVE_SPEED,
  PLANE_TIP_POS,
  PLANE_VERTICAL_PLANE,
  PLANE_WIDTH 
} from "../constants";
import BoardObject from "./BoardObject";
import Bullet from "./Bullet";

class Plane extends BoardObject
{
  constructor(xPos) {
    const yPos     = PLANE_VERTICAL_PLANE;
    const width    = PLANE_WIDTH;
    const height   = PLANE_HEIGHT;
    const color    = COLOR_PLANE;
    
    super(xPos, yPos, width, height, color);
  }

  movePlane(dir) {
    const displacement = dir === MOVE_LEFT ? (-1) * PLANE_MOVE_SPEED : PLANE_MOVE_SPEED;
    const newXPos = this.xPos + displacement;
    if (newXPos > CANVAS_WIDTH - this.width / 2)
      return;
    if (newXPos < (-1) * PLANE_WIDTH / 2)
      return;
    this.xPos = newXPos;
  }

  drawShape(ctx) {
    ctx.fillStyle = COLOR_PLANE;
    ctx.beginPath();
    ctx.moveTo(PLANE_TIP_POS, 0);
    ctx.lineTo(this.width, PLANE_HEIGHT);
    ctx.lineTo(0, PLANE_HEIGHT);
    ctx.fill();
  }

  // this method receives the list of bullets currently in the game and
  // adds a bullet ot it
  // The list of bullets in game is passed as reference by javascript
  shootBullet(inGameBulletsArray) {
    inGameBulletsArray.push(new Bullet(
      this.xPos + PLANE_TIP_POS,
      this.yPos,
      1,
      20,
      COLOR_BULLET,
      BULLET_DIRECTION_DOWN_UP
    ))
  }
}

export default Plane;
