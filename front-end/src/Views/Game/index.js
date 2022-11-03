import { useEffect, useState } from "react";
import { GAME_OVER_VIEW, HOME_VIEW } from "../../constants";
import GameCanvas from "./GameCanvas";
import { difficulty } from "../Difficulty/Difficulty";


// const INITIAL_LIVES_COUNT  = 4;


function GameView({ setView }) {

  var startingLives = 4;
  var difficultyMultiplier = 1;
  var difficultyWord = "Normal";

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

  const goToHome = () => setView(HOME_VIEW);
  function reduceLives() {
    console.log('reduce');
    setLives(lives => lives - 1);
  }
  
  function addPoint(multiplier) {
    setPoints(points => points + (10 * multiplier * difficultyMultiplier));
  }
  
  useEffect(() => {
    if (lives < 0) {
      // ask user for email
      setView(GAME_OVER_VIEW, {score: points});
    }
  }, [lives])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
      <h1>Game View</h1>
      <button onClick={goToHome}>Home</button>
      <h2>Lives: {lives} Points: {points} Difficulty: {difficultyWord}</h2>
      <div>
        <GameCanvas reduceLives={reduceLives} addPoint={addPoint} lives={lives} />
      </div>
    </div>
  );
}

export default GameView;