export interface LoginRequest {
    email: string;
    password: string;
    accountType: string;
}

export interface LoginResponse {
    token: string;
    user: {
        email: string;
        name: string;
    };
}