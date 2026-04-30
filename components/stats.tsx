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

  return <span ref={ref}>{displayValue}</span>;
}

export function Stats() {
  return (
    <section className="py-20 md:py-32 bg-[#1A1C20] relative overflow-hidden">
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
                <span className="text-7xl md:text-9xl font-black text-[#E8751A] leading-none">
                  +<AnimatedNumber value={60} />
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">años en La Plata</h3>
              <p className="text-[#94A3B8] italic text-sm">
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
                <span className="text-7xl md:text-9xl font-black text-[#E8751A] leading-none">
                  +<AnimatedNumber value={12000} duration={2500} />
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Obras entregadas</h3>
              <p className="text-[#94A3B8] italic text-sm">
                Trabajos realizados en La Plata y zona desde 1960
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
