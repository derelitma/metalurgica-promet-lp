'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle } from 'lucide-react'

export function MobileStickyFooter() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white border-t border-gray-200 shadow-lg px-4 py-3 safe-bottom">
        <div className="flex gap-3">
          <a
            href="tel:+5411XXXXXXXX"
            className="flex-1 flex items-center justify-center gap-2 bg-promet-blue hover:bg-promet-blue-light text-white font-semibold py-3 rounded-lg transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>Llamar</span>
          </a>
          <a
            href="https://wa.me/5411XXXXXXXX?text=Hola,%20quiero%20solicitar%20un%20presupuesto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}
