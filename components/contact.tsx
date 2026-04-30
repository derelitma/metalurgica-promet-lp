'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Dirección',
    value: 'Av. Industrial 1234, Buenos Aires',
    href: 'https://maps.google.com/?q=Buenos+Aires',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+54 11 XXXX-XXXX',
    href: 'tel:+5411XXXXXXXX',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@metalurgicapromet.com.ar',
    href: 'mailto:info@metalurgicapromet.com.ar',
  },
  {
    icon: Clock,
    label: 'Horario',
    value: 'Lun-Vie 8:00-18:00, Sáb 8:00-13:00',
    href: null,
  },
]

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contacto" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Contact Info */}
          <div>
            <span className="inline-block text-promet-orange font-semibold text-sm uppercase tracking-wider mb-3">
              Contacto
            </span>
            <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-promet-gray-dark mb-6 text-balance">
              Hablemos de tu proyecto
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Estamos listos para ayudarte. Contactanos por el medio que prefieras 
              y te responderemos a la brevedad.
            </p>

            {/* Contact Info Items */}
            <div className="space-y-6 mb-10">
              {contactInfo.map((item) => {
                const Icon = item.icon
                const content = (
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-promet-blue/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-promet-orange transition-colors">
                      <Icon className="h-5 w-5 text-promet-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                      <div className="font-medium text-promet-gray-dark">{item.value}</div>
                    </div>
                  </div>
                )

                if (item.href) {
                  return (
                    <a key={item.label} href={item.href} className="block" target={item.href.startsWith('http') ? '_blank' : undefined}>
                      {content}
                    </a>
                  )
                }
                return <div key={item.label}>{content}</div>
              })}
            </div>

            {/* WhatsApp CTA */}
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 shadow-lg shadow-green-500/25"
            >
              <a
                href="https://wa.me/5411XXXXXXXX?text=Hola,%20quiero%20solicitar%20un%20presupuesto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Contactar por WhatsApp
              </a>
            </Button>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-promet-gray-light rounded-2xl p-6 md:p-10">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-sans font-bold text-2xl text-promet-gray-dark mb-2">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-muted-foreground">
                  Nos pondremos en contacto en menos de 24 horas.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="mt-6"
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-sans font-bold text-2xl text-promet-gray-dark mb-6">
                  Solicitar presupuesto
                </h3>
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="name">Nombre completo *</FieldLabel>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Tu nombre"
                          className="bg-white"
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="company">Empresa</FieldLabel>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Nombre de tu empresa"
                          className="bg-white"
                        />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="email">Email *</FieldLabel>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="tu@email.com"
                          className="bg-white"
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="phone">Teléfono *</FieldLabel>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="+54 11 XXXX-XXXX"
                          className="bg-white"
                        />
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel htmlFor="service">Servicio de interés</FieldLabel>
                      <select
                        id="service"
                        name="service"
                        className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Seleccionar servicio</option>
                        <option value="soldadura">Soldadura Industrial</option>
                        <option value="mecanizado">Mecanizado de Precisión</option>
                        <option value="estructuras">Estructuras Metálicas</option>
                        <option value="mantenimiento">Mantenimiento Industrial</option>
                        <option value="corte">Corte y Plegado</option>
                        <option value="otro">Otro</option>
                      </select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="message">Mensaje *</FieldLabel>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Contanos sobre tu proyecto..."
                        rows={4}
                        className="bg-white resize-none"
                      />
                    </Field>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-promet-orange hover:bg-promet-orange-light text-white font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner className="mr-2 h-4 w-4" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Enviar mensaje
                        </>
                      )}
                    </Button>
                  </FieldGroup>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
