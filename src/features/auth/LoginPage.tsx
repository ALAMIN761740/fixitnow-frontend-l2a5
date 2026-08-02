"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/providers/auth-provider";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { loginUser } = useAuth();
    const [serverError, setServerError] = useState<string | null>(null);
    const redirectTo = searchParams.get("redirectTo") ?? "/";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (values: LoginFormValues) => {
        setServerError(null);
        try {
            await loginUser(values);
            router.replace(redirectTo);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Unable to sign in";
            setServerError(message);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F8FBFF] px-4 py-16">
            <Container className="max-w-md">
                <Card className="p-8">
                    <div className="mb-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2563EB]">
                            Welcome back
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold text-[#0F172A]">Sign in</h1>
                        <p className="mt-2 text-sm leading-6 text-[#475569]">
                            Continue to your FixItNow account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#475569]" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                className="w-full rounded-2xl border border-[#DBEAFE] bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-[#3B82F6]"
                                {...register("email")}
                            />
                            {errors.email ? <p className="mt-2 text-sm text-rose-600">{errors.email.message}</p> : null}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#475569]" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                className="w-full rounded-2xl border border-[#DBEAFE] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#3B82F6]"
                                {...register("password")}
                            />
                            {errors.password ? <p className="mt-2 text-sm text-rose-600">{errors.password.message}</p> : null}
                        </div>

                        {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-[#475569]">
                        New here?{" "}
                        <Link href="/auth/register" className="font-semibold text-[#0F172A]">
                            Create an account
                        </Link>
                    </p>
                </Card>
            </Container>
        </main>
    );
}
