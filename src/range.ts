export function* range(start = 0, end = Infinity) {
    while (start <= end) {
        yield start++;
    }
}
