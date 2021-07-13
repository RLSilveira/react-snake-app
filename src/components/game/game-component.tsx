import React, { useContext } from "react";
import { EDirection } from "../../contexts/EDirection";
import { GameContext } from "../../contexts/game-context";
import { GameContextType } from "../../contexts/game-context-type";
import './game-component.css';

const GameComponent = () => {

    const { setDirection, snake, direction, level } = useContext<GameContextType>(GameContext);

    const handleKeyboardEvent = (e: React.KeyboardEvent<Element>) => {
        if (e.key === EDirection.Left ||
            e.key === EDirection.Right ||
            e.key === EDirection.Up ||
            e.key === EDirection.Down) {
            setDirection(e.key)
        }
    };


    return (

        <div className="GameArea" tabIndex={0}
            onKeyDown={handleKeyboardEvent}>

            <p>
                {level}
            </p>
            <p>
                {direction}
            </p>
            <p>
                {snake.length}
            </p>

            <hr></hr>

            {
                snake.map(p => <p key={`${p.x}-${p.y}`}>{p.x} - {p.y}</p>)
            }
        </div>

    );
}

export default GameComponent;