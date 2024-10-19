import type { Context, Env } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { cookieAsyncLocalStorage } from "./context";

const MOCK_ERROR = "Can not set or delete cookie in server component";

export function setCookieContext(c: Context<Env, never, {}>) {
    return {
        cookies: getCookie(c),
        setCookie: (key: string, value: string) => setCookie(c, key, value),
        deleteCookie: (key: string) => deleteCookie(c, key),
    };
}

function cookies() {
    const context = cookieAsyncLocalStorage.getStore();

    return {
        getCookies: () => {
            if (!context?.cookies) return [];
            return Object.entries(context.cookies).map(([key, value]) => ({
                key,
                value,
            }));
        },
        setCookie: (key: string, value: string) => {
            throw new Error(MOCK_ERROR);
        },
        deleteCookie: (key: string) => {
            throw new Error(MOCK_ERROR);
        },
    };
}

export default cookies;
