import { BULLET_DIRECTION_DOWN_UP, CANVAS_HEIGHT } from "../constants";
import BoardObject from "./BoardObject";

class Bullet extends BoardObject
{
  speed = 10;
  constructor(xPos, yPos, width, height, color, direction) {
    super(xPos, yPos, width, height, color);
    this.direction = direction;
  }
  move() {
    if (this.direction === BULLET_DIRECTION_DOWN_UP) {
      this.yPos = this.yPos - this.speed;
    }
    return this;
  }

  // this method receives the list of bullets currently in the game and
  // adds a bullet ot it
  // The list of bullets in game is passed as reference by javascript
  removeIfOutOfBounds(inGameBulletsArray, thisBulletIndex) {
    if (this.direction === BULLET_DIRECTION_DOWN_UP) {
      if (this.yPos < 0) {
        const bulletOutOfBounds = inGameBulletsArray.splice(thisBulletIndex, 1);
        delete bulletOutOfBounds[0];
      }
    }
    if (this.direction === BULLET_DIRECTION_DOWN_UP) {
      if (this.yPos > CANVAS_HEIGHT) {
        const bulletOutOfBounds = inGameBulletsArray.splice(thisBulletIndex, 1);
        delete bulletOutOfBounds[0];
      }
    }
  }
}

export default Bullet;
