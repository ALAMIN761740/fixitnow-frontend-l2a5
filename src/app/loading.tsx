export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F8FBFF]">
            <div className="flex flex-col items-center gap-3 text-sm font-medium text-[#475569]">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#DBEAFE] border-t-[#2563EB]" />
                <p>Loading...</p>
            </div>
        </div>
    );
}
