import { Button } from '@/components/ui/button'
import { MessageCircle, Phone } from 'lucide-react'

export function ConversionBand() {
  return (
    <section className="py-16 md:py-20 bg-promet-orange relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-promet-blue rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4 text-balance">
            ¿Listo para comenzar tu proyecto?
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Contactanos hoy y recibí un presupuesto personalizado sin cargo en menos de 24 horas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-white/90 text-promet-orange font-semibold px-8 py-6 text-lg shadow-lg transition-all hover:scale-105"
            >
              <a
                href="https://wa.me/5411XXXXXXXX?text=Hola,%20quiero%20solicitar%20un%20presupuesto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Ahora
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold px-8 py-6 text-lg transition-all"
            >
              <a href="tel:+5411XXXXXXXX" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Llamar Ahora
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
