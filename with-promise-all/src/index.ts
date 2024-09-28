import { fetchUserProfile, fetchUserBooks, fetchNotifications, fetchUserActivity } from "./fetchers";
import withAsyncLocalStorage from "./with-async-local-storage";

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

    withAsyncLocalStorage({ userId }, async () => {
        const usersData = await collectUsersData();
        console.log("usersData", usersData);
    });
}

main();
