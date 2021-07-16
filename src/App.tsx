import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import GamePage from "./pages/game/game-page";
import StartPage from "./pages/start/start-page";

function App() {
  return (
    <div className="App">
      <header className="App-header">Hackthon Herval - Sneake Game</header>

      <div className="App-content">
        <Router>
          <Switch>
            <Route path="/game">
              <GamePage></GamePage>
            </Route>

            <Route path="/">
              <StartPage></StartPage>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
