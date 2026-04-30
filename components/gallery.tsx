'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useWhatsApp } from '@/hooks/use-whatsapp';

const projects = [
  {
    id: 1,
    title: 'Portón Automatizado',
    neighborhood: 'Centro',
    category: 'Portones',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1470',
  },
  {
    id: 2,
    title: 'Puerta Blindada Premium',
    neighborhood: 'Zona Norte',
    category: 'Puertas',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1470',
  },
  {
    id: 3,
    title: 'Escalera Espiral Moderna',
    neighborhood: 'Barrio Sur',
    category: 'Escaleras',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6cf2?q=80&w=1470',
  },
  {
    id: 4,
    title: 'Ventanas Doble Vidrio',
    neighborhood: 'Centro',
    category: 'Ventanas',
    image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=1470',
  },
  {
    id: 5,
    title: 'Techo Retráctil',
    neighborhood: 'Zona Norte',
    category: 'Techos',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1470',
  },
  {
    id: 6,
    title: 'Barandas de Seguridad',
    neighborhood: 'Barrio Sur',
    category: 'Escaleras',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1632',
  },
];

const categories = ['Todos', 'Portones', 'Puertas', 'Ventanas', 'Escaleras', 'Techos'];

function GalleryItem({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const wa = useWhatsApp('gallery');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-lg bg-[#0A0B0D] cursor-pointer h-64 md:h-72"
      onClick={() => window.open(wa.link, '_blank', 'noopener,noreferrer')}
    >
      {/* Image with Grayscale Reveal */}
      <motion.img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
        initial={{ filter: 'grayscale(100%) brightness(0.7)' }}
        whileHover={{ filter: 'grayscale(0%) brightness(1)', scale: 1.03 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

      {/* Content - Fade in on Hover */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-[#94A3B8] text-sm mb-4">{project.neighborhood}</p>
        <motion.button
          className="bg-[#E8751A] hover:bg-[#FF8533] text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Ver trabajo de ${project.category} en ${project.neighborhood}`}
        >
          Ver trabajo →
        </motion.button>
      </motion.div>

      {/* Service Badge - Always visible */}
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-[#E8751A] text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
          {project.category}
        </span>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const wa = useWhatsApp('gallery');

  const filteredProjects =
    selectedCategory === 'Todos'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === filteredProjects.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      id="trabajos"
      className="py-20 bg-[#1A1C20]"
      data-section="trabajos"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#E8751A] text-sm font-bold uppercase tracking-widest mb-2">
            GALERÍA DE TRABAJOS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros proyectos en acción
          </h2>
          <p className="text-[#94A3B8] text-lg">
            Trabajos realizados en toda La Plata y zona de influencia
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedImageIndex(0);
              }}
              className={`px-6 py-2 rounded-full font-semibold uppercase text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-[#E8751A] text-white'
                  : 'border border-white/10 text-white hover:border-[#E8751A]/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Filtrar por ${category}`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project, index) => (
            <GalleryItem key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#E8751A]/10 to-[#FF8533]/10 border border-[#E8751A]/30 rounded-xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Ves algo que te gusta?
          </h3>
          <p className="text-[#94A3B8] text-lg mb-6 max-w-2xl mx-auto">
            Contamos con los mejores profesionales y tecnología para hacer realidad tu proyecto.
          </p>
          <motion.a
            href={wa.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E8751A] hover:bg-[#FF8533] text-white px-8 py-4 rounded-lg font-bold uppercase text-sm transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cta
            aria-label={wa.message}
          >
            Consultar por tu proyecto →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
