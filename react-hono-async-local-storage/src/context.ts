import { AsyncLocalStorage } from "async_hooks";
import { CookieContext } from "types";

export const cookieAsyncLocalStorage = new AsyncLocalStorage<CookieContext>();
