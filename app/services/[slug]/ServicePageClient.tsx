'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Service {
  title: string;
  description: string;
  image: string;
  features: string[];
  slug: string;
}

const socialPlatforms = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/sharer/sharer.php?u=',
    icon: (
      <svg
        fill="#FFD700"
        height="24"
        width="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.03 3.66 9.19 8.44 9.93v-7.03H8.1v-2.9h2.34V9.66c0-2.32 1.38-3.6 3.5-3.6 1.01 0 2.07.18 2.07.18v2.27h-1.16c-1.14 0-1.5.71-1.5 1.44v1.72h2.56l-.41 2.9h-2.15v7.03C18.34 21.26 22 17.1 22 12.07z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/intent/tweet?url=',
    icon: (
      <svg
        fill="#FFD700"
        height="24"
        width="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M23 3a10.9 10.9 0 01-3.14.85 5.5 5.5 0 002.4-3.03 11 11 0 01-3.48 1.33 5.48 5.48 0 00-9.34 5 15.56 15.56 0 01-11.3-5.7 5.48 5.48 0 001.7 7.32 5.42 5.42 0 01-2.48-.7v.07a5.48 5.48 0 004.39 5.38 5.53 5.53 0 01-2.47.1 5.48 5.48 0 005.11 3.8A11 11 0 010 19.54a15.49 15.49 0 008.39 2.46c10.06 0 15.57-8.34 15.57-15.57 0-.24 0-.48-.02-.72A11.18 11.18 0 0023 3z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/shareArticle?mini=true&url=',
    icon: (
      <svg
        fill="#FFD700"
        height="24"
        width="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.93v5.68H9.38V9h3.42v1.56h.05a3.76 3.76 0 013.38-1.86c3.61 0 4.28 2.38 4.28 5.48v6.26zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77A1.78 1.78 0 000 1.77v20.46A1.78 1.78 0 001.77 24h20.46A1.78 1.78 0 0024 22.23V1.77A1.78 1.78 0 0022.23 0z" />
      </svg>
    ),
  },
];

export default function ServicePageClient({ service }: { service: Service }) {
  const [showContactModal, setShowContactModal] = useState(false);

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Handle form submit (just alert for demo)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Merci pour votre message ! Nous vous répondrons rapidement.');
    setShowContactModal(false);
  };

  return (
    <motion.div
      className="relative min-h-screen px-6 py-20 md:py-28 bg-gradient-to-br from-[#1a1a1a] via-[#353839] to-[#1a1a1a] text-white overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background animated dots & symbols */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 215, 0, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 215, 0, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#FFD700] rounded-full opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
        {['</>', '{}', '()', '[]', 'fn', 'API'].map((sym, i) => (
          <div
            key={sym}
            className="absolute text-xs font-mono text-[#FFD700] opacity-10"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 60}%`,
              animation: `pulse 3s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.5}s`,
              userSelect: 'none',
            }}
          >
            {sym}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Link href="/#services" passHref>
          <button className="mb-10 px-6 py-2 rounded-full bg-[#FFD700] text-black font-bold hover:brightness-110 transition">
            ← Retour aux services
          </button>
        </Link>

        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-6 text-[#FFD700]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {service.title}
        </motion.h1>

        <motion.p
          className="text-gray-300 leading-relaxed mb-12 text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {service.description}
        </motion.p>

        <motion.div
          className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          style={{ perspective: 1500 }}
        >
          <motion.div
            whileHover={{ rotateY: 15, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative w-full h-full"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-2xl font-semibold mb-6 text-[#FFD700]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Fonctionnalités clés
        </motion.h2>

        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
        >
          {service.features.map((feature, i) => (
            <motion.li
              key={i}
              className="flex items-center gap-3 bg-white/10 border border-[#FFD700]/40 rounded-lg p-4 text-[#FFD700] font-medium shadow-md hover:scale-105 hover:shadow-yellow-500 transition-transform cursor-default select-none"
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <span className="text-xl">✅</span>
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Partage réseaux sociaux */}
        <div className="mt-12 flex justify-center gap-6">
          {socialPlatforms.map(({ name, url, icon }) => (
            <a
              key={name}
              href={`${url}${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Partager sur ${name}`}
              className="hover:scale-110 transition-transform"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Bouton Contact */}
        <div className="mt-16">
          <button
            onClick={() => setShowContactModal(true)}
            className="px-10 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold rounded-full shadow-lg hover:brightness-110 transition"
          >
            Contactez-nous
          </button>
        </div>
      </div>

      {/* Modal Contact */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#353839] rounded-xl shadow-xl max-w-md w-full p-8 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-3 right-3 text-[#FFD700] text-2xl font-bold"
                onClick={() => setShowContactModal(false)}
                aria-label="Fermer le formulaire"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold text-[#FFD700] mb-6">Contactez-nous</h3>
              <form onSubmit={handleSubmit} className="space-y-5 text-white">
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  required
                  className="w-full px-4 py-3 rounded bg-[#1a1a1a] border border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  required
                  className="w-full px-4 py-3 rounded bg-[#1a1a1a] border border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <textarea
                  name="message"
                  placeholder="Votre message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded bg-[#1a1a1a] border border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold rounded-full hover:brightness-110 transition"
                >
                  Envoyer
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.1;
          }
          100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </motion.div>
  );
}
