'use client';

import { motion } from 'framer-motion';
import { useWhatsApp } from '@/hooks/use-whatsapp';

export function ConversionBand() {
  const wa = useWhatsApp('floating');

  return (
    <section className="py-16 md:py-24 bg-[#E8751A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#003366] rounded-full blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111318] mb-4 leading-tight">
            ¿Todo claro? Pedí tu presupuesto
          </h2>
          <p className="text-[#111318]/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
            Presupuesto gratis en 24/48hs. Sin sorpresas, sin trampas. Somos 60 años cumpliendo.
          </p>

          <motion.a
            href={wa.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#111318] hover:bg-[#1A1C20] text-white px-10 py-5 rounded-lg font-bold uppercase text-lg transition-colors shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cta
            aria-label={wa.message}
          >
            ABRIR WHATSAPP →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
