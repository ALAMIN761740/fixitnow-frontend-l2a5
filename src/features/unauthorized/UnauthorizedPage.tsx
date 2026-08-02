export default function UnauthorizedPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
            <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Access denied</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900">You are not allowed here</h1>
                <p className="mt-4 text-slate-600">
                    This area requires a different role than the one currently assigned to your account.
                </p>
            </div>
        </main>
    );
}
