import React, { useContext } from "react";
import { EDirection } from "../../enums/EDirection";
import { GameContext, GameContextType } from "../../contexts/game-context";
import GameBoard from "../game-board/game-board-component";
import './game-component.css';

const GameComponent = () => {

    const { handleDirection, score, direction, level } = useContext<GameContextType>(GameContext);

    const handleKeyboardEvent = (e: React.KeyboardEvent<Element>) => {
        if (e.key === EDirection.Left ||
            e.key === EDirection.Right ||
            e.key === EDirection.Up ||
            e.key === EDirection.Down) {
            handleDirection(e.key)
        }
    };

    return (

        <div className="GameArea" tabIndex={0} onKeyDown={handleKeyboardEvent}>

            <div className="Infos">
                <span>
                    Level: {level}
                </span>
                <span>
                    Direction: {direction}
                </span>
                <span>
                    Score: {score}
                </span>
            </div>

            <hr></hr>

            <div className="GameBoard">
                <GameBoard></GameBoard>
            </div>
        </div>

    );
}

export default GameComponent;