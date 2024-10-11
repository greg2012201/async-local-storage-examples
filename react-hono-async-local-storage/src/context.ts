import { AsyncLocalStorage } from "async_hooks";
import { CookieContext } from "types";

const cookieAsyncLocalStorage = new AsyncLocalStorage<CookieContext>();

export function getContext() {
    return cookieAsyncLocalStorage.getStore();
}

export default cookieAsyncLocalStorage;
