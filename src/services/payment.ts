import { apiClient } from "./api";
import type { PaymentRecord, PaymentSessionResult } from "@/types/payment";

export async function createPaymentSession(bookingId: string) {
    const response = await apiClient.post<PaymentSessionResult>("/payments/create", { bookingId });
    return response.data;
}

export async function confirmPaymentSession(transactionId: string) {
    const response = await apiClient.post<PaymentRecord>("/payments/confirm", { transactionId });
    return response.data;
}

export async function getPayments() {
    const response = await apiClient.get<PaymentRecord[]>("/payments");
    return response.data;
}
