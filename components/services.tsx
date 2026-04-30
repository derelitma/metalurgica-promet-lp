'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useWhatsApp } from '@/hooks/use-whatsapp';

const services = [
  {
    id: 'portones',
    title: 'Portones',
    benefit: 'Seguridad total.',
    description: 'Corredizos, batientes y seccionales fabricados en La Plata.',
    waMessage: 'Hola Promet! Consulto por un portón a medida.',
  },
  {
    id: 'puertas',
    title: 'Puertas',
    benefit: 'El primer escudo de tu casa.',
    description: 'Puertas metálicas de acceso y seguridad a medida.',
    waMessage: 'Hola Promet! Necesito presupuesto para puerta metálica.',
  },
  {
    id: 'ventanas',
    title: 'Ventanas',
    benefit: 'Hermeticidad garantizada.',
    description: 'Ventanas metálicas de alta prestación para cualquier construcción.',
    waMessage: 'Hola Promet! Consulto por ventanas metálicas.',
  },
  {
    id: 'escaleras',
    title: 'Escaleras',
    benefit: 'Diseño y resistencia para siempre.',
    description: 'Rectas, en caracol e industriales. Interior y exterior.',
    waMessage: 'Hola Promet! Quiero presupuesto para una escalera.',
  },
  {
    id: 'techos',
    title: 'Techos',
    benefit: 'Sin filtraciones. Sin sorpresas.',
    description: 'Estructuras metálicas para viviendas, galpones y depósitos.',
    waMessage: 'Hola Promet! Consulto por techo o estructura metálica.',
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 25;
    const y = -(e.clientX - rect.left - rect.width / 2) / 25;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        perspective: '1000px',
      }}
    >
      <Card className="bg-[#1E293B] border border-[#334155] hover:border-[#D97706]/50 h-full transition-all duration-300 overflow-hidden group hover:shadow-[0_0_30px_rgba(217,119,6,0.1)] hover:-translate-y-1 rounded steel-texture">
        <CardContent className="p-6">
          {/* Premium tag */}
          <div className="mb-4">
            <span className="inline-block px-2 py-1 bg-[#0F172A] border border-[#334155] rounded text-[#64748B] text-[10px] font-bold uppercase tracking-[0.15em]">
              Servicio
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 tracking-[0.02em]">{service.title}</h3>

          <p className="text-[#D97706] font-bold text-base mb-3">{service.benefit}</p>

          <p className="text-[#94A3B8] text-sm mb-6 leading-relaxed">{service.description}</p>

          <motion.a
            href={`https://wa.me/5492213611947?text=${encodeURIComponent(service.waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#D97706] font-bold text-sm hover:gap-3 transition-all group-hover:text-[#F59E0B] tracking-[0.05em] uppercase"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-cta
          >
            CONSULTAR
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="servicios" className="py-20 md:py-32 bg-[#0F172A] relative overflow-hidden steel-texture">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <span className="inline-block text-[#D97706] font-semibold text-[13px] uppercase tracking-[0.15em] mb-3">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-[0.02em]">
            Soluciones Metálicas Completas
          </h2>
          <p className="text-[#94A3B8] text-lg">
            Fabricadas en La Plata, con 60 años de confianza detrás.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
