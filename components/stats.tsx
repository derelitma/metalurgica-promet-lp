'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Award, Users, ThumbsUp } from 'lucide-react';

const stats = [
  {
    icon: Clock,
    value: 60,
    suffix: ' años',
    label: 'Experiencia',
    description: 'Desde 1964 al servicio de La Plata',
  },
  {
    icon: Award,
    value: 50,
    suffix: '+ presupuestos',
    label: 'Por semana',
    description: 'Confían en nuestro trabajo',
  },
  {
    icon: Users,
    value: 47,
    suffix: '',
    label: 'Testimonios',
    description: 'Clientes satisfechos y recomendando',
  },
  {
    icon: ThumbsUp,
    value: 99,
    suffix: '%',
    label: 'Recomendación',
    description: 'Vuelven y nos recomiendan',
  },
];

function CountUp({
  end,
  duration = 2000,
  suffix = '',
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#111318] to-[#0A0B0D]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#E8751A] text-sm font-bold uppercase tracking-widest mb-2">
            POR LOS NÚMEROS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Números que hablan
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#E8751A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                <div className="relative bg-[#111318] border border-white/5 group-hover:border-[#E8751A]/30 rounded-xl p-6 transition-all duration-300">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.2,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    viewport={{ once: true }}
                    className="w-12 h-12 bg-[#E8751A]/10 rounded-lg flex items-center justify-center mb-4"
                  >
                    <Icon className="w-6 h-6 text-[#E8751A]" />
                  </motion.div>

                  {/* Value */}
                  <div className="mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-white">
                      <CountUp
                        end={stat.value}
                        duration={2000}
                        suffix={stat.suffix.includes('+') || stat.suffix.includes('%') ? '' : ''}
                      />
                      {stat.suffix.includes('+') || stat.suffix.includes('%') ? stat.suffix : ''}
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-bold text-white mb-1">{stat.label}</h3>

                  {/* Description */}
                  <p className="text-[#94A3B8] text-sm">{stat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
