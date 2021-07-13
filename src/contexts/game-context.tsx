import React, { createContext, useEffect, useState } from 'react';
import { EDirection } from './EDirection';
import { GameContextType } from "./game-context-type";
import { Pointer } from './Pointer';


const LARGURA_MAPA = 32;
const ALTURA_MAPA = 32;


// este cara irá ter a lógica do jogo
export const GameContext = createContext<GameContextType>({
    snake: [],
    direction: EDirection.Right,
    setDirection: (direction: EDirection) => { },
    food: undefined,
    level: 1000,
    mapHeigth: ALTURA_MAPA,
    mapWidth: LARGURA_MAPA
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

    // inicializa a comida: trocar para random depois
    const [food, setFood] = useState<Pointer>(new Pointer(5, 5));

    // direcao inicial
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


    //loop do jogo
    useEffect(() => {
        const loop = setTimeout(() => {
            console.log(snake);

            if (isGameOver) return;

            // mover/aumetar a cobrinha
            let head = snake[0].getNeighborhood(direction);
            let snakeTemp = snake;

            // comeu a comida
            if (head.x === food.x && head.y === food.y) {
                setFood(new Pointer(7, 1));
            }
            else {
                snakeTemp.pop();
            }

            // *** valida movimentos

            // valida bordas
            if (head.x < 0 ||
                head.y < 0 ||
                head.x >= mapWidth ||
                head.y >= mapHeigth) {
                setIsGameOver(true);
            }

            // valida cauda
            if (snake.some((p, i) => i > 0 && p.x === head.x && p.y === head.y)) {
                setIsGameOver(true);
            }


            setSnake([head, ...snakeTemp]);


            // função para aumentar o nível
            setLevel(level);

        }, level);

        return () => clearTimeout(loop);

    }, [snake, direction, level, food, isGameOver, mapWidth, mapHeigth]);


    return (
        <GameContext.Provider value={{ snake, direction, food, level, setDirection, mapHeigth, mapWidth }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider;