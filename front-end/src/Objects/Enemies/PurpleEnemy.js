import { CANVAS_HEIGHT, CANVAS_WIDTH, COLOR_ENEMY_PURPLE} from "../../constants";
import Enemy from "../Enemy";

class PurpleEnemy extends Enemy
{
    moveXCounter = 2;
    zigzagcounter = 0;
    constructor(xPos, yPos, speed) {
        const width             = 20;
        const height            = 20;
        const color             = COLOR_ENEMY_PURPLE;
        const pointsMultiplier  = 4;
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
        if (this.yPos > CANVAS_HEIGHT){
          this.yPos = 0;
        }
        // move in both directions horzontally creating a zig zag pattern
        if (this.moveXCounter === 0) {
            if (this.zigzagcounter >= 0 && this.zigzagcounter <= 100){
                this.moveXCounter = 2;

                const newXpos = this.xPos + this.speed;
              if (newXpos < CANVAS_WIDTH && newXpos > 0) {
                 this.xPos = newXpos;
               } else {
                this.xPos = 0;
               }
               this.zigzagcounter++;
               if (this.zigzagcounter === 101) {
                this.zigzagcounter -= 102;
               }
            
            } else if (this.zigzagcounter <= 0 && this.zigzagcounter >= -100) {
                this.moveXCounter = 2;              // reset counter

                const newXpos = this.xPos - this.speed;
                if (newXpos < CANVAS_WIDTH && newXpos > 0) {
                  this.xPos = newXpos;
                } else {
                  this.xPos = CANVAS_WIDTH;
                }
                this.zigzagcounter--;
                if (this.zigzagcounter === -101) {
                    this.zigzagcounter += 102;
                }
            }
    }
        this.moveXCounter--;
        return this;
    }

}
export default PurpleEnemy;
