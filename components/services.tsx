'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useWhatsApp } from '@/hooks/use-whatsapp';

const services = [
  {
    id: 'portones',
    title: 'Portones Metálicos',
    description: 'A medida y diseño personalizado. Desde clásicos hasta modernos, con sistemas de automatización.',
    features: ['Acero inoxidable', 'Automatizados', 'Designs personalizado', 'Garantía 10 años'],
  },
  {
    id: 'puertas',
    title: 'Puertas Metálicas',
    description: 'Seguridad y diseño en tus entradas. Resistentes al fuego, blindadas o estándar.',
    features: ['Blindadas', 'Resistentes al fuego', 'Acústicas', 'Personalizables'],
  },
  {
    id: 'ventanas',
    title: 'Ventanas Metálicas',
    description: 'Luz natural con seguridad. Marco de acero o aluminio, vidrios especializados.',
    features: ['Doble vidrio', 'Acústicas', 'Cortinas de rol', 'Marcos de acero'],
  },
  {
    id: 'escaleras',
    title: 'Escaleras Metálicas',
    description: 'Estructurales o decorativas. Interiores y exteriores con máxima seguridad.',
    features: ['Espirales', 'De caracol', 'Rectas', 'Con pasamanos'],
  },
  {
    id: 'techos',
    title: 'Techos y Estructuras',
    description: 'Cobertizos, galpones y estructuras. Soluciones resistentes para cualquier clima.',
    features: ['Cobertizos', 'Galpones', 'Techos retráctiles', 'Pérgolas'],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const wa = useWhatsApp(service.id as any);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    const rotateX = (y / rect.height) * -5;
    const rotateY = (x / rect.width) * 5;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <Card
          className="relative h-full bg-[#111318] border-white/5 hover:border-[#E8751A]/30 overflow-hidden group transition-all duration-300"
          data-section="servicios"
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8751A]/0 via-transparent to-[#E8751A]/0 group-hover:from-[#E8751A]/5 group-hover:to-[#E8751A]/5 transition-all duration-300" />

          <CardContent className="p-6 relative z-10">
            <div className="mb-4">
              <div className="w-12 h-12 bg-[#E8751A]/10 rounded-lg flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-[#E8751A]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
            </div>

            <p className="text-[#94A3B8] text-sm mb-6 leading-relaxed">
              {service.description}
            </p>

            <div className="space-y-2 mb-6">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-[#94A3B8] text-sm">
                  <div className="w-1.5 h-1.5 bg-[#E8751A] rounded-full" />
                  {feature}
                </div>
              ))}
            </div>

            <motion.a
              href={wa.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#E8751A] font-bold text-sm hover:text-[#FF8533] transition-colors group/link"
              whileHover={{ x: 4 }}
              data-cta
              aria-label={wa.message}
            >
              Consultar
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </motion.a>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section
      id="servicios"
      className="py-20 bg-gradient-to-b from-[#1A1C20] to-[#111318]"
      data-section="servicios"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#E8751A] text-sm font-bold uppercase tracking-widest mb-2">
            NUESTROS SERVICIOS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Si se hace en metal, nosotros lo fabricamos.
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Soluciones completas en carpintería metálica para tu hogar o negocio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
