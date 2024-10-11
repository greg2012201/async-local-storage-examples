import type { UserContext } from "./types";
import { sleep } from "./utils";
import { getContext } from "./async-local-storage";

function getUserId(): string {
    const context = getContext<UserContext>();
    if (!context || !context.userId) {
        throw new Error("User context not found");
    }
    return context.userId;
}

export async function fetchUserProfile() {
    const userId = getUserId();
    // Simulating API call to User Profile Service
    await sleep(500);

    return {
        userId: userId,
        name: "John Doe",
        email: "john.doe@example.com",
    };
}

export async function fetchUserBooks() {
    const userId = getUserId();
    // Simulating API call to User Books Service
    await sleep(700);
    return {
        userId: userId,
        books: [
            { id: 1, title: "The Enigmatic Cipher", author: "Evelyn Blackwood" },
            { id: 2, title: "Whispers of the Forgotten", author: "Marcus Holloway" },
            { id: 3, title: "Echoes in the Mist", author: "Sophia Chen" },
        ],
    };
}

export async function fetchNotifications() {
    const userId = getUserId();
    // Simulating API call to Notification Service
    await sleep(600);
    return {
        userId: userId,
        notifications: [
            { id: 1, message: "New message received" },
            { id: 2, message: "Friend request" },
        ],
    };
}

export async function fetchUserActivity() {
    const userId = getUserId();
    // Simulating API call to User Activity Service
    await sleep(800);
    return {
        userId: userId,
        lastLogin: "2023-05-10T10:30:00Z",
        totalLogins: 42,
    };
}
