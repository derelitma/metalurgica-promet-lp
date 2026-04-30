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
      <section className="py-20 md:py-32 bg-[#1A1C20] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Trabajos realizados en La Plata
            </h2>
            <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
              De City Bell a Berisso. Lo que hacemos vale la pena.
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                onClick={() => setSelectedIndex(index)}
                className="group relative h-64 overflow-hidden rounded-lg bg-gradient-to-br from-[#E8751A]/20 to-[#003366]/20 border border-[#E8751A]/20 hover:border-[#E8751A] transition-all cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111318]/90 z-10" />
                <div className="absolute inset-0 bg-[#E8751A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{project.title}</p>
                    <p className="text-[#E8751A] text-sm">· {project.neighborhood}</p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-[#111318] to-transparent">
                  <p className="text-white font-bold text-sm">{project.title}</p>
                  <p className="text-[#E8751A] text-xs">· {project.neighborhood}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* CTA Band */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#E8751A] rounded-xl p-12 text-center"
          >
            <h3 className="text-3xl md:text-4xl font-black text-[#111318] mb-2">
              Tu casa puede quedar así.
            </h3>
            <p className="text-[#111318] text-lg mb-8 opacity-90">
              Un presupuesto gratis es todo lo que necesitás.
            </p>
            <motion.a
              href={wa.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#111318] hover:bg-[#1A1C20] text-white px-8 py-4 rounded-lg font-bold uppercase transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cta
              aria-label={wa.message}
            >
              QUIERO MI PRESUPUESTO →
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl bg-[#111318] border-[#E8751A]/20">
          <DialogTitle className="sr-only">Galería de proyectos</DialogTitle>
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 z-50 p-2 hover:bg-[#E8751A]/20 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {selectedIndex !== null && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#E8751A]/20 to-[#003366]/20 h-96 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white font-bold text-2xl">{projects[selectedIndex].title}</p>
                  <p className="text-[#E8751A] text-lg">· {projects[selectedIndex].neighborhood}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={selectedIndex === 0}
                  className="p-2 hover:bg-[#E8751A]/20 rounded-full disabled:opacity-50 transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <span className="text-[#94A3B8]">
                  {selectedIndex + 1} / {projects.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={selectedIndex === projects.length - 1}
                  className="p-2 hover:bg-[#E8751A]/20 rounded-full disabled:opacity-50 transition-colors"
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
