"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Section } from "@/components/ui/section";
import { getTechnicianById } from "@/services/public";

export default function TechnicianDetailsPage() {
    const params = useParams<{ id: string }>();
    const technicianId = params?.id;

    const { data: technician, isLoading, isError } = useQuery({
        queryKey: ["technician", technicianId],
        queryFn: () => getTechnicianById(technicianId ?? ""),
        enabled: Boolean(technicianId),
    });

    if (isLoading) {
        return (
            <main className="min-h-screen bg-slate-50 px-6 py-16">
                <Container className="space-y-6">
                    <LoadingSkeleton className="h-24" />
                    <LoadingSkeleton className="h-64" />
                </Container>
            </main>
        );
    }

    if (isError || !technician) {
        return (
            <main className="min-h-screen bg-slate-50 px-6 py-16">
                <Container>
                    <EmptyState
                        title="Technician not available"
                        description="The requested technician profile could not be loaded right now."
                        action={<Button asChild><Link href="/technicians">Back to technicians</Link></Button>}
                    />
                </Container>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <Section eyebrow="Technician profile" title={technician.name} description={technician.bio ?? "Experienced technician ready to assist with your next service."}>
                <Container className="space-y-6">
                    <Link href="/technicians" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <ArrowLeft className="h-4 w-4" /> Back to technicians
                    </Link>

                    <Card className="grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <div>
                            <Badge variant="secondary">{typeof technician.category === "string" ? technician.category : technician.category?.name ?? "Professional"}</Badge>
                            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                <span>{technician.rating ? `${technician.rating.toFixed(1)} average rating` : "Highly rated"}</span>
                            </div>
                            <p className="mt-6 text-base leading-8 text-slate-600">
                                {technician.bio ?? "This technician has built a strong reputation for reliable, high-quality service."}
                            </p>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm text-slate-500">Experience</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">{technician.experience ?? 0} years</p>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm text-slate-500">Contact</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">{technician.email ?? "Available on request"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="text-xl font-semibold text-slate-900">Services offered</h3>
                            <div className="mt-4 space-y-3">
                                {technician.services?.length ? technician.services.map((service) => (
                                    <div key={service.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                                        <p className="font-medium text-slate-900">{service.name}</p>
                                        <p className="mt-1 text-sm text-slate-600">{service.description ?? "Professional service support"}</p>
                                    </div>
                                )) : (
                                    <p className="text-sm text-slate-600">No services listed yet.</p>
                                )}
                            </div>
                        </div>
                    </Card>
                </Container>
            </Section>
        </main>
    );
}
