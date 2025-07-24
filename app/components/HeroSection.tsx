'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [animationElements, setAnimationElements] = useState<any>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Ensure client-side only rendering
  useEffect(() => {
    setIsClient(true);
    
    // Generate animation elements only on client side
    const generateAnimationElements = () => {
      const codeElements = [];
      const particles = [];
      const circuits = [];
      const matrixLines = [];

      // Pre-generate positions
      for (let i = 0; i < 15; i++) {
        codeElements.push({
          left: `${(i * 7.3 + 10) % 100}%`,
          top: `${(i * 11.7 + 20) % 100}%`,
          delay: `${i * 0.2}s`,
          duration: `${4 + (i % 3)}s`,
          text: ['<div>', '{code}', '()', '[]', 'function', 'const', 'return', 'import', 'export', 'async'][i % 10]
        });
      }

      for (let i = 0; i < 20; i++) {
        particles.push({
          left: `${(i * 5.3 + 15) % 100}%`,
          top: `${(i * 8.7 + 25) % 100}%`,
          delay: `${i * 0.1}s`,
          duration: `${2 + (i % 2)}s`
        });
      }

      for (let i = 0; i < 8; i++) {
        circuits.push({
          left: `${(i * 12.5 + 5) % 100}%`,
          top: `${(i * 15.3 + 30) % 100}%`,
          width: `${50 + (i % 4) * 50}px`,
          delay: `${i * 0.3}s`,
          duration: `${3 + (i % 2)}s`
        });
      }

      for (let i = 0; i < 10; i++) {
        matrixLines.push({
          left: `${10 + i * 10}%`,
          delay: `${i * 0.5}s`,
          duration: `${3 + (i % 2)}s`
        });
      }

      return { codeElements, particles, circuits, matrixLines };
    };

    setAnimationElements(generateAnimationElements());
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !titleRef.current) return;

    const letters = titleRef.current.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
      (letter as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }, [isClient]);

  const splitText = (text: string) => {
    if (!isClient) {
      return <span>{text}</span>;
    }
    
    return text.split('').map((char, index) => (
      <span key={index} className="letter inline-block animate-fadeInUp">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  // ✅ Fonction de défilement fluide vers une section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
    >
      {/* Tech Background */}
      <div className="absolute inset-0">
        <Image
          src="https://readdy.ai/api/search-image?query=Ultra%20modern%20futuristic%20tech%20background%20with%20floating%20code%20elements%2C%20digital%20matrix%2C%20holographic%20interfaces%2C%20neon%20circuit%20patterns%2C%20cyberpunk%20aesthetic%2C%20advanced%20technology%20visualization%2C%20digital%20transformation%2C%20web%20development%20coding%20environment%2C%20immersive%20tech%20atmosphere%2C%20glowing%20data%20streams%2C%20professional%20high-tech%20ambiance&width=1920&height=1080&seq=hero-tech-bg&orientation=landscape"
          alt="Background"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/80"></div>
      </div>

      {/* Animated Tech Elements - Only render on client */}
      {isClient && animationElements && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Code Blocks */}
          {animationElements.codeElements.map((element: any, i: number) => (
            <div
              key={i}
              className="absolute text-xs font-mono text-gray-400 opacity-30 animate-float"
              style={{
                left: element.left,
                top: element.top,
                animationDelay: element.delay,
                animationDuration: element.duration,
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
              }}
            >
              {element.text}
            </div>
          ))}

          {/* Digital Particles */}
          {animationElements.particles.map((particle: any, i: number) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-[#FFD700] rounded-full animate-pulse shadow-[0_0_10px_#FFD700]"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
              }}
            />
          ))}

          {/* Circuit Lines */}
          {animationElements.circuits.map((circuit: any, i: number) => (
            <div
              key={`circuit-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent animate-pulse"
              style={{
                left: circuit.left,
                top: circuit.top,
                width: circuit.width,
                animationDelay: circuit.delay,
                animationDuration: circuit.duration
              }}
            />
          ))}

          {/* Matrix Rain Effect */}
          {animationElements.matrixLines.map((line: any, i: number) => (
            <div
              key={`matrix-${i}`}
              className="absolute w-px h-20 bg-gradient-to-b from-transparent via-[#FFD700] to-transparent animate-pulse opacity-20"
              style={{
                left: line.left,
                top: `-20px`,
                animationDelay: line.delay,
                animationDuration: line.duration
              }}
            />
          ))}
        </div>
      )}

      {/* Holographic Grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="text-6xl md:text-8xl font-bold text-white mb-4 leading-tight">
            <div className="mb-2">
              <h1 ref={titleRef} className="inline-block">
                {splitText('IfêDigital')}
              </h1>
            </div>
            <div className="text-4xl md:text-6xl font-light text-[#FFD700]">
              Développement Web & Design graphique
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fadeInUp [animation-delay:1s]">
            Agence créative alliant développement web de pointe et design graphique innovant
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp [animation-delay:1.5s]">
          {/* ✅ Bouton vers la section "nos réalisations" */}
          <button 
            onClick={() => scrollToSection('PortfolioSection')}
            className="group relative px-8 py-4 text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 whitespace-nowrap cursor-pointer bg-[#FFD700]"
          >
            <span className="relative z-10">Voir nos réalisations</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#E6C200] to-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>

          {/* ✅ Bouton vers la section "contact" */}
          <button 
            onClick={() => scrollToSection('ContactSection')}
            className="group px-8 py-4 border-2 border-[#FFD700] text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:shadow-xl whitespace-nowrap cursor-pointer"
          >
            Parlons de votre projet
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#FFD700] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#FFD700] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* 3D Tech Shapes */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#E6C200] transform rotate-45 opacity-30 animate-spin-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-gradient-to-r from-[#FFD700] to-[#E6C200] rounded-full opacity-30 animate-pulse"></div>

      {/* Floating Tech Icons */}
      {isClient && (
        <>
          <div className="absolute top-1/3 right-1/4 text-4xl text-[#FFD700] opacity-20 animate-float">
            <i className="ri-code-s-slash-line"></i>
          </div>
          <div className="absolute bottom-1/3 left-1/4 text-3xl text-[#FFD700] opacity-20 animate-float [animation-delay:1s]">
            <i className="ri-terminal-box-line"></i>
          </div>
        </>
      )}
    </section>
  );
}