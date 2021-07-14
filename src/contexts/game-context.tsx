import React, { createContext, useEffect, useState } from 'react';
import { EDirection } from './EDirection';
import { GameContextType } from "./game-context-type";
import { Pointer } from './Pointer';


const LARGURA_MAPA = 16;
const ALTURA_MAPA = 16;


export const GameContext = createContext<GameContextType>({
    snake: [],
    direction: EDirection.Right,
    setDirection: (direction: EDirection) => { },
    food: undefined,
    level: 1000,
    mapHeigth: ALTURA_MAPA,
    mapWidth: LARGURA_MAPA,
    score: 0
});

const GameProvider = (props: any) => {
    const mapHeigth = ALTURA_MAPA;
    const mapWidth = LARGURA_MAPA;

    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    const [level, setLevel] = useState<number>(1000);

    // inicializa a cobrinha
    const [snake, setSnake] = useState<Pointer[]>([
        new Pointer(3, 1, EDirection.Right),
        new Pointer(2, 1, EDirection.Right),
        new Pointer(1, 1, EDirection.Right),
    ]);

    const score = snake.length - 3;

    // inicializa a comida: trocar para random depois
    const [food, setFood] = useState<Pointer>(new Pointer(5, 5));

    // initial direction
    const [direction, _setDirection] = useState<EDirection>(EDirection.Right);

    const setDirection = (newDirection: EDirection) => {
        // validar voltar para tras. Ex.: [→] => [←]
        if ((newDirection === EDirection.Down && direction !== EDirection.Up) ||
            (newDirection === EDirection.Up && direction !== EDirection.Down) ||
            (newDirection === EDirection.Left && direction !== EDirection.Right) ||
            (newDirection === EDirection.Right && direction !== EDirection.Left)) {
            _setDirection(newDirection);
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
            if (head.x < 0 ||
                head.y < 0 ||
                head.x >= mapWidth ||
                head.y >= mapHeigth) {
                gameOver = true;
            }

            // valida cauda
            if (snake.some((p, i) => i > 0 && p.x === head.x && p.y === head.y)) {
                gameOver = true;
            }

            if (gameOver) {
                setIsGameOver(true);
                return;
            }

            let snakeTemp = snake;

            // comeu a comida
            if (head.x === food.x && head.y === food.y) {
                setFood(new Pointer(7, 1));
            }
            else {
                snakeTemp.pop();
            }


            setSnake([head, ...snakeTemp]);


            // função para aumentar o nível
            // setLevel(level - (level * 0.1));
            setLevel(1000 - (score * 100));

            console.log(isGameOver, food, head, snake.length)

        }, level);

        return () => clearTimeout(loop);

    }, [snake, direction, level, food, isGameOver, mapWidth, mapHeigth, score]);


    return (
        <GameContext.Provider value={{ snake, direction, food, level, setDirection, mapHeigth, mapWidth, score }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider;