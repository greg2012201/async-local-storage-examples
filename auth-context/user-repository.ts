const db = new Map<string, { id: number; email: string }[]>([
    [
        "user_123",
        [
            { id: 1, email: "user@example.com" },
            { id: 2, email: "work@example.com" },
            { id: 3, email: "personal@example.com" },
        ],
    ],
]);

export class UserRepository {
    async getEmailAddresses(userId: string): Promise<string[]> {
        // Simulate a delay of 400ms
        await new Promise((resolve) => setTimeout(resolve, 400));
        const userEmails = db.get(userId);
        if (!userEmails) {
            return [];
        }
        return userEmails.map((entry) => entry.email);
    }
}
