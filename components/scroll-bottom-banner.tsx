'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useWhatsApp } from '@/hooks/use-whatsapp';

export function ScrollBottomBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const wa = useWhatsApp('floating');

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollDepth = scrollHeight > 0 ? Math.round((scrolled / scrollHeight) * 100) : 0;

      // Show at 90% scroll depth
      if (scrollDepth >= 90 && !sessionStorage.getItem('scroll_banner_shown')) {
        setShowBanner(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 left-0 right-0 z-40 bg-[#1A1C20] border-b border-[#E8751A]/20 px-4 py-3"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-white text-xs sm:text-sm font-medium">
              ¿Todo claro?{' '}
              <a
                href="#contacto"
                onClick={() => {
                  sessionStorage.setItem('scroll_banner_shown', 'true');
                  setShowBanner(false);
                }}
                className="text-[#E8751A] font-bold hover:underline cursor-pointer"
              >
                Pedí tu presupuesto gratis →
              </a>
            </p>

            <button
              onClick={() => {
                sessionStorage.setItem('scroll_banner_shown', 'true');
                setShowBanner(false);
              }}
              className="flex-shrink-0 text-white/50 hover:text-white transition-colors p-1"
              aria-label="Cerrar banner"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
