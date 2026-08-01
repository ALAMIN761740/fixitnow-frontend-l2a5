"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-transparent px-6 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">Something went wrong</h2>
            <p className="max-w-md text-sm text-slate-600">
                An unexpected error occurred while loading this page. Please try again.
            </p>
            <button
                type="button"
                onClick={() => reset()}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
                Try again
            </button>
        </div>
    );
}
