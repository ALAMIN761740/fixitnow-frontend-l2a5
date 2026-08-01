"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Section } from "@/components/ui/section";
import { createPaymentSession } from "@/services/payment";
import { getMyBookings } from "@/services/bookings";
import { formatCurrency, formatDate } from "@/utils/format";
import type { Booking } from "@/types/booking";
import { BOOKING_STATUS } from "@/constants/app";

function getStatusVariant(status?: string) {
    switch (status) {
        case BOOKING_STATUS.ACCEPTED:
            return "secondary";
        case BOOKING_STATUS.PAID:
        case BOOKING_STATUS.COMPLETED:
            return "success";
        case BOOKING_STATUS.DECLINED:
        case BOOKING_STATUS.CANCELLED:
            return "danger";
        default:
            return "default";
    }
}

function getPaymentLabel(booking: Booking) {
    if (booking.payment?.status === "COMPLETED" || booking.status === BOOKING_STATUS.PAID) {
        return "Paid";
    }

    if (booking.payment?.status === "PENDING") {
        return "Payment pending";
    }

    return "Ready to pay";
}

export default function CustomerBookingsPage() {
    const queryClient = useQueryClient();
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["bookings"],
        queryFn: getMyBookings,
    });

    const paymentMutation = useMutation({
        mutationFn: createPaymentSession,
        onMutate: ({ bookingId }) => {
            setSelectedBookingId(bookingId);
        },
        onSuccess: (data) => {
            toast.success("Redirecting to Stripe Checkout...");
            window.location.href = data.checkoutUrl;
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Unable to initiate payment.";
            toast.error(message);
            setSelectedBookingId(null);
        },
    });

    const handlePay = (bookingId: string) => {
        paymentMutation.mutate(bookingId);
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-16">
            <Container className="space-y-6">
                <Section
                    eyebrow="Customer dashboard"
                    title="My bookings"
                    description="Review your current bookings and complete payments for upcoming services."
                />

                {isLoading ? (
                    <div className="grid gap-6 lg:grid-cols-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <LoadingSkeleton key={index} className="h-48" />
                        ))}
                    </div>
                ) : bookings.length === 0 ? (
                    <EmptyState
                        title="No bookings yet"
                        description="Once you create a booking, it will appear here with payment and status details."
                    />
                ) : (
                    <div className="grid gap-6 lg:grid-cols-2">
                        {bookings.map((booking) => {
                            const isPaid = booking.payment?.status === "COMPLETED" || booking.status === BOOKING_STATUS.PAID;
                            const canPay = !isPaid && booking.payment?.status !== "PENDING" && booking.status !== BOOKING_STATUS.DECLINED && booking.status !== BOOKING_STATUS.CANCELLED;
                            const isSubmitting = paymentMutation.isLoading && selectedBookingId === booking.id;

                            return (
                                <Card key={booking.id} className="space-y-4">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700">{booking.service?.title ?? "Booking"}</p>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">Technician: {booking.technician?.name ?? "TBD"}</p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge variant={getStatusVariant(booking.status)}>{booking.status ?? "UNKNOWN"}</Badge>
                                            <Badge variant={isPaid ? "success" : booking.payment?.status === "PENDING" ? "secondary" : "default"}>
                                                {getPaymentLabel(booking)}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                                        <div>
                                            <p className="font-semibold text-slate-900">Schedule</p>
                                            <p>{booking.scheduledAt ? formatDate(booking.scheduledAt) : "Not scheduled"}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">Amount</p>
                                            <p>{formatCurrency(booking.totalAmount ?? 0)}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Booking ID: {booking.id}</p>
                                        {canPay ? (
                                            <Button size="sm" onClick={() => handlePay(booking.id)} disabled={isSubmitting}>
                                                {isSubmitting ? "Preparing checkout..." : "Pay now"}
                                            </Button>
                                        ) : (
                                            <Button size="sm" variant="outline" disabled>
                                                {isPaid ? "Paid" : booking.payment?.status === "PENDING" ? "Awaiting payment" : "Not available"}
                                            </Button>
                                        )}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </Container>
        </main>
    );
}
