import { AsyncLocalStorage } from "async_hooks";
import type { UserContext } from "./types";

export const asyncLocalStorage = new AsyncLocalStorage<UserContext>();
