import { HOME_VIEW, SCORES_VIEW } from "../../constants";

function GameOver({ setView, score}) {

  const goToHome = () => setView(HOME_VIEW);

  function submitForm(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const email = form.get('email');

    // TODO: post to correct website
    fetch('http://localhost:3000', {
      method: 'POST',
      body: JSON.stringify({email:email})
    })
      .then(res => {
        if(res.status === 200) {
          setView(SCORES_VIEW);
        } else {
          // TODO: communicate error to user
          throw res;
        }
      })
      .catch(err => {
        // TODO: internal error handling
        console.error('YOU GOT AN ERROR!!!!!')
        console.error(err)
      });

  }

  return (
    <>
      <h1>Game Over</h1>
      <h2>Your score was {score} </h2>
      <form onSubmit={submitForm} action="" method="post">
        <input type="text" name="email" />
        <button type="submit">Send</button>
      </form>
      <button onClick={goToHome}>Home</button>
    </>
  );
}

export default GameOver;