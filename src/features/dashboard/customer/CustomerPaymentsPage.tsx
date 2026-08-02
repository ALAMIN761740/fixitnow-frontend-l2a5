"use client";

import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Section } from "@/components/sections/section";
import { getPayments } from "@/services/payment";
import { formatCurrency, formatDate } from "@/utils/format";
import type { PaymentRecord } from "@/types/payment";

export default function CustomerPaymentsPage() {
    const { data: payments = [], isLoading, isError } = useQuery({
        queryKey: ["payments"],
        queryFn: getPayments,
    });

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-16">
            <Container className="space-y-6">
                <Section
                    eyebrow="Customer dashboard"
                    title="Payment history"
                    description="Track your completed and pending payments for FixItNow bookings."
                />

                {isLoading ? (
                    <div className="grid gap-6 lg:grid-cols-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <LoadingSkeleton key={index} className="h-44" />
                        ))}
                    </div>
                ) : isError ? (
                    <EmptyState
                        title="Unable to load payments"
                        description="There was an issue fetching your payment history. Please refresh the page."
                    />
                ) : payments.length === 0 ? (
                    <EmptyState
                        title="No payments found"
                        description="Payments will appear here after you complete a booking checkout."
                    />
                ) : (
                    <div className="grid gap-6 lg:grid-cols-2">
                        {payments.map((payment: PaymentRecord) => (
                            <Card key={payment.id} className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-semibold text-slate-700">Payment ID: {payment.id}</p>
                                    <p className="text-sm text-slate-600">Booking ID: {payment.booking?.id ?? payment.bookingId}</p>
                                </div>

                                <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                                    <div>
                                        <p className="font-semibold text-slate-900">Amount</p>
                                        <p>{formatCurrency(payment.amount ?? 0)}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">Status</p>
                                        <p>{payment.status ?? "Unknown"}</p>
                                    </div>
                                </div>

                                <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                                    <div>
                                        <p className="font-semibold text-slate-900">Created</p>
                                        <p>{payment.createdAt ? formatDate(payment.createdAt) : "—"}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">Paid at</p>
                                        <p>{payment.paidAt ? formatDate(payment.paidAt) : "Not paid yet"}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </Container>
        </main>
    );
}
