import { Point } from './point'
import { Line } from './line'
import { round } from './utils'

type AngleId = {
    angle: number;
    idx: number;
}

function sumPoints(p1: Point, p2: Point): Point {
    return new Point(p1.x + p2.x, p1.y + p2.y);
}

export class Polygon {
    points: Point[];
    center: Point;

    constructor(points: Point[]) {
        this.points = points;
        this.setCenter();
        this.orderPoints();
    }

    setCenter() {
        const point = this.points.reduce(sumPoints, new Point(0, 0))

        point.x /= this.points.length;
        point.y /= this.points.length;

        this.center = point;
    }

    orderPoints() {
        let angles_ids: AngleId[];
        angles_ids = this.points.map((p: Point, idx: number): AngleId => ({
            angle: Math.atan2(p.y - this.center.y, p.x - this.center.x),
            idx: idx
        }))

        angles_ids.sort((a: AngleId, b: AngleId): number => a.angle - b.angle)
        angles_ids.reverse()
        angles_ids.unshift(angles_ids.pop())

        this.points = angles_ids.map(({idx}): Point => this.points[idx])
    }

    area() {
        return round(Math.abs(
            this.points
                .pair((a: Point, b: Point): number => a.x * b.y - b.x * a.y)
                .reduce((a: number, b: number) => a + b)
                * .5
        ));
    }

    rotateFromPoint(angle: number, origin: Point) {
        this.points.forEach((point: Point) => point.rotate(angle, origin));
        this.orderPoints();
        this.setCenter()
    }

    rotate(angle: number) {
        this.rotateFromPoint(angle, this.center);
    }

    translate(xoff: number, yoff: number) {
        this.points.forEach((point: Point) => point.translate(xoff, yoff));
        this.center.translate(xoff, yoff);
    }

    moveTo(point: Point) {
        const diff = new Point(
            point.x - this.center.x,
            point.y - this.center.y
        )
        this.translate(diff.x, diff.y)
    }

    containPoint(point: Point): boolean {
        const data: boolean[] = this.points.pair(
            (p1: Point, p2: Point): boolean => (
                (p1.y > point.y) !== (p2.y > point.y) &&
                (point.x < (p2.x - p1.x) * (point.y - p1.y) / (p2.y - p1.y) + p1.x)
            )
        )

        return data.reduce((prev: boolean, curr: boolean) => (prev !== curr))
    }

    intersectLine(line: Line): Point[] {
        return this.points
            .pair((p1: Point, p2: Point): Point | null => new Line(p1, p2).intersectLine(line))
            .filter((p: Point | null): boolean => p !== null)
    }

    intersectPoly(poly: Polygon): Polygon | null {
        let pointMap: Map<string, Point> = new Map()
        this.points.filter((point: Point): boolean => poly.containPoint(point))
            .forEach((point: Point) => pointMap.set(point.string(), point))
        poly.points.filter((point: Point): boolean => this.containPoint(point))
            .forEach((point: Point) => pointMap.set(point.string(), point))

        let border_list = this.points.pair((p1: Point, p2: Point): Point[] => poly.intersectLine(new Line(p1, p2)));
        let border = border_list.reduce((prev: Point[], current: Point[]): Point[] => prev.concat(current));

        border
            .forEach((point: Point) => pointMap.set(point.string(), new Point(point.x, point.y)))

        let points = [...pointMap.values()]

        if (points.length === 0) return null;

        return new Polygon(points)
    }

}
