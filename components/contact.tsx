'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { useWhatsApp } from '@/hooks/use-whatsapp';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Promet+Metal%C3%BArgica+Promet/@-34.9487225,-57.9993909,17z/data=!3m1!4b1!4m6!3m5!1s0x95a2e8042fdd17f9:0x54d73dc1cd711452!8m2!3d-34.9487225!4d-57.9993909!16s%2Fg%2F1w8wc65x';

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
    href: 'https://wa.me/5492213611947?text=Hola%20Promet!%20Vi%20su%20web%20y%20quiero%20pedir%20un%20presupuesto.',
  },
  {
    icon: Clock,
    label: 'Horario',
    value: 'Lun-Vie 8:00-18:00, Sáb 8:00-13:00',
    href: null,
  },
];

type FormState = 'idle' | 'validating' | 'submitting' | 'success' | 'error';

interface FormData {
  nombre: string;
  whatsapp: string;
  servicio: string;
  mensaje: string;
}

interface Errors {
  [key: string]: string;
}

const validateForm = (data: FormData): Errors => {
  const errors: Errors = {};

  if (data.nombre.trim().length < 2 || /\d/.test(data.nombre)) {
    errors.nombre = 'Ingresá tu nombre completo';
  }

  const waRegex = /^(\+?54)?9?[0-9]{10}$/;
  const cleanWA = data.whatsapp.replace(/\D/g, '');
  if (!waRegex.test(cleanWA)) {
    errors.whatsapp = 'Ingresá un número válido de WhatsApp (ej: 221 555-1234)';
  }

  if (data.servicio === 'default') {
    errors.servicio = 'Seleccioná qué necesitás';
  }

  return errors;
};

