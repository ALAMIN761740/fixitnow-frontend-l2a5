"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/sections/section";
import { FiltersBar } from "@/components/common/filters-bar";
import { ServiceCard } from "@/components/common/service-card";
import { getCategories, getServices } from "@/services/public";

export default function ServicesPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const { data: services = [], isLoading: loadingServices } = useQuery({
        queryKey: ["services"],
        queryFn: getServices,
    });

    const { data: categories = [], isLoading: loadingCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const filteredServices = useMemo(() => {
        return services.filter((service) => {
            const serviceTitle = service.title ?? service.name ?? "";
            const matchesSearch = `${serviceTitle} ${service.description ?? ""}`
                .toLowerCase()
                .includes(search.toLowerCase());
            const serviceCategoryName = typeof service.category === "string" ? service.category : service.category?.name ?? "";
            const matchesCategory = category ? serviceCategoryName.toLowerCase() === category.toLowerCase() : true;
            return matchesSearch && matchesCategory;
        });
    }, [category, search, services]);

    return (
        <main className="min-h-screen bg-slate-50">
            <Section eyebrow="Service catalog" title="Browse available services" description="Search and filter services from the FixItNow platform.">
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

                    {(loadingServices || loadingCategories) && (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <LoadingSkeleton key={index} className="h-48" />
                            ))}
                        </div>
                    )}

                    {!loadingServices && !loadingCategories && filteredServices.length === 0 && (
                        <EmptyState
                            title="No services found"
                            description="Try adjusting your search terms or filters to discover more services."
                        />
                    )}

                    {!loadingServices && !loadingCategories && filteredServices.length > 0 && (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {filteredServices.map((service) => (
                                <ServiceCard key={service.id} service={service} />
                            ))}
                        </div>
                    )}
                </Container>
            </Section>
        </main>
    );
}
