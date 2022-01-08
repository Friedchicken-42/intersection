import { Point } from './point'
import { equals, min_eq, max_eq, round } from './utils'

export class Line {
    a: Point;
    b: Point;

    constructor(a: Point, b: Point) {
        this.a = a;
        this.b = b;
    }

    intersectLine(l2: Line): Point | null {
        const l1 = this;

        const A1 = l1.b.y - l1.a.y
        const B1 = l1.a.x - l1.b.x
        const C1 = A1 * l1.a.x + B1 * l1.a.y

        const A2 = l2.b.y - l2.a.y
        const B2 = l2.a.x - l2.b.x
        const C2 = A2 * l2.a.x + B2 * l2.a.y

        const det = A1 * B2 - A2 * B1

        if (equals(det, 0)) return null

        const x = round((B2 * C1 - B1 * C2) / det)
        const y = round((A1 * C2 - A2 * C1) / det)

        const on_line1 = min_eq(Math.min(l1.a.x, l1.b.x), x) &&
            max_eq(Math.max(l1.a.x, l1.b.x), x) &&
            min_eq(Math.min(l1.a.y, l1.b.y), y) &&
            max_eq(Math.max(l1.a.y, l1.b.y), y)

        const on_line2 = min_eq(Math.min(l2.a.x, l2.b.x), x) &&
            max_eq(Math.max(l2.a.x, l2.b.x), x) &&
            min_eq(Math.min(l2.a.y, l2.b.y), y) &&
            max_eq(Math.max(l2.a.y, l2.b.y), y)

        if (on_line1 && on_line2) return new Point(x, y)

        return null
    }
}
