import type { CookieContext } from "types";
import { getContext } from "./with-async-local-storage";

function cookies() {
    const context = getContext<CookieContext>();

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
