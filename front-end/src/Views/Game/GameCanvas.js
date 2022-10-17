import { useEffect, useRef, useState } from "react";
import { 
  COLOR_BACKGROUND,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  MOVE_LEFT,
  MOVE_RIGHT,
  PLANE_TIP_POS,
  COLLISION_PLANE_ENEMY,
  COLLISION_BULLET_ENEMY,
  COLLISION_BULLET_PLANE,
  COLLISION_NONE,
  FRAMES_PER_SECOND,
  ENEMY_APPEAR_RATE
} from "../../constants";
import RedEnemy from "../../Objects/Enemies/RedEnemy";
import SquareEnemy from "../../Objects/Enemies/SquareEnemy";
import GreenEnemy from "../../Objects/Enemies/GreenEnemy";
import GamePaused from "../../Objects/GamePaused";
import Plane from "../../Objects/Plane";


// reactjs functional component
function GameCanvas({reduceLives, addPoint, lives}) {
  const canvasRef = useRef(null);
  const [movementSpeed, setMovementSpeed] = useState(1);

  // enemies and bullets maintain the state on every re-paint by reactjs
  const [enemies, setEnemies] = useState([]);

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

    const planeObject = new Plane(CANVAS_WIDTH / 2 - PLANE_TIP_POS);

    // bullets array contain all the bullets on the board as objects with position
    // this array is here for the good guy bullets
    let bullets_ = [];
    // this array is here for the bad buy bullets
    let enemyBullets_ = [];

    // enemies array contain all the enemies as objects with position
    let enemies_ = enemies;

    let gamePaused = false;


    // Keyboard events listened to
    function keyboardInput(e) {
      switch (e.code) {
        case "ArrowLeft":
          if (!gamePaused) {
            planeObject.movePlane(MOVE_LEFT);
          }
          break;
        case "ArrowRight":
          if (!gamePaused) {
              planeObject.movePlane(MOVE_RIGHT);
          }
          break;
        case "Space":
          if (!gamePaused) {
            // Add a bullet to the game
            // This new object is pushed to the bullets array
            planeObject.shootBullet(bullets_);
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
        new GamePaused().paint(ctx);
        return;
      }

      // update objects inside the game
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = COLOR_BACKGROUND;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      
      // Canvas repaint of plane, bullets and enemies
      paintPlaneCharacter(ctx, planeObject);
      paintBullets(ctx, bullets_, enemyBullets_);
      paintEnemies(ctx, enemies_);
      const collision = detectCollisions(planeObject, bullets_, enemies_, enemyBullets_);
      reportCollision(collision);
    }

    function reportCollision({type, index_1, index_2}) {
      let objectToDelete;
      switch(type) {
        case COLLISION_BULLET_PLANE:
          reduceLives();
          objectToDelete = enemyBullets_.splice(index_1, 1);
          delete objectToDelete[0];
          break;
        case COLLISION_PLANE_ENEMY:
          reduceLives();
          // Destroy Enemy from game
          objectToDelete = enemies_.splice(index_1, 1);
          // TODO: Error states that getIntervalID is not a function
          clearInterval(objectToDelete[0].getIntervalID())
          delete objectToDelete[0];
          break;
        case COLLISION_BULLET_ENEMY:
          addPoint(enemies_[index_1].attributes.pointsMultiplier);
          // Destroy Enemy from game
          objectToDelete = enemies_.splice(index_1, 1);
          // TODO: Error states that getIntervalID is not a function
          clearInterval(objectToDelete[0].getIntervalID())
          delete objectToDelete[0];
          setEnemies([...enemies_])

          // Destroy good bullets from game
          objectToDelete = bullets_.splice(index_2, 1);
          delete objectToDelete[0];
          break;
        default:
      }
    }

    // Create interval that re-paints the canvas at 60 fps
    const canvasInterval = setInterval(paintCanvas, 1000 / FRAMES_PER_SECOND);

    // Create enemies interval
    const enemiesInterval = setInterval(() => {
      if (!gamePaused) {
        // randomly create a red enemy
        // Random method creates a number between 0 and 2
        const enemyType = Math.floor(Math.random() * 3);

        if (enemyType === 0) {
          // add new enemy
          enemies_.push(new SquareEnemy(
            Math.floor(Math.random() * CANVAS_WIDTH),
            0,
            movementSpeed
          ))
        } else if (enemyType === 1) {
          enemies_.push(new RedEnemy(
            Math.floor(Math.random() * CANVAS_WIDTH),
            0,
            movementSpeed * 2
          ))
        } else if (enemyType === 2) {
          const newShuttingEnemy = new GreenEnemy(
            Math.floor(Math.random() * CANVAS_WIDTH),
            0,
            movementSpeed
          );

          const thisEnemyFireIntervalID = setInterval(() => {
            if (!gamePaused) {
              newShuttingEnemy.shootEnemyBullet(enemyBullets_)
            }
          }, 1200);

          newShuttingEnemy.setIntervalID(thisEnemyFireIntervalID);

          enemies_.push(newShuttingEnemy)
        }


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
      enemies_.forEach(enemy => {
        clearInterval(enemy.getIntervalID())
      })
    }
  }, []);

  return (
    <>
      <p>Enemy Count: {enemies.length}</p>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
    </>
  )
}

export default GameCanvas;


// This function paints the plain character
function paintPlaneCharacter(ctx, planeObject) {
  planeObject.paint(ctx);
}

// This function loops through all the bullets on the game and 
// triggers a function to paint them, while updating their y postion 
// in canvas for the next paint. 
// At each paint, the bullet's y position is moved to the top
function paintBullets(ctx, bullets_, enemyBullets_) {
  // paint good bullets
  for (let bulletIndex = 0; bulletIndex < bullets_.length; bulletIndex++) {
    bullets_[bulletIndex].move().paint(ctx).removeIfOutOfBounds(bullets_, bulletIndex);
  }
  // paint enemy bullets
  for (let bulletIndex = 0; bulletIndex < enemyBullets_.length; bulletIndex++) {
    enemyBullets_[bulletIndex].move().paint(ctx).removeIfOutOfBounds(enemyBullets_, bulletIndex);
  }
}

// Enemies

// Loop through all the enemies and paint them
function paintEnemies(ctx, enemies_) {
  for (let enemiesIndex = 0; enemiesIndex < enemies_.length; enemiesIndex++) {
    enemies_[enemiesIndex].move().paint(ctx);
  }
}

function detectCollisions(planeObject, bullets_, enemies_, enemyBullets_) {
  // detect collisions with enemies
  for(let enemyIndex = 0; enemyIndex < enemies_.length; enemyIndex++) {
    // Detect collision with plane
    // collition with plane
    if (enemies_[enemyIndex].detectCollisionWith(planeObject)) {
      console.log('collition')
      return {
        type: COLLISION_PLANE_ENEMY,
        index_1: enemyIndex
      };
    }
    
    // detect collision of good bullets with the enemy
    for (let bulletIndex = 0; bulletIndex < bullets_.length; bulletIndex++) {
      if (bullets_[bulletIndex].detectCollisionWith(enemies_[enemyIndex])) {
        console.log('bullet kills'); 
        return {
          type: COLLISION_BULLET_ENEMY,
          index_1: enemyIndex,
          index_2: bulletIndex
        }
      }
    }
  }

  // detect collisions with enemy bullets
  for (let bulletIndex = 0; bulletIndex < enemyBullets_.length; bulletIndex++) {
    // detect collision of enemy bullet with plane
    if (enemyBullets_[bulletIndex].detectCollisionWith(planeObject)) {
      console.log('bullet kills plane'); 
      return {
        type: COLLISION_BULLET_PLANE,
        index_1: bulletIndex,
      }
    }
  }

  return {type: COLLISION_NONE};
}
