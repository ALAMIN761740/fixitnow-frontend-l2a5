import { apiClient } from "./api";
import type { Category, ServiceItem, Technician } from "@/types/service";
import type { Booking } from "@/types/booking";

export async function createOrUpdateTechnicianProfile(profile: {
    bio?: string;
    experienceYears?: number;
    skills?: string[];
}) {
    const response = await apiClient.post<Technician>("/technicians/profile", profile);
    return response.data;
}

export async function addTechnicianAvailability(availability: {
    day: string;
    from: string;
    to: string;
}) {
    const response = await apiClient.post<unknown>("/technicians/availability", availability);
    return response.data;
}

export async function createService(service: {
    title: string;
    description?: string;
    price: number;
    categoryId?: string;
}) {
    const response = await apiClient.post<ServiceItem>("/services", service);
    return response.data;
}

export async function getTechnicianBookings() {
    const response = await apiClient.get<Booking[]>("/technicians/bookings");
    return response.data;
}
