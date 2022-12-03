// import { GAME_VIEW, SCORES_VIEW } from "../../constants";
import { DIFFICULTY_VIEW, SCORES_VIEW } from "../../constants";

function HomeView({ setView }) {

    // const goToGame = () => setView(GAME_VIEW);
    const goToDifficulty = () => setView(DIFFICULTY_VIEW);
    const goToScores = () => setView(SCORES_VIEW);

    return (
        <div className="view home-page">
            <h1>Arcade Junkies</h1>
            <h2>Welcome to our game!</h2>
            <p>To play you have to choose "Go To game" then you are prompted with the Difficulty! 
            The options are easy, normal, and hard. You can check the highest-scores
            by clicking on the "Go To Scores"
            After choosing the difficulty you have three controls: move left with left arrow
            move right with right arrow and shoot using the space bar!
            You can also pause and unpause the game by pressing P.
            </p>
            
            <div className="menu">
                <button onClick={goToDifficulty}>Go To game</button>
                <button onClick={goToScores}>Go To Scores</button>
            </div>

            <p>Arcade Junkies is brought to you by:</p>
            <p>CPSC 362<br />
            Group 7: Danyal Nemati, Fabian Nino, Peter Nguyen, and
            Justin Perez
            </p>

        </div>
    );
}

export default HomeView;