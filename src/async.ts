export async function* filter<T>(iter: AsyncIterable<T>, fn: (t: T) => boolean) {
    for await (const next of iter) {
        if (fn(next)) {
            yield next;
        }
    }
}

export async function* map<T, R>(iter: AsyncIterable<T>, fn: (t: T) => R) {
    for await (const item of iter) {
        yield fn(item);
    }
}

export async function* range(start = 0, end = Infinity, step = 1) {
    while (start <= end) {
        yield await Promise.resolve(start);
        start += step;
    }
}
