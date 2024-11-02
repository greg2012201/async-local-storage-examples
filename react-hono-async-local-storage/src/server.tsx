import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import App from "./components/app";
import DisplayCookies from "./components/display-cookies";
import { setCookieContext } from "./cookies";
import { cookieAsyncLocalStorage } from "./context";

const app = new Hono();

app.use(logger());

app.use(async (c, next) => {
    return cookieAsyncLocalStorage.run(setCookieContext(c), async () => {
        await next();
    });
});

app.get("/", async (c) => {
    const renderDisplayCookiesComponent = await (<DisplayCookies />);
    return c.html(<App>{renderDisplayCookiesComponent}</App>);
});

serve(
    {
        fetch: app.fetch,
        port: 8000,
    },
    (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    }
);
