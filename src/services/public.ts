import { apiClient } from "./api";
import type { Category, ServiceItem, Technician } from "@/types/service";

export async function getCategories() {
    const response = await apiClient.get<Category[]>("/categories");
    return response.data;
}

export async function getServices() {
    const response = await apiClient.get<ServiceItem[]>("/services");
    return response.data;
}

export async function getTechnicians() {
    const response = await apiClient.get<Technician[]>("/technicians");
    return response.data;
}

export async function getTechnicianById(id: string) {
    const response = await apiClient.get<Technician>(`/technicians/${id}`);
    return response.data;
}
