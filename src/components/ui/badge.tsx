import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?: "default" | "secondary" | "success" | "danger";
}

export function Badge({ children, variant = "default", className, ...props }: BadgeProps) {
    const variants = {
        default: "bg-slate-100 text-slate-700",
        secondary: "bg-sky-50 text-sky-700",
        success: "bg-emerald-50 text-emerald-700",
        danger: "bg-rose-50 text-rose-700",
    } as const;

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
                variants[variant],
                className,
            )}
            {...props}
        >
            {children}
        </span>
    );
}
