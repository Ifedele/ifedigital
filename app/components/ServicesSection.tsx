'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'; // ✅ Import manquant ajouté
import ButtonLink from './ButtonLink'; // adapte chemin si besoin


const services = [
  {
    icon: 'ri-code-line',
    title: 'Développement Web',
    slug: 'developpement-web',
    description: 'Sites web modernes et applications sur mesure, optimisés pour l\'expérience utilisateur et la performance.',
    features: ['Sites web responsifs', 'Applications web', 'E-commerce', 'Optimisation SEO'],
    image: '/image/dev-web.png',
  },
  {
    icon: 'ri-palette-line',
    title: 'Design Graphique & Branding',
    slug: 'design-graphique',
    description: 'Création d\'identités visuelles uniques et mémorables qui reflètent l\'essence de votre marque avec un impact fort.',
    features: ['Logo & Identité visuelle', 'Charte graphique', 'Supports print & digital', 'Packaging design'],
    image: '/image/graphisme.png',
  },
  {
    icon: 'ri-global-line',
    title: 'Solutions Digitales',
    slug: 'solutions-digitales',
    description: 'Écosystèmes numériques complets intégrant développement, design et stratégie digitale pour votre succès.',
    features: ['Stratégie digitale', 'UX/UI Design', 'Marketing digital', 'Consulting tech'],
    image: '/image/digital_solution.webp',
  }
];

export default function ServicesSection() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [selectedService, setSelectedService] = useState<number>(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef(null);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isAutoRotating) {
      autoRotateRef.current = setInterval(() => {
        setSelectedService(prev => (prev + 1) % services.length);
        setRotation(prev => prev - 120);
      }, 4000);
    } else {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    }

    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [isAutoRotating]);

  const handleServiceSelect = (index: number) => {
    setSelectedService(index);
    setRotation(-(index * 120));
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 6000);
  };

  const nextService = () => handleServiceSelect((selectedService + 1) % services.length);
  const prevService = () => handleServiceSelect((selectedService - 1 + services.length) % services.length);
  const toggleAutoRotation = () => setIsAutoRotating(prev => !prev);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
              mixBlendMode: 'multiply'
            }}
          />
        </div>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
        {['</>', '{}', '()', '[]', 'fn', 'API'].map((symbol, i) => (
          <div
            key={symbol}
            className="absolute text-xs font-mono text-yellow-400 opacity-10 select-none"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 60}%`,
              animation: `pulse ${2 + i * 0.5}s ease-in-out infinite alternate`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Expertises</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Une approche globale alliant excellence technique et créativité artistique
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mt-6" />
        </div>

        {/* Carousel 3D */}
        <div className="relative flex items-center justify-center" style={{ height: '700px' }}>
          <div 
            className="relative transition-transform duration-700 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
              width: '100%',
              height: '500px'
            }}
          >
            {services.map((service, index) => {
              const angle = (index * 120) * (Math.PI / 180);
              const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 250 : 350;
              const x = Math.sin(angle) * radius;
              const z = Math.cos(angle) * radius;
              const isActive = index === selectedService;

              return (
                <div
                  key={index}
                  className="absolute group cursor-pointer transition-all duration-500"
                  style={{
                    transform: `translate3d(${x}px, 0, ${z}px) rotateY(${index * 120}deg)`,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-200px',
                    marginTop: '-250px',
                    transformOrigin: 'center center',
                    backfaceVisibility: 'visible'
                  }}
                  onClick={() => handleServiceSelect(index)}
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className={`w-96 h-[500px] bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border transition-all duration-500 ${
                    isActive ? 'border-yellow-400 shadow-yellow-400 shadow-lg scale-105' : 'border-gray-700 hover:border-yellow-400 hover:border-opacity-50'
                  }`}>
                    {/* ✅ Section Image corrigée */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                      <div className="absolute top-4 left-4 w-12 h-12 bg-yellow-400 bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-yellow-400 border-opacity-30">
                        <i className={`${service.icon} text-yellow-400 text-2xl`}></i>
                      </div>
                      {isActive && (
                        <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                      )}
                    </div>
                    
                    {/* ✅ Section Contenu corrigée */}
                    <div className="p-6 flex flex-col h-64">
                      <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 leading-tight ${
                        hoveredService === index ? 'text-yellow-400' : 'text-white'
                      }`}>
                        {service.title}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed text-sm flex-grow">
                        {service.description}
                      </p>
                      {isActive && (
                        <div className="grid grid-cols-1 gap-2 mb-6">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-400">
                              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Bouton En savoir plus dans la carte de service */}
                     <ButtonLink
                        href={`/services/${service.slug}`}
                        className={`w-full py-3 ${
                          hoveredService === index
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-400 shadow-opacity-25'
                            : 'bg-gray-700 text-gray-300 hover:bg-yellow-400 hover:text-black'
                        }`}
                      >
                        En savoir plus
                      </ButtonLink>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-0 transition-opacity duration-500 pointer-events-none rounded-2xl ${
                      hoveredService === index ? 'opacity-5' : ''
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <button onClick={prevService} className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-gray-800 bg-opacity-80 hover:bg-yellow-400 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-600 border-opacity-50 hover:border-yellow-400 hover:border-opacity-50 group">
            <span className="text-yellow-400 group-hover:text-white transition-colors text-xl font-bold">‹</span>
          </button>
          <button onClick={nextService} className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-gray-800 bg-opacity-80 hover:bg-yellow-400 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-600 border-opacity-50 hover:border-yellow-400 hover:border-opacity-50 group">
            <span className="text-yellow-400 group-hover:text-white transition-colors text-xl font-bold">›</span>
          </button>
        </div>

        <div className="flex items-center justify-center space-x-6 mt-8">
          <div className="flex space-x-3">
            {services.map((_, index) => (
              <button key={index} onClick={() => handleServiceSelect(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${
                selectedService === index ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400 shadow-opacity-50' : 'bg-gray-600 hover:bg-gray-500 hover:scale-110'
              }`} />
            ))}
          </div>
          <button onClick={toggleAutoRotation} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
            isAutoRotating ? 'bg-yellow-400 bg-opacity-20 border-yellow-400 border-opacity-50 text-yellow-400' : 'bg-gray-800 bg-opacity-80 border-gray-600 border-opacity-50 text-gray-400 hover:text-yellow-400'
          }`}>
            <span className="text-sm font-bold">
              {isAutoRotating ? '⏸' : '▶'}
            </span>
          </button>
        </div>

        <div className={`text-center mt-12 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-2xl mx-auto p-6 bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-2xl border border-gray-700 border-opacity-50">
            <h4 className="text-2xl font-bold text-yellow-400 mb-3">{services[selectedService].title}</h4>
            <p className="text-gray-300 mb-4">{services[selectedService].description}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {services[selectedService].features.map((feature, idx) => (
                <span key={idx} className="px-3 py-1 bg-yellow-400 bg-opacity-10 border border-yellow-400 border-opacity-30 rounded-full text-sm text-yellow-400">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <ButtonLink
            href="/notre-approche"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full hover:shadow-xl hover:shadow-yellow-400 hover:shadow-opacity-25 transition-all duration-300 transform"
          >
            Découvrez notre approche créative
          </ButtonLink>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.4; }
        }
        @keyframes pulse {
          0% { opacity: 0.1; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}