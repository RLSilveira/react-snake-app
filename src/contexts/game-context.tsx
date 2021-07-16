import React, { createContext, useCallback, useEffect, useState } from 'react';
import { EDirection } from '../enums/EDirection';
import { Vector } from '../models/vector';
import { Point } from "../models/Point";


const MAP_WIDTH = 16;
const MAP_HEIGTH = 16;
const START_LEVEL = 1 * 500;

export interface GameContextType {
    snake: Vector[];
    food?: Point,
    score: number,
    level: number,
    isGameOver: boolean,

    direction: EDirection,
    handleDirection(direction: EDirection): void,

    mapHeigth: number,
    mapWidth: number
}

export const GameContext = createContext<GameContextType>({} as GameContextType);

const GameProvider = (props: any) => {
    const mapHeigth = MAP_HEIGTH;
    const mapWidth = MAP_WIDTH;

    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    const [level, setLevel] = useState<number>(START_LEVEL);
    const [score, setScore] = useState<number>(0);

    // inicializa a cobrinha
    const [snake, setSnake] = useState<Vector[]>([
        new Vector(3, 1, EDirection.Right),
        new Vector(2, 1, EDirection.Right),
        new Vector(1, 1, EDirection.Right),
    ]);

    // inicializa a comida: trocar para random depois
    const [food, setFood] = useState<Vector>(new Vector(5, 5));

    // initial direction
    const [direction, setDirection] = useState<EDirection>(EDirection.Right);

    // verificar se pode ir para a direção informada
    const handleDirection = async (newDirection: EDirection) => {
        console.log(direction, newDirection);
        setDirection(oldDirection => ((newDirection === EDirection.Down && oldDirection !== EDirection.Up)
            || (newDirection === EDirection.Up && oldDirection !== EDirection.Down)
            || (newDirection === EDirection.Left && oldDirection !== EDirection.Right)
            || (newDirection === EDirection.Right && oldDirection !== EDirection.Left))
            ? newDirection
            : oldDirection);
    }

    // game over
    const gameOver = () => {
        console.log('GAME OVER');
        setIsGameOver(true)
        // clearTimeout(timerId);
    };

    // level up
    const levelUp = useCallback(() => {
        console.log('LEVEL UP');
        // timerId && clearTimeout(timerId);
        setLevel(level => level - (level * score / 100));
        // setTimerId(gameLoop());
    }, [score]);

    //game loop
    const gameLoop = () => {
        console.log("START GAME LOOP");

        const gameLoopValidations = () => {
            console.log('GAME LOOP', (new Date()).toLocaleTimeString(), direction, food.x, food.y, mapHeigth, mapWidth, snake.length);

            // próxima posição
            let head = snake[0].getNeighborhood(direction);

            // valida bordas
            if (head.x < 0 || head.x >= mapWidth ||
                head.y < 0 || head.y >= mapHeigth) {
                gameOver();
                return;
            }

            // valida cauda
            if (snake.some((p, isTail) => isTail && p.x === head.x && p.y === head.y)) {
                gameOver();
                return;
            }

            let snakeTemp = snake.map(x => x);

            // comeu a comida
            if (head.x === food.x && head.y === food.y) {
                setScore(score => score++);
                setFood(new Vector(7, 1));
            }
            else {
                snakeTemp.pop();
            }

            // move
            setSnake(snake => [head, ...snakeTemp]);
        }

        const timerId = setTimeout(() => {
            levelUp();
            !isGameOver && gameLoopValidations();
        }, level);

        return () => clearTimeout(timerId);
    };

    useEffect(gameLoop, [direction, food.x, food.y, isGameOver, level, levelUp, mapHeigth, mapWidth, snake]);



    return (
        <GameContext.Provider value={{ snake, direction, food, level, handleDirection, mapHeigth, mapWidth, score, isGameOver }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider;