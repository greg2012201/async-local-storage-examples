import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage<any>();

function withAsyncLocalStorage<TContext>(context: TContext, fn: () => void) {
    return asyncLocalStorage.run(context, fn);
}

export function getContext<T>(): T | undefined {
    return asyncLocalStorage.getStore() as T | undefined;
}

export function setContext<T>(newContext: T): void {
    const currentContext = asyncLocalStorage.getStore();
    asyncLocalStorage.enterWith({ ...currentContext, ...newContext });
}

export default withAsyncLocalStorage;
