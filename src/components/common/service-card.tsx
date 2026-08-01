import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ServiceItem, Technician } from "@/types/service";

interface ServiceCardProps {
    service: ServiceItem;
}

interface TechnicianCardProps {
    technician: Technician;
}

export function ServiceCard({ service }: ServiceCardProps) {
    return (
        <Card className="flex h-full flex-col justify-between gap-4 p-6">
            <div>
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
                    <Badge variant="secondary">{typeof service.category === "string" ? service.category : service.category?.name ?? "Service"}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.description ?? "Reliable service with modern support."}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">${service.price ?? 0}</p>
                <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    Explore <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </Card>
    );
}

export function TechnicianCard({ technician }: TechnicianCardProps) {
    return (
        <Card className="flex h-full flex-col justify-between p-6">
            <div>
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900">{technician.name}</h3>
                    <Badge variant="success">{technician.rating ? `${technician.rating.toFixed(1)} ★` : "Top rated"}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{technician.bio ?? "Experienced professional ready to help."}</p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-600">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>{technician.experience ?? 0} years experience</span>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">
                    {typeof technician.category === "string" ? technician.category : technician.category?.name ?? "General service"}
                </p>
                <Link href={`/technicians/${technician.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    View profile <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </Card>
    );
}
