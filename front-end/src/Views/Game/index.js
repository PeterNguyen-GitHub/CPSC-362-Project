import { HOME_VIEW } from "../../constants";

function GameView({ setView }) {

    const goToHome = () => setView(HOME_VIEW);

    return (
        <div>
            <h1>Game View</h1>
            <button onClick={goToHome}>Home</button>
        </div>
    );
}

export default GameView;