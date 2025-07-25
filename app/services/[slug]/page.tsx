import services from '@/app/data/servicesData';
import { notFound } from 'next/navigation';
import ServicePageClient from './ServicePageClient';

// ✅ Fonction de génération statique des slugs
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// ✅ Typage explicite pour les props (et pas un type générique de Next)
interface PageProps {
  params: {
    slug: string;
  };
}

// ✅ Composant principal
export default function Page({ params }: PageProps) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  return <ServicePageClient service={service} />;
}
