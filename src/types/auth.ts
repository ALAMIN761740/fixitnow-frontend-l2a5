export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type UserStatus = "ACTIVE" | "BANNED";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status?: UserStatus;
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
    token: string;
    user: AuthUser;
}