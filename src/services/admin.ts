import { apiClient } from "./api";
import type { AuthUser } from "@/types/auth";
import type { Booking } from "@/types/booking";
import type { Category } from "@/types/service";

export async function getAdminUsers() {
    const response = await apiClient.get<AuthUser[]>("/admin/users");
    return response.data;
}

export async function updateUserStatus(userId: string, status: "ACTIVE" | "BANNED") {
    const response = await apiClient.patch<AuthUser>(`/admin/users/${userId}`, { status });
    return response.data;
}

export async function getAdminBookings() {
    const response = await apiClient.get<Booking[]>("/admin/bookings");
    return response.data;
}

export async function createCategory(category: { name: string; description?: string }) {
    const response = await apiClient.post<Category>("/categories", category);
    return response.data;
}
