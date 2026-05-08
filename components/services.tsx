'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Home, Factory, Scissors, FoldVertical, RotateCw, LayoutGrid } from 'lucide-react';

// Residential services (existing)
const residentialServices = [
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

// Industrial services (NEW)
const industrialServices = [
  {
    id: 'corte',
    title: 'Corte de chapas',
    benefit: 'Precisión en cada corte.',
    description: 'Chapa de 0.5mm a 3,16cm (chapa 25). Acero, galvanizado, inoxidable y aluminio. Piezas únicas o producción en serie. Entrega en 3-4 días.',
    waMessage: 'Hola Promet! Necesito presupuesto para corte de chapas.',
    icon: Scissors,
  },
  {
    id: 'plegado',
    title: 'Plegado de chapas',
    benefit: 'Ángulos exactos. Calidad Promet.',
    description: 'Plegado de marcos, perfiles, canaletas, bandejas y piezas industriales. Encastre de perfilería para marcos en cantidad. Calidad de terminación que nos diferencia.',
    waMessage: 'Hola Promet! Necesito presupuesto para plegado de chapas.',
    icon: FoldVertical,
  },
  {
    id: 'cilindrado',
    title: 'Cilindrado de chapas',
    benefit: 'Curvas perfectas a medida.',
    description: 'Cilindrado para tanques, conductos, caños y piezas cilíndricas. Diámetros a medida sobre especificación del cliente.',
    waMessage: 'Hola Promet! Necesito presupuesto para cilindrado de chapas.',
    icon: RotateCw,
  },
  {
    id: 'racks',
    title: 'Racks y estanterías',
    benefit: 'Soluciones de almacenamiento que no fallan.',
    description: 'Baldas, racks y estanterías metálicas para comercios, galpones y depósitos. Fabricación a medida con materiales de primera.',
    waMessage: 'Hola Promet! Necesito presupuesto para racks o estanterías.',
    icon: LayoutGrid,
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof residentialServices)[0] & { icon?: typeof Scissors };
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

  const Icon = service.icon;

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
      <Card className="bg-white border border-[rgba(0,0,0,0.06)] hover:border-[#E8751A]/50 h-full transition-all duration-300 overflow-hidden group hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] hover:-translate-y-1 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <CardContent className="p-6">
          {/* Icon for industrial services */}
          {Icon && (
            <div className="mb-4 w-12 h-12 bg-[#E8751A]/10 rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6 text-[#E8751A]" />
            </div>
          )}
          
          {/* Premium tag */}
          <div className="mb-4">
            <span className="inline-block px-2 py-1 bg-[#F7F7F5] border border-[rgba(0,0,0,0.06)] rounded text-[#7A7A78] text-[10px] font-bold uppercase tracking-[0.15em]">
              Servicio
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#111318] mb-2 tracking-[0.02em]" style={{ fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif' }}>{service.title}</h3>

          <p className="text-[#E8751A] font-bold text-base mb-3">{service.benefit}</p>

          <p className="text-[#4A4A48] text-sm mb-6 leading-relaxed">{service.description}</p>

          <motion.a
            href={`https://wa.me/5492213611947?text=${encodeURIComponent(service.waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#E8751A] font-bold text-sm hover:gap-3 transition-all group-hover:text-[#C96318] tracking-[0.05em] uppercase"
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

type Division = 'residential' | 'industrial';

export function Services() {
  const [activeDivision, setActiveDivision] = useState<Division>('industrial');

  return (
    <section id="servicios" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="inline-block text-[#E8751A] font-semibold text-[13px] uppercase tracking-[0.15em] mb-3">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#111318] mb-4 tracking-[0.02em]" style={{ fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif' }}>
            Todo en metal. Para tu casa y para tu industria.
          </h2>
          <p className="text-[#4A4A48] text-lg">
            Carpintería metálica y procesamiento de chapas. 60 años fabricando en La Plata.
          </p>
        </motion.div>

        {/* Division Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveDivision('residential')}
            className={`flex-1 py-4 px-6 rounded-t-lg md:rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              activeDivision === 'residential'
                ? 'bg-[#E8751A] text-white shadow-lg'
                : 'bg-[#F7F7F5] text-[#4A4A48] border border-[rgba(0,0,0,0.08)] hover:bg-[#EFEFED]'
            }`}
            style={{ fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif' }}
          >
            <Home className="w-5 h-5" />
            <div className="text-left">
              <span className="block text-lg font-bold">Para tu casa</span>
              <span className={`block text-xs font-normal ${activeDivision === 'residential' ? 'text-white/80' : 'text-[#7A7A78]'}`}>
                Carpintería metálica a medida
              </span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveDivision('industrial')}
            className={`flex-1 py-4 px-6 rounded-t-lg md:rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              activeDivision === 'industrial'
                ? 'bg-[#E8751A] text-white shadow-lg'
                : 'bg-[#F7F7F5] text-[#4A4A48] border border-[rgba(0,0,0,0.08)] hover:bg-[#EFEFED]'
            }`}
            style={{ fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif' }}
          >
            <Factory className="w-5 h-5" />
            <div className="text-left">
              <span className="block text-lg font-bold">Para tu industria</span>
              <span className={`block text-xs font-normal ${activeDivision === 'industrial' ? 'text-white/80' : 'text-[#7A7A78]'}`}>
                Corte, plegado y cilindrado
              </span>
            </div>
          </button>
        </div>

        {/* Service Cards with Animation */}
        <AnimatePresence mode="wait">
          {activeDivision === 'residential' ? (
            <motion.div
              key="residential"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {residentialServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="industrial"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {industrialServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
