import { HOME_VIEW, GAME_VIEW } from "../../constants";

export var difficulty = 1; // 0 = Easy, 1 = Normal, 2 = Hard

// find way to export difficulty to /Game/index.js
// use this to change the necessary values for scores and stuff
// find way to change enemy spawn rate by moving variable to difficulty as well

function DifficultyView({ setView }) {

    function setDifficultyEasy()
    {
        setView(GAME_VIEW);
        difficulty = 0;
    }

    function setDifficultyNormal()
    {
        setView(GAME_VIEW);
        difficulty = 1;
    }

    function setDifficultyHard()
    {
        setView(GAME_VIEW);
        difficulty = 2;
    }

    const goToGameEasy = () => setDifficultyEasy();
    const goToGameNormal = () => setDifficultyNormal();
    const goToGameHard = () => setDifficultyHard();
    const goToHome = () => setView(HOME_VIEW);

    return (
        <div>
            <h1>Select Difficulty</h1>
            <button onClick={goToGameEasy}>Easy Difficulty</button>
            <button onClick={goToGameNormal}>Normal Difficulty</button>
            <button onClick={goToGameHard}>Hard Difficulty</button>
            <button onClick={goToHome}>Go To Home</button>
        </div>
    );
}

export default DifficultyView;