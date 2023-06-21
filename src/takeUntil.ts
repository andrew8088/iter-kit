export function* takeUntil<T>(iter: Iterable<T>, fn: (t: T) => boolean) {
    for (const next of iter) {
        if (!fn(next)) return;
        yield next;
    }
}
