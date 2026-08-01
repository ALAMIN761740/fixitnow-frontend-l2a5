import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
    eyebrow?: string;
    title?: string;
    description?: string;
    align?: "left" | "center";
}

export function Section({
    children,
    eyebrow,
    title,
    description,
    align = "left",
    className,
    ...props
}: SectionProps) {
    return (
        <section className={cn("py-16 sm:py-20 lg:py-24", className)} {...props}>
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
                {(eyebrow || title || description) && (
                    <div
                        className={cn(
                            "max-w-2xl",
                            align === "center" && "mx-auto text-center",
                        )}
                    >
                        {eyebrow ? (
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                                {eyebrow}
                            </p>
                        ) : null}
                        {title ? (
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                {title}
                            </h2>
                        ) : null}
                        {description ? (
                            <p className="mt-4 text-lg leading-8 text-slate-600">
                                {description}
                            </p>
                        ) : null}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
}
