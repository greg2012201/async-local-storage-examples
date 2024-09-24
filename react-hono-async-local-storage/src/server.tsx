import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import withAsyncLocalStorage from "./with-async-local-storage";
import App from "./components/app";
import DisplayCookies from "./components/display-cookies";
import { setCookieStore } from "./cookies";

const app = new Hono();

app.use(logger());

app.use(async (c, next) => {
    return withAsyncLocalStorage(setCookieStore(c), async () => {
        await next();
    });
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
