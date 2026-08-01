"use client";

import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Section } from "@/components/ui/section";
import { BOOKING_STATUS } from "@/constants/app";
import { getTechnicianBookings } from "@/services/technician";
import { updateBookingStatus } from "@/services/bookings";
import { formatCurrency, formatDate } from "@/utils/format";

function getStatusVariant(status?: string) {
    switch (status) {
        case BOOKING_STATUS.ACCEPTED:
        case BOOKING_STATUS.IN_PROGRESS:
            return "secondary";
        case BOOKING_STATUS.COMPLETED:
            return "success";
        case BOOKING_STATUS.DECLINED:
        case BOOKING_STATUS.CANCELLED:
            return "danger";
        default:
            return "default";
    }
}

export default function TechnicianBookingsPage() {
    const queryClient = useQueryClient();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["technicianBookings"],
        queryFn: getTechnicianBookings,
    });

    const statusMutation = useMutation({
        mutationFn: ({ bookingId, status }: { bookingId: string; status: string }) =>
            updateBookingStatus(bookingId, status),
        onSuccess: () => {
            toast.success("Booking status updated.");
            queryClient.invalidateQueries({ queryKey: ["technicianBookings"] });
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Unable to update booking.";
            toast.error(message);
        },
    });

    const actionButtons = (bookingId: string, status?: string) => {
        const isMutating = statusMutation.isMutating && statusMutation.variables?.bookingId === bookingId;

        if (status === BOOKING_STATUS.REQUESTED) {
            return (
                <div className="flex flex-wrap gap-3">
                    <Button size="sm" onClick={() => statusMutation.mutate({ bookingId, status: BOOKING_STATUS.ACCEPTED })} disabled={isMutating}>
                        Accept
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => statusMutation.mutate({ bookingId, status: BOOKING_STATUS.DECLINED })} disabled={isMutating}>
                        Decline
                    </Button>
                </div>
            );
        }

        if (status === BOOKING_STATUS.ACCEPTED) {
            return (
                <Button size="sm" onClick={() => statusMutation.mutate({ bookingId, status: BOOKING_STATUS.IN_PROGRESS })} disabled={isMutating}>
                    Start job
                </Button>
            );
        }

        if (status === BOOKING_STATUS.IN_PROGRESS) {
            return (
                <Button size="sm" onClick={() => statusMutation.mutate({ bookingId, status: BOOKING_STATUS.COMPLETED })} disabled={isMutating}>
                    Complete job
                </Button>
            );
        }

        return null;
    };

    const bookingsSummary = useMemo(() => {
        return bookings.reduce(
            (summary, booking) => {
                const status = booking.status ?? "UNKNOWN";
                summary[status] = (summary[status] ?? 0) + 1;
                return summary;
            },
            {} as Record<string, number>,
        );
    }, [bookings]);

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-16">
            <Container className="space-y-6">
                <Section
                    eyebrow="Technician dashboard"
                    title="Manage your bookings"
                    description="View booking requests, update job status, and keep customers informed as work progresses."
                />

                <div className="grid gap-4 sm:grid-cols-3">
                    {Object.entries(bookingsSummary).map(([status, count]) => (
                        <Card key={status} className="rounded-3xl p-6 text-center">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">{status.replaceAll("_", " ")}</p>
                            <p className="mt-4 text-3xl font-semibold text-slate-900">{count}</p>
                        </Card>
                    ))}
                </div>

                {isLoading ? (
                    <div className="grid gap-6 lg:grid-cols-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <LoadingSkeleton key={index} className="h-48" />
                        ))}
                    </div>
                ) : bookings.length === 0 ? (
                    <EmptyState
                        title="No bookings yet"
                        description="New customer requests will appear here so you can accept, start, and complete jobs."
                    />
                ) : (
                    <div className="grid gap-6 lg:grid-cols-2">
                        {bookings.map((booking) => (
                            <Card key={booking.id} className="space-y-4">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700">{booking.service?.title ?? "Booking request"}</p>
                                        <p className="mt-1 text-sm leading-6 text-slate-600">Customer: {booking.technician?.name ?? "N/A"}</p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge variant={getStatusVariant(booking.status)}>{booking.status ?? "UNKNOWN"}</Badge>
                                        <Badge variant={booking.payment?.status === "COMPLETED" ? "success" : booking.payment?.status === "PENDING" ? "secondary" : "default"}>
                                            {booking.payment?.status ?? "No payment"}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                                    <div>
                                        <p className="font-semibold text-slate-900">Scheduled</p>
                                        <p>{booking.scheduledAt ? formatDate(booking.scheduledAt) : "Not scheduled"}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">Amount</p>
                                        <p>{formatCurrency(booking.totalAmount ?? 0)}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    {actionButtons(booking.id, booking.status)}
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Booking ID: {booking.id}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </Container>
        </main>
    );
}
