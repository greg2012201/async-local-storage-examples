import { Context } from "./types";
import { UserRepository } from "./user-repository";

class UserService {
    constructor(private userRepository: UserRepository, private context: Context) {}

    async getEmailAddresses(): Promise<string[]> {
        const userId = this.context.get("userId");
        if (!userId) {
            throw new Error("User ID not found in context");
        }
        return this.userRepository.getEmailAddresses(userId);
    }
}

export default UserService;
