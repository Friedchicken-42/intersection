import { Point } from './../src/point'
import { Line } from './../src/line'

import * as mocha from 'mocha'
import * as chai from 'chai'

const expect = chai.expect;

describe('Line testing', () => {
    it('should contain a point inside', () => {
        const l1 = new Line(new Point(0, 0), new Point(0, 1));

        expect(l1.contains(new Point(0, 1)));
    })

    it('should not contain a point outside', () => {
        const l1 = new Line(new Point(0, 0), new Point(0, 1));

        expect(l1.contains(new Point(1, 1)));
    })

    it('should intersect 2 perpendicular lines', () => {
        const l1 = new Line(new Point(-1, 0), new Point(1, 0));
        const l2 = new Line(new Point(0, -1), new Point(0, 1));

        expect(l1.intersectLine(l2)).to.eql(new Point(0, 0));
        expect(l2.intersectLine(l1)).to.eql(new Point(0, 0));
    })

    it('should not intersect parallel lines', () => {
        const l1 = new Line(new Point(0, 0), new Point(2, 0));
        const l2 = new Line(new Point(0, 2), new Point(2, 2));
        
        expect(l1.intersectLine(l2)).to.be.null;
    })

    it('should work for lines sharing a end', () => {
        const l1 = new Line(new Point(0, 0), new Point(1, 0));
        const l2 = new Line(new Point(0, 1), new Point(0, 0));

        expect(l1.intersectLine(l2)).to.eql(new Point(0, 0));
        expect(l2.intersectLine(l1)).to.eql(new Point(0, 0));
    })

    it('should work with lines sharing a segment', () => {
        const l1 = new Line(new Point(0, 0), new Point(0, 2));
        const l2 = new Line(new Point(0, 1), new Point(0, 3));

        expect(l1.intersectLine(l2)).to.not.be.null;
    })

    it('should work with the same line', () => {
        const l1 = new Line(new Point(0, 0), new Point(0, 1));
        const l2 = new Line(new Point(0, 0), new Point(0, 1));

        expect(l1.intersectLine(l2)).to.not.be.null;
    })
})
