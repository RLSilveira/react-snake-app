import React, { useContext, useEffect, useState } from "react";
import { GameContext, GameContextType } from "../../contexts/game-context";
import FoodComponent from "../food/food-component";
import SnakeHeadComponent from "../snake-head-component/snake-head-component";
import SnakeTailComponent from "../snake-tail-component/snake-tail-component";
import './game-board-component.css';


const GameBoard = () => {

    const { snake, food, mapHeigth, mapWidth } = useContext<GameContextType>(GameContext);

    const [board, setBoard] = useState<JSX.Element[][]>();

    // render loop
    useEffect(() => {

        let _board: JSX.Element[][] = [[]];

        for (let row = 0; row < mapHeigth; row++) {

            let r: JSX.Element[] = [];

            for (let col = 0; col < mapWidth; col++) {

                if (snake[0].x === col && snake[0].y === row)
                    r.push(
                        <div key={`${row}-${col}`} className="cell">
                            <SnakeHeadComponent></SnakeHeadComponent>
                        </div>)

                else if (snake.some((p, i) => p.x === col && p.y === row))
                    r.push(
                        <div key={`${row}-${col}`} className="cell">
                            <SnakeTailComponent></SnakeTailComponent>
                        </div>)
                else if (food?.x === col && food.y === row)
                    r.push(
                        <div key={`${row}-${col}`} className="cell">
                            <FoodComponent></FoodComponent>
                        </div>)
                else
                    r.push(
                        <div key={`${row}-${col}`} className="cell"></div>)
            }

            _board.push(r);
        }

        setBoard(_board);

    }, [food?.x, food?.y, mapHeigth, mapWidth, snake]);



    return (
        <div className="board">
            {board}
        </div>


    );
}

export default GameBoard;