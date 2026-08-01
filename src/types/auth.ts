export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export interface AuthUser {
    id: string;
    name?: string;
    email: string;
    role: UserRole;
    status?: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}

export interface AuthResponse {
    token?: string;
    accessToken?: string;
    user: AuthUser;
}
