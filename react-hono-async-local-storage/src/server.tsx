import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import Greeting from "./components/Greeting";
import withAsyncLocalStorage from "./with-async-local-storage";
import App from "./components/App";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

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

app.get("/:name", (c) => {
    return c.html(
        <App>
            <Greeting name={c.req.param("name")} />
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
