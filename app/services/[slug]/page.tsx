import services from '@/app/data/servicesData';
import { notFound } from 'next/navigation';
import ServicePageClient from './ServicePageClient';

// 👇 Indique clairement que c’est une fonction async
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// 👇 Typage propre
type Props = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  return <ServicePageClient service={service} />;
}
