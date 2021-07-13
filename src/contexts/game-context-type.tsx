import { EDirection } from "./EDirection";
import { Pointer } from "./Pointer";

export interface GameContextType {
    snake: Pointer[];
    direction: EDirection,
    setDirection(direction: EDirection): void,
    food?: Pointer,
    level: number,
    mapHeigth: number,
    mapWidth: number
}