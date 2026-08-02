import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-transparent px-6 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">Page not found</h2>
            <p className="max-w-md text-sm text-slate-600">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link
                href="/"
                className="rounded-2xl bg-[#2563EB] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1D4ED8]"
            >
                Back to home
            </Link>
        </div>
    );
}
