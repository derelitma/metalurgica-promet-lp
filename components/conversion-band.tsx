'use client';

import { motion } from 'framer-motion';
import { useWhatsApp } from '@/hooks/use-whatsapp';

export function ConversionBand() {
  const wa = useWhatsApp('floating');

  return (
    <section className="py-16 md:py-24 bg-[#0F172A] relative overflow-hidden steel-texture">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Premium Floating Card with Amber Glow */}
          <div className="relative bg-[#1E293B] rounded border border-[#334155] p-10 md:p-14 text-center shadow-[0_0_60px_rgba(217,119,6,0.1)]">
            {/* Amber accent line at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#D97706] to-[#B45309] rounded-b" />
            
            {/* Decorative corner elements */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-[#334155]" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-[#334155]" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-[#334155]" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-[#334155]" />

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-[0.02em]">
              ¿Todo claro? Pedí tu presupuesto
            </h2>
            <p className="text-[#94A3B8] text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Presupuesto gratis en menos de 24hs. Sin sorpresas, sin trampas. Somos 60 años cumpliendo.
            </p>

            <motion.a
              href={wa.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706] text-white px-10 py-5 rounded font-bold uppercase text-lg tracking-[0.05em] transition-all btn-premium shadow-lg hover:shadow-[0_0_40px_rgba(217,119,6,0.3)]"
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
