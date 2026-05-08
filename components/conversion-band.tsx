'use client';

import { motion } from 'framer-motion';
import { useWhatsApp } from '@/hooks/use-whatsapp';

export function ConversionBand() {
  const wa = useWhatsApp('floating');

  return (
    <section className="py-16 md:py-24 bg-[#111318] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Premium Floating Card */}
          <div className="relative bg-[#1a1d24] rounded-xl border border-white/10 p-10 md:p-14 text-center shadow-[0_0_60px_rgba(232,117,26,0.1)]">
            {/* Orange accent line at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#E8751A] rounded-b" />
            
            {/* Decorative corner elements */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-white/10" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-white/10" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-white/10" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-white/10" />

            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-[0.02em]"
              style={{ fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif' }}
            >
              ¿Todo claro? Pedí tu presupuesto
            </h2>
            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Presupuesto gratis en menos de 24hs. Sin sorpresas, sin trampas. Somos 60 años cumpliendo.
            </p>

            <motion.a
              href={wa.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#E8751A] hover:bg-[#C96318] text-white px-10 py-5 rounded-lg font-bold uppercase text-lg tracking-[0.05em] transition-all shadow-lg hover:shadow-[0_0_40px_rgba(232,117,26,0.3)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cta
              aria-label={wa.message}
            >
              ABRIR WHATSAPP
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
