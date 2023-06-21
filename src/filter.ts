export function* filter<T>(iter: Iterable<T>, fn: (t: T) => boolean) {
    for (const next of iter) {
        if (fn(next)) {
            yield next;
        }
    }
}
