import {useState} from 'react';
import './App.css';
import HomeView from './Views/Home';
import GameView from './Views/Game';
import { GAME_OVER_VIEW, GAME_VIEW, HOME_VIEW, SCORES_VIEW } from './constants';
import ScoresView from './Views/Scores';
import GameOver from './Views/GameOver';

function App() {
  const [currentView, setCurrentView] = useState(HOME_VIEW);
  const [currentViewProps, setCurrentViewProps] = useState({});

  const setView = (newView, props = {}) => {
    setCurrentView(newView);
    console.log(props);
    setCurrentViewProps(props)
  };

  return (
    currentView === HOME_VIEW   && <HomeView setView={setView} /> ||
    currentView === GAME_VIEW   && <GameView setView={setView} /> ||
    currentView === SCORES_VIEW && <ScoresView setView={setView} /> ||
    currentView === GAME_OVER_VIEW && <GameOver setView={setView} {...currentViewProps} /> 
  );
}

export default App;
