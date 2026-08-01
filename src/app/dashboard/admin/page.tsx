"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Section } from "@/components/ui/section";
import { getAdminBookings, getAdminUsers } from "@/services/admin";
import { getCategories } from "@/services/public";

export default function AdminDashboardPage() {
    const {
        data: users = [],
        isLoading: usersLoading,
    } = useQuery({ queryKey: ["adminUsers"], queryFn: getAdminUsers });

    const {
        data: bookings = [],
        isLoading: bookingsLoading,
    } = useQuery({ queryKey: ["adminBookings"], queryFn: getAdminBookings });

    const {
        data: categories = [],
        isLoading: categoriesLoading,
    } = useQuery({ queryKey: ["categories"], queryFn: getCategories });

    const isLoadingAny = usersLoading || bookingsLoading || categoriesLoading;

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-16">
            <Container className="space-y-6">
                <Section
                    eyebrow="Admin dashboard"
                    title="Overview and management"
                    description="Monitor platform activity and manage categories, users, and bookings from one place."
                />

                {isLoadingAny ? (
                    <div className="grid gap-6 sm:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <LoadingSkeleton key={index} className="h-40 rounded-3xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-3">
                        <Card className="rounded-3xl p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Users</p>
                            <p className="mt-4 text-3xl font-semibold text-slate-900">{users.length}</p>
                        </Card>
                        <Card className="rounded-3xl p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Bookings</p>
                            <p className="mt-4 text-3xl font-semibold text-slate-900">{bookings.length}</p>
                        </Card>
                        <Card className="rounded-3xl p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Categories</p>
                            <p className="mt-4 text-3xl font-semibold text-slate-900">{categories.length}</p>
                        </Card>
                    </div>
                )}

                <div className="grid gap-4 lg:grid-cols-3">
                    <Link href="/dashboard/admin/users" className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300">
                        <p className="text-sm font-semibold text-slate-500">User management</p>
                        <p className="mt-4 text-xl font-semibold text-slate-900">Ban, unban, and review account status.</p>
                    </Link>
                    <Link href="/dashboard/admin/categories" className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300">
                        <p className="text-sm font-semibold text-slate-500">Category management</p>
                        <p className="mt-4 text-xl font-semibold text-slate-900">Create and manage service categories for the platform.</p>
                    </Link>
                    <Link href="/dashboard/admin" className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300">
                        <p className="text-sm font-semibold text-slate-500">Platform insights</p>
                        <p className="mt-4 text-xl font-semibold text-slate-900">View the latest counts and management options in one place.</p>
                    </Link>
                </div>
            </Container>
        </main>
    );
}
