'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageSquare, FileText, Settings, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: MessageSquare,
    title: 'Escribinos',
    description: 'Nos contactás por WhatsApp, teléfono o formulario. Contanos tu proyecto.',
  },
  {
    number: '2',
    icon: FileText,
    title: 'Presupuesto',
    description: 'En menos de 24hs recibís presupuesto detallado, sin cargo ni compromiso.',
  },
  {
    number: '3',
    icon: Settings,
    title: 'Fabricación',
    description: 'Comenzamos la fabricación con los más altos estándares de calidad.',
  },
  {
    number: '4',
    icon: CheckCircle,
    title: 'Entrega',
    description: 'Entregamos en tiempo y forma. Si algo no quedó como acordamos, lo resolvemos. Siempre.',
  },
]

function ProcessStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const Icon = step.icon
  const isLast = index === steps.length - 1

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Mobile vertical connector line - connects bottom of circle to top of next */}
      {!isLast && (
        <div className="lg:hidden absolute top-[6.5rem] left-1/2 -translate-x-1/2 w-0.5 h-16 overflow-hidden">
          <div 
            className={`w-full border-l-2 border-dashed border-[#E8751A]/30 h-full transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: `${index * 150 + 300}ms` }}
          />
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        {/* Number badge */}
        <div className="relative mb-4">
          <div className="w-24 h-24 bg-[#003366] rounded-2xl flex items-center justify-center shadow-lg">
            <Icon className="h-10 w-10 text-white" />
          </div>
          <span className="absolute -top-2 -right-2 w-8 h-8 bg-[#E8751A] rounded-full flex items-center justify-center text-white font-bold text-sm">
            {step.number}
          </span>
        </div>

        <h3 className="font-sans font-bold text-xl text-[#333333] mb-2">
          {step.title}
        </h3>
        <p className="text-[#666666] text-sm leading-relaxed max-w-[250px]">
          {step.description}
        </p>
      </div>
    </div>
  )
}

export function Process() {
  return (
    <section id="proceso" className="py-20 md:py-28 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[#E8751A] font-semibold text-sm uppercase tracking-wider mb-3">
            Cómo Trabajamos
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#333333] mb-4 text-balance">
            Un proceso simple y transparente
          </h2>
          <p className="text-[#666666] text-lg">
            Desde el primer contacto hasta la entrega final, te acompañamos en cada paso.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Desktop: Single horizontal dashed line behind all icons */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E8751A]/0 via-[#E8751A]/30 to-[#E8751A]/0 border-t-2 border-dashed border-[#E8751A]/30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <ProcessStep key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
