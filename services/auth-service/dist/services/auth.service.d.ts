import { AuthResponse, AuthTokens, LoginInput, RegisterInput } from "@/types/auth";
export declare const register: (input: RegisterInput) => Promise<AuthResponse>;
export declare const login: (input: LoginInput) => Promise<AuthTokens>;
export declare const refreshTokens: (token: string) => Promise<AuthTokens>;
export declare const revokeRefreshToken: (userId: string) => Promise<void>;
//# sourceMappingURL=auth.service.d.ts.map