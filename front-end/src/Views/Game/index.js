import { HOME_VIEW } from "../../constants";
import GameCanvas from "./GameCanvas";

function GameView({ setView }) {

    const goToHome = () => setView(HOME_VIEW);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20
        }}>
            <h1>Game View</h1>
            <button onClick={goToHome}>Home</button>
            <div>
                <GameCanvas />
            </div>
        </div>
    );
}

export default GameView;