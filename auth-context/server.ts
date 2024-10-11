import Fastify, { type FastifyRequest, type FastifyReply } from "fastify";
import { getUserIdFromToken, validateToken } from "./utils";
import { UserRepository } from "./user-repository";
import authAsyncLocalStorage, { getContext } from "./context";

const app = Fastify();

function sendUnauthorized(reply: FastifyReply, message: string) {
    reply.code(401).send({ error: `Unauthorized: ${message}` });
}

app.addHook("onRequest", (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
    const accessToken = request.headers.authorization?.split(" ")[1];
    const isTokenValid = validateToken(accessToken);
    if (!isTokenValid) {
        sendUnauthorized(reply, "Access token is invalid");
    }
    const userId = accessToken ? getUserIdFromToken(accessToken) : null;

    if (!userId) {
        sendUnauthorized(reply, "Invalid or expired token");
    }
    authAsyncLocalStorage.run(new Map([["userId", userId]]), async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        sendUnauthorized(reply, "Invalid or expired token");
        done();
    });
});
app.get("/email-addresses", async () => {
    const context = getContext();
    const userId = context.get("userId");
    const userRepository = new UserRepository();
    const addresses = await userRepository.getEmailAddresses(userId);

    return { addresses };
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
