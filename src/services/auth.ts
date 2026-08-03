import { apiClient } from "./api";
import type {
    AuthResponse,
    AuthUser,
    LoginPayload,
    RegisterPayload,
} from "@/types/auth";

function normalizeLoginResponse(payload: unknown): AuthResponse {
    const response = payload as {
        accessToken?: string;
        token?: string;
        user?: AuthUser;
    };

    const token = response.accessToken ?? response.token;
    const user = response.user;

    if (!token || !user) {
        throw new Error("Unexpected authentication response from the server");
    }

    return {
        token,
        user,
    };
}

/**
 * Login
 * Expected backend response:
 * {
 *   success: true,
 *   data: {
 *     accessToken,
 *     user
 *   }
 * }
 */
export async function login(
    payload: LoginPayload
): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/login", payload);

    return normalizeLoginResponse(response.data);
}

/**
 * Register
 */
export async function register(
    payload: RegisterPayload
) {
    const response = await apiClient.post("/auth/register", payload);

    return response.data;
}

/**
 * Get Current User
 *
 * Backend (/auth/me) returns only the authenticated user.
 * Since api.ts already unwraps { success, data },
 * response.data is the user object directly.
 */
export async function getCurrentUser(): Promise<AuthUser> {
    const response = await apiClient.get("/auth/me");

    return response.data as AuthUser;
}