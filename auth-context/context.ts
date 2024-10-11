import { AsyncLocalStorage } from "async_hooks";
import { Context } from "./types";

const authAsyncLocalStorage = new AsyncLocalStorage<Context>();

export function getContext() {
    return authAsyncLocalStorage.getStore();
}

export default authAsyncLocalStorage;
