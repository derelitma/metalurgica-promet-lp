'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Estructura para nave industrial',
    category: 'Estructuras',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1470',
  },
  {
    id: 2,
    title: 'Mecanizado de precisión CNC',
    category: 'Mecanizado',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1470',
  },
  {
    id: 3,
    title: 'Soldadura estructural certificada',
    category: 'Soldadura',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6cf2?q=80&w=1470',
  },
  {
    id: 4,
    title: 'Fabricación de tanques industriales',
    category: 'Fabricación',
    image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=1470',
  },
  {
    id: 5,
    title: 'Mantenimiento de maquinaria',
    category: 'Mantenimiento',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1470',
  },
  {
    id: 6,
    title: 'Escaleras y barandas metálicas',
    category: 'Estructuras',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1632',
  },
]

const categories = ['Todos', 'Estructuras', 'Mecanizado', 'Soldadura', 'Fabricación', 'Mantenimiento']

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredProjects = selectedCategory === 'Todos'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedImage)
    if (direction === 'prev') {
      const newIndex = currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1
      setSelectedImage(filteredProjects[newIndex].id)
    } else {
      const newIndex = currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1
      setSelectedImage(filteredProjects[newIndex].id)
    }
  }

  const selectedProject = projects.find(p => p.id === selectedImage)

  return (
    <section id="trabajos" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-promet-orange font-semibold text-sm uppercase tracking-wider mb-3">
            Nuestros Trabajos
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-promet-gray-dark mb-4 text-balance">
            Proyectos que hablan por sí solos
          </h2>
          <p className="text-muted-foreground text-lg">
            Cada proyecto es único. Explorá algunos de nuestros trabajos más destacados.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-promet-blue text-white'
                  : 'bg-promet-gray-light text-promet-gray-dark hover:bg-promet-blue/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-xl cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(project.id)}
            >
              <div className={`aspect-[4/3] ${index === 0 ? 'md:aspect-square' : ''}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block text-promet-orange text-sm font-medium mb-1">
                  {project.category}
                </span>
                <h3 className="text-white font-semibold text-lg md:text-xl">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl bg-black/95 border-none p-0">
            <DialogTitle className="sr-only">
              {selectedProject?.title || 'Vista de proyecto'}
            </DialogTitle>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            {selectedProject && (
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full max-h-[80vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <span className="text-promet-orange text-sm font-medium">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-white font-semibold text-xl">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
