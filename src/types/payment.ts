export interface PaymentRecord {
    id: string;
    bookingId: string;
    amount: number;
    provider?: string;
    status: string;
    transactionId: string;
    paidAt?: string;
    createdAt?: string;
    updatedAt?: string;
    booking?: {
        id: string;
        status?: string;
        totalAmount?: number;
    };
}

export interface PaymentSessionResult {
    checkoutUrl: string;
    payment: PaymentRecord;
}
