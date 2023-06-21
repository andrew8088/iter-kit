export function* map<T, R>(iter: Iterable<T>, fn: (t: T) => R) {
    for (const item of iter) {
        yield fn(item);
    }
}
