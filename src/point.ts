import { roundZero } from './utils'

export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    translate(xoff: number, yoff: number) {
        this.x += xoff;
        this.y += yoff;
    }

    rotate(angle: number, origin: Point) {
        const s = Math.sin(angle)
        const c = Math.cos(angle)

        this.x -= origin.x;
        this.y -= origin.y;

        const xnew = this.x * c - this.y * s;
        const ynew = this.x * s + this.y * c;

        this.x = roundZero(xnew + origin.x);
        this.y = roundZero(ynew + origin.y);
    }
}
