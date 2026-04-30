'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, MessageCircle, Phone } from 'lucide-react'

function CountUp({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
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
      {count}
      {suffix}
    </span>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-promet-blue">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebb6cf2?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-promet-blue/50 via-promet-blue/70 to-promet-blue" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border border-promet-orange/20 rounded-full animate-float opacity-50" />
      <div className="absolute bottom-1/3 right-10 w-20 h-20 border border-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-promet-orange/10 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 bg-promet-orange rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              Más de 60 años de trayectoria
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6 animate-fade-in-up stagger-1 text-balance">
            Transformamos metal en{' '}
            <span className="text-promet-orange">soluciones industriales</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-2 text-pretty">
            Soldadura de precisión, mecanizado CNC y fabricación de estructuras metálicas. 
            Calidad certificada y entregas a tiempo desde 1964.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-10 animate-fade-in-up stagger-3">
            <div className="text-center">
              <div className="font-sans font-bold text-3xl md:text-4xl text-promet-orange">
                <CountUp end={60} suffix="+" />
              </div>
              <div className="text-white/70 text-sm mt-1">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="font-sans font-bold text-3xl md:text-4xl text-promet-orange">
                <CountUp end={2500} suffix="+" />
              </div>
              <div className="text-white/70 text-sm mt-1">Proyectos completados</div>
            </div>
            <div className="text-center">
              <div className="font-sans font-bold text-3xl md:text-4xl text-promet-orange">
                <CountUp end={98} suffix="%" />
              </div>
              <div className="text-white/70 text-sm mt-1">Clientes satisfechos</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-4">
            <Button
              asChild
              size="lg"
              className="bg-promet-orange hover:bg-promet-orange-light text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-promet-orange/25 transition-all hover:scale-105"
            >
              <a
                href="https://wa.me/5411XXXXXXXX?text=Hola,%20quiero%20solicitar%20un%20presupuesto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Solicitar Presupuesto
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold px-8 py-6 text-lg transition-all"
            >
              <a href="tel:+5411XXXXXXXX" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Llamar Ahora
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-indicator">
        <a href="#servicios" className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors">
          <span className="text-xs uppercase tracking-widest">Explorar</span>
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  )
}
