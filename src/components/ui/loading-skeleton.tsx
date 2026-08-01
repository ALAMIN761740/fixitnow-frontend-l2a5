import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
    className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-3xl border border-slate-200/70 bg-slate-100 shadow-sm shadow-slate-200/50",
                className,
            )}
        />
    );
}
