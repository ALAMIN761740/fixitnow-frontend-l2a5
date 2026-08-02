import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
    className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-[24px] border border-[#DBEAFE] bg-[#E2E8F0] shadow-sm shadow-sky-200/40",
                className,
            )}
        />
    );
}
