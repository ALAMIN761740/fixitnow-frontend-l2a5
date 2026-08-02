import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_16px_32px_-18px_rgba(59,130,246,0.15)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_rgba(59,130,246,0.16)]",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
