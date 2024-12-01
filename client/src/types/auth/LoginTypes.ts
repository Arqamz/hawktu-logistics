export interface LoginRequest {
    email: string;
    password: string;
    accountType: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
        email: string;
        name: string;

}