import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?: "default" | "secondary" | "success" | "danger" | "warning" | "info" | "purple" | "neutral";
}

export function Badge({ children, variant = "default", className, ...props }: BadgeProps) {
    const variants = {
        default: "bg-[#EFF6FF] text-[#0F172A]",
        secondary: "bg-[#DBEAFE] text-[#1D4ED8]",
        success: "bg-[#DCFCE7] text-[#047857]",
        danger: "bg-[#FEE2E2] text-[#B91C1C]",
        warning: "bg-[#FEF3C7] text-[#92400E]",
        info: "bg-[#E0F2FE] text-[#0369A1]",
        purple: "bg-[#E9D5FF] text-[#7C3AED]",
        neutral: "bg-[#E2E8F0] text-[#475569]",
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
