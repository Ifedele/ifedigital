
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    entreprise: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.message.length > 500) {
      alert('Le message ne peut pas dépasser 500 caractères.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form-submit', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nom: '',
          email: '',
          entreprise: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="ContactSection" ref={sectionRef} className="py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Tech Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5">
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
        <div className="absolute top-20 right-20 w-40 h-40 bg-[#FFD700]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-lg text-[#FFD700] opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          >
            <i className={[ 'ri-code-s-slash-line', 'ri-terminal-box-line', 'ri-smartphone-line', 'ri-global-line', 'ri-database-2-line', 'ri-cloud-line', 'ri-server-line', 'ri-computer-line'][i]}></i>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-5xl font-bold text-white mb-6">
            Créons ensemble votre <span className="text-[#FFD700]">projet créatif</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transformons votre vision en expérience digitale remarquable
          </p>
          <div className="w-20 h-1 bg-[#FFD700] rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className={`${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Parlons de votre vision</h3>

              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-300 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all duration-300 text-sm text-white placeholder-gray-400"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all duration-300 text-sm text-white placeholder-gray-400"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="entreprise" className="block text-sm font-medium text-gray-300 mb-2">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    id="entreprise"
                    name="entreprise"
                    value={formData.entreprise}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all duration-300 text-sm text-white placeholder-gray-400"
                    placeholder="Nom de votre entreprise"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    maxLength={500}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all duration-300 resize-none text-sm text-white placeholder-gray-400"
                    placeholder="Décrivez-nous votre projet (développement web, design graphique, branding...)..."
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.message.length}/500
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-[#E6C200] focus:ring-4 focus:ring-[#FFD700]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="text-green-400 text-center font-medium">
                    Message envoyé avec succès ! Nous vous répondrons rapidement.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="text-red-400 text-center font-medium">
                    Une erreur s'est produite. Veuillez réessayer.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className={`space-y-8 ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                    <i className="ri-phone-line text-black text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Téléphone</h4>
                    <p className="text-gray-400">+229 01 55 80 85 15</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                    <i className="ri-mail-line text-black text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <p className="text-gray-400">contact@ifedigital.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                    <i className="ri-map-pin-line text-black text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Localisation</h4>
                    <p className="text-gray-400">Cotonou, Bénin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://wa.me/2290155808515"
                  target="_blank"
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300 cursor-pointer"
                >
                  <i className="ri-whatsapp-line text-white text-xl"></i>
                </Link>

                <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
                  <i className="ri-facebook-fill text-white text-xl"></i>
                </button>

                <button className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300 cursor-pointer">
                  <i className="ri-instagram-line text-white text-xl"></i>
                </button>

                <button className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
                  <i className="ri-linkedin-fill text-white text-xl"></i>
                </button>
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-r from-[#FFD700] to-[#E6C200] rounded-xl p-6 text-center">
              <h4 className="text-black font-bold text-xl mb-2">Projet urgent ?</h4>
              <p className="text-gray-800 mb-4">Contactez-nous directement</p>
              <Link
                href="https://wa.me/2290155808515"
                target="_blank"
                className="inline-flex items-center space-x-2 bg-black text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-whatsapp-line text-xl"></i>
                <span>WhatsApp</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
