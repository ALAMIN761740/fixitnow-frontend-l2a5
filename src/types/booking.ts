export interface BookingServiceSummary {
    id: string;
    title?: string;
    description?: string;
    price?: number;
}

export interface BookingTechnicianSummary {
    id: string;
    name?: string;
    user?: {
        id?: string;
        name?: string;
        email?: string;
    };
}

export interface BookingCustomerSummary {
    id: string;
    name?: string;
    email?: string;
}

export interface BookingPaymentSummary {
    id: string;
    status?: string;
    amount?: number;
    transactionId?: string;
}

export interface Booking {
    id: string;
    status?: string;
    totalAmount?: number;
    scheduledAt?: string;
    createdAt?: string;
    service?: BookingServiceSummary;
    technician?: BookingTechnicianSummary;
    customer?: BookingCustomerSummary;
    payment?: BookingPaymentSummary;
}
