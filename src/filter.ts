export function* filter<T>(iter: Iterator<T>, fn: (t: T) => boolean) {
    while (true) {
        const next = iter.next();
        if (next.done) return;
        if (fn(next.value)) {
            yield next.value;
        }
    }
}
