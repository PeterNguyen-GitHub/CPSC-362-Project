import { CANVAS_HEIGHT, CANVAS_WIDTH, COLOR_BACKGROUND, COLOR_FONT } from "../constants";
import BoardObject from "./BoardObject";

class GamePaused extends BoardObject
{
  constructor() {
    super(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, COLOR_BACKGROUND);
  }

  drawShape(ctx) {
    const fontSize = 48;
    const textHorizontalPosition  = CANVAS_WIDTH / 2 + 20;
    const textVerticalPosition    = CANVAS_HEIGHT - CANVAS_HEIGHT / 3;

    // Draw veil on top of everything
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = COLOR_BACKGROUND;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.globalAlpha = 1;

    // Type text to let user know game is paused
    ctx.textAlighn = "center";
    ctx.fillStyle = COLOR_FONT;
    ctx.font = `normal 400 ${fontSize}px Helvetica`;
    ctx.fillText('Game', textHorizontalPosition, textVerticalPosition);
    ctx.fillText('Paused...', textHorizontalPosition, textVerticalPosition + fontSize);
  }

}

export default GamePaused;
