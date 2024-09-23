import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage<any>();

export function withAsyncLocalStorage<TContext>(context: TContext, fn: () => void) {
    return asyncLocalStorage.run(context, fn);
}

export function getContext<T>(): T | undefined {
    return asyncLocalStorage.getStore() as T | undefined;
}

export default withAsyncLocalStorage;
