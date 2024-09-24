import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import withAsyncLocalStorage from "./with-async-local-storage";
import App from "./components/app";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import DisplayCookies from "./components/display-cookies";

const app = new Hono();

app.use(logger());

app.use(async (c, next) => {
    return withAsyncLocalStorage(
        {
            cookies: getCookie(c),
            setCookie: (key: string, value: string) => setCookie(c, key, value),
            deleteCookie: (key: string) => deleteCookie(c, key),
        },
        async () => {
            await next();
        }
    );
});

app.get("/", (c) => {
    return c.html(
        <App>
            <DisplayCookies />
        </App>
    );
});

serve(
    {
        fetch: app.fetch,
        port: 3000,
    },
    (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    }
);
