const EPSILON = 0.000001;

export const equals = (a: number, b: number): boolean => {
    return Math.abs(a - b) <= EPSILON;
}
 
export const min_eq = (a: number, b: number): boolean => {
    return a < b || equals(a, b);
}

export const max_eq = (a: number, b: number): boolean => {
    return a > b || equals(a, b);
}

export const roundZero = (n: number): number => { 
    return equals(n, 0) ? 0 : n;
}

export const round = (n: number): number => {
    const result = Math.round(n / EPSILON) * EPSILON;
    if(result === -0) return 0;
    return result;
}

Array.prototype.pair = function<U>(f: <T>(a: T, b: T) => U): U[] {
    return this.map((el: any, idx: number) => f(el, this[idx + 1 === this.length ? 0 : idx + 1]))
}

declare global {
    interface Array<T> {
        pair<U>(f: (a: T, b: T) => U): U[]
    }
}
