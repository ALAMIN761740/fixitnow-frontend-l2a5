import Link from "next/link";
import { Container } from "@/components/ui/container";
import { APP_NAME } from "@/constants/app";

const footerLinks = [
    { label: "Services", href: "/services" },
    { label: "Technicians", href: "/technicians" },
    { label: "Login", href: "/auth/login" },
];

export function Footer() {
    return (
        <footer className="border-t border-slate-200/70 bg-slate-950 text-slate-200">
            <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-lg font-semibold text-white">{APP_NAME}</p>
                    <p className="mt-2 max-w-xl text-sm text-slate-400">
                        Reliable booking, trusted technicians, and modern service management.
                    </p>
                </div>
                <nav className="flex flex-wrap gap-4 text-sm text-slate-400">
                    {footerLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="transition hover:text-white">
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </Container>
        </footer>
    );
}
