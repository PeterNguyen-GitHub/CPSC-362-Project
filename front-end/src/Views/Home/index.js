// import { GAME_VIEW, SCORES_VIEW } from "../../constants";
import { DIFFICULTY_VIEW, SCORES_VIEW } from "../../constants";

function HomeView({ setView }) {

    // const goToGame = () => setView(GAME_VIEW);
    const goToDifficulty = () => setView(DIFFICULTY_VIEW);
    const goToScores = () => setView(SCORES_VIEW);

    return (
        <div>
            <h1>Home</h1>
            <button onClick={goToDifficulty}>Go To game</button>
            <button onClick={goToScores}>Go To Scores</button>
            <h2> Controls: </h2>
            <p> Left Arrow: Move player to the left <br /><br /> Right Arrow: Move player to the right <br /> <br /> Spacebar: Shoot bullet </p>
        </div>
    );
}

export default HomeView;