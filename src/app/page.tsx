"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { ServiceCard, TechnicianCard } from "@/components/common/service-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Section } from "@/components/ui/section";
import { APP_NAME } from "@/constants/app";
import { getServices, getTechnicians } from "@/services/public";

export default function Home() {
  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  const { data: technicians = [], isLoading: techniciansLoading } = useQuery({
    queryKey: ["technicians"],
    queryFn: getTechnicians,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Section className="pt-20 sm:pt-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="max-w-2xl">
                <Badge variant="secondary">Live public platform</Badge>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  Discover trusted services with {APP_NAME}.
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Browse services, compare technicians, and find the right expert for every job.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="/services">Explore services</Link>
                  </Button>
                  <Button variant="outline" asChild size="lg">
                    <Link href="/technicians">View technicians</Link>
                  </Button>
                </div>
              </div>

              <Card className="p-8">
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Fast browsing</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Search, filter, and explore the full service and technician directory.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Responsive layout</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Cards and sections adapt beautifully across devices.</p>
                  </div>
                </div>
              </Card>
            </div>
          </Container>
        </Section>

        <Section eyebrow="Popular services" title="Featured services" description="A quick snapshot of the latest services available through the platform.">
          <Container>
            {servicesLoading ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <LoadingSkeleton key={index} className="h-48" />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {services.slice(0, 3).map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </Container>
        </Section>

        <Section eyebrow="Trusted experts" title="Top technicians" description="Meet experienced professionals ready to help with your next booking.">
          <Container>
            {techniciansLoading ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <LoadingSkeleton key={index} className="h-56" />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {technicians.slice(0, 3).map((technician) => (
                  <TechnicianCard key={technician.id} technician={technician} />
                ))}
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
