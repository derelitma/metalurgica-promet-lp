'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageSquare, FileText, Settings, CheckCircle, Send, Calculator, Factory as FactoryIcon, Truck } from 'lucide-react'

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

const herreroSteps = [
  {
    number: '1',
    icon: Send,
    title: 'Mandá tus medidas',
    description: 'Por WhatsApp con las medidas justas y lo que necesitás.',
  },
  {
    number: '2',
    icon: Calculator,
    title: 'Te cotizamos por kilo',
    description: 'Te pasamos presupuesto estimativo en el día. Sin vueltas.',
  },
  {
    number: '3',
    icon: FactoryIcon,
    title: 'Lo fabricamos',
    description: 'Cortamos, plegamos y entregamos en 3-4 días según cantidad.',
  },
  {
    number: '4',
    icon: Truck,
    title: 'Retirás o entregamos',
    description: 'Lo tenés listo en el taller de Calle 43 o coordinamos envío.',
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
      {/* Mobile vertical connector line */}
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
        {/* Premium Icon Container */}
        <div className="relative mb-4">
          <div className="w-24 h-24 bg-white border border-[rgba(0,0,0,0.06)] rounded-xl flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <Icon className="h-10 w-10 text-[#E8751A]" />
          </div>
          <span className="absolute -top-2 -right-2 w-8 h-8 bg-[#E8751A] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {step.number}
          </span>
        </div>

        <h3 className="font-bold text-xl text-[#111318] mb-2 tracking-[0.02em]">
          {step.title}
        </h3>
        <p className="text-[#4A4A48] text-sm leading-relaxed max-w-[250px]">
          {step.description}
        </p>
      </div>
    </div>
  )
}

export function Process() {
  return (
    <section id="proceso" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[#E8751A] font-semibold text-[13px] uppercase tracking-[0.15em] mb-3">
            Cómo Trabajamos
          </span>
          <h2 
            className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#111318] mb-4 text-balance tracking-[0.02em]"
            style={{ fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif' }}
          >
            Un proceso simple y transparente
          </h2>
          <p className="text-[#4A4A48] text-lg">
            Desde el primer contacto hasta la entrega final, te acompañamos en cada paso.
          </p>
        </div>

        {/* Residential Process Steps */}
        <div className="relative mb-20">
          {/* Desktop: Horizontal dashed line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 border-t-2 border-dashed border-[#E8751A]/30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <ProcessStep key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Herrero Process Section */}
        <div className="bg-[#F7F7F5] rounded-2xl p-8 md:p-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block bg-[#E8751A] text-white font-semibold text-[13px] uppercase tracking-[0.15em] px-4 py-2 rounded-full mb-4">
              Para Herreros
            </span>
            <h3 
              className="font-bold text-2xl md:text-3xl lg:text-4xl text-[#111318] mb-3 tracking-[0.02em]"
              style={{ fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif' }}
            >
              ¿Sos herrero? Así trabajamos:
            </h3>
            <p className="text-[#4A4A48]">
              Proceso ágil para profesionales. Cotizamos por kilo, entregamos rápido.
            </p>
          </div>

          <div className="relative">
            {/* Desktop: Horizontal dashed line */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 border-t-2 border-dashed border-[#E8751A]/30 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
              {herreroSteps.map((step, index) => (
                <ProcessStep key={`herrero-${step.number}`} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
