export interface ApiErrorResponse {
    message?: string;
    errors?: Record<string, string[]>;
}

export interface AuthUser {
    id: string;
    email: string;
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
    name?: string;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
