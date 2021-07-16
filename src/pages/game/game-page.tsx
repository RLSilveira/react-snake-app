import React from "react";
import { useLocation } from "react-router-dom";
import GameComponent from "../../components/game/game-component";
import GameContext from "../../contexts/game-context";
import "./game-page.css";

const GamePage = () => {

    var user = useLocation().state;

    return (
        <GameContext>
            <div className="content">
                <GameComponent></GameComponent>
            </div>
        </GameContext>

    );
};

export default GamePage;
