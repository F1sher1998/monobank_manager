import { Model, type Optional } from 'sequelize';
export interface UserCredentialsAttributes {
    id: string;
    email: string;
    displayName: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}
export type UserCredentialCreationAttributes = Optional<UserCredentialsAttributes, 'id' | 'createdAt' | 'updatedAt'>;
export declare class UserCredentials extends Model<UserCredentialsAttributes, UserCredentialCreationAttributes> implements UserCredentialsAttributes {
    id: string;
    email: string;
    displayName: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=user-credential.models.d.ts.map