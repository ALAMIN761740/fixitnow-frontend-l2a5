import { apiClient } from "./api";

export async function createReview(bookingId: string, rating: number, comment?: string) {
    const response = await apiClient.post("/reviews", { bookingId, rating, comment });
    return response.data;
}
