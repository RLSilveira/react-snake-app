import { EDirection } from "../enums/EDirection";
import { Vector } from "../models/vector";

export interface GameContextType {
    snake: Vector[];
    direction: EDirection,
    setDirection(direction: EDirection): void,
    food?: Vector,
    level: number,
    mapHeigth: number,
    mapWidth: number,
    score: number
}