import { EDirection } from "../enums/EDirection";

export class Vector {
    constructor(
        public x: number,
        public y: number,
        public direction?: EDirection
    ) { }

    getNeighborhood(direction: EDirection) {
        let x = this.x;
        let y = this.y;

        switch (direction) {
            case EDirection.Up:
                y -= 1;
                break;
            case EDirection.Down:
                y += 1;
                break;
            case EDirection.Right:
                x += 1;
                break;
            case EDirection.Left:
                x -= 1;
                break;
        }

        return new Vector(x, y, direction);
    }
}