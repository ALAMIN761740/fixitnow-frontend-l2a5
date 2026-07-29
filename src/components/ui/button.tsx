import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export function Button({
    className,
    variant = "default",
    size = "md",
    ...props
}: ButtonProps) {
    const variants = {
        default:
            "bg-slate-900 text-white shadow-sm hover:bg-slate-700 focus-visible:ring-slate-500",
        secondary:
            "bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400",
        outline:
            "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400",
        ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400",
    } as const;

    const sizes = {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-sm",
        lg: "h-12 px-5 text-base",
    } as const;

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
                variants[variant],
                sizes[size],
                className,
            )}
            {...props}
        />
    );
}
