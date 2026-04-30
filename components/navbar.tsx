'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#trabajos', label: 'Trabajos' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#contacto', label: 'Contacto' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-promet-blue/95 backdrop-blur-sm shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="font-sans font-bold text-xl md:text-2xl text-white tracking-tight">
                PROMET
              </span>
              <span className="text-xs text-white/80 -mt-1 tracking-widest">
                METALÚRGICA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-white font-medium text-sm uppercase tracking-wide transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-promet-orange transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+5411xxxx"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">+54 11 XXXX-XXXX</span>
            </a>
            <Button
              asChild
              className="bg-promet-orange hover:bg-promet-orange-light text-white font-semibold px-6"
            >
              <a
                href="https://wa.me/5411XXXXXXXX?text=Hola,%20quiero%20solicitar%20un%20presupuesto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cotizar Ahora
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-promet-blue border-promet-blue-light">
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <div className="flex flex-col h-full pt-8">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-white/90 hover:text-white font-medium text-lg py-2 border-b border-white/10 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-auto pb-8 flex flex-col gap-4">
                  <a
                    href="tel:+5411xxxx"
                    className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <span className="font-medium">+54 11 XXXX-XXXX</span>
                  </a>
                  <Button
                    asChild
                    className="bg-promet-orange hover:bg-promet-orange-light text-white font-semibold w-full"
                  >
                    <a
                      href="https://wa.me/5411XXXXXXXX?text=Hola,%20quiero%20solicitar%20un%20presupuesto"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Cotizar por WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
