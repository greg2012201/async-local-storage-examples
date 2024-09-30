const MOCK_USER = {
    userId: "user_123",
    accessToken: "mocked_access_token_456",
};

export function getUserIdFromToken(token: string): string {
    return MOCK_USER.userId;
}

export function validateToken(token: string): boolean {
    return token === MOCK_USER.accessToken;
}
