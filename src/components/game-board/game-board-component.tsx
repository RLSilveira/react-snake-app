import React, { useContext } from "react";
import { GameContext } from "../../contexts/game-context";
import { GameContextType } from "../../contexts/game-context-type";
import FoodComponent from "../food/food-component";
import SnakeHeadComponent from "../snake-head-component/snake-head-component";
import SnakeTailComponent from "../snake-tail-component/snake-tail-component";
import './game-board-component.css';


const GameBoard = () => {

    const { snake, food, mapHeigth, mapWidth } = useContext<GameContextType>(GameContext);

    let board = [];

    for (let row = 0; row < mapHeigth; row++) {

        let r = [];

        for (let col = 0; col < mapWidth; col++) {


            if (snake[0].x === col && snake[0].y === row)
                r.push(<div className="cell">
                    <SnakeHeadComponent></SnakeHeadComponent>
                </div>)
            else if (snake.some((p, i) => p.x === col && p.y === row))
                r.push(<div className="cell">
                    <SnakeTailComponent></SnakeTailComponent>
                </div>)
            else if (food?.x === col && food.y === row)
                r.push(<div className="cell">
                    <FoodComponent></FoodComponent>
                </div>)
            else

                r.push(<div className="cell"></div>)
        }

        board.push(r);
    }

    return (
        <div className="board">
            {board}
        </div>


    );
}

export default GameBoard;