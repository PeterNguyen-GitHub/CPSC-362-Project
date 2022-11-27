import { useEffect, useState } from "react";
import { HOME_VIEW } from "../../constants";

function ScoresView({ setView }) {
    const [scores, setScores] = useState([]);

    const goToHome = () => setView(HOME_VIEW);

    useEffect(async () => {
        try {
            const responseStream = await fetch('https://game.fnino.com/scores');
            const response = await responseStream.json();
            setScores(response.scores);
            console.log(response.scores);
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <div>
            <h1>Scores</h1>
            <button onClick={goToHome}>Go To Home</button>
        </div>
    );
}

export default ScoresView;