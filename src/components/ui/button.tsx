import { Children, cloneElement, isValidElement, type ButtonHTMLAttributes, type ReactElement } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "secondary" | "outline" | "ghost" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    asChild?: boolean;
}

export function Button({
    className,
    variant = "default",
    size = "md",
    asChild = false,
    children,
    ...props
}: ButtonProps) {
    const variants = {
        default:
            "bg-[#3B82F6] text-white shadow-sm shadow-sky-500/20 hover:bg-[#2563EB] focus-visible:ring-[#3B82F6]",
        secondary:
            "bg-white text-[#0F172A] border border-[#E2E8F0] shadow-sm shadow-slate-200/50 hover:bg-[#F1F5F9] focus-visible:ring-[#3B82F6]",
        outline:
            "border border-[#3B82F6] bg-white text-[#3B82F6] shadow-sm shadow-sky-500/10 hover:bg-[#EFF6FF] focus-visible:ring-[#3B82F6]",
        ghost: "bg-transparent text-[#0F172A] hover:bg-[#F1F5F9] focus-visible:ring-[#3B82F6]",
        success: "bg-[#10B981] text-white shadow-sm shadow-emerald-500/20 hover:bg-[#059669] focus-visible:ring-[#10B981]",
        warning: "bg-[#F59E0B] text-white shadow-sm shadow-amber-500/20 hover:bg-[#D97706] focus-visible:ring-[#F59E0B]",
        danger: "bg-[#EF4444] text-white shadow-sm shadow-rose-500/20 hover:bg-[#DC2626] focus-visible:ring-[#EF4444]",
    } as const;

    const sizes = {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-sm",
        lg: "h-12 px-5 text-base",
    } as const;

    const baseClassName = cn(
        "inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
    );

    if (asChild && isValidElement(children)) {
        const child = children as ReactElement<{ className?: string }>;
        return cloneElement(child, {
            className: cn(baseClassName, child.props.className),
        });
    }

    return (
        <button className={baseClassName} {...props}>
            {children}
        </button>
    );
}
