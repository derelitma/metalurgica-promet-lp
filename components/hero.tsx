'use client';

import { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWhatsApp } from '@/hooks/use-whatsapp';

function CountUp({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Hero() {
  const wa = useWhatsApp('hero');

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#003366]"
      data-section="hero"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 -right-40 w-80 h-80 bg-[#FF6600]/5 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 -left-40 w-80 h-80 bg-[#004488]/20 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-20 pb-20">
        {/* Authority Badge with Shimmer */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-block">
            <div
              className="bg-gradient-to-r from-[#E8751A]/10 via-[#E8751A]/30 to-[#E8751A]/10 px-4 py-2 rounded-full border border-[#E8751A]/30 text-[#E8751A] text-sm font-bold uppercase tracking-wide animate-shimmer"
            >
              60 años en Metal
            </div>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          El metal que<br />tu casa necesita,<br />hecho en La Plata.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-[#94A3B8] mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          No des más vueltas buscando. En Promet medimos, fabricamos e instalamos. Presupuesto gratis en 24/48hs.
        </motion.p>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-3 gap-4 md:gap-8 mb-12 max-w-2xl mx-auto"
        >
          <div className="border border-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-[#E8751A] mb-1">
              <CountUp end={60} />
            </div>
            <p className="text-[#94A3B8] text-xs uppercase">Años</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-[#E8751A] mb-1">
              <CountUp end={50} />+
            </div>
            <p className="text-[#94A3B8] text-xs uppercase">Consultas/mes</p>
          </div>
          <div className="border border-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl md:text-3xl font-bold text-[#E8751A] mb-1">24/48hs</div>
            <p className="text-[#94A3B8] text-xs uppercase">Respuesta</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.a
            href={wa.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#E8751A] hover:bg-[#FF8533] text-white px-8 py-4 rounded-lg font-bold uppercase text-sm transition-colors whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cta
            aria-label={wa.message}
          >
            PEDIR PRESUPUESTO GRATIS →
          </motion.a>
          <motion.a
            href="#contacto"
            className="border-2 border-white hover:border-[#E8751A] text-white hover:text-[#E8751A] px-8 py-4 rounded-lg font-bold uppercase text-sm transition-all whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Ir a formulario de contacto"
          >
            Enviar Formulario
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <motion.a
            href="#servicios"
            className="text-[#94A3B8] hover:text-white transition-colors flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-label="Desplazarse hacia abajo"
          >
            <span className="text-xs uppercase tracking-wide">Desplaza</span>
            <ChevronDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
