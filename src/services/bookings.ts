import { apiClient } from "./api";
import type { Booking } from "@/types/booking";

export interface CreateBookingPayload {
    technicianId: string;
    serviceId: string;
    scheduledAt: string;
    customerNote?: string;
}

/**
 * Create a new booking
 * POST /bookings
 */
export async function createBooking(
    payload: CreateBookingPayload
): Promise<Booking> {
    const response = await apiClient.post<Booking>("/bookings", payload);
    return response.data;
}

/**
 * Get logged-in customer's bookings
 * GET /bookings
 */
export async function getMyBookings(): Promise<Booking[]> {
    const response = await apiClient.get<Booking[]>("/bookings");
    return response.data;
}

/**
 * Update booking status
 * PATCH /bookings/:id
 */
export async function updateBookingStatus(
    bookingId: string,
    status: string
): Promise<Booking> {
    const response = await apiClient.patch<Booking>(
        `/bookings/${bookingId}`,
        {
            status,
        }
    );

    return response.data;
}