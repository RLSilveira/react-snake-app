import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import JogoPage from './pages/game/game-page';
import LoginPage from './pages/start/start-page';
import FoodComponent from './components/food/food-component';

function App() {

  return (

    <Router>

      <FoodComponent></FoodComponent>

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

        </header>
      </div>

      <Switch>

        <Route path="/jogo">
          <JogoPage></JogoPage>
        </Route>

        <Route path="/">
          <LoginPage></LoginPage>
        </Route>

      </Switch>
    </Router>




  );
}

export default App;
