import { HOME_VIEW } from "../../constants";

function ScoresView({ setView }) {

    const goToHome = () => setView(HOME_VIEW);

    return (
        <div>
            <h1>Scores</h1>
            <button onClick={goToHome}>Go To Home</button>
        </div>
    );
}

export default ScoresView;