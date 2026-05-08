'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const increment = value / (duration! / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setDisplayValue(value);
              clearInterval(timer);
            } else {
              setDisplayValue(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{displayValue.toLocaleString('es-AR')}</span>;
}

export function Stats() {
  return (
    <section className="py-20 md:py-32 bg-[#F7F7F5] relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.08)] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.08)] to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <div className="mb-4">
                <span 
                  className="text-7xl md:text-9xl font-black text-[#E8751A] leading-none"
                  style={{ fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif', fontWeight: 900 }}
                >
                  +<AnimatedNumber value={60} />
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#111318] mb-2 tracking-[0.02em]">años en La Plata</h3>
              <p className="text-[#7A7A78] italic text-sm">
                3 generaciones, mismo apellido, misma calle
              </p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <div className="mb-4">
                <span 
                  className="text-7xl md:text-9xl font-black text-[#E8751A] leading-none"
                  style={{ fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif', fontWeight: 900 }}
                >
                  +<AnimatedNumber value={12000} duration={2500} />
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#111318] mb-2 tracking-[0.02em]">Obras entregadas</h3>
              <p className="text-[#7A7A78] italic text-sm">
                Trabajos realizados en La Plata y zona desde 1960
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
