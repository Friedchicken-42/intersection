# intersection

A framework for working with basic geometric shapes in 2d

***Note: this does not works with concave polygons***

## Components
### Point
  - defined by 2 numerical value
  - can be translated and rotated
  
### Line
  - defined by a start point and end point
  - can check for points inside and intersection with other lines

### Polygon
  - defined by a list of points
  - can be rotated, moved, and check for intersection with point, line, and other polygons
  
## Usage
```typescript
//define polygons
const poly1 = new Polygon([
  new Point(0, 0),
  new Point(2, 0),
  new Point(2, 2),
  new Point(0, 2)
])

const poly2 = new Polygon([
  new Point(1, 1),
  new Point(3, 1),
  new Point(3, 3),
  new Point(1, 3)
])

// calculate the intersection
const poly3 = poly1.intersectPoly(poly2)
```
