import services from '@/app/data/servicesData';
import { notFound } from 'next/navigation';
import ServicePageClient from './ServicePageClient';

// Typage explicite des paramètres dynamiques
interface PageProps {
  params: {
    slug: string;
  };
}

// Génération des chemins statiques à build
export function generateStaticParams(): PageProps["params"][] {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Page dynamique basée sur le slug
export default function Page({ params }: PageProps) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  return <ServicePageClient service={service} />;
}
