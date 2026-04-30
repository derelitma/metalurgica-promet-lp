'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useWhatsApp } from '@/hooks/use-whatsapp';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Dirección',
    value: 'Calle 43 e/ 148 y 149, La Plata',
    href: 'https://maps.google.com/?q=Calle+43+entre+148+y+149,+La+Plata',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+54 9 221 555-1234',
    href: 'https://wa.me/5492215551234',
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

    // Simulate validation delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setState('idle');
      return;
    }

    // Trigger submit
    setState('submitting');
    setSubmittedData(formData);

    // Simulate API call
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
      <section id="contacto" className="py-20 bg-gradient-to-b from-[#1A1C20] to-[#111318]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-[#94A3B8] text-sm mb-2">CONSULTÁ AHORA</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
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
                        className="flex items-start gap-4 group cursor-pointer"
                        aria-label={`${info.label}: ${info.value}`}
                      >
                        <Icon className="w-6 h-6 text-[#E8751A] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="text-[#94A3B8] text-sm uppercase tracking-wide mb-1">
                            {info.label}
                          </p>
                          <p className="text-white font-medium group-hover:text-[#E8751A] transition-colors">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">
                        <Icon className="w-6 h-6 text-[#E8751A] flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-[#94A3B8] text-sm uppercase tracking-wide mb-1">
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
                className="rounded-xl overflow-hidden border border-white/5 h-[200px]"
              >
                <iframe
                  src="https://maps.google.com/maps?q=Calle+43+entre+148+y+149,+La+Plata,+Buenos+Aires,+Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
              <p className="text-[#4A4A48] text-xs text-center">📍 15 minutos del centro de La Plata</p>
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
                className="bg-[#111318] rounded-xl border border-white/5 p-8 space-y-6"
              >
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="nombre">Nombre completo</FieldLabel>
                    <Input
                      id="nombre"
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      value={formData.nombre}
                      onChange={(e) => handleChange('nombre', e.target.value)}
                      className={`bg-[#0A0B0D] border ${
                        errors.nombre ? 'border-[#EF4444]' : 'border-white/10'
                      } text-white placeholder-[#4A4A48] focus:border-[#E8751A] transition-all`}
                      aria-label="Nombre completo"
                      aria-invalid={!!errors.nombre}
                    />
                    {errors.nombre && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#EF4444] text-xs mt-1"
                      >
                        {errors.nombre}
                      </motion.p>
                    )}
                  </Field>
                </FieldGroup>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="whatsapp">Tu WhatsApp</FieldLabel>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="Ej: 221 555-1234"
                      value={formData.whatsapp}
                      onChange={(e) => handleChange('whatsapp', e.target.value)}
                      className={`bg-[#0A0B0D] border ${
                        errors.whatsapp ? 'border-[#EF4444]' : 'border-white/10'
                      } text-white placeholder-[#4A4A48] focus:border-[#E8751A] transition-all`}
                      aria-label="Número de WhatsApp"
                      aria-invalid={!!errors.whatsapp}
                    />
                    {errors.whatsapp && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#EF4444] text-xs mt-1"
                      >
                        {errors.whatsapp}
                      </motion.p>
                    )}
                  </Field>
                </FieldGroup>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="servicio">¿Qué necesitás?</FieldLabel>
                    <select
                      id="servicio"
                      value={formData.servicio}
                      onChange={(e) => handleChange('servicio', e.target.value)}
                      className={`w-full bg-[#0A0B0D] border ${
                        errors.servicio ? 'border-[#EF4444]' : 'border-white/10'
                      } text-white placeholder-[#4A4A48] rounded-md px-3 py-2 focus:border-[#E8751A] transition-all`}
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
                        className="text-[#EF4444] text-xs mt-1"
                      >
                        {errors.servicio}
                      </motion.p>
                    )}
                  </Field>
                </FieldGroup>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="mensaje">Tu mensaje (opcional)</FieldLabel>
                    <Textarea
                      id="mensaje"
                      placeholder="Contanos más detalles sobre lo que necesitás..."
                      value={formData.mensaje}
                      onChange={(e) => handleChange('mensaje', e.target.value)}
                      className="bg-[#0A0B0D] border border-white/10 text-white placeholder-[#4A4A48] focus:border-[#E8751A] transition-all"
                      rows={4}
                      aria-label="Mensaje adicional"
                    />
                  </Field>
                </FieldGroup>

              <Button
                type="submit"
                disabled={state === 'submitting'}
                className="w-full bg-[#E8751A] hover:bg-[#FF8533] text-white font-bold py-4 text-lg uppercase h-14"
              >
                {state === 'submitting' ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Enviando...
                  </>
                ) : state === 'success' ? (
                  '✓ Presupuesto en camino'
                ) : (
                  'QUIERO MI PRESUPUESTO AHORA →'
                )}
              </Button>

              {/* Privacy & trust copy */}
              <p className="text-[#4A4A48] text-xs text-center">
                🔒 Tu información es privada. Solo te contactamos para el presupuesto. Nada más.
              </p>

                <p className="text-center text-xs text-[#4A4A48] italic">
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
      <section className="py-20 bg-gradient-to-b from-[#1A1C20] to-[#111318]">
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center min-h-[400px]">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Spinner className="w-12 h-12 text-[#E8751A] mx-auto mb-4" />
            <p className="text-[#94A3B8] text-lg">Enviando tu consulta...</p>
          </motion.div>
        </div>
      </section>
    );
  }

  // SUCCESS STATE
  if (state === 'success' && submittedData) {
    return (
      <section className="py-20 bg-gradient-to-b from-[#1A1C20] to-[#111318]">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#111318] rounded-xl border border-[#25D366]/20 p-12 text-center"
          >
            {/* Animated Checkmark SVG */}
            <motion.svg
              className="w-16 h-16 mx-auto mb-6 text-[#25D366]"
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

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              ¡Consulta recibida, {submittedData.nombre}!
            </h2>

            <p className="text-[#94A3B8] text-lg mb-8">
              Un técnico de Promet va a contactarte en menos de 24hs al{' '}
              <span className="text-white font-semibold">{submittedData.whatsapp}</span>.
            </p>

            <div className="space-y-4">
              <motion.a
                href={waFallback.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#25D366] hover:bg-[#20BA5C] text-white py-3 rounded-lg font-bold uppercase text-sm transition-colors"
                whileHover={{ scale: 1.05 }}
                aria-label="Escribir por WhatsApp"
              >
                También podés escribirnos por WhatsApp →
              </motion.a>

              <button
                onClick={resetForm}
                className="block w-full border border-white/10 hover:border-white/20 text-white py-3 rounded-lg font-bold uppercase text-sm transition-colors"
                aria-label="Enviar otro presupuesto"
              >
                Enviar otra consulta
              </button>
            </div>

            <p className="text-[#4A4A48] text-xs italic mt-8">
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
      <section className="py-20 bg-gradient-to-b from-[#1A1C20] to-[#111318]">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111318] rounded-xl border border-[#EF4444]/20 p-12 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Algo salió mal. No te preocupes —
            </h2>

            <motion.a
              href={waFallback.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#E8751A] hover:bg-[#FF8533] text-white py-3 px-6 rounded-lg font-bold uppercase text-sm transition-colors mb-4"
              whileHover={{ scale: 1.05 }}
              aria-label="Escribir directamente por WhatsApp"
            >
              Escribinos directo por WhatsApp →
            </motion.a>

            <button
              onClick={resetForm}
              className="block w-full border border-white/10 hover:border-white/20 text-white py-3 rounded-lg font-bold uppercase text-sm transition-colors mt-4"
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
