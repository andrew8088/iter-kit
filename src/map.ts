export function* map<T, R>(iter: Iterator<T>, fn: (t: T) => R) {
    while (true) {
        const next = iter.next();
        if (next.done) return;
        yield fn(next.value);
    }
}
