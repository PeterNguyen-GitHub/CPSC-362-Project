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
      const responseStream = await fetch('/score', {
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
    <>
      <h1>Game Over</h1>
      <h2>Your score was {score} </h2>
      <form onSubmit={submitForm} action="" method="post">
        {
          errorMessage.length > 0 &&
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        }
        <input type="text" name="email" required/>
        <button type="submit">Send</button>
      </form>
      <button onClick={goToHome}>Home</button>
    </>
  );
}

export default GameOver;