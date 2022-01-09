import { Polygon } from '../src/polygon'
import { Point } from '../src/point'

import * as mocha from 'mocha'
import * as chai from 'chai'
const expect = chai.expect;

describe('Polygon testing', () => {
    it('should find the center on the origin', () => {
        const poly = new Polygon([
            new Point(1, 0),
            new Point(0, 1),
            new Point(-1, 0),
            new Point(0, -1)
        ]);

        expect(poly.center).to.eql(new Point(0, 0));
    })

    it('should have a area equals to 4', () => {
        const poly = new Polygon([
            new Point(0, 0),
            new Point(2, 0),
            new Point(2, 2),
            new Point(0, 2)
        ]);

        expect(poly.area()).to.equal(4);
    })

    it('should recalculate the center after a rotation around another point', () => {
        const poly = new Polygon([
            new Point(0, 0),
            new Point(2, 0),
            new Point(2, 2),
            new Point(0, 2)
        ]);

        poly.rotateFromPoint(Math.PI, new Point(0, 0))

        expect(poly.center).to.eql(new Point(-1, -1))
    })

    it('should keep the same area after a rotation', () => {
        const poly = new Polygon([
            new Point(0, 0),
            new Point(2, 0),
            new Point(2, 2),
            new Point(0, 2)
        ]);

        poly.rotate(Math.PI / 4);

        expect(poly.area()).to.equal(4);
    })

    it('should keep the same area after a translation', () => {
        const poly = new Polygon([
            new Point(0, 0),
            new Point(2, 0),
            new Point(2, 2),
            new Point(0, 2)
        ]);

        poly.translate(.5, 1.5);

        expect(poly.center).to.eql(new Point(1.5, 2.5));
        expect(poly.area()).to.equal(4);
    })

    it('should keep the same area after an absolute translation', () => {
        const poly = new Polygon([
            new Point(0, 0),
            new Point(2, 0),
            new Point(2, 2),
            new Point(0, 2)
        ]);

        const position = new Point(5, 5)
        poly.moveTo(position);

        expect(poly.center).to.eql(position);
        expect(poly.area()).to.equal(4);
    })

    it('should contain this point', () => {
        const poly = new Polygon([
            new Point(0, 0),
            new Point(2, 0),
            new Point(2, 2),
            new Point(0, 2)
        ]);

        const point = new Point(1, 1);
        expect(poly.containPoint(point)).to.be.true;
    })

    it('shuold intersect with another polygon', () => {
        const a = new Polygon([
            new Point(0, 0),
            new Point(2, 0),
            new Point(2, 2),
            new Point(0, 2)
        ]);

        const b = new Polygon([
            new Point(1, 1),
            new Point(3, 1),
            new Point(3, 3),
            new Point(1, 3)
        ]);

        expect(a.intersectPoly(b)).to.not.be.null;

        const result = new Polygon([
            new Point(1, 1),
            new Point(2, 1),
            new Point(2, 2),
            new Point(1, 2)
        ])
        
        expect(a.intersectPoly(b)).to.eql(result);
    })

    it('should intersect with a rotated square', () => {
        const a = new Polygon([
            new Point(0, 0),
            new Point(2, 0),
            new Point(2, 2),
            new Point(0, 2)
        ]);

        const b = new Polygon([
            new Point(1, 0),
            new Point(0, 1),
            new Point(-1, 0),
            new Point(0, -1)
        ]);

        b.rotate(Math.PI / 4);

        expect(a.intersectPoly(b)).to.not.be.null;
    }) 

    it('should not intersect with a distant polygon', () => {
        const a = new Polygon([
            new Point(0, 0),
            new Point(2, 0),
            new Point(2, 2),
            new Point(0, 2)
        ]);

        const b = new Polygon([
            new Point(0, 0),
            new Point(2, 0),
            new Point(2, 2),
            new Point(0, 2)
        ]);
        b.translate(100, 0);
        
        expect(a.intersectPoly(b)).to.be.null;
    })

})
