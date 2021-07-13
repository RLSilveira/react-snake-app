import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import JogoPage from './pages/game/game-page';
import LoginPage from './pages/start/start-page';

function App() {

  return (


    <div className="App">
      <header className="App-header">
        Hackthon Herval - Sneake Game
      </header>

      <div className="App-content">

        <Router>
          <Switch>

            <Route path="/game">
              <JogoPage></JogoPage>
            </Route>

            <Route path="/">
              <LoginPage></LoginPage>
            </Route>

          </Switch>
        </Router>

      </div>
    </div>

  );
}

export default App;
