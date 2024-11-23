export interface LoginRequest {
    email: string;
    password: string;
    //add account type.
}
  
export interface LoginResponse {
    token: string;
    user: {
        email: string;
        name: string;
    };
}