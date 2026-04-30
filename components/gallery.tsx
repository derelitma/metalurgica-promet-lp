'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useWhatsApp } from '@/hooks/use-whatsapp';

const projects = [
  { id: 1, title: 'Portón', neighborhood: 'City Bell' },
  { id: 2, title: 'Escalera', neighborhood: 'Tolosa' },
  { id: 3, title: 'Techo', neighborhood: 'Ensenada' },
  { id: 4, title: 'Ventanas', neighborhood: 'Gonnet' },
  { id: 5, title: 'Puerta', neighborhood: 'La Plata Centro' },
  { id: 6, title: 'Portón corredizo', neighborhood: 'Villa Elisa' },
  { id: 7, title: 'Estructura', neighborhood: 'Los Hornos' },
  { id: 8, title: 'Escalera exterior', neighborhood: 'Berisso' },
  { id: 9, title: 'Puerta blindada', neighborhood: 'City Bell' },
];

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const wa = useWhatsApp('gallery');

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < projects.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <>
      <section id="trabajos" className="py-20 md:py-32 bg-[#1E293B] relative overflow-hidden steel-texture">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-[#D97706] font-semibold text-[13px] uppercase tracking-[0.15em] mb-3">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-[0.02em]">
              Trabajos realizados en La Plata
            </h2>
            <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
              De City Bell a Berisso. Lo que hacemos vale la pena.
            </p>
          </motion.div>

          {/* Premium Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                onClick={() => setSelectedIndex(index)}
                className="group relative h-64 overflow-hidden rounded bg-gradient-to-br from-[#334155]/50 to-[#0F172A]/50 border border-[#334155] hover:border-[#D97706]/50 transition-all cursor-pointer hover:shadow-[0_0_30px_rgba(217,119,6,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F172A]/90 z-10" />
                <div className="absolute inset-0 bg-[#D97706]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <p className="text-white font-bold text-lg tracking-[0.02em]">{project.title}</p>
                    <p className="text-[#D97706] text-sm">· {project.neighborhood}</p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-[#0F172A] to-transparent">
                  <p className="text-white font-bold text-sm tracking-[0.02em]">{project.title}</p>
                  <p className="text-[#D97706] text-xs">· {project.neighborhood}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Premium CTA Card - NOT a flat orange band */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative bg-[#0F172A] rounded border-t-2 border-[#D97706] p-12 text-center shadow-[0_0_40px_rgba(217,119,6,0.1)]">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#D97706] rounded-tl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#D97706] rounded-tr" />
              
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-[0.02em]">
                Tu casa puede quedar así.
              </h3>
              <p className="text-[#94A3B8] text-lg mb-8">
                Un presupuesto gratis es todo lo que necesitás.
              </p>
              <motion.a
                href={wa.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706] text-white px-8 py-4 rounded font-bold uppercase tracking-[0.05em] text-sm transition-all btn-premium shadow-lg hover:shadow-[0_0_30px_rgba(217,119,6,0.25)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cta
                aria-label={wa.message}
              >
                QUIERO MI PRESUPUESTO
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl bg-[#0F172A] border-[#334155]">
          <DialogTitle className="sr-only">Galería de proyectos</DialogTitle>
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 z-50 p-2 hover:bg-[#1E293B] rounded transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {selectedIndex !== null && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#334155]/50 to-[#0F172A]/50 h-96 rounded flex items-center justify-center border border-[#334155]">
                <div className="text-center">
                  <p className="text-white font-bold text-2xl tracking-[0.02em]">{projects[selectedIndex].title}</p>
                  <p className="text-[#D97706] text-lg">· {projects[selectedIndex].neighborhood}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={selectedIndex === 0}
                  className="p-2 hover:bg-[#1E293B] rounded disabled:opacity-50 transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <span className="text-[#64748B]">
                  {selectedIndex + 1} / {projects.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={selectedIndex === projects.length - 1}
                  className="p-2 hover:bg-[#1E293B] rounded disabled:opacity-50 transition-colors"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
