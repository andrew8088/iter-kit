export function* take<T>(iter: Iterable<T>, count: number) {
    let yielded = 0;
    for (const next of iter) {
        yield next;
        if (++yielded === count) return;
    }
}
