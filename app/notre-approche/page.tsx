'use client';

import { useEffect, useState } from 'react';

export default function NotreApproche() {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xyzabcde', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setFormStatus('sent');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <section className="bg-black text-white min-h-screen pt-24 pb-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Approche</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
          Chez IfêDigital, chaque projet est une collaboration stratégique où la créativité rencontre la technologie. Découvrez comment nous transformons vos idées en solutions concrètes.
        </p>
      </div>

      <div className={`grid md:grid-cols-2 gap-16 max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Étapes */}
        {[
          { title: '1. Écoute & Analyse', desc: 'Nous prenons le temps de comprendre vos besoins, vos objectifs et votre audience pour poser une base stratégique solide.' },
          { title: '2. Design sur mesure', desc: 'Nos conceptions sont pensées pour refléter votre marque tout en assurant une navigation intuitive et centrée sur l’utilisateur.' },
          { title: '3. Développement agile', desc: 'Chaque ligne de code est pensée pour offrir une expérience fluide, rapide et parfaitement adaptée à vos objectifs.' },
          { title: '4. Tests & Optimisation', desc: 'Tests, performance, sécurité : nous garantissons une expérience fiable et sans compromis.' },
        ].map((step, i) => (
          <div key={i} className="bg-gray-900 rounded-2xl border border-gray-700 p-8 shadow-lg hover:shadow-yellow-400/20 transition">
            <h3 className="text-yellow-400 text-xl font-semibold mb-4">{step.title}</h3>
            <p className="text-gray-300">{step.desc}</p>
          </div>
        ))}
        {/* Étape 5 */}
        <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8 shadow-lg hover:shadow-yellow-400/20 transition col-span-2">
          <h3 className="text-yellow-400 text-xl font-semibold mb-4">5. Accompagnement & évolution</h3>
          <p className="text-gray-300 max-w-4xl mx-auto">
            Notre engagement ne s’arrête pas à la livraison : nous assurons la continuité avec maintenance, support, évolutions et accompagnement sur mesure.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-yellow-400/30 hover:shadow-xl transition"
        >
          Discutons de votre projet
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-gray-900 text-white rounded-xl w-full max-w-xl p-8 relative shadow-xl border border-yellow-400">
            <button
              className="absolute top-4 right-4 text-yellow-400 hover:text-white text-xl"
              onClick={() => {
                setFormStatus('idle');
                setShowModal(false);
              }}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Parlez-nous de votre projet</h2>

            {formStatus === 'sent' ? (
              <p className="text-green-400 font-semibold">Merci ! Votre message a bien été envoyé.</p>
            ) : formStatus === 'error' ? (
              <p className="text-red-400 font-semibold">Une erreur est survenue. Veuillez réessayer.</p>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-1 font-medium text-yellow-400">Nom</label>
                  <input name="nom" type="text" required className="w-full border border-gray-600 bg-black text-white rounded px-4 py-2" />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-yellow-400">Email</label>
                  <input name="email" type="email" required className="w-full border border-gray-600 bg-black text-white rounded px-4 py-2" />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-yellow-400">Message</label>
                  <textarea name="message" required rows={4} className="w-full border border-gray-600 bg-black text-white rounded px-4 py-2" />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-6 py-2 rounded hover:shadow-yellow-400/30 transition"
                >
                  {formStatus === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-black/40 to-black/80" />
        <div className="absolute top-1/3 left-1/4 text-9xl text-white/5 animate-pulse">⚙️</div>
        <div className="absolute bottom-1/3 right-1/4 text-8xl text-white/5 animate-ping">💡</div>
        <div className="absolute top-1/2 left-2/3 text-8xl text-white/5 animate-pulse">📦</div>
        <div className="absolute top-1/4 right-1/3 text-8xl text-white/5 animate-bounce">💻</div>
      </div>
    </section>
  );
}
