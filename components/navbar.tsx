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

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 200) {
        setScrollDirection('up');
        setIsScrolled(false);
      } else {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navHidden ? '-translate-y-full' : 'translate-y-0'}`}
      role="banner"
    >
      {/* Premium Eyebrow Bar - Amber Gradient */}
      <div className="bg-gradient-to-r from-[#D97706] to-[#B45309] text-white text-center py-1.5">
        <p className="text-[13px] font-medium tracking-[0.05em]" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
          Respondemos hoy. Presupuestos en menos de 24hs.
        </p>
      </div>
      
      {/* Main Navigation - Deep Zinc with Steel Texture */}
      <div
        className={`transition-all duration-300 steel-texture ${
          isScrolled
            ? 'bg-[#0F172A]/98 backdrop-blur-sm shadow-lg py-2'
            : 'bg-[#0F172A]/90 backdrop-blur-sm py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="#" className="flex items-center gap-3 z-10">
              <div className="w-10 h-10 bg-gradient-to-br from-[#D97706] to-[#B45309] rounded flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-bold text-sm tracking-[0.1em]">PROMET</p>
                <p className="text-[#64748B] text-[10px] tracking-[0.15em]">DESDE 1960</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-[13px] font-semibold uppercase tracking-[0.1em] transition-all relative ${
                    activeSection === link.id
                      ? 'text-[#D97706]'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                  aria-label={`Navegar a ${link.label}`}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#D97706] rounded-full" />
                  )}
                </a>
              ))}
            </nav>

            {/* Desktop CTA - Premium Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={wa.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706] text-white px-6 py-2.5 rounded font-bold text-[13px] uppercase tracking-[0.05em] transition-all btn-premium shadow-lg hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]"
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
                className="bg-[#0F172A]/98 border-l border-[#334155] backdrop-blur-xl p-0 steel-texture"
                aria-label="Menú de navegación"
              >
                <SheetTitle className="sr-only">Menú de Promet</SheetTitle>

                <div className="flex flex-col h-full p-6">
                  <nav className="flex flex-col gap-6 mt-12 flex-1">
                    {navLinks.map((link, i) => (
                      <a
                        key={link.id}
                        href={link.href}
                        className="text-white font-bold text-2xl uppercase tracking-[0.1em] transition-colors hover:text-[#D97706] animate-fade-in-up"
                        style={{ animationDelay: `${i * 0.08}s` }}
                        onClick={() => setIsOpen(false)}
                        aria-label={`Navegar a ${link.label}`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  <div className="border-t border-[#334155] pt-6 space-y-4">
                    <div>
                      <p className="text-[#64748B] text-xs uppercase tracking-[0.15em] mb-2">
                        Encontranos en
                      </p>
                      <p className="text-white font-medium text-sm">
                        Calle 43 e/ 148 y 149, La Plata
                      </p>
                    </div>

                    <div>
                      <p className="text-[#64748B] text-xs uppercase tracking-[0.15em] mb-2">
                        WhatsApp
                      </p>
                      <a
                        href="https://wa.me/5492213611947?text=Hola%20Promet!%20Vi%20su%20web%20y%20quiero%20pedir%20un%20presupuesto."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-medium text-sm hover:text-[#D97706] transition-colors"
                        aria-label="Abrir chat de WhatsApp"
                      >
                        +54 9 221 361-1947
                      </a>
                    </div>

                    <a
                      href={wa.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-[#D97706] to-[#B45309] text-white py-3 rounded font-bold uppercase text-sm tracking-[0.05em] transition-all text-center mt-6 btn-premium"
                      data-cta
                      onClick={() => setIsOpen(false)}
                      aria-label={wa.message}
                    >
                      PEDIR PRESUPUESTO
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
