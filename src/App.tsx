import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import JogoPage from './pages/game/game-page';
import LoginPage from './pages/start/start-page';

function App() {

  return (

    <Router>

      <div className="App">
        <header className="App-header">
          Hackthon Herval - Sneake Game
        </header>

        <div className="App-content">

          <Switch>

            <Route path="/jogo">
              <JogoPage></JogoPage>
            </Route>

            <Route path="/">
              <LoginPage></LoginPage>
            </Route>

          </Switch>

        </div>

      </div>

    </Router>

  );
}

export default App;
