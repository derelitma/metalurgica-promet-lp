'use client'

import { motion } from 'framer-motion'

const clients = [
  'Hipermercado Nini',
  'Aniuri',
  'Hispanoamericana',
  'Ipensa',
  'Zoo de La Plata',
  'Rol Ingeniería',
  'Credil',
]

export function Clients() {
  return (
    <section className="py-16 md:py-20 bg-[#F7F7F5]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block text-[#E8751A] font-semibold text-[13px] uppercase tracking-[0.15em] mb-3">
            Confianza
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#111318] tracking-[0.02em]"
            style={{ fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif' }}
          >
            Empresas que confían en nosotros
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-[rgba(0,0,0,0.06)] rounded-full px-5 py-2.5 text-[#4A4A48] text-sm font-medium shadow-sm"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              {client}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
