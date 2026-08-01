"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Category } from "@/types/service";

interface FiltersBarProps {
    search: string;
    category: string;
    categories: Category[];
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onReset: () => void;
}

export function FiltersBar({
    search,
    category,
    categories,
    onSearchChange,
    onCategoryChange,
    onReset,
}: FiltersBarProps) {
    return (
        <Card className="p-4 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex-1">
                    <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="search">
                        Search
                    </label>
                    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                        <Search className="h-4 w-4 text-slate-400" />
                        <input
                            id="search"
                            value={search}
                            onChange={(event) => onSearchChange(event.target.value)}
                            placeholder="Search services or technicians"
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </div>

                <div className="min-w-[220px]">
                    <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="category">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(event) => onCategoryChange(event.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                    >
                        <option value="">All categories</option>
                        {categories.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <Button variant="outline" onClick={onReset}>
                    Reset
                </Button>
            </div>
        </Card>
    );
}
