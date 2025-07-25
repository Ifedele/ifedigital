
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      {/* Tech Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl text-[#FFD700] opacity-10 animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            <i className={[('ri-code-s-slash-line'), ('ri-terminal-box-line'), ('ri-database-2-line'), ('ri-cloud-line'), ('ri-smartphone-line'), ('ri-global-line'), ('ri-server-line'), ('ri-computer-line')][i]}></i>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-white leading-tight">
                Nous concevons des solutions
                <span className="block text-[#FFD700]">numériques & créatives sur mesure</span>
              </h2>

              <div className="w-20 h-1 bg-[#FFD700] rounded-full"></div>
            </div>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
               Chez <strong className="text-white">IfêDigital</strong>, nous croyons que le design et la technologie doivent travailler ensemble pour raconter votre histoire de façon percutante. Chaque pixel, chaque ligne de code a un objectif.
              </p>

              <p>
                Experts en développement web moderne et en design visuel, nous construisons des solutions robustes, élégantes et orientées utilisateur, que ce soit pour une vitrine ou un outil interactif complexe.
              </p>

              <p>
               Confiez-nous votre vision : nous la traduirons en une expérience digitale fluide, cohérente et fidèle à vos valeurs.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFD700]">10+</div>
                <div className="text-sm text-gray-400 font-medium">Projets créatifs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFD700]">2+</div>
                <div className="text-sm text-gray-400 font-medium">Années d&#39;expertise</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFD700]">98%</div>
                <div className="text-sm text-gray-400 font-medium">Clients satisfaits</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className={`relative ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
              <Image
                src="/image/about.png"
                alt="Équipe Ifedigital développement"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
            </div>

            {/* Floating Tech Card */}
            <div className="absolute -bottom-6 -left-6 bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                  <i className="ri-palette-line text-black text-xl"></i>
                </div>
                <div>
                  <div className="font-semibold text-white">Tech & Créatif</div>
                  <div className="text-sm text-gray-400">Depuis 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
