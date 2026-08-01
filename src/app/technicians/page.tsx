"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FiltersBar } from "@/components/common/filters-bar";
import { TechnicianCard } from "@/components/common/service-card";
import { getCategories, getTechnicians } from "@/services/public";

export default function TechniciansPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const { data: technicians = [], isLoading: loadingTechnicians } = useQuery({
        queryKey: ["technicians"],
        queryFn: getTechnicians,
    });

    const { data: categories = [], isLoading: loadingCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const filteredTechnicians = useMemo(() => {
        return technicians.filter((technician) => {
            const matchesSearch = `${technician.name} ${technician.bio ?? ""}`
                .toLowerCase()
                .includes(search.toLowerCase());
            const technicianCategoryName = typeof technician.category === "string" ? technician.category : technician.category?.name ?? "";
            const matchesCategory = category ? technicianCategoryName.toLowerCase() === category.toLowerCase() : true;
            return matchesSearch && matchesCategory;
        });
    }, [category, search, technicians]);

    return (
        <main className="min-h-screen bg-slate-50">
            <Section eyebrow="Technician directory" title="Meet trusted professionals" description="Explore technicians and their specialties from the FixItNow network.">
                <Container className="space-y-8">
                    <FiltersBar
                        search={search}
                        category={category}
                        categories={categories}
                        onSearchChange={setSearch}
                        onCategoryChange={setCategory}
                        onReset={() => {
                            setSearch("");
                            setCategory("");
                        }}
                    />

                    {(loadingTechnicians || loadingCategories) && (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <LoadingSkeleton key={index} className="h-56" />
                            ))}
                        </div>
                    )}

                    {!loadingTechnicians && !loadingCategories && filteredTechnicians.length === 0 && (
                        <EmptyState
                            title="No technicians found"
                            description="Try another keyword or category to discover more specialists."
                        />
                    )}

                    {!loadingTechnicians && !loadingCategories && filteredTechnicians.length > 0 && (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {filteredTechnicians.map((technician) => (
                                <TechnicianCard key={technician.id} technician={technician} />
                            ))}
                        </div>
                    )}
                </Container>
            </Section>
        </main>
    );
}
