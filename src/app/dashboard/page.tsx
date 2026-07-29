export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-slate-50 px-6 py-16">
            <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Protected area
                </p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900">Dashboard access confirmed</h1>
                <p className="mt-4 text-slate-600">
                    This placeholder page confirms that protected routes are now guarded by authentication.
                </p>
            </div>
        </main>
    );
}
