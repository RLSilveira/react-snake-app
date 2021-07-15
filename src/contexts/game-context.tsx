import React, { createContext, useEffect, useState } from 'react';
import { EDirection } from '../enums/EDirection';
import { GameContextType } from "./game-context-type";
import { Vector } from '../models/vector';


const MAP_WIDTH = 16;
const MAP_HEIGTH = 16;
const START_LEVEL = 0.5 * 1000;


export const GameContext = createContext<GameContextType>({
    snake: [],
    direction: EDirection.Right,
    setDirection: (direction: EDirection) => { },
    food: undefined,
    level: START_LEVEL,
    mapHeigth: MAP_HEIGTH,
    mapWidth: MAP_WIDTH,
    score: 0
});

const GameProvider = (props: any) => {
    const mapHeigth = MAP_HEIGTH;
    const mapWidth = MAP_WIDTH;

    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    const [level, setLevel] = useState<number>(1000);

    // inicializa a cobrinha
    const [snake, setSnake] = useState<Vector[]>([
        new Vector(3, 1, EDirection.Right),
        new Vector(2, 1, EDirection.Right),
        new Vector(1, 1, EDirection.Right),
    ]);

    const score = snake.length - 3;

    // inicializa a comida: trocar para random depois
    const [food, setFood] = useState<Vector>(new Vector(5, 5));

    // initial direction
    const [direction, setDirection] = useState<EDirection>(EDirection.Right);

    const setActualDirection = (newDirection: EDirection) => {
        if ((newDirection === EDirection.Down && direction !== EDirection.Up) ||
            (newDirection === EDirection.Up && direction !== EDirection.Down) ||
            (newDirection === EDirection.Left && direction !== EDirection.Right) ||
            (newDirection === EDirection.Right && direction !== EDirection.Left)) {

            console.log('set direction: ', newDirection);
            setDirection(newDirection);
        }
    }

    //game loop
    useEffect(() => {
        const loop = setTimeout(() => {

            // próxima posição
            let head = snake[0].getNeighborhood(direction);

            // *** valida movimentos
            let gameOver = false;

            // valida bordas
            if (head.x < 0 || head.x >= mapWidth ||
                head.y < 0 || head.y >= mapHeigth) {
                setIsGameOver(true);
            }

            // valida cauda
            if (snake.some((p, i) => i > 0 && p.x === head.x && p.y === head.y)) {
                setIsGameOver(true);
            }

            if (isGameOver) {
                console.log('Game over');
            }
            else {
                let snakeTemp = snake;

                // comeu a comida
                if (head.x === food.x && head.y === food.y)
                    setFood(new Vector(7, 1));
                else
                    snakeTemp.pop();

                setSnake([head, ...snakeTemp]);
            }

            // função para aumentar o nível
            // setLevel(level - (level * 0.1));
            setLevel(500);

        }, level);

        return () => clearTimeout(loop);

    }, [snake, direction, level, food, isGameOver, mapWidth, mapHeigth, score]);


    return (
        <GameContext.Provider value={{ snake, direction, food, level, setDirection: setActualDirection, mapHeigth, mapWidth, score }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider;