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
      {/* Premium Eyebrow Bar - Orange */}
      <div className="bg-[#E8751A] text-white text-center py-1.5">
        <p className="text-[13px] font-medium tracking-[0.05em]" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
          Respondemos hoy. Presupuestos en menos de 24hs.
        </p>
      </div>
      
      {/* Main Navigation - Transparent over hero, white on scroll */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-sm shadow-[0_1px_4px_rgba(0,0,0,0.04)] border-b border-[rgba(0,0,0,0.08)] py-2'
            : 'bg-transparent py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="#" className="flex items-center gap-3 z-10">
              <div className="w-10 h-10 bg-[#E8751A] rounded flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div className="hidden sm:block">
                <p className={`font-bold text-sm tracking-[0.1em] transition-colors ${isScrolled ? 'text-[#111318]' : 'text-white'}`}>PROMET</p>
                <p className={`text-[10px] tracking-[0.15em] transition-colors ${isScrolled ? 'text-[#7A7A78]' : 'text-white/60'}`}>DESDE 1960</p>
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
                      ? 'text-[#E8751A]'
                      : isScrolled
                        ? 'text-[#4A4A48] hover:text-[#111318]'
                        : 'text-white/80 hover:text-white'
                  }`}
                  aria-label={`Navegar a ${link.label}`}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#E8751A] rounded-full" />
                  )}
                </a>
              ))}
            </nav>

            {/* Desktop CTA - Always Orange */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={wa.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E8751A] hover:bg-[#C96318] text-white px-6 py-2.5 rounded-lg font-bold text-[13px] uppercase tracking-[0.05em] transition-all shadow-lg hover:shadow-[0_0_20px_rgba(232,117,26,0.3)]"
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
                  className={`p-2 transition-colors ${isScrolled ? 'text-[#111318]' : 'text-white'}`}
                  aria-label="Abrir menú de navegación"
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-white border-l border-[rgba(0,0,0,0.08)] p-0"
                aria-label="Menú de navegación"
              >
                <SheetTitle className="sr-only">Menú de Promet</SheetTitle>

                <div className="flex flex-col h-full p-6">
                  <nav className="flex flex-col gap-6 mt-12 flex-1">
                    {navLinks.map((link, i) => (
                      <a
                        key={link.id}
                        href={link.href}
                        className="text-[#111318] font-bold text-2xl uppercase tracking-[0.1em] transition-colors hover:text-[#E8751A] animate-fade-in-up"
                        style={{ animationDelay: `${i * 0.08}s` }}
                        onClick={() => setIsOpen(false)}
                        aria-label={`Navegar a ${link.label}`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  <div className="border-t border-[rgba(0,0,0,0.08)] pt-6 space-y-4">
                    <div>
                      <p className="text-[#7A7A78] text-xs uppercase tracking-[0.15em] mb-2">
                        Encontranos en
                      </p>
                      <p className="text-[#111318] font-medium text-sm">
                        Calle 43 e/ 148 y 149, La Plata
                      </p>
                    </div>

                    <div>
                      <p className="text-[#7A7A78] text-xs uppercase tracking-[0.15em] mb-2">
                        WhatsApp
                      </p>
                      <a
                        href="https://wa.me/5492213611947?text=Hola%20Promet!%20Vi%20su%20web%20y%20quiero%20pedir%20un%20presupuesto."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#111318] font-medium text-sm hover:text-[#E8751A] transition-colors"
                        aria-label="Abrir chat de WhatsApp"
                      >
                        +54 9 221 361-1947
                      </a>
                    </div>

                    <a
                      href={wa.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#E8751A] hover:bg-[#C96318] text-white py-3 rounded-lg font-bold uppercase text-sm tracking-[0.05em] transition-all text-center mt-6"
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
