'use client'

import { useEffect, useRef, useState } from 'react'
import { Award, Users, Clock, ThumbsUp } from 'lucide-react'

const stats = [
  {
    icon: Clock,
    value: 60,
    suffix: '+',
    label: 'Años de experiencia',
    description: 'Desde 1964 al servicio de la industria',
  },
  {
    icon: Award,
    value: 2500,
    suffix: '+',
    label: 'Proyectos completados',
    description: 'En diversas industrias del país',
  },
  {
    icon: Users,
    value: 500,
    suffix: '+',
    label: 'Clientes activos',
    description: 'Empresas confían en nosotros',
  },
  {
    icon: ThumbsUp,
    value: 98,
    suffix: '%',
    label: 'Satisfacción',
    description: 'Índice de clientes satisfechos',
  },
]

function CountUp({ 
  end, 
  duration = 2000, 
  suffix = '' 
}: { 
  end: number
  duration?: number
  suffix?: string 
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime: number
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="py-16 md:py-20 bg-promet-blue relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-promet-orange rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-promet-orange transition-colors duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="font-sans font-bold text-4xl md:text-5xl text-white mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-white/60 text-sm">{stat.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
