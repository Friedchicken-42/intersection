import { Point } from './point'
import { equals, min_eq, max_eq, round } from './utils'

export class Line {
    a: Point;
    b: Point;

    constructor(a: Point, b: Point) {
        this.a = a;
        this.b = b;
    }
    
    private lexicographic(a: Point, b: Point): number {
        if (equals(a.x, b.x)) {
            if (equals(a.y, b.y)) return 0;
            else if (a.y > b.y) return 1;
            return -1;
        } else if (a.x > b.x) return 1;
        return -1;
    }
    
    contains(point: Point): boolean {
        const points = [this.a, this.b].sort(this.lexicographic)
        const [a, b] = points;
        return (a.x >= point.x && a.y >= point.y && b.x <= point.x && b.y <= point.y)
    }

    private collinear(l1: Line, l2: Line): Point[] {
        const total_intersection = [
            l1.contains(l2.a), l1.contains(l2.b), l2.contains(l1.a), l2.contains(l1.b)
        ].reduce((res, a) => res + (a ? 1 : 0) ,0)

        if (total_intersection === 0 || total_intersection % 2 !== 0) return;

        const segments = [l1.a, l1.b, l2.a, l2.b]
        segments.sort(this.lexicographic)

        return [segments[1], segments[2]]
    }

    intersectLine(l2: Line): null | Point | Point[] {
        const l1 = this;

        const A1 = l1.b.y - l1.a.y
        const B1 = l1.a.x - l1.b.x
        const C1 = A1 * l1.a.x + B1 * l1.a.y

        const A2 = l2.b.y - l2.a.y
        const B2 = l2.a.x - l2.b.x
        const C2 = A2 * l2.a.x + B2 * l2.a.y

        const det = A1 * B2 - A2 * B1

        if (equals(det, 0) && equals(C1, 0) && equals(C2, 0)) return this.collinear(l1, l2)
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
