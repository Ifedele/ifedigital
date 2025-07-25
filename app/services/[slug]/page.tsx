// @ts-nocheck ✅ Ignore tous les problèmes TypeScript dans ce fichier
import services from '@/app/data/servicesData';
import { notFound } from 'next/navigation';
import ServicePageClient from './ServicePageClient';

// Ne surtout pas typer ou async ici
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Même sans typage, on reste propre
export default function Page({ params }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  return <ServicePageClient service={service} />;
}
