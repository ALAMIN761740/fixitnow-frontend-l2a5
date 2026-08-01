import type { ReactNode } from "react";
import { Button } from "./button";

interface EmptyStateProps {
    title: string;
    description?: string;
    action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-8 py-16 text-center shadow-sm shadow-slate-200/50">
            <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
            {description ? (
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">{description}</p>
            ) : null}
            {action ? <div className="mt-6">{action}</div> : null}
        </div>
    );
}
