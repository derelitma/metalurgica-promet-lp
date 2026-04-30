'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Shield, Clock, Zap, Award, HeartHandshake } from 'lucide-react'

const reasons = [
  {
    icon: Shield,
    title: 'Calidad Garantizada',
    description: 'Procesos certificados y materiales de primera calidad. Cada trabajo cuenta con garantía escrita.',
  },
  {
    icon: Clock,
    title: 'Puntualidad',
    description: 'Cumplimos con los plazos acordados. Sabemos que el tiempo en la industria es dinero.',
  },
  {
    icon: Zap,
    title: 'Respuesta Rápida',
    description: 'Presupuestos en 24hs y servicio de emergencia disponible las 24 horas, los 7 días.',
  },
  {
    icon: Award,
    title: 'Experiencia Comprobada',
    description: '60 años perfeccionando nuestra técnica. Conocemos cada desafío de la industria.',
  },
  {
    icon: HeartHandshake,
    title: 'Trato Personalizado',
    description: 'Cada cliente es único. Entendemos tus necesidades y proponemos la mejor solución.',
  },
  {
    icon: CheckCircle2,
    title: 'Precio Justo',
    description: 'Relación calidad-precio transparente. Sin sorpresas ni costos ocultos.',
  },
]

function ReasonCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
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

  const Icon = reason.icon

  return (
    <div
      ref={ref}
      className={`flex gap-4 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex-shrink-0 w-12 h-12 bg-[#D97706]/10 border border-[#D97706]/20 rounded flex items-center justify-center">
        <Icon className="h-6 w-6 text-[#D97706]" />
      </div>
      <div>
        <h3 className="font-semibold text-lg text-[#1E293B] mb-1 tracking-[0.02em]">
          {reason.title}
        </h3>
        <p className="text-[#64748B] text-sm leading-relaxed">
          {reason.description}
        </p>
      </div>
    </div>
  )
}

export function WhyUs() {
  return (
    <section id="nosotros" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div>
            <span className="inline-block text-[#D97706] font-semibold text-[13px] uppercase tracking-[0.15em] mb-3">
              Por Qué Elegirnos
            </span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#1E293B] mb-6 text-balance tracking-[0.02em]">
              La diferencia está en los detalles
            </h2>
            <p className="text-[#64748B] text-lg mb-10">
              No solo fabricamos piezas, construimos relaciones duraderas basadas en la confianza y la excelencia. 
              Cada proyecto es una oportunidad para demostrar nuestro compromiso.
            </p>
            <div className="grid gap-6">
              {reasons.map((reason, index) => (
                <ReasonCard key={reason.title} reason={reason} index={index} />
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded overflow-hidden border border-[#E2E8F0]">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1470"
                alt="Taller metalúrgico Promet"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 to-transparent" />
            </div>
            {/* Premium Floating Badge */}
            <div className="absolute -bottom-6 -left-6 md:bottom-8 md:-left-8 bg-white rounded border border-[#E2E8F0] shadow-xl p-6 max-w-[200px]">
              <div className="font-black text-5xl bg-gradient-to-r from-[#D97706] to-[#B45309] bg-clip-text text-transparent mb-1">60</div>
              <div className="text-[#1E293B] font-semibold tracking-[0.02em]">Años de</div>
              <div className="text-[#1E293B] font-semibold tracking-[0.02em]">Excelencia</div>
            </div>
            {/* Decorative corner element */}
            <div className="absolute -top-3 -right-3 w-20 h-20 border-2 border-[#D97706]/30 rounded -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
