export function* concat<T>(...iters: Array<Iterable<T>>) {
    for (const iter of iters) {
        yield* iter;
    }
}
