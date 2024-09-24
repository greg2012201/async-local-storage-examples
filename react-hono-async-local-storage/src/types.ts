export type CookieContext = {
    cookies: Record<string, string>;
    setCookie: (key: string, value: string) => void;
    deleteCookie: (key: string) => void;
};
