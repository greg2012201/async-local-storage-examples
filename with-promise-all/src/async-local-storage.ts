import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage<any>();

export function getContext<T>(): T | undefined {
    return asyncLocalStorage.getStore() as T | undefined;
}

export default asyncLocalStorage;
