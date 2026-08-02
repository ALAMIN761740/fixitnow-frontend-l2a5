import { apiClient } from "./api";
import type {
    AuthResponse,
    AuthUser,
    LoginPayload,
    RegisterPayload,
} from "@/types/auth";


function normalizeAuthResponse(payload: unknown): AuthResponse {

    const response = payload as {
        accessToken?: string;
        token?: string;
        user?: AuthUser;
    };


    const token =
        response.accessToken ??
        response.token;


    const user =
        response.user;


    if (!token || !user) {
        throw new Error(
            "Unexpected authentication response from the server"
        );
    }


    return {
        token,
        user,
    };
}

export async function login(
    payload: LoginPayload
): Promise<AuthResponse> {

    const response = await apiClient.post(
        "/auth/login",
        payload
    );

    return normalizeAuthResponse(response.data);
}



export async function register(
    payload: RegisterPayload
) {

    const response = await apiClient.post(
        "/auth/register",
        payload
    );


    return response.data;
}



export async function getCurrentUser(): Promise<AuthResponse> {

    const response = await apiClient.get(
        "/auth/me"
    );

    return normalizeAuthResponse(response.data);
}