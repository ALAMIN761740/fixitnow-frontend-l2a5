import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export default function PaymentCancelPage() {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-16">
            <Container className="max-w-3xl">
                <Card className="space-y-6 p-8 text-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-700">Payment canceled</p>
                        <h1 className="mt-4 text-3xl font-semibold text-slate-900">Your payment was canceled.</h1>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            The payment flow was canceled. You can return to your booking and try again when you are ready.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/dashboard/customer/bookings">Back to bookings</Link>
                    </Button>
                </Card>
            </Container>
        </main>
    );
}
