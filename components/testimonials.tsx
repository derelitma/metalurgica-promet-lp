'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Carlos Méndez',
    role: 'Gerente de Planta',
    company: 'Industrias del Sur S.A.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    content: 'Trabajamos con Promet hace más de 15 años. Su compromiso con la calidad y los plazos de entrega es excepcional. Son nuestros socios estratégicos en todo lo relacionado a metalúrgica.',
    rating: 5,
  },
  {
    id: 2,
    name: 'María González',
    role: 'Directora de Operaciones',
    company: 'Constructora Belgrano',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    content: 'Las estructuras que nos fabricaron para nuestro último proyecto fueron impecables. El equipo técnico de Promet entendió nuestras necesidades desde el primer momento.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Roberto Fernández',
    role: 'Jefe de Mantenimiento',
    company: 'Aceros Pampeanos',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
    content: 'Cuando tuvimos una emergencia con nuestra línea de producción, Promet respondió en tiempo récord. Su servicio de emergencia 24/7 nos salvó de pérdidas millonarias.',
    rating: 5,
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6 md:p-8">
          {/* Quote icon */}
          <Quote className="h-10 w-10 text-promet-orange/20 mb-4" />

          {/* Rating */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          {/* Content */}
          <p className="text-promet-gray-dark leading-relaxed mb-6 italic">
            &ldquo;{testimonial.content}&rdquo;
          </p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-promet-gray-dark">
                {testimonial.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {testimonial.role}
              </div>
              <div className="text-sm text-promet-orange font-medium">
                {testimonial.company}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="testimonios" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-promet-orange font-semibold text-sm uppercase tracking-wider mb-3">
            Testimonios
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-promet-gray-dark mb-4 text-balance">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-muted-foreground text-lg">
            La confianza de nuestros clientes es nuestro mayor activo. Más de 500 empresas nos eligen.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
