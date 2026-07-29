import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { APP_NAME } from "@/constants/app";

const featureCards = [
  {
    title: "Modern foundation",
    description: "Reusable UI primitives built for scalable pages and dashboards.",
  },
  {
    title: "Responsive layout",
    description: "Designed to support mobile, tablet, and desktop experiences.",
  },
  {
    title: "SaaS-ready feel",
    description: "Clean spacing, soft shadows, and polished interaction patterns.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Section className="pt-20 sm:pt-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="max-w-2xl">
                <Badge variant="secondary">Design system foundation</Badge>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  Build beautiful service experiences with {APP_NAME}.
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  A polished reusable UI system for the next generation of booking,
                  technician, and admin experiences.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg">Explore the system</Button>
                  <Button variant="outline" size="lg">
                    View components
                  </Button>
                </div>
              </div>

              <Card className="p-8">
                <div className="grid gap-4">
                  {featureCards.map((feature) => (
                    <div key={feature.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
