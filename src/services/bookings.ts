import { apiClient } from "./api";
import type { Booking } from "@/types/booking";

export async function getMyBookings() {
    const response = await apiClient.get<Booking[]>('/bookings');
    return response.data;
}

export async function updateBookingStatus(bookingId: string, status: string) {
    const response = await apiClient.patch<Booking>(`/bookings/${bookingId}`, { status });
    return response.data;
}
