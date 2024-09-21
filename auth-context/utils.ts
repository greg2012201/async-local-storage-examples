const MOCK_AUTH_CODE = "mock_auth_code_123";

const MOCK_USER = {
    userId: "user_123",
    accessToken: "mock_access_token_456",
};

export function acquireTokenAndUser(code: string) {
    if (code === MOCK_AUTH_CODE) {
        return MOCK_USER;
    }
    throw new Error("Invalid authorization code");
}

export function getUserIdFromToken(token: string): string {
    // In a real scenario, this would decode and validate the token
    // For this example, we'll just return a substring of the token

    if (token !== MOCK_USER.accessToken) {
        return;
    }

    return MOCK_USER.userId;
}
