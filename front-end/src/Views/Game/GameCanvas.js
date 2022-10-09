import { useEffect, useRef, useState } from "react";

// constants definition
const COLOR_BACKGROUND          = '#000000';
const COLOR_PLANE               = '#FFFFFF';
const COLOR_BULLET              = '#00FF00';
const COLOR_FONT                = '#FFFF00';
const COLOR_ENEMY_BLUE          = '#0000FF';
const COLOR_ENEMY_RED           = '#FF0000';

const FRAMES_PER_SECOND         = 60;
const CANVAS_WIDTH              = 600;
const CANVAS_HEIGHT             = 600;
const PLANE_WIDTH               = 50;
const PLANE_HEIGHT              = 50;
const PLANE_TIP_POS             = PLANE_WIDTH / 2;
const PLANE_VERTICAL_PLANE      = CANVAS_HEIGHT - PLANE_HEIGHT - 10;
const PLANE_MOVE_SPEED          = 10;
const ENEMY_APPEAR_RATE         = 2000; // milliseconds

const COLLISION_PLANE_ENEMY     = 'plane_enemy_collision';
const COLLISION_BULLET_ENEMY    = 'bullet_enemy_collision';
const COLLISION_NONE            = 'no_collision';

// reactjs functional component
function GameCanvas({reduceLives, addPoint}) {
  const canvasRef = useRef(null);
  const [movementSpeed, setMovementSpeed] = useState(1);

  // enemies and bullets maintain the state on every re-paint by reactjs
  const [enemies, setEnemies] = useState([]);
  const [bullets, setBullets] = useState([]);

  const [planeObject] = useState(createObjectWithPosition({
    xPos: CANVAS_WIDTH / 2 - PLANE_TIP_POS,
    yPos: PLANE_VERTICAL_PLANE,
    width: PLANE_WIDTH,
    height: PLANE_HEIGHT
  }));

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


    // bullets array contain all the bullets on the board as objects with position
    let bullets_ = bullets;
    // enemies array contain all the enemies as objects with position
    let enemies_ = enemies;

    let gamePaused = false;


    // Keyboard events listened to
    function keyboardInput(e) {
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
            bullets_.push(createObjectWithPosition({
              xPos: planeObject.xPos + PLANE_TIP_POS,
              yPos: planeObject.yPos,
              width: 1,
              height: 20
            }));
            setBullets([...bullets_]);
          }
          break;        
        case "KeyP":
          // Pause and take out of pause the game
          gamePaused = (!gamePaused);
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
      paintBullets(ctx, bullets_);
      paintEnemies(ctx, enemies_, movementSpeed);
      const collision = detectCollisions(planeObject, bullets_, enemies_);
      reportCollision(collision);
    }

    function reportCollision({type, index_1, index_2}) {
      console.log(type);
      switch(type) {
        case COLLISION_PLANE_ENEMY:
          reduceLives();
          enemies_.splice(index_1, 1);
          setEnemies([...enemies_])
          break;
        case COLLISION_BULLET_ENEMY:
          addPoint(enemies_[index_1].attributes.pointsMultiplier);
          enemies_.splice(index_1, 1);
          setEnemies([...enemies_])
          bullets_.splice(index_2, 1);
          setBullets([...bullets_])
          break;
        default:
      }
    }

    // Create interval that re-paints the canvas at 60 fps
    const canvasInterval = setInterval(paintCanvas, 1000 / FRAMES_PER_SECOND);

    // Create enemies interval
    const enemiesInterval = setInterval(() => {
      if (!gamePaused) {
        // randomly get enemy power and set color to distinguish
        const pointsMultiplier = Math.floor(Math.random() * 2) + 1 ;
        const enemyColor = pointsMultiplier > 1 ? COLOR_ENEMY_RED : COLOR_ENEMY_BLUE;
        // add new enemy
        enemies_.push(createObjectWithPosition({
          xPos: Math.floor(Math.random() * CANVAS_WIDTH),
          yPos: 0,
          width: 20,
          height: 20,
          attributes: {
            pointsMultiplier: pointsMultiplier,
            color: enemyColor
          }
        }));
        setEnemies([...enemies_])
      }
    }, ENEMY_APPEAR_RATE);
    
    // Add event listener for keyboard inputs
    document.addEventListener('keydown', keyboardInput, false);
    
    // Clear event listeners and time intervals to avoid memory leaks when the
    // component is removed from view
    return () => {
      document.removeEventListener('keydown', keyboardInput)
      clearInterval(canvasInterval);
      clearInterval(enemiesInterval);
    }
  }, [enemies]);

  return (
    <>
      <p>Enemy Count: {enemies.length}</p>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
    </>
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

// Enemies

// Loop through all the enemies and paint them
function paintEnemies(ctx, enemies, movementSpeed) {
  for (let a = 0; a < enemies.length; a++) {
    paintEnemy(ctx, enemies[a])
    
    // Move this bullet y position 5 pixels towards the bottom.
    enemies[a].yPos = enemies[a].yPos + movementSpeed;

    // remove bullet from the game when y position goes out of canvas
    if (enemies[a].yPos > CANVAS_HEIGHT) {
      enemies[a].yPos = 0;
    }
  }
}

// Paint an enemy according to its attributes
function paintEnemy(ctx, {xPos, yPos, width, height, attributes}) {
  ctx.save();
  ctx.fillStyle = attributes.color;
  ctx.translate(xPos, yPos);
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}


// Paint a message indicating the game is paused
function paintGamePaused(ctx) {
  const fontSize = 48;
  const textHorizontalPosition  = CANVAS_WIDTH / 2 + 20;
  const textVerticalPosition    = CANVAS_HEIGHT - CANVAS_HEIGHT / 3;

  // Draw veil on top of everything
  // ctx.globalAlpha = 0.2;
  // ctx.fillStyle = COLOR_BACKGROUND;
  // ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // ctx.globalAlpha = 1;

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
function createObjectWithPosition({xPos, yPos, width, height, attributes}) {
  return {
    xPos,
    yPos,
    width,
    height,
    attributes
  };
}

function detectCollisions(planeObject, bullets, enemies) {
  for(let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {
    // Detect collision with plane
    // collition with plane
    if (detectCollision(enemies[enemyIndex], planeObject)) {
      console.log('collition')
      return {
        type: COLLISION_PLANE_ENEMY,
        index_1: enemyIndex
      };
    }
  
    for (let bulletIndex = 0; bulletIndex < bullets.length; bulletIndex++) {
      if(detectCollision(bullets[bulletIndex], enemies[enemyIndex])) {
        console.log('bullet kills'); 
        return {
          type: COLLISION_BULLET_ENEMY,
          index_1: enemyIndex,
          index_2: bulletIndex
        }
      }
    }

  }
  return {type: COLLISION_NONE};
}

function detectCollision(object1, object2) {
  if(
    object1.xPos + object1.width  >= object2.xPos &&
    object1.xPos                  <= object2.xPos + object2.width &&
    object1.yPos + object1.height >= object2.yPos &&
    object1.yPos                  <= object2.yPos + object2.height
  ) {
    return true;
  }
  return false;
}
