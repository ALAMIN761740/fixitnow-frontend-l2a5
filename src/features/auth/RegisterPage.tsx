"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/providers/auth-provider";

const registerSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Please confirm your password"),
        role: z.enum(["CUSTOMER", "TECHNICIAN"]).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const { registerUser } = useAuth();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: "CUSTOMER",
        },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        setServerError(null);
        try {
            await registerUser({
                name: values.name,
                email: values.email,
                password: values.password,
                role: values.role ?? "CUSTOMER",
            });
            router.replace("/");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Unable to create account";
            setServerError(message);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F8FBFF] px-4 py-16">
            <Container className="max-w-md">
                <Card className="p-8">
                    <div className="mb-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2563EB]">
                            Create account
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold text-[#0F172A]">Sign up</h1>
                        <p className="mt-2 text-sm leading-6 text-[#475569]">
                            Join FixItNow as a customer or technician.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#475569]" htmlFor="name">
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="w-full rounded-2xl border border-[#DBEAFE] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#3B82F6]"
                                {...register("name")}
                            />
                            {errors.name ? <p className="mt-2 text-sm text-rose-600">{errors.name.message}</p> : null}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#475569]" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full rounded-2xl border border-[#DBEAFE] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#3B82F6]"
                                {...register("email")}
                            />
                            {errors.email ? <p className="mt-2 text-sm text-rose-600">{errors.email.message}</p> : null}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#475569]" htmlFor="role">
                                Role
                            </label>
                            <select
                                id="role"
                                className="w-full rounded-2xl border border-[#DBEAFE] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#3B82F6]"
                                {...register("role")}
                            >
                                <option value="CUSTOMER">Customer</option>
                                <option value="TECHNICIAN">Technician</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#475569]" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full rounded-2xl border border-[#DBEAFE] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#3B82F6]"
                                {...register("password")}
                            />
                            {errors.password ? <p className="mt-2 text-sm text-rose-600">{errors.password.message}</p> : null}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#475569]" htmlFor="confirmPassword">
                                Confirm password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                className="w-full rounded-2xl border border-[#DBEAFE] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#3B82F6]"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword ? <p className="mt-2 text-sm text-rose-600">{errors.confirmPassword.message}</p> : null}
                        </div>

                        {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Creating account..." : "Create account"}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-[#475569]">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="font-semibold text-[#0F172A]">
                            Sign in
                        </Link>
                    </p>
                </Card>
            </Container>
        </main>
    );
}
