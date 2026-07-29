import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
    className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-2xl border border-slate-200 bg-slate-100",
                className,
            )}
        />
    );
}
