import services from '@/app/data/servicesData';
import { notFound } from 'next/navigation';
import ServicePageClient from './ServicePageClient';

// ✅ PAS de async ni de typage ici !
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  return <ServicePageClient service={service} />;
}
