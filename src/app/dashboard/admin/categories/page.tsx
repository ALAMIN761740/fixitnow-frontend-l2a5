"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Section } from "@/components/ui/section";
import { createCategory } from "@/services/admin";
import { getCategories } from "@/services/public";
import type { Category } from "@/types/service";

const categorySchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().max(250).optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function AdminCategoriesPage() {
    const queryClient = useQueryClient();

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const createCategoryMutation = useMutation({
        mutationFn: (payload: CategoryFormValues) => createCategory(payload),
        onSuccess: () => {
            toast.success("Category created successfully.");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            reset();
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Unable to create category.";
            toast.error(message);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = (values: CategoryFormValues) => {
        createCategoryMutation.mutate(values);
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-16">
            <Container className="space-y-6">
                <Section
                    eyebrow="Admin dashboard"
                    title="Category management"
                    description="Add and manage categories used by service and technician listings."
                />

                <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
                    <Card className="space-y-6 p-6">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">Create new category</h2>
                            <p className="mt-2 text-sm text-slate-600">Add a category to organize services across the platform.</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none"
                                    {...register("name")}
                                />
                                {errors.name ? <p className="mt-2 text-sm text-red-600">{errors.name.message}</p> : null}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none"
                                    {...register("description")}
                                />
                                {errors.description ? <p className="mt-2 text-sm text-red-600">{errors.description.message}</p> : null}
                            </div>

                            <Button type="submit" disabled={isSubmitting || createCategoryMutation.status === "pending"}>
                                {isSubmitting || createCategoryMutation.status === "pending" ? "Creating category..." : "Create category"}
                            </Button>
                        </form>
                    </Card>

                    <Card className="space-y-6 p-6">
                        <h2 className="text-xl font-semibold text-slate-900">Existing categories</h2>

                        {isLoading ? (
                            <div className="space-y-3">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <LoadingSkeleton key={index} className="h-14 rounded-3xl" />
                                ))}
                            </div>
                        ) : categories.length === 0 ? (
                            <EmptyState
                                title="No categories yet"
                                description="Create the first category to organize services on the platform."
                            />
                        ) : (
                            <div className="space-y-3">
                                {categories.map((category: Category) => (
                                    <div key={category.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                        <p className="font-semibold text-slate-900">{category.name}</p>
                                        <p className="mt-1 text-sm text-slate-600">{category.description ?? "No description provided."}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            </Container>
        </main>
    );
}
