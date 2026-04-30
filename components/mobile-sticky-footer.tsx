'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWhatsApp } from '@/hooks/use-whatsapp';

export function MobileStickyFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonText, setButtonText] = useState('PEDIR PRESUPUESTO →');
  const wa = useWhatsApp('mobile_footer');

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollDepth = scrollHeight > 0 ? Math.round((scrolled / scrollHeight) * 100) : 0;

      // Show after 500px
      setIsVisible(window.scrollY > 500);

      // Change text at 70% scroll depth
      if (scrollDepth >= 70) {
        setButtonText('¿Te convenciste? Escribinos →');
      } else {
        setButtonText('PEDIR PRESUPUESTO →');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden`}
      initial={{ y: '100%' }}
      animate={{ y: isVisible ? 0 : '100%' }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-[#111318] border-t border-white/5 shadow-lg px-4 py-3 safe-bottom">
        <motion.a
          href={wa.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#E8751A] hover:bg-[#FF8533] text-white font-bold py-3 rounded-lg transition-colors text-center uppercase text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-cta
          aria-label={wa.message}
        >
          <motion.div
            key={buttonText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {buttonText}
          </motion.div>
        </motion.a>
      </div>
    </motion.div>
  );
}
