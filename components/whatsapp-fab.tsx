'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'

export function WhatsAppFAB() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    
    // Show tooltip after 3 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true)
    }, 3000)
    
    // Hide tooltip after 8 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 8000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(tooltipTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 animate-fade-in-up">
          <div className="relative bg-white rounded-lg shadow-xl px-4 py-3 max-w-[200px]">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
            >
              <X className="h-3 w-3 text-gray-600" />
            </button>
            <p className="text-sm text-promet-gray-dark font-medium">
              ¿Necesitas un presupuesto? ¡Escribinos!
            </p>
            <div className="absolute bottom-0 right-6 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
          </div>
        </div>
      )}

      {/* Pulse ring effect */}
      <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse-ring" />
      
      {/* Main button */}
      <a
        href="https://wa.me/5411XXXXXXXX?text=Hola,%20quiero%20solicitar%20un%20presupuesto"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg shadow-green-500/30 transition-all hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white" fill="currentColor" />
      </a>
    </div>
  )
}
