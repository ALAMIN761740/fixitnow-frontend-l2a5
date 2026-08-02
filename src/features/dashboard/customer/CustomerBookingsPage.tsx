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
import { Section } from "@/components/sections/section";
import { createPaymentSession } from "@/services/payment";
import { createReview } from "@/services/reviews";
import { getMyBookings, updateBookingStatus } from "@/services/bookings";
import { formatCurrency, formatDate } from "@/utils/format";
import { BOOKING_STATUS } from "@/constants/app";
import type { Booking } from "@/types/booking";

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
    const [reviewBookingId, setReviewBookingId] = useState<string | null>(null);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["bookings"],
        queryFn: getMyBookings,
    });

    const paymentMutation = useMutation({
        mutationFn: createPaymentSession,
        onMutate: (bookingId: string) => {
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

    const cancelMutation = useMutation({
        mutationFn: ({ bookingId }: { bookingId: string }) =>
            updateBookingStatus(bookingId, BOOKING_STATUS.CANCELLED),
        onSuccess: () => {
            toast.success("Booking cancelled.");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Unable to cancel booking.";
            toast.error(message);
        },
    });

    const reviewMutation = useMutation({
        mutationFn: ({ bookingId, rating, comment }: { bookingId: string; rating: number; comment: string }) =>
            createReview(bookingId, rating, comment),
        onSuccess: () => {
            toast.success("Review submitted successfully.");
            setReviewBookingId(null);
            setReviewRating(5);
            setReviewComment("");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Unable to submit review.";
            toast.error(message);
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
                            const isSubmitting = paymentMutation.status === "pending" && selectedBookingId === booking.id;

                            return (
                                <Card key={booking.id} className="space-y-4">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700">{booking.service?.title ?? "Booking"}</p>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">Technician: {booking.technician?.user?.name ?? booking.technician?.name ?? "TBD"}</p>
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
                                        <div className="flex flex-wrap items-center gap-3">
                                            {canPay ? (
                                                <Button size="sm" onClick={() => handlePay(booking.id)} disabled={isSubmitting}>
                                                    {isSubmitting ? "Preparing checkout..." : "Pay now"}
                                                </Button>
                                            ) : (
                                                <Button size="sm" variant="outline" disabled>
                                                    {isPaid ? "Paid" : booking.payment?.status === "PENDING" ? "Awaiting payment" : "Not available"}
                                                </Button>
                                            )}

                                            {booking.status && !([BOOKING_STATUS.COMPLETED, BOOKING_STATUS.CANCELLED, BOOKING_STATUS.DECLINED] as string[]).includes(booking.status) ? (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => cancelMutation.mutate({ bookingId: booking.id })}
                                                    disabled={cancelMutation.status === "pending" && cancelMutation.variables?.bookingId === booking.id}
                                                >
                                                    {cancelMutation.status === "pending" && cancelMutation.variables?.bookingId === booking.id ? "Cancelling..." : "Cancel booking"}
                                                </Button>
                                            ) : null}
                                        </div>
                                    </div>

                                    {booking.status === BOOKING_STATUS.COMPLETED ? (
                                        <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                            {reviewBookingId === booking.id ? (
                                                <form
                                                    onSubmit={(event) => {
                                                        event.preventDefault();
                                                        reviewMutation.mutate({
                                                            bookingId: booking.id,
                                                            rating: reviewRating,
                                                            comment: reviewComment,
                                                        });
                                                    }}
                                                    className="space-y-4"
                                                >
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700" htmlFor="rating">
                                                            Rating
                                                        </label>
                                                        <select
                                                            id="rating"
                                                            className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none"
                                                            value={reviewRating}
                                                            onChange={(event) => setReviewRating(Number(event.target.value))}
                                                        >
                                                            {[5, 4, 3, 2, 1].map((value) => (
                                                                <option key={value} value={value}>
                                                                    {value} star{value > 1 ? "s" : ""}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700" htmlFor="comment">
                                                            Comment
                                                        </label>
                                                        <textarea
                                                            id="comment"
                                                            rows={3}
                                                            className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none"
                                                            value={reviewComment}
                                                            onChange={(event) => setReviewComment(event.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex flex-wrap gap-3">
                                                        <Button type="submit" size="sm" disabled={reviewMutation.status === "pending"}>
                                                            {reviewMutation.status === "pending" ? "Submitting review..." : "Submit review"}
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => setReviewBookingId(null)}
                                                        >
                                                            Close
                                                        </Button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={() => setReviewBookingId(booking.id)}
                                                >
                                                    Leave review
                                                </Button>
                                            )}
                                        </div>
                                    ) : null}
                                </Card>
                            );
                        })}
                    </div>
                )}
            </Container>
        </main>
    );
}
