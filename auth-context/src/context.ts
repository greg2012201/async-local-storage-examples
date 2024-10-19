import { AsyncLocalStorage } from "async_hooks";
import { Context } from "./types";

export const authAsyncLocalStorage = new AsyncLocalStorage<Context>();
