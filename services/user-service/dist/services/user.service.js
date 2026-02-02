import { userRepository } from "@/repositories/user.repositories";
import { HttpError } from "@common/src";
import { UniqueConstraintError } from "sequelize";
import { publishUserCreatedEvent } from "@/messaging/event-messaging";
class UserService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getUserById(id) {
        const user = await this.repository.findByid(id);
        if (!user) {
            throw new HttpError(404, 'User not found');
        }
        return user;
    }
    async getAllUsers() {
        return await this.repository.findAll();
    }
    async createUser(input) {
        try {
            const user = await this.repository.create(input);
            void publishUserCreatedEvent({
                id: user.id,
                email: user.email,
                displayName: user.displayName,
                passwordHash: user.passwordHash,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString()
            });
            return user;
        }
        catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new HttpError(409, 'User already exists.');
            }
            throw error;
        }
    }
    async searchUsers(params) {
        const query = params.query.trim();
        if (query.length === 0) {
            return [];
        }
        return this.repository.searchByQuery(query, {
            limit: params.limit,
            excludeIds: params.excludeIds
        });
    }
    async syncFromAuthUser(payload) {
        const user = await this.repository.upsertFromAuthEvent(payload);
        void publishUserCreatedEvent({
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            passwordHash: user.passwordHash,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString()
        });
        return user;
    }
}
export const userService = new UserService(userRepository);
//# sourceMappingURL=user.service.js.map