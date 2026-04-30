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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        backgroundColor: '#111318',
        backgroundImage: `
          linear-gradient(rgba(232,117,26,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232,117,26,0.04) 1px, transparent 1px),
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(43,75,111,0.15) 0%, transparent 70%)
        `,
        backgroundSize: '40px 40px, 40px 40px, 100% 100%',
      }}
    >
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 rounded-full border border-[#E8751A]/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-40 h-40 rounded-full border border-[#E8751A]/5"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Shimmer badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-[#E8751A]/10 border border-[#E8751A]/30 animate-shimmer"
          >
            <span className="text-[#E8751A] font-semibold text-sm">Desde 1960 en La Plata</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
          >
            Portones, Escaleras y Techos
            <br />
            que duran 60 años en{' '}
            <span className="relative inline-block">
              <span className="text-[#E8751A]">La Plata</span>
              <span
                className="absolute bottom-0 left-0 w-full h-1 bg-[#E8751A] rounded"
                style={{ marginTop: '0.25rem' }}
              />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-[#94A3B8] mb-4 max-w-2xl mx-auto"
          >
            Fabricación e instalación a medida. Presupuesto gratis en 24hs.
          </motion.p>

          {/* Real urgency copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-[#94A3B8] mb-10"
          >
            Respondemos hoy. Más de 50 consultas esta semana.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.a
              href={wa.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#E8751A] hover:bg-[#FF8533] text-white font-bold rounded-lg transition-colors shadow-lg inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cta
              aria-label={wa.message}
            >
              PEDIR PRESUPUESTO →
            </motion.a>
            <motion.button
              onClick={() => {
                const contactSection = document.getElementById('contacto');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-[#E8751A] text-[#E8751A] hover:bg-[#E8751A]/10 font-bold rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              FORMULARIO DE CONTACTO
            </motion.button>
          </motion.div>

          {/* Real urgency below CTAs */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-[#94A3B8]"
          >
            Respondemos hoy. Más de 50 consultas esta semana.
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#94A3B8] text-xs uppercase tracking-widest">Desplazá</span>
          <ChevronDown className="w-5 h-5 text-[#E8751A] animate-scroll-indicator" />
        </div>
      </motion.div>
    </section>
  );
}
