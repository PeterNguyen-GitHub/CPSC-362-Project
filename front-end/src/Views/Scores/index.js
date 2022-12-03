import { useEffect, useState } from "react";
import { HOME_VIEW } from "../../constants";

function ScoresView({ setView }) {
    const [scores, setScores] = useState([]);

    const goToHome = () => setView(HOME_VIEW);

    useEffect(() => {
        async function fetchScores() {
            try {
                const responseStream = await fetch('https://game.fnino.com/scores');
                const response = await responseStream.json();
                setScores(response.scores);
                console.log(response.scores);
            } catch (error) {
                console.error(error);
            }
        }
        fetchScores();
    }, []);

    return (
        <div>
            <h1>Scores</h1>
            <button onClick={goToHome}>Go To Home</button>
            <table>
            <thead>
                <tr>
                     <th>Username</th>
                     <th>Score</th>
                     <th>Date</th>
                </tr>
                </thead>
                      <tbody>
                

                    {scores.map((item, i) => {
                             return (
                                 <tr key={i}>
                                            <td>{item.username}</td>
                                            <td>{item.score}</td>
                                            <td>{new Intl.DateTimeFormat('en-US').format(new Date(item.date))}</td>
        </tr>
    );
  })}

                     </tbody>
            </table>
        </div>

        
    );
}

export default ScoresView;
//<td>{<td>new Intl.DateTimeFormat('en-US').format(item.date)</td>}</td>
//new Intl.DateTimeFormat('en-US').format(item.date)