
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Martinez',
    position: 'CTO',
    company: 'TechFlow Solutions',
    content: 'Ifedigital a révolutionné notre architecture web avec une expertise technique exceptionnelle. Leur maîtrise des technologies modernes et leur approche DevOps ont propulsé notre startup vers le succès.',
    rating: 5,
    image: 'Professional female tech executive portrait, confident CTO, modern tech industry leader, contemporary corporate headshot, professional business attire, confident technology executive, high-quality business photography'
  },
  {
    name: 'Marc Dubois',
    position: 'Founder & CEO',
    company: 'EcoTech Initiative',
    content: 'L\'équipe d\'Ifedigital a développé notre plateforme SaaS avec une qualité de code remarquable. Leur expertise en React et Node.js nous a permis de scaler rapidement.',
    rating: 5,
    image: 'Professional tech entrepreneur portrait, innovative startup founder, sustainable tech company CEO, modern business leader headshot, environmentally conscious tech executive, contemporary startup portrait'
  },
  {
    name: 'Julie Chen',
    position: 'Digital Director',
    company: 'Luxuria Fashion',
    content: 'Développement e-commerce d\'exception ! Ifedigital a créé une expérience utilisateur fluide et performante. Leur expertise technique est remarquable.',
    rating: 5,
    image: 'Elegant female digital director portrait, luxury e-commerce executive, sophisticated tech industry leader, premium corporate headshot, fashionable professional woman, high-end business photography'
  },
  {
    name: 'Antoine Rousseau',
    position: 'Tech Lead',
    company: 'StreamingApp',
    content: 'Collaboration exceptionnelle avec Ifedigital pour notre app mobile. Leur maîtrise de React Native et leur architecture scalable ont dépassé nos attentes.',
    rating: 5,
    image: 'Professional male tech lead portrait, mobile app developer, contemporary tech industry professional, modern software engineer headshot, innovative tech executive, dynamic technology leader'
  }
];

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout>();

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

  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`ri-star-${i < rating ? 'fill' : 'line'} text-[#FFD700]`}
      />
    ));
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Tech Background Pattern */}
      <div className="absolute inset-0 opacity-5">
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

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl text-[#FFD700] opacity-10 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + Math.random() * 2}s`
            }}
          >
            <i className={['ri-code-s-slash-line', 'ri-terminal-box-line', 'ri-smartphone-line', 'ri-global-line', 'ri-database-2-line', 'ri-cloud-line'][i]}></i>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-5xl font-bold text-white mb-6">
            Ce que disent nos <span className="text-[#FFD700]">clients</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            La satisfaction technique et l'innovation sont notre plus belle récompense
          </p>
          <div className="w-20 h-1 bg-[#FFD700] rounded-full mx-auto mt-6"></div>
        </div>

        {/* Testimonials Slider */}
        <div className={`relative ${isVisible ? 'animate-fadeInUp' : 'opacity-0'} [animation-delay:0.3s]`}>
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 mx-4 border border-gray-700/50">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        {/* Quote */}
                        <div className="mb-6">
                          <i className="ri-double-quotes-l text-6xl text-[#FFD700] mb-4 opacity-20"></i>
                          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed italic">
                            "{testimonial.content}"
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex justify-center md:justify-start gap-1 mb-4 text-xl">
                          {renderStars(testimonial.rating)}
                        </div>

                        {/* Author Info */}
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-400">
                            {testimonial.position} • {testimonial.company}
                          </p>
                        </div>
                      </div>

                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-gray-700/50">
                          <Image
                            src={`https://readdy.ai/api/search-image?query=$%7Btestimonial.image%7D&width=200&height=200&seq=testimonial-${index}&orientation=squarish`}
                            alt={testimonial.name}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === index
                    ? 'bg-[#FFD700] scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => goToSlide(currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#FFD700] hover:text-white transition-colors duration-300 cursor-pointer border border-gray-700/50"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>

          <button
            onClick={() => goToSlide((currentSlide + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#FFD700] hover:text-white transition-colors duration-300 cursor-pointer border border-gray-700/50"
          >
            <i className="ri-arrow-right-line text-xl"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
