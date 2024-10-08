import { getContext } from "./with-async-local-storage";
import { Context } from "./types";
import { authContext } from "./server";
import { UserRepository } from "./user-repository";

class UserService {
    constructor(private userRepository: UserRepository, private authContext: Context) {}

    async getEmailAddresses(): Promise<string[]> {
        const userId = this.authContext.get("userId");
        if (!userId) {
            throw new Error("User ID not found in context");
        }
        return this.userRepository.getEmailAddresses(userId);
    }
}

export default UserService;
