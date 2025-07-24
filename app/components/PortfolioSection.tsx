
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const portfolioItems = [
  {
    title: 'Plateforme E-commerce TechStore',
    category: 'Développement Web',
    description: 'Application e-commerce complète avec dashboard admin et API REST',
    image: 'Modern e-commerce platform interface with advanced dashboard, analytics charts, product management, futuristic web application design, professional tech interface, contemporary web development, sleek UI design, high-tech e-commerce solution',
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    title: 'Identité Visuelle EcoTech',
    category: 'Design Graphique',
    description: 'Brand identity complète pour une startup éco-responsable avec logo, charte et supports',
    image: 'Modern eco-tech startup branding design, sustainable company logo, contemporary green brand identity, professional environmental tech branding, clean visual identity, modern ecological corporate design, innovative green technology branding',
    tags: ['Branding', 'Logo', 'Print']
  },
  {
    title: 'Application Mobile FinanceApp',
    category: 'App Mobile',
    description: 'Application mobile de gestion financière avec authentification biométrique',
    image: 'Sleek mobile banking app interface, modern financial application screens, secure mobile banking, contemporary fintech app design, professional mobile finance interface, innovative mobile banking solution',
    tags: ['React Native', 'Firebase', 'Biometric']
  },
  {
    title: 'Campagne Visuelle Luxuria',
    category: 'Design Graphique',
    description: 'Direction artistique complète pour marque de luxe : print, digital et packaging',
    image: 'Luxury fashion brand visual campaign, elegant design materials, high-end fashion branding, sophisticated visual identity, premium brand design, luxurious marketing materials, contemporary luxury design',
    tags: ['Direction artistique', 'Packaging', 'Digital']
  },
  {
    title: 'Système de Gestion RH',
    category: 'Web App',
    description: 'Plateforme SaaS complète pour la gestion des ressources humaines',
    image: 'Modern HR management dashboard, employee management system, professional SaaS interface, contemporary business application, advanced HR platform, corporate management system interface',
    tags: ['Vue.js', 'Laravel', 'MySQL']
  },
  {
    title: 'Dashboard Analytics',
    category: 'Data Viz',
    description: 'Interface d\'analyse de données en temps réel avec visualisations avancées',
    image: 'Advanced analytics dashboard with real-time data visualization, modern business intelligence interface, data analytics platform, contemporary dashboard design, professional data visualization',
    tags: ['D3.js', 'Python', 'Analytics']
  }
];

export default function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [filteredItems, setFilteredItems] = useState(portfolioItems);
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = ['Tous', 'Développement Web', 'Design Graphique', 'App Mobile', 'Web App', 'Data Viz'];

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
    if (activeFilter === 'Tous') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <section id="PortfolioSection" ref={sectionRef} className="py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Tech Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-lg text-[#FFD700] opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${6 + Math.random() * 2}s`
            }}
          >
            <i className={[ 'ri-code-s-slash-line', 'ri-database-2-line', 'ri-cloud-line', 'ri-smartphone-line', 'ri-global-line'][i % 5]}></i>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-5xl font-bold text-white mb-6">
            Nos <span className="text-[#FFD700]">Réalisations</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos réalisations, qui allient innovation technique et excellence artistique
          </p>
          <div className="w-20 h-1 bg-[#FFD700] rounded-full mx-auto mt-6"></div>
        </div>

        {/* Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'} [animation-delay:0.2s]`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap cursor-pointer border ${
                activeFilter === category
                  ? 'bg-[#FFD700] text-black shadow-lg transform scale-105 border-[#FFD700]'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-[#FFD700]/20 transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 border border-gray-700/50 ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glowing Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={`https://readdy.ai/api/search-image?query=$%7Bitem.image%7D&width=400&height=300&seq=portfolio-${index}&orientation=landscape`}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-6 py-3 bg-[#FFD700] text-black font-semibold rounded-full hover:bg-[#E6C200] transition-colors duration-300 whitespace-nowrap cursor-pointer border-2 border-[#FFD700]">
                    Voir le projet
                  </button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#FFD700] text-black text-sm font-medium rounded-full">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full group-hover:bg-[#FFD700]/20 group-hover:text-[#FFD700] transition-colors duration-300 border border-gray-600/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'} [animation-delay:0.8s]`}>
          <button className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer border-2 border-gray-600">
            Voir tous nos projets
          </button>
        </div>
      </div>
    </section>
  );
}
