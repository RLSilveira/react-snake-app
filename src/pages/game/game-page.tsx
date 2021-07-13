import React from "react";
import GameComponent from "../../components/game/game-component";
import GameContext from "../../contexts/game-context";
import './game-page.css';

const GamePage = () => {

    return (
        <GameContext>

            <div className="content">

                <GameComponent></GameComponent>

            </div>
        </GameContext>
    );
}

export default GamePage;