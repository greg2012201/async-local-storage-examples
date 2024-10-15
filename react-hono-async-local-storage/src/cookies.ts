import type { Context, Env } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { cookieAsyncLocalStorage } from "context";

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
        setCookie: (key: string, value: string) => context?.setCookie(key, value),
        deleteCookie: (key: string) => context?.deleteCookie(key),
    };
}

export default cookies;
