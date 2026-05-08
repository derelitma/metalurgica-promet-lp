'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWhatsApp } from '@/hooks/use-whatsapp';

export function WhatsAppFAB() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);
  const wa = useWhatsApp('floating');

  useEffect(() => {
    // Trigger tooltip after 20 seconds of inactivity
    const timeout = setTimeout(() => {
      if (!sessionStorage.getItem('fab_tooltip_shown')) {
        setShowTooltip(true);
        sessionStorage.setItem('fab_tooltip_shown', 'true');
        // Auto-hide after 5 seconds
        const hideTimeout = setTimeout(() => {
          setShowTooltip(false);
        }, 5000);
        return () => clearTimeout(hideTimeout);
      }
    }, 20000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Floating Action Button - Higher on mobile to avoid conversion band overlap */}
      <motion.a
        href={wa.link}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-40 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        onMouseEnter={() => setHasHovered(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-cta
        aria-label="Abrir chat de WhatsApp con Promet"
      >
        {/* Pulse Ring Animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{
            scale: [1, 1.5],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />

        {/* Main Button - Enhanced shadow for light background */}
        <div className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-shadow">
          <motion.div
            animate={hasHovered ? {} : { y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 8,
            }}
          >
            <MessageCircle size={28} className="text-white" />
          </motion.div>
        </div>
      </motion.a>

      {/* Tooltip - Dark on light page for visibility */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-40 md:bottom-24 right-4 md:right-6 z-40 bg-[#111318] border border-[#25D366]/30 rounded-xl p-4 max-w-xs shadow-xl"
          >
            <p className="text-white text-sm font-medium">
              ¿Necesitás ayuda?
              <br />
              Respondemos ahora →
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
