'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useWhatsApp } from '@/hooks/use-whatsapp';

const navLinks = [
  { href: '#servicios', label: 'Servicios', id: 'servicios' },
  { href: '#nosotros', label: 'Por qué Promet', id: 'nosotros' },
  { href: '#trabajos', label: 'Trabajos', id: 'trabajos' },
  { href: '#proceso', label: 'Proceso', id: 'proceso' },
  { href: '#testimonios', label: 'Testimonios', id: 'testimonios' },
  { href: '#contacto', label: 'Contacto', id: 'contacto' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wa = useWhatsApp('hero');

  useEffect(() => {
    // Observer for active section
    const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Hide/show navbar on scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav if near top
      if (currentScrollY < 200) {
        setScrollDirection('up');
        setIsScrolled(false);
      } else {
        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY) {
          setScrollDirection('down');
        } else {
          setScrollDirection('up');
        }
        setIsScrolled(currentScrollY > 50);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [lastScrollY]);

  const navHidden = scrollDirection === 'down' && isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#003366]/95 backdrop-blur-sm shadow-lg py-2'
          : 'bg-transparent py-4'
      } ${navHidden ? '-translate-y-full' : 'translate-y-0'}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2 z-10">
            <div className="w-10 h-10 bg-[#E8751A] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm">PROMET</p>
              <p className="text-[#94A3B8] text-xs">60 años</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wide transition-all relative ${
                  activeSection === link.id
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                }`}
                aria-label={`Navegar a ${link.label}`}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
                {activeSection === link.id && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#E8751A] rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={wa.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E8751A] hover:bg-[#FF8533] text-white px-6 py-2 rounded-lg font-bold text-sm uppercase transition-colors whitespace-nowrap"
              data-cta
              aria-label={wa.message}
            >
              Presupuesto
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button
                className="text-white p-2"
                aria-label="Abrir menú de navegación"
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-[#0A0B0D]/98 border-l border-white/5 backdrop-blur-xl p-0"
              aria-label="Menú de navegación"
            >
              <SheetTitle className="sr-only">Menú de Promet</SheetTitle>

              <div className="flex flex-col h-full p-6">
                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-6 mt-12 flex-1">
                  {navLinks.map((link, i) => (
                    <a
                      key={link.id}
                      href={link.href}
                      className="text-white font-bold text-3xl uppercase transition-colors hover:text-[#E8751A] animate-fade-in-up"
                      style={{ animationDelay: `${i * 0.08}s` }}
                      onClick={() => setIsOpen(false)}
                      aria-label={`Navegar a ${link.label}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile Footer in Menu */}
                <div className="border-t border-white/5 pt-6 space-y-4">
                  <div>
                    <p className="text-[#94A3B8] text-xs uppercase tracking-wide mb-2">
                      Encontranos en
                    </p>
                    <p className="text-white font-medium text-sm">
                      Calle 43 e/ 148 y 149, La Plata
                    </p>
                  </div>

                  <div>
                    <p className="text-[#94A3B8] text-xs uppercase tracking-wide mb-2">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/5492215551234"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium text-sm hover:text-[#E8751A] transition-colors"
                      aria-label="Abrir chat de WhatsApp"
                    >
                      +54 9 221 555-1234
                    </a>
                  </div>

                  <a
                    href={wa.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#E8751A] hover:bg-[#FF8533] text-white py-3 rounded-lg font-bold uppercase text-sm transition-colors text-center mt-6"
                    data-cta
                    onClick={() => setIsOpen(false)}
                    aria-label={wa.message}
                  >
                    PEDIR PRESUPUESTO →
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
