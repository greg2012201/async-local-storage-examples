import Fastify, { type FastifyRequest, type FastifyReply } from "fastify";
import withAsyncLocalStorage, { getContext } from "./with-async-local-storage";
import { Context } from "./types";
import { getUserIdFromToken } from "./utils";

const app = Fastify();

function sendUnauthorized(reply: FastifyReply, message: string) {
    reply.code(401).send({ error: `Unauthorized: ${message}` });
}

app.addHook("onRequest", (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
    const authContext: Context = new Map();
    withAsyncLocalStorage<Context>(authContext, () => {
        const accessToken = request.headers.authorization?.split(" ")[1];
        const userId = accessToken ? getUserIdFromToken(accessToken) : null;

        if (!accessToken) {
            sendUnauthorized(reply, "Missing access token");
            return;
        }

        if (!userId) {
            sendUnauthorized(reply, "Invalid or expired token");
            return;
        }

        const context = getContext<Context>();
        context.set("userId", userId);
        done();
    });
});
app.get("/external-service/emails", async () => {
    return withAsyncLocalStorage<Context>(globalContext, async () => {
        const externalService = new ExternalService();
        const emails = await externalService.getEmails();

        return { emails };
    });
});

const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log("Server running on port 3000");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
