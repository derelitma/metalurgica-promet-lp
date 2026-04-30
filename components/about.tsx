'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useWhatsApp } from '@/hooks/use-whatsapp';

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const wa = useWhatsApp('testimonials');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="nosotros"
      className="py-20 bg-gradient-to-b from-[#1A1C20] to-[#111318]"
      data-section="nosotros"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Column - Visual with 60 anchor */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1470"
                alt="Equipo de Metalúrgica Promet"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/60 via-[#003366]/20 to-transparent" />

              {/* 60 Years Anchor Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 100 }}
                className="absolute bottom-8 left-8 bg-[#E8751A] rounded-full p-6 text-center shadow-2xl"
              >
                <div className="text-4xl font-bold text-white">60</div>
                <div className="text-[#111318] text-xs font-bold uppercase tracking-wider">
                  Años
                </div>
                <div className="text-[#111318] text-xs italic">Cumpliendo</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="mb-6">
              <p className="text-[#E8751A] text-sm font-bold uppercase tracking-widest mb-4">
                Nuestra historia
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Por qué elegir Promet
              </h2>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 bg-[#E8751A]" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">60 años de trayectoria</h3>
                  <p className="text-[#94A3B8]">
                    Desde 1960 transformamos metal en soluciones. Tres generaciones de familias platenses confiando en nosotros.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 bg-[#E8751A]" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Medimos, fabricamos e instalamos</h3>
                  <p className="text-[#94A3B8]">
                    Proceso integral. No intermediarios. Tu idea llega directamente a quien sabe hacerla realidad.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 bg-[#E8751A]" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Presupuesto en 24/48hs</h3>
                  <p className="text-[#94A3B8]">
                    Sin sorpresas. Cotizamos por WhatsApp, mail o teléfono. Rápido y sin burocracia.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 bg-[#E8751A]" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Si algo no queda, lo resolvemos</h3>
                  <p className="text-[#94A3B8]">
                    Garantía real. No es un papel bonito. Es un compromiso. Lo hacemos bien porque nuestra reputación depende de ello.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[#4A4A48] text-sm italic mb-8">
              Cada testimonio tiene nombre y apellido. Los tenemos guardados.
            </p>

            <motion.a
              href={wa.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#E8751A] hover:bg-[#FF8533] text-white px-8 py-4 rounded-lg font-bold uppercase text-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cta
              aria-label={wa.message}
            >
              Consultá con nosotros →
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
