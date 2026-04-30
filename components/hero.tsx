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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-28 steel-texture"
      style={{
        backgroundColor: '#0F172A',
        backgroundImage: `
          linear-gradient(rgba(217,119,6,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(217,119,6,0.03) 1px, transparent 1px),
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(30,41,59,0.5) 0%, transparent 70%)
        `,
        backgroundSize: '60px 60px, 60px 60px, 100% 100%',
      }}
    >
      {/* Subtle floating geometric elements */}
      <motion.div
        className="absolute top-32 right-16 w-40 h-40 border border-[#334155]/30 rounded"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ transform: 'rotate(45deg)' }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-24 h-24 border border-[#D97706]/10 rounded"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Premium badge with subtle glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-8"
          >
            <span className="inline-flex items-center px-4 py-2 rounded bg-[#1E293B] border border-[#334155] text-[#D97706] font-semibold text-[13px] tracking-[0.1em] uppercase shadow-[0_0_30px_rgba(217,119,6,0.1)]">
              Desde 1960 en La Plata
            </span>
          </motion.div>

          {/* Main heading with premium typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight text-balance tracking-[0.02em]"
          >
            Portones, Escaleras y Techos
            <br />
            que duran 60 años en{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] bg-clip-text text-transparent">La Plata</span>
              <span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#D97706] to-[#B45309] rounded"
              />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-[#94A3B8] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Fabricación e instalación a medida. Presupuesto gratis en menos de 24hs.
          </motion.p>

          {/* CTA buttons - Premium Style */}
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
              className="px-8 py-4 bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706] text-white font-bold rounded tracking-[0.05em] uppercase text-sm transition-all btn-premium shadow-lg hover:shadow-[0_0_30px_rgba(217,119,6,0.25)] inline-block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cta
              aria-label={wa.message}
            >
              PEDIR PRESUPUESTO
            </motion.a>
            <motion.button
              onClick={() => {
                const contactSection = document.getElementById('contacto');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border border-[#334155] hover:border-[#D97706] text-[#94A3B8] hover:text-white font-bold rounded tracking-[0.05em] uppercase text-sm transition-all bg-[#1E293B]/50 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              FORMULARIO DE CONTACTO
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-5 h-5 text-[#475569]" />
      </motion.div>
    </section>
  );
}
