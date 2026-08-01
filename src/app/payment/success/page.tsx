"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { confirmPaymentSession } from "@/services/payment";

export default function PaymentSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const transactionId = searchParams.get("session_id") ?? searchParams.get("transactionId") ?? "";

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: () => confirmPaymentSession(transactionId),
        onSuccess: () => {
            toast.success("Payment completed successfully.");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["payments"] });
        },
        onError: () => {
            toast.error("Unable to confirm payment. Please contact support.");
        },
    });

    useEffect(() => {
        if (!transactionId) {
            return;
        }

        mutate();
    }, [transactionId, mutate]);

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-16">
            <Container className="max-w-3xl">
                <Card className="space-y-6 p-8 text-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Payment success</p>
                        <h1 className="mt-4 text-3xl font-semibold text-slate-900">Thank you for your payment.</h1>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Your booking payment has been processed. You can return to your bookings to review the status.
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-slate-600">Confirming payment...</p>
                    ) : null}

                    {isError ? (
                        <p className="text-sm text-rose-600">An error occurred while confirming your payment.</p>
                    ) : null}

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button onClick={() => router.push("/dashboard/customer/bookings")}>View bookings</Button>
                        <Button variant="outline" onClick={() => router.push("/dashboard/customer/payments")}>View payments</Button>
                    </div>
                </Card>
            </Container>
        </main>
    );
}
