const MOCK_USER = {
    userId: "user_123",
    accessToken: "mock_access_token_456",
};
export function getUserIdFromToken(token: string): string {
    // In a real scenario, this would decode and validate the token
    // For this example, we'll just return a substring of the token

    if (token !== MOCK_USER.accessToken) {
        return;
    }

    return MOCK_USER.userId;
}
