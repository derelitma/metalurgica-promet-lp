'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { MapPin, Phone, Clock, Navigation, MessageCircle } from 'lucide-react';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Promet+Metal%C3%BArgica+Promet/@-34.9487225,-57.9993909,17z/data=!3m1!4b1!4m6!3m5!1s0x95a2e8042fdd17f9:0x54d73dc1cd711452!8m2!3d-34.9487225!4d-57.9993909!16s%2Fg%2F1w8wc65x';
const WHATSAPP_NUMBER = '5492213611947';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Dirección',
    value: 'Calle 43 entre 148 y 149, La Plata',
    href: GOOGLE_MAPS_URL,
    target: '_blank',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+54 9 221 361-1947',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20Promet!%20Vi%20su%20web%20y%20quiero%20pedir%20un%20presupuesto.`,
  },
  {
    icon: Clock,
    label: 'Horario',
    value: 'Lun-Vie 8:00-18:00, Sáb 8:00-13:00',
    href: null,
  },
];

interface FormData {
  nombre: string;
  servicio: string;
}

interface Errors {
  [key: string]: string;
}

const serviceLabels: { [key: string]: string } = {
  corte: 'Corte de chapas',
  plegado: 'Plegado de chapas',
  cilindrado: 'Cilindrado de chapas',
  racks: 'Racks / Estanterías',
  portones: 'Portones metálicos',
  puertas: 'Puertas metálicas',
  ventanas: 'Ventanas metálicas',
  escaleras: 'Escaleras metálicas',
  techos: 'Techos y estructuras',
  especiales: 'Trabajo especial',
};

const validateForm = (data: FormData): Errors => {
  const errors: Errors = {};

  if (data.nombre.trim().length < 2 || /\d/.test(data.nombre)) {
    errors.nombre = 'Ingresá tu nombre';
  }

  if (data.servicio === 'default') {
    errors.servicio = 'Seleccioná qué necesitás';
  }

  return errors;
};

