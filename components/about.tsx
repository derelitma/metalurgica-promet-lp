'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useWhatsApp } from '@/hooks/use-whatsapp';

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const wa = useWhatsApp('about');

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
      className="py-20 md:py-32 bg-[#111318] relative overflow-hidden"
      data-section="nosotros"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              No vendemos hierro.
              <br />
              Vendemos palabra.
            </h2>

            <div className="space-y-6 text-[#94A3B8]">
              <p className="text-base leading-relaxed">
                En Promet no somos una empresa nueva con promesas nuevas. Hace más de 60 años que el mismo apellido firma cada portón, cada escalera y cada techo que sale de nuestro taller en Calle 43.
              </p>

              <p className="text-base leading-relaxed">
                El cliente que nos eligió hace 30 años manda a sus hijos hoy. Eso no se finge.
              </p>

              <motion.a
                href={wa.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#E8751A] hover:bg-[#FF8533] text-white font-bold rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cta
                aria-label={wa.message}
              >
                ESCRIBINOS →
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - 60 Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2 flex items-center justify-center h-[500px]"
          >
            {/* Big 60 with stroke */}
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
              style={{
                fontSize: '260px',
                fontWeight: '900',
                color: 'transparent',
                WebkitTextStroke: '2px #E8751A',
                lineHeight: '1',
                textAlign: 'center',
              }}
            >
              60
            </motion.div>

            {/* Badge overlay */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E8751A] rounded-full px-4 py-2 z-10"
              initial={{ scale: 0 }}
              animate={isVisible ? { scale: 1 } : {}}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <span className="text-white text-xs font-bold uppercase tracking-widest">Desde 1960</span>
            </motion.div>

            {/* Text below */}
            <div className="absolute bottom-0 left-0 right-0 text-center">
              <p className="text-[#94A3B8] text-lg font-medium">
                años fabricando en La Plata
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
