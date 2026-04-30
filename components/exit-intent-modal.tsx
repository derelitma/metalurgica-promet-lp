'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useWhatsApp } from '@/hooks/use-whatsapp';

export function ExitIntentModal() {
  const [showModal, setShowModal] = useState(false);
  const wa = useWhatsApp('floating');

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 768) return;

    let timeoutId: NodeJS.Timeout;
    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if already triggered
      if (hasTriggered) return;

      // Check if session already saw it
      if (sessionStorage.getItem('exit_intent_shown')) return;

      // Only trigger if mouse is leaving from top
      if (e.clientY <= 20) {
        // Wait 15 seconds before showing
        if (!timeoutId) {
          timeoutId = setTimeout(() => {
            setShowModal(true);
            hasTriggered = true;
            sessionStorage.setItem('exit_intent_shown', 'true');
          }, 15000);
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#0A0B0D]/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#111318] rounded-xl border border-white/10 p-10 max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white hover:text-[#E8751A] transition-colors p-1"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>

            {/* Content */}
            <h2 className="text-3xl font-bold text-white mb-4">
              Esperate un segundo.
            </h2>

            <p className="text-[#94A3B8] text-lg mb-8">
              Antes de irte, pedí el presupuesto. Es gratis, son 30 segundos y te respondemos hoy.
            </p>

            {/* Primary CTA */}
            <motion.a
              href={wa.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#E8751A] hover:bg-[#FF8533] text-white py-3 rounded-lg font-bold uppercase text-sm transition-colors text-center mb-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cta
              onClick={() => setShowModal(false)}
              aria-label={wa.message}
            >
              Pedir presupuesto gratis →
            </motion.a>

            {/* Secondary CTA */}
            <button
              onClick={() => setShowModal(false)}
              className="block w-full text-white text-sm hover:text-[#E8751A] transition-colors py-2"
              aria-label="Cerrar modal"
            >
              No, gracias
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
