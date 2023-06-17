export function* takeUntil<T>(iter: Iterator<T>, fn: (t: T) => boolean) {
    while (true) {
        const next = iter.next();
        if (next.done || !fn(next.value)) return;
        yield next.value;
    }
}
