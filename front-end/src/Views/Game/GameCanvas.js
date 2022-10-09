import { useEffect, useRef } from "react";

// constants definition
const COLOR_BACKGROUND          = '#000000';
const COLOR_PLANE               = '#FFFFFF';
const COLOR_BULLET              = '#00FF00';
const COLOR_FONT                = '#FFFF00';

const FRAMES_PER_SECOND         = 60;
const CANVAS_WIDTH              = 600;
const CANVAS_HEIGHT             = 600;
const PLANE_WIDTH               = 50;
const PLANE_HEIGHT              = 50;
const PLANE_TIP_POS             = PLANE_WIDTH / 2;
const PLANE_VERTICAL_PLANE      = CANVAS_HEIGHT - PLANE_HEIGHT - 10;
const PLANE_MOVE_SPEED          = 10;

// reactjs functional component
function GameCanvas() {
  const canvasRef = useRef(null);

  // html canvas functions happen inside the useEffect hook
  // which is only called once by react when the component is mounted.
  // In this hook the keyboard event listener is created, along with the
  // setInterval that re-paints the canvas at 60 frames per second (60fps)
  useEffect(() => {
    // get the html canvas element from the reactjs reference
    // must use .current from the reference because reactjs repaints the dom
    // at will, so it is the only way to get the current version of the element
    const canvasElement = canvasRef.current;

    // get the 2-dimensional context of the html canvas element
    // which provides the API to paint on the canvas.
    const ctx = canvasElement.getContext('2d');


    // Game variables. They will change as the game progresses

    let gamePaused = false;

    // Game physical objects
    const planeObject = createObjectWithPosition({
      xPos: CANVAS_WIDTH / 2 - PLANE_TIP_POS,
      yPos: PLANE_VERTICAL_PLANE,
      width: PLANE_WIDTH,
      height: PLANE_HEIGHT
    });
    // bullets array contain all the bullets on the board as objects with position
    let bullets = [];
    // enemies array contain all the enemies as objects with position
    let enemies = [];

    // Keyboard events listened to
    function keyboardInput(e) {
      console.log(e)
      switch (e.code) {
        case "ArrowLeft":
          if (!gamePaused) {
            planeObject.xPos = movePlane(
              planeObject.xPos - PLANE_MOVE_SPEED, 
              planeObject.xPos);
          }
          break;
        case "ArrowRight":
          if (!gamePaused) {
            planeObject.xPos = movePlane(
              planeObject.xPos + PLANE_MOVE_SPEED, 
              planeObject.xPos);
          }
          break;
        case "Space":
          if (!gamePaused) {
            // Add a bullet to the game
            // This new object is pushed to the bullets array
            bullets.push(
              createObjectWithPosition({
                xPos: planeObject.xPos + PLANE_TIP_POS,
                yPos: planeObject.yPos,
                width: 1,
                height: 20
              })
            )
          }
          break;
        case "KeyP":
          // Pause and take out of pause the game
          gamePaused = !gamePaused;
          break;
        default:
      }
    }

    function paintCanvas() {
      // if game is paused, don't update the game objects
      if (gamePaused) {
        // print that the game is paused
        paintGamePaused(ctx);
        return;
      }

      // update objects inside the game
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = COLOR_BACKGROUND;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      paintPlaneCharacter(ctx, planeObject);
      paintBullets(ctx, bullets);
    }

    // Create interval that re-paints the canvas at 60 fps
    const canvasInterval = setInterval(paintCanvas, 1000 / FRAMES_PER_SECOND);
    
    // Add event listener for keyboard inputs
    document.addEventListener('keydown', keyboardInput, false);
    
    // Clear event listeners and time intervals to avoid memory leaks when the
    // component is removed from view
    return () => {
      document.removeEventListener('keydown', keyboardInput)
      clearInterval(canvasInterval);
    }
  }, []);

  return (
    <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
  )
}

export default GameCanvas;


// This function paints the plain character
function paintPlaneCharacter(ctx, {xPos, yPos, width, height}) {
  ctx.fillStyle = COLOR_PLANE;
  // plane is a triangle object
  ctx.beginPath();
  ctx.moveTo(xPos + PLANE_TIP_POS, yPos);
  ctx.lineTo(xPos + width, yPos + height);
  ctx.lineTo(xPos, yPos + height);
  ctx.fill();
}

// This function loops through all the bullets on the game and 
// triggers a function to paint them, while updating their y postion 
// in canvas for the next paint. 
// At each paint, the bullet's y position is moved 10 pixels to the top
function paintBullets(ctx, bullets) {
  for (let a = 0; a < bullets.length; a++) {
    paintBullet(ctx, bullets[a])
    
    // Move this bullet y position 10 pixels towards the top.
    bullets[a].yPos = bullets[a].yPos - 10;

    // remove bullet from the game when y position goes out of canvas
    if (bullets[a].yPos < 0) {
      bullets.splice(a, 1);
    }
  }
}


// Paint a bullet at the indicated position
function paintBullet(ctx, {xPos, yPos, width, height}) {
  ctx.fillStyle = COLOR_BULLET;
  ctx.fillRect(xPos, yPos, width, - height);
}


// Paint a message indicating the game is paused
function paintGamePaused(ctx) {
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

// Moves the plane left and right
function movePlane(newPos, oldPos) {
  // prevent plane from moving out of boundaries
  // returns the previously known position
  if (newPos > CANVAS_WIDTH - PLANE_WIDTH / 2 )
    return oldPos;
  if (newPos < - PLANE_WIDTH / 2)
    return oldPos;
  return newPos;
}

// Create physical object on the canvas
// This function only adds the object initial x and y position
// along with it's in-game width and height.
// The returned object is agnostic of what the object in the game is
// it is simply there as reference of its position and dimensions to
// later be used for collition detection to identify if an object is being hit.
function createObjectWithPosition({xPos, yPos, width, height}) {
  return {
    xPos,
    yPos,
    width,
    height
  };
}
