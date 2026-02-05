export interface RegisterInput{
        email: string;
        password: string;
        displayName: string;
	apiKey: string;
}
export interface LoginInput{
        email: string;
        password: string;
}
export interface UserData{
        id: string;
        apiKey: string;
        email: string;
        createdAt: string;
}
export interface AuthTokens{
        accessToken: string;
        refreshToken: string;
}
export interface AuthResponse extends AuthTokens{
        user: UserData;
}
