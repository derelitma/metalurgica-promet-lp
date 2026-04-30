'use client'

import { useEffect, useRef, useState } from 'react'

export function About() {
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
    <section id="nosotros" className="py-20 md:py-28 bg-promet-gray-light">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Left Column - Visual with 60 anchor */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1470"
                alt="Equipo de Metalúrgica Promet"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-promet-blue/80 via-promet-blue/20 to-transparent" />
            </div>
            
            {/* Large "60" visual anchor */}
            <div className="absolute -top-8 -right-8 md:top-8 md:-right-12 z-10">
              <div className="relative">
                <span className="font-sans font-black text-[120px] md:text-[180px] leading-none text-promet-orange opacity-20">
                  60
                </span>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                  <span className="block font-sans font-bold text-2xl md:text-3xl text-promet-blue">
                    Años
                  </span>
                  <span className="block text-promet-gray-dark font-medium">
                    de historia
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-promet-orange/30 rounded-2xl -z-10" />
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-promet-orange font-semibold text-sm uppercase tracking-wider mb-3">
              Nuestra Historia
            </span>
            <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-promet-gray-dark mb-6 text-balance">
              60 años transformando la industria argentina
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Desde 1964, <strong className="text-promet-gray-dark">Metalúrgica Promet</strong> ha sido sinónimo de 
                excelencia en la industria metalúrgica argentina. Lo que comenzó como un pequeño taller familiar 
                se ha convertido en uno de los referentes del sector.
              </p>
              <p>
                Tres generaciones de profesionales han perfeccionado nuestras técnicas, combinando 
                la tradición artesanal con la tecnología más avanzada. Contamos con maquinaria CNC 
                de última generación y un equipo de más de 50 profesionales altamente capacitados.
              </p>
              <p>
                Nuestra filosofía es simple: <strong className="text-promet-gray-dark">cada proyecto merece la máxima dedicación</strong>. 
                Ya sea una pieza única o una producción en serie, aplicamos los mismos estándares 
                de calidad que nos han hecho ganar la confianza de más de 500 empresas.
              </p>
            </div>

            {/* Key points */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <div className="font-sans font-bold text-3xl text-promet-orange mb-1">1964</div>
                <div className="text-sm text-muted-foreground">Año de fundación</div>
              </div>
              <div>
                <div className="font-sans font-bold text-3xl text-promet-orange mb-1">3</div>
                <div className="text-sm text-muted-foreground">Generaciones</div>
              </div>
              <div>
                <div className="font-sans font-bold text-3xl text-promet-orange mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Profesionales</div>
              </div>
              <div>
                <div className="font-sans font-bold text-3xl text-promet-orange mb-1">ISO</div>
                <div className="text-sm text-muted-foreground">Certificación de calidad</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
