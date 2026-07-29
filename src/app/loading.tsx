export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-3 text-sm font-medium text-slate-600">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700" />
                <p>Loading...</p>
            </div>
        </div>
    );
}
