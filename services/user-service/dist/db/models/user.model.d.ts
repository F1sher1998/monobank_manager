import { Model } from 'sequelize';
import type { User } from '@/types/user';
import { type Optional } from "sequelize";
export type UserCreationAttributes = Optional<User, 'id' | 'createdAt' | 'updatedAt'>;
export declare class UserModel extends Model<User, UserCreationAttributes> implements User {
    id: string;
    email: string;
    displayName: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=user.model.d.ts.map