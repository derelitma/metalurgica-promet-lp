'use client';

import { ChevronDown, Check, Clock, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWhatsApp } from '@/hooks/use-whatsapp';

const trustIndicators = [
  { icon: Check, text: '60 años cumpliendo' },
  { icon: Clock, text: 'Respuesta en <24hs' },
  { icon: Home, text: 'Medición a domicilio sin cargo' },
];

export function Hero() {
  const wa = useWhatsApp('hero');

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-28"
      style={{
        backgroundColor: '#111318',
        backgroundImage: `
          linear-gradient(rgba(232,117,26,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232,117,26,0.03) 1px, transparent 1px),
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(30,30,30,0.5) 0%, transparent 70%)
        `,
        backgroundSize: '60px 60px, 60px 60px, 100% 100%',
      }}
    >
      {/* Welder sparks effect - subtle motion blur in corner */}
      <div 
        className="absolute top-20 right-0 w-[400px] h-[400px] opacity-[0.06] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 30%, #E8751A 0%, #F59E0B 20%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />
      <div 
        className="absolute bottom-40 left-0 w-[300px] h-[300px] opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 70%, #E8751A 0%, transparent 50%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Subtle floating geometric elements */}
      <motion.div
        className="absolute top-32 right-16 w-40 h-40 border border-white/10 rounded hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        style={{ transform: 'rotate(45deg)' }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-24 h-24 border border-[#E8751A]/10 rounded hidden lg:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-[#E8751A] font-semibold text-[13px] tracking-[0.08em] uppercase shadow-[0_0_30px_rgba(232,117,26,0.1)] backdrop-blur-sm">
              <span className="text-[#F59E0B]">&#10022;</span>
              Tradición y Calidad desde 1960
            </span>
          </motion.div>

          {/* Main H1 - Authority First */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-[1.1] text-balance uppercase"
            style={{ 
              fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif',
              fontWeight: 800,
              textShadow: '0 4px 10px rgba(0,0,0,0.5)',
              letterSpacing: '0.02em',
            }}
          >
            Tu casa segura, con el respaldo de{' '}
            <span className="bg-gradient-to-r from-[#E8751A] to-[#F59E0B] bg-clip-text text-transparent">
              60 años
            </span>{' '}
            de herrería en La Plata.
          </motion.h1>

          {/* Sub-headline - Updated to include industrial services */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            Corte, plegado y cilindrado de chapas para herreros e industria. Carpintería metálica completa. 60 años en La Plata. Presupuesto en el día.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            {/* Primary CTA - Pulse Animation */}
            <motion.a
              href={wa.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-[#E8751A] hover:bg-[#C96318] text-white font-bold rounded-lg tracking-[0.05em] uppercase text-sm transition-all inline-flex items-center justify-center gap-2 animate-pulse-glow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cta
              aria-label={wa.message}
            >
              PEDIR PRESUPUESTO POR WHATSAPP
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </motion.a>
            
            {/* Secondary CTA - Ghost Style */}
            <motion.button
              onClick={() => {
                const trabajosSection = document.getElementById('trabajos');
                trabajosSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border border-white/30 hover:border-[#E8751A] text-white hover:text-[#E8751A] font-bold rounded-lg tracking-[0.05em] uppercase text-sm transition-all bg-transparent backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VER TRABAJOS REALIZADOS
            </motion.button>
          </motion.div>

          {/* Trust Indicators Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8"
          >
            {trustIndicators.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-white/70">
                <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <item.icon className="w-3 h-3 text-[#E8751A]" />
                </div>
                <span className="text-xs sm:text-sm font-medium tracking-wide">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Quality Seal - Psychological Trigger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="inline-block"
          >
            <div className="px-4 py-2 border border-white/20 rounded bg-white/5 backdrop-blur-sm">
              <p className="text-[11px] sm:text-xs text-white/50 tracking-[0.1em] uppercase">
                <span className="text-[#E8751A]">Garantía Promet:</span> Tres generaciones fabricando en Calle 43.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-5 h-5 text-white/40" />
      </motion.div>
    </section>
  );
}
