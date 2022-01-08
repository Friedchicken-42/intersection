import { Point } from './../src/point'

import * as mocha from 'mocha'
import * as chai from 'chai'

const expect = chai.expect;

describe('Point testing', () => {
    it('should rotate the point 90 degree from the origin', () => {
        const o = new Point(0, 0);
        const p = new Point(1, 0);
        p.rotate(Math.PI / 2, o);
        expect(p).to.eql(new Point(0, 1));
    })
    it('should rotate the point 180 degree from offset', () => {
        const o = new Point(2, 2);
        const p = new Point(1, 1);
        p.rotate(Math.PI, o);
        expect(p).to.eql(new Point(3, 3));
    })
})
