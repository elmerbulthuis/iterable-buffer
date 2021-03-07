export interface BufferredOptions {
    bufferSize?: number
}
export function createBuffered<T>(
    iterable: AsyncIterable<T>,
): AsyncIterable<T> {
    const iterator = iterable[Symbol.asyncIterator]();
    const results = new Array<IteratorResult<T, unknown>>();
    let resultPromise: Promise<IteratorResult<T, unknown>> | undefined;
    let result: IteratorResult<T, unknown> | undefined;

    collect();
    return emit();

    async function collect() {
        for (; ;) {
            resultPromise = iterator.next();
            result = await resultPromise;
            results.push(result);
            if (result.done) break;
        }
    }

    async function* emit(): AsyncIterable<T> {
        for (; ;) {
            await resultPromise;

            result = results.shift();
            if (!result) continue;
            if (result.done) break;

            yield result.value;
        }
    }
}
