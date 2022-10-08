import {useState} from 'react';
import './App.css';
import HomeView from './Views/Home';
import GameView from './Views/Game';
import { GAME_VIEW, HOME_VIEW, SCORES_VIEW } from './constants';
import ScoresView from './Views/Scores';

function App() {
  const [currentView, setCurrentView] = useState(HOME_VIEW);

  const setView = (newView) => setCurrentView(newView);

  return (
    currentView === HOME_VIEW   && <HomeView setView={setView} /> ||
    currentView === GAME_VIEW   && <GameView setView={setView} /> ||
    currentView === SCORES_VIEW && <ScoresView setView={setView} /> 
  );
}

export default App;