export function Contact() {
  const [state, setState] = useState<FormState>('idle');
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    whatsapp: '',
    servicio: 'default',
    mensaje: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const waFallback = useWhatsApp('form_fallback');

  const handleValidate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('validating');
    setErrors({});

    await new Promise((resolve) => setTimeout(resolve, 300));

    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setState('idle');
      return;
    }

    setState('submitting');
    setSubmittedData(formData);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setState('success');
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

  const resetForm = () => {
    setState('idle');
    setFormData({ nombre: '', whatsapp: '', servicio: 'default', mensaje: '' });
    setErrors({});
    setSubmittedData(null);
  };

  // IDLE STATE
  if (state === 'idle' && !submittedData) {
    return (
      <section id="contacto" className="py-20 bg-gradient-to-b from-[#1E293B] to-[#0F172A] steel-texture">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-[#D97706] font-semibold text-[13px] uppercase tracking-[0.15em] mb-3">
                Contacto
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-[0.02em]">
                Pedí tu presupuesto
              </h2>
              <p className="text-[#94A3B8] text-lg">
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
                        className="flex items-start gap-4 group cursor-pointer p-2 -m-2 rounded hover:bg-[#1E293B]/50 transition-colors min-h-[56px]"
                        aria-label={`${info.label}: ${info.value}`}
                      >
                        <div className="w-12 h-12 bg-[#0F172A] border border-[#334155] rounded flex items-center justify-center flex-shrink-0 group-hover:border-[#D97706]/50 transition-colors">
                          <Icon className="w-5 h-5 text-[#D97706]" />
                        </div>
                        <div>
                          <p className="text-[#64748B] text-xs uppercase tracking-[0.15em] mb-1">
                            {info.label}
                          </p>
                          <p className="text-white font-medium group-hover:text-[#D97706] group-hover:underline underline-offset-2 transition-colors">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#0F172A] border border-[#334155] rounded flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#D97706]" />
                        </div>
                        <div>
                          <p className="text-[#64748B] text-xs uppercase tracking-[0.15em] mb-1">
                            {info.label}
                          </p>
                          <p className="text-white font-medium">{info.value}</p>
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
                className="rounded overflow-hidden border border-[#334155] h-[200px]"
              >
                <iframe
                  src="https://maps.google.com/maps?q=Promet+Metalurgica+Promet,+Calle+43+entre+148+y+149,+La+Plata&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Metalúrgica Promet LP en Google Maps"
                  aria-label="Mapa de ubicación"
                />
              </motion.div>
              
              {/* "Cómo llegar" CTA - Mobile friendly tap target */}
              <div className="flex items-center justify-between gap-4 mt-3">
                <p className="text-[#475569] text-xs">15 minutos del centro de La Plata</p>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] hover:border-[#D97706]/50 text-white px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-[0.05em] transition-all min-h-[44px]"
                  aria-label="Ver cómo llegar a Promet en Google Maps"
                >
                  <Navigation className="w-4 h-4 text-[#D97706]" />
                  Cómo llegar
                </a>
              </div>
            </div>

            {/* Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <form
                onSubmit={handleValidate}
                className="bg-[#0F172A] rounded border border-[#334155] p-8 space-y-6"
              >
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="nombre" className="text-[#94A3B8] text-sm uppercase tracking-[0.1em]">Nombre completo</FieldLabel>
                    <Input
                      id="nombre"
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      value={formData.nombre}
                      onChange={(e) => handleChange('nombre', e.target.value)}
                      className={`bg-[#1E293B] border ${
                        errors.nombre ? 'border-red-500' : 'border-[#334155]'
                      } text-white placeholder-[#475569] focus:border-[#D97706] transition-all rounded`}
                      aria-label="Nombre completo"
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
                    <FieldLabel htmlFor="whatsapp" className="text-[#94A3B8] text-sm uppercase tracking-[0.1em]">Tu WhatsApp</FieldLabel>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="Ej: 221 555-1234"
                      value={formData.whatsapp}
                      onChange={(e) => handleChange('whatsapp', e.target.value)}
                      className={`bg-[#1E293B] border ${
                        errors.whatsapp ? 'border-red-500' : 'border-[#334155]'
                      } text-white placeholder-[#475569] focus:border-[#D97706] transition-all rounded`}
                      aria-label="Número de WhatsApp"
                      aria-invalid={!!errors.whatsapp}
                    />
                    {errors.whatsapp && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.whatsapp}
                      </motion.p>
                    )}
                  </Field>
                </FieldGroup>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="servicio" className="text-[#94A3B8] text-sm uppercase tracking-[0.1em]">¿Qué necesitás?</FieldLabel>
                    <select
                      id="servicio"
                      value={formData.servicio}
                      onChange={(e) => handleChange('servicio', e.target.value)}
                      className={`w-full bg-[#1E293B] border ${
                        errors.servicio ? 'border-red-500' : 'border-[#334155]'
                      } text-white rounded px-3 py-2 focus:border-[#D97706] transition-all`}
                      aria-label="Servicio requerido"
                      aria-invalid={!!errors.servicio}
                    >
                      <option value="default">Seleccioná un servicio...</option>
                      <option value="portones">Portones metálicos</option>
                      <option value="puertas">Puertas metálicas</option>
                      <option value="ventanas">Ventanas metálicas</option>
                      <option value="escaleras">Escaleras metálicas</option>
                      <option value="techos">Techos y estructuras</option>
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

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="mensaje" className="text-[#94A3B8] text-sm uppercase tracking-[0.1em]">Tu mensaje (opcional)</FieldLabel>
                    <Textarea
                      id="mensaje"
                      placeholder="Contanos más detalles sobre lo que necesitás..."
                      value={formData.mensaje}
                      onChange={(e) => handleChange('mensaje', e.target.value)}
                      className="bg-[#1E293B] border border-[#334155] text-white placeholder-[#475569] focus:border-[#D97706] transition-all rounded"
                      rows={4}
                      aria-label="Mensaje adicional"
                    />
                  </Field>
                </FieldGroup>

                <Button
                  type="submit"
                  disabled={state === 'submitting'}
                  className="w-full bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706] text-white font-bold py-4 text-sm uppercase tracking-[0.05em] h-14 rounded btn-premium"
                >
                  {state === 'submitting' ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Enviando...
                    </>
                  ) : state === 'success' ? (
                    'Presupuesto en camino'
                  ) : (
                    'QUIERO MI PRESUPUESTO AHORA'
                  )}
                </Button>

                <p className="text-[#475569] text-xs text-center">
                  Tu información es privada. Solo te contactamos para el presupuesto.
                </p>

                <p className="text-center text-xs text-[#475569] italic">
                  Si algo no queda como acordamos, lo resolvemos. Siempre.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // SUBMITTING STATE
  if (state === 'submitting') {
    return (
      <section className="py-20 bg-gradient-to-b from-[#1E293B] to-[#0F172A] steel-texture">
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center min-h-[400px]">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Spinner className="w-12 h-12 text-[#D97706] mx-auto mb-4" />
            <p className="text-[#94A3B8] text-lg">Enviando tu consulta...</p>
          </motion.div>
        </div>
      </section>
    );
  }

  // SUCCESS STATE
  if (state === 'success' && submittedData) {
    return (
      <section className="py-20 bg-gradient-to-b from-[#1E293B] to-[#0F172A] steel-texture">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0F172A] rounded border border-[#334155] p-12 text-center shadow-[0_0_40px_rgba(217,119,6,0.1)]"
          >
            <motion.svg
              className="w-16 h-16 mx-auto mb-6 text-[#22C55E]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              <polyline points="20 6 9 17 4 12" />
            </motion.svg>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-[0.02em]">
              ¡Listo, {submittedData.nombre}!
            </h2>

            <p className="text-[#94A3B8] text-lg mb-8">
              Tu presupuesto listo en menos de 24hs al{' '}
              <span className="text-white font-semibold">{submittedData.whatsapp}</span>.
            </p>

            <div className="space-y-4">
              <motion.a
                href={waFallback.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#22C55E] hover:bg-[#16A34A] text-white py-3 rounded font-bold uppercase text-sm tracking-[0.05em] transition-colors"
                whileHover={{ scale: 1.02 }}
                aria-label="Escribir por WhatsApp"
              >
                También podés escribirnos por WhatsApp
              </motion.a>

              <button
                onClick={resetForm}
                className="block w-full border border-[#334155] hover:border-[#D97706]/50 text-white py-3 rounded font-bold uppercase text-sm tracking-[0.05em] transition-colors"
                aria-label="Enviar otro presupuesto"
              >
                Enviar otra consulta
              </button>
            </div>

            <p className="text-[#475569] text-xs italic mt-8">
              Ya somos 60 años cumpliendo. Este mensaje no es la excepción.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  // ERROR STATE
  if (state === 'error') {
    return (
      <section className="py-20 bg-gradient-to-b from-[#1E293B] to-[#0F172A] steel-texture">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0F172A] rounded border border-red-500/20 p-12 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4 tracking-[0.02em]">
              Algo salió mal. No te preocupes —
            </h2>

            <motion.a
              href={waFallback.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#D97706] to-[#B45309] text-white py-3 px-6 rounded font-bold uppercase text-sm tracking-[0.05em] transition-colors mb-4"
              whileHover={{ scale: 1.02 }}
              aria-label="Escribir directamente por WhatsApp"
            >
              Escribinos directo por WhatsApp
            </motion.a>

            <button
              onClick={resetForm}
              className="block w-full border border-[#334155] hover:border-[#D97706]/50 text-white py-3 rounded font-bold uppercase text-sm tracking-[0.05em] transition-colors mt-4"
              aria-label="Intentar formulario de nuevo"
            >
              Volver a intentar
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return null;
}
