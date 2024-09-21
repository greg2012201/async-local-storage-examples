import fetcher from "./fetcher";
import { getContext } from "./with-async-local-storage";
import { Context } from "./types";

class ExternalService {
    private baseUrl: string = "https://api.example.com";

    private getEndpointWithUserId(endpoint: string): string {
        const context = getContext<Context>();
        if (!context) {
            throw new Error("Context is not available");
        }
        console.log("context", context);
        const userId = context.get("userId");
        if (!userId) {
            throw new Error("User ID not found in context");
        }

        const url = new URL(`${this.baseUrl}${endpoint}`);
        url.searchParams.append("userId", userId);

        console.log(`Processing request ${url} for user ${userId}`);
        return url.toString();
    }

    async getEmails() {
        const endpoint = this.getEndpointWithUserId("/emails");
        return fetcher(endpoint);
    }
}

export default ExternalService;
