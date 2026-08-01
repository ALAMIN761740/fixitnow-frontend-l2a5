"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Section } from "@/components/ui/section";
import { getAdminUsers, updateUserStatus } from "@/services/admin";
import type { AuthUser } from "@/types/auth";

export default function AdminUsersPage() {
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["adminUsers"],
        queryFn: getAdminUsers,
    });

    const statusMutation = useMutation({
        mutationFn: ({ userId, status }: { userId: string; status: "ACTIVE" | "BANNED" }) =>
            updateUserStatus(userId, status),
        onSuccess: () => {
            toast.success("User status updated.");
            queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Unable to update user status.";
            toast.error(message);
        },
    });

    const getStatusVariant = (status?: string) => {
        switch (status) {
            case "BANNED":
                return "danger";
            case "ACTIVE":
                return "success";
            default:
                return "secondary";
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-16">
            <Container className="space-y-6">
                <Section
                    eyebrow="Admin dashboard"
                    title="User management"
                    description="Ban or unban accounts to keep the community safe and compliant."
                />

                {isLoading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <LoadingSkeleton key={index} className="h-28 rounded-3xl" />
                        ))}
                    </div>
                ) : users.length === 0 ? (
                    <EmptyState title="No users found" description="There are no registered users to manage yet." />
                ) : (
                    <div className="grid gap-4">
                        {users.map((user) => {
                            const status = user.status ?? "ACTIVE";
                            const isAdmin = user.role === "ADMIN";
                            const action = isAdmin ? null : status === "BANNED" ? "ACTIVE" : "BANNED";
                            const isMutating = statusMutation.isMutating && statusMutation.variables?.userId === user.id;

                            return (
                                <Card key={user.id} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-lg font-semibold text-slate-900">{user.name ?? user.email}</p>
                                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                                            <Badge variant={getStatusVariant(status)}>{status}</Badge>
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                    {action ? (
                                        <Button
                                            size="sm"
                                            variant={action === "BANNED" ? "danger" : "secondary"}
                                            onClick={() => statusMutation.mutate({ userId: user.id, status: action })}
                                            disabled={isMutating}
                                        >
                                            {isMutating ? "Updating..." : action === "BANNED" ? "Ban user" : "Unban user"}
                                        </Button>
                                    ) : (
                                        <Badge variant="success">Protected</Badge>
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                )}
            </Container>
        </main>
    );
}
