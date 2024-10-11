import { fetchUserProfile, fetchUserBooks, fetchNotifications, fetchUserActivity } from "./fetchers";
import { UserData } from "./types";
import asyncLocalStorage from "./async-local-storage";

async function collectUsersData() {
    const [userProfile, userBooks, notifications, userActivity] = await Promise.all([
        fetchUserProfile(),
        fetchUserBooks(),
        fetchNotifications(),
        fetchUserActivity(),
    ]);
    // typically you would use a library like zod for validation
    return {
        ...userProfile,
        ...userBooks,
        ...notifications,
        ...userActivity,
    };
}

function main() {
    const userId = "user123";

    asyncLocalStorage.run({ userId }, async () => {
        const usersData: UserData = await collectUsersData();
        console.log("usersData", usersData);
    });
}

main();
