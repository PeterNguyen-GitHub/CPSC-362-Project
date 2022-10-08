import { GAME_VIEW, SCORES_VIEW } from "../../constants";

function HomeView({ setView }) {

    const goToGame = () => setView(GAME_VIEW);
    const goToScores = () => setView(SCORES_VIEW);

    return (
        <div>
            <h1>Home</h1>
            <button onClick={goToGame}>Go To game</button>
            <button onClick={goToScores}>Go To Scores</button>
        </div>
    );
}

export default HomeView;