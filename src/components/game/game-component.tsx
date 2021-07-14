import React, { useContext } from "react";
import { EDirection } from "../../contexts/EDirection";
import { GameContext } from "../../contexts/game-context";
import { GameContextType } from "../../contexts/game-context-type";
import GameBoard from "../game-board/game-board-component";
import './game-component.css';

const GameComponent = () => {

    const { setDirection, score, direction, level } = useContext<GameContextType>(GameContext);

    const handleKeyboardEvent = (e: React.KeyboardEvent<Element>) => {
        if (e.key === EDirection.Left ||
            e.key === EDirection.Right ||
            e.key === EDirection.Up ||
            e.key === EDirection.Down) {
            setDirection(e.key)
        }
    };

    return (

        <div className="GameArea" tabIndex={0} onKeyDown={handleKeyboardEvent}>

            <p>
                Level: {level}
            </p>
            <p>
                Direction: {direction}
            </p>
            <p>
                Score: {score}
            </p>

            <hr></hr>

            <div className="table">

                <GameBoard></GameBoard>
            </div>
        </div>

    );
}

export default GameComponent;