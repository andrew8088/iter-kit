export function* concat<T>(...iters: Array<Iterator<T>>) {
    for (const iter of iters) {
        yield* toIterable(iter);
    }
}

function toIterable<T>(iter: Iterator<T>): Iterable<T> {
    return {
        [Symbol.iterator]: () => iter
    }
}