const generateWhatsAppLink = (data: FormData): string => {
  const serviceName = serviceLabels[data.servicio] || data.servicio;
  const message = `Hola Promet! Soy ${data.nombre}. Vi su web y quiero pedir presupuesto para: ${serviceName}.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    servicio: 'default',
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate WhatsApp link and redirect
    const whatsappLink = generateWhatsAppLink(formData);
    window.open(whatsappLink, '_blank');
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <section id="contacto" className="py-20 bg-[#F7F7F5]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[#E8751A] font-semibold text-[13px] uppercase tracking-[0.15em] mb-3">
              Contacto
            </span>
            <h2 
              className="text-4xl md:text-5xl font-bold text-[#111318] mb-4 tracking-[0.02em]"
              style={{ fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif' }}
            >
              Pedí tu presupuesto
            </h2>
            <p className="text-[#4A4A48] text-lg">
              Más de 50 familias y empresas nos consultan cada semana.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-4 group cursor-pointer p-2 -m-2 rounded-lg hover:bg-white transition-colors min-h-[56px]"
                      aria-label={`${info.label}: ${info.value}`}
                    >
                      <div className="w-12 h-12 bg-white border border-[rgba(0,0,0,0.06)] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-[#E8751A]/50 transition-colors shadow-sm">
                        <Icon className="w-5 h-5 text-[#E8751A]" />
                      </div>
                      <div>
                        <p className="text-[#7A7A78] text-xs uppercase tracking-[0.15em] mb-1">
                          {info.label}
                        </p>
                        <p className="text-[#111318] font-medium group-hover:text-[#E8751A] group-hover:underline underline-offset-2 transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white border border-[rgba(0,0,0,0.06)] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icon className="w-5 h-5 text-[#E8751A]" />
                      </div>
                      <div>
                        <p className="text-[#7A7A78] text-xs uppercase tracking-[0.15em] mb-1">
                          {info.label}
                        </p>
                        <p className="text-[#111318] font-medium">{info.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Google Maps Embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden border border-[rgba(0,0,0,0.06)] h-[200px]"
            >
              <iframe
                src="https://maps.google.com/maps?q=Promet+Metalurgica+Promet,+Calle+43+entre+148+y+149,+La+Plata&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Metalúrgica Promet LP en Google Maps"
                aria-label="Mapa de ubicación"
              />
            </motion.div>
            
            {/* "Cómo llegar" CTA - Mobile friendly tap target */}
            <div className="flex items-center justify-between gap-4 mt-3">
              <p className="text-[#7A7A78] text-xs">15 minutos del centro de La Plata</p>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#F7F7F5] border border-[rgba(0,0,0,0.06)] hover:border-[#E8751A]/50 text-[#111318] px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-[0.05em] transition-all min-h-[44px] shadow-sm"
                aria-label="Ver cómo llegar a Promet en Google Maps"
              >
                <Navigation className="w-4 h-4 text-[#E8751A]" />
                Cómo llegar
              </a>
            </div>
          </div>

          {/* Simplified Form - Name + Service only */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-8 md:p-10 space-y-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            >
              <div className="text-center mb-4">
                <p className="text-[#4A4A48] text-sm">
                  Completá y te abrimos WhatsApp con tu mensaje listo para enviar
                </p>
              </div>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="nombre" className="text-[#4A4A48] text-sm font-medium">Tu nombre</FieldLabel>
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    value={formData.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    className={`bg-white border ${
                      errors.nombre ? 'border-red-500' : 'border-[rgba(0,0,0,0.12)]'
                    } text-[#111318] placeholder-[#7A7A78] focus:border-[#E8751A] focus:shadow-[0_0_0_3px_rgba(232,117,26,0.12)] transition-all rounded-lg h-12`}
                    aria-label="Tu nombre"
                    aria-invalid={!!errors.nombre}
                  />
                  {errors.nombre && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.nombre}
                    </motion.p>
                  )}
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="servicio" className="text-[#4A4A48] text-sm font-medium">¿Qué necesitás?</FieldLabel>
                  <select
                    id="servicio"
                    value={formData.servicio}
                    onChange={(e) => handleChange('servicio', e.target.value)}
                    className={`w-full bg-white border ${
                      errors.servicio ? 'border-red-500' : 'border-[rgba(0,0,0,0.12)]'
                    } text-[#111318] rounded-lg px-3 py-3 h-12 focus:border-[#E8751A] focus:shadow-[0_0_0_3px_rgba(232,117,26,0.12)] transition-all`}
                    aria-label="Servicio requerido"
                    aria-invalid={!!errors.servicio}
                  >
                    <option value="default">Seleccioná un servicio...</option>
                    <optgroup label="Para tu industria">
                      <option value="corte">Corte de chapas</option>
                      <option value="plegado">Plegado de chapas</option>
                      <option value="cilindrado">Cilindrado de chapas</option>
                      <option value="racks">Racks / Estanterías</option>
                    </optgroup>
                    <optgroup label="Para tu casa">
                      <option value="portones">Portones metálicos</option>
                      <option value="puertas">Puertas metálicas</option>
                      <option value="ventanas">Ventanas metálicas</option>
                      <option value="escaleras">Escaleras metálicas</option>
                      <option value="techos">Techos y estructuras</option>
                    </optgroup>
                    <option value="especiales">Trabajo especial</option>
                  </select>
                  {errors.servicio && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.servicio}
                    </motion.p>
                  )}
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-4 text-sm uppercase tracking-[0.05em] h-14 rounded-lg flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                QUIERO MI PRESUPUESTO AHORA
              </Button>

              <p className="text-[#7A7A78] text-xs text-center">
                Te abrimos WhatsApp con tu mensaje armado. Solo tenés que enviarlo.
              </p>

              <p className="text-center text-xs text-[#7A7A78] italic">
                Si algo no queda como acordamos, lo resolvemos. Siempre.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
