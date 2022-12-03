import { useEffect, useState } from "react";
import { GAME_OVER_VIEW, HOME_VIEW } from "../../constants";
import GameCanvas from "./GameCanvas";
import { difficulty } from "../Difficulty/Difficulty";


// const INITIAL_LIVES_COUNT  = 4;


function GameView({ setView }) {

  var startingLives = 4;
  var difficultyMultiplier = 1;
  var difficultyWord = "Normal";
  var startingTimer = 30;
  var levelCount = 1;
  var levelPoints = 200;

  // Easy difficulty changes
  if (difficulty === 0) {
      difficultyWord = "Easy";
      startingLives += 1;             // +1 starting life, 5 total lives
      difficultyMultiplier = 0.8;     // reduced points for easy mode
  }

  // Hard difficulty changes
  if (difficulty === 2) {
    difficultyWord = "Hard";
    startingLives -= 1;               // -1 starting life, 3 total lives
    difficultyMultiplier = 1.5        // increased points for hard mode
  }

  const [lives, setLives] = useState(startingLives);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(startingTimer);
  const [level, setLevel] = useState(levelCount);

  const goToHome = () => setView(HOME_VIEW);
  function reduceLives() {
    console.log('reduce');
    setLives(lives => lives - 1);
  }

  function addLives() {
    console.log('increase');
    setLives(lives => lives + 1);
  }
  
  function addPoint(multiplier) {
    setPoints(points => points + (10 * multiplier * difficultyMultiplier));
  }

  function updateTimer() {
    if (level < 4) {
      setTimer(timer => timer - 1);
      console.log(timer);
      // increment level if user survives 30 seconds and award points
     /* if (timer <= 0) {
        setTimer(startingTimer);
        setPoints(points => points + (levelPoints * difficultyMultiplier * level));
        setLevel(level => level + 1);
      } */
    }
  }

  function updateLevel() {
    setTimer(startingTimer);
    setPoints(points => points + (levelPoints * difficultyMultiplier * level));
    setLevel(level => level + 1);
  }
  
  useEffect(() => {
    if (lives < 0) {
      // ask user for email
      setView(GAME_OVER_VIEW, {score: points});
    }
  }, [lives])

  return (
    <div className="view game-page">
      <h1>Level {level}</h1>
      <div className="stats">
        <p className="lives">
          <span style={{
            color: lives <= 2 ? 'red' : 'white',
            fontWeight: lives <= 2 ? 'bold' : null,
          }}>Lives: <span className="score-value">{lives}</span> </span>
          • 
          Points: <span className="score-value">{points}</span>
        </p>
        <p>Difficulty: {difficultyWord}</p>
        <p>Time to next level: {timer}</p>
      </div>
      <div className="game-wrapper">
        <GameCanvas 
          reduceLives={reduceLives} 
          addLives={addLives}
          addPoint={addPoint} 
          updateTimer={updateTimer}
          updateLevel={updateLevel}
          lives={lives} />
      </div>
      <div className="instructions">
          <h2> Controls: </h2>
          <p> Left Arrow: Move player to the left <br />Right Arrow: Move player to the right <br />Spacebar: Shoot bullet </p>
      </div>
      <div className="difficulty-menu">
        <button onClick={goToHome}>Home</button>
      </div>
    </div>
  );
}

export default GameView;
