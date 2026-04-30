'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Flame, Settings, Building2, Wrench, Scissors, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Flame,
    title: 'Soldadura Industrial',
    description: 'Soldadura MIG, TIG y arco sumergido. Certificación en soldadura estructural y trabajos de alta precisión para la industria.',
    features: ['MIG/MAG', 'TIG', 'Arco sumergido', 'Soldadura estructural'],
  },
  {
    icon: Settings,
    title: 'Mecanizado de Precisión',
    description: 'Torno CNC, fresado y rectificado de alta precisión. Fabricación de piezas a medida con tolerancias mínimas.',
    features: ['Torno CNC', 'Fresado', 'Rectificado', 'Piezas a medida'],
  },
  {
    icon: Building2,
    title: 'Estructuras Metálicas',
    description: 'Diseño y fabricación de estructuras metálicas para construcción industrial, galpones y naves industriales.',
    features: ['Galpones', 'Naves industriales', 'Entrepisos', 'Escaleras'],
  },
  {
    icon: Wrench,
    title: 'Mantenimiento Industrial',
    description: 'Servicio de mantenimiento preventivo y correctivo para maquinaria industrial. Respuesta rápida ante emergencias.',
    features: ['Preventivo', 'Correctivo', 'Emergencias 24/7', 'Paradas programadas'],
  },
  {
    icon: Scissors,
    title: 'Corte y Plegado',
    description: 'Corte láser, plasma y oxicorte. Plegado CNC de chapas con precisión milimétrica.',
    features: ['Corte láser', 'Plasma CNC', 'Oxicorte', 'Plegado CNC'],
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
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

  const Icon = service.icon

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="h-full bg-white hover:shadow-xl transition-all duration-300 group border-0 shadow-md overflow-hidden">
        <CardContent className="p-6">
          <div className="w-14 h-14 bg-promet-blue/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-promet-orange group-hover:scale-110 transition-all duration-300">
            <Icon className="h-7 w-7 text-promet-blue group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-sans font-bold text-xl text-promet-gray-dark mb-3">
            {service.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="text-xs bg-promet-gray-light text-promet-gray-dark px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center gap-1 text-promet-blue hover:text-promet-orange font-medium text-sm transition-colors group/link"
          >
            Solicitar información
            <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
          </a>
        </CardContent>
      </Card>
    </div>
  )
}

export function Services() {
  return (
    <section id="servicios" className="py-20 md:py-28 bg-promet-gray-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-promet-orange font-semibold text-sm uppercase tracking-wider mb-3">
            Nuestros Servicios
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-promet-gray-dark mb-4 text-balance">
            Soluciones metalúrgicas integrales
          </h2>
          <p className="text-muted-foreground text-lg">
            Desde la idea hasta la entrega. Ofrecemos un servicio completo con la más alta calidad y precisión.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-promet-orange hover:bg-promet-orange-light text-white font-semibold px-8"
          >
            <a href="#contacto">Ver todos los servicios</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
