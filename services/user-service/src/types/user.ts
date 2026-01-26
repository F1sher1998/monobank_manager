export interface User {
        id: string;
        email: string;
        passwordHash: string;
        displayName: string;
        createdAt: Date;
        updatedAt: Date;
}


export interface CreateUserInput {
        passwordHash: string;
        email: string;
        displayName: string;
}