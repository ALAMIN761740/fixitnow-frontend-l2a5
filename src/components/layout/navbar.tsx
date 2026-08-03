"use client";

import Link from "next/link";
import { useState } from "react";
import {
    Menu,
    UserCircle,
    User,
    LayoutDashboard,
    LogOut,
} from "lucide-react";

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

    const [openProfile, setOpenProfile] = useState(false);


    return (
        <header className="sticky top-0 z-50 border-b border-[#DBEAFE] bg-white/90 backdrop-blur-xl">

            <Container className="flex items-center justify-between py-4">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#3B82F6] text-white font-semibold">
                        FN
                    </div>

                    <div>
                        <p className="font-semibold text-[#0F172A]">
                            {APP_NAME}
                        </p>

                        <p className="text-sm text-[#64748B]">
                            Service platform
                        </p>
                    </div>

                </Link>



                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-6">

                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-[#475569] hover:text-[#2563EB]"
                        >
                            {link.label}
                        </Link>
                    ))}

                </nav>



                {/* Right Side */}
                <div className="flex items-center gap-3">


                    {
                        isAuthenticated && user ? (

                            <div className="relative">


                                <button
                                    onClick={() => setOpenProfile(!openProfile)}
                                    className="flex items-center justify-center rounded-full hover:bg-blue-50 p-1"
                                >

                                    <UserCircle
                                        className="h-10 w-10 text-[#2563EB]"
                                    />

                                </button>



                                {
                                    openProfile && (

                                        <div className="absolute right-0 mt-3 w-64 rounded-2xl border bg-white p-4 shadow-xl">


                                            <div className="border-b pb-3 mb-3">

                                                <p className="font-semibold text-[#0F172A]">
                                                    {user.name}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {user.email}
                                                </p>


                                                <p className="text-xs text-blue-600 mt-1">
                                                    {user.role}
                                                </p>


                                            </div>



                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-blue-50"
                                            >
                                                <User size={18} />
                                                Profile
                                            </Link>



                                            <Link
                                                href="/dashboard"
                                                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-blue-50"
                                            >
                                                <LayoutDashboard size={18} />
                                                Dashboard
                                            </Link>



                                            <button
                                                onClick={logout}
                                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
                                            >

                                                <LogOut size={18} />
                                                Logout

                                            </button>


                                        </div>

                                    )
                                }


                            </div>


                        ) : (

                            <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    asChild
                                >
                                    <Link href="/auth/login">
                                        Sign in
                                    </Link>
                                </Button>


                                <Button
                                    size="sm"
                                    asChild
                                >
                                    <Link href="/auth/register">
                                        Get started
                                    </Link>
                                </Button>

                            </>

                        )
                    }



                    <button
                        className="md:hidden rounded-full p-2 hover:bg-blue-50"
                    >
                        <Menu size={22} />
                    </button>


                </div>


            </Container>

        </header>
    );
}