import { apiClient } from "./api";
import type { AuthResponse, AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";

function normalizeAuthResponse(payload: unknown): AuthResponse {
    const data = payload as Partial<AuthResponse> & {
        user?: AuthUser;
        data?: { user?: AuthUser };
    };

    const user = data.user ?? data.data?.user;
    const token = data.token ?? data.accessToken;

    if (!user || !token) {
        throw new Error("Unexpected authentication response from the server");
    }

    return { token, user };
}

export async function login(payload: LoginPayload) {
    const response = await apiClient.post<unknown>("/auth/login", payload);
    return normalizeAuthResponse(response.data);
}

export async function register(payload: RegisterPayload) {
    const response = await apiClient.post<unknown>("/auth/register", payload);
    return normalizeAuthResponse(response.data);
}

export async function getCurrentUser() {
    const response = await apiClient.get<unknown>("/auth/me");
    return normalizeAuthResponse(response.data);
}
