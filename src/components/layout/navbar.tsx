"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { APP_NAME } from "@/constants/app";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/providers/auth-provider";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Technicians", href: "/technicians" },
];

export function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <header className="sticky top-0 z-40 border-b border-[#DBEAFE] bg-white/95 backdrop-blur-xl shadow-sm shadow-sky-200/50">
            <Container className="flex items-center justify-between py-4">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#3B82F6] text-base font-semibold text-white shadow-sm shadow-sky-500/20">
                        FN
                    </div>
                    <div>
                        <p className="text-base font-semibold text-[#0F172A]">{APP_NAME}</p>
                        <p className="text-sm text-[#475569]">Service platform</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-[#475569] transition hover:text-[#0F172A]"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <span className="hidden text-sm font-medium text-[#475569] sm:inline-flex">
                                {user?.email}
                            </span>
                            <Button variant="outline" size="sm" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                                <Link href="/auth/login">Sign in</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href="/auth/register">Get started</Link>
                            </Button>
                        </>
                    )}
                    <button className="rounded-full p-2 text-[#475569] transition hover:bg-[#EFF6FF] md:hidden" aria-label="Open menu">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </Container>
        </header>
    );
}
