import { useState } from "react";
import { HOME_VIEW, SCORES_VIEW } from "../../constants";

function GameOver({ setView, score}) {
  const [errorMessage, setErrorMessage] = useState('');

  const goToHome = () => setView(HOME_VIEW);

  async function submitForm(e) {
    e.preventDefault();
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    formData.append('score', score);

    try {
      const responseStream = await fetch('https://game.fnino.com/score', {
        method: 'POST',
        body: formData
      });
      if(responseStream.status === 200) {
        setView(SCORES_VIEW);
      } else {
        const response = await responseStream.json();
        setErrorMessage(response.message);
      }
    } catch(err) {
      // TODO: internal error handling
      console.error('YOU GOT AN ERROR!!!!!')
      console.error(err)
    }

  }

  return (
    <div className="view gameover-page">
      <h1>Game Over</h1>
      <div className="score-wrapper">
        <h2>Your score was {score} </h2>
        {score > 0 && (
          <div className="player-info">
            <p>Tell us about you:</p>
            <form onSubmit={submitForm} action="" method="post">
              {
                errorMessage.length > 0 &&
                <div className="error-message">
                  <p>{errorMessage}</p>
                </div>
              }
              <label htmlFor="email">Email</label>
              <input className="email" type="text" name="email" id="email" required/>
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
      <div className="difficulty-menu">
        <button onClick={goToHome}>Home</button>
      </div>
    </div>
  );
}

export default GameOver;