export function* take<T>(iterator: Iterator<T>, count: number) {
    while (count--) {
        // yield* iterator;
        const next = iterator.next();
        if (next.done) return;
        yield next.value;
    }
}
