import Link from 'next/link'
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react'

const footerLinks = {
  servicios: [
    { label: 'Soldadura Industrial', href: '#servicios' },
    { label: 'Mecanizado de Precisión', href: '#servicios' },
    { label: 'Estructuras Metálicas', href: '#servicios' },
    { label: 'Mantenimiento Industrial', href: '#servicios' },
    { label: 'Corte y Plegado', href: '#servicios' },
  ],
  empresa: [
    { label: 'Sobre Nosotros', href: '#nosotros' },
    { label: 'Nuestros Trabajos', href: '#trabajos' },
    { label: 'Proceso de Trabajo', href: '#proceso' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Contacto', href: '#contacto' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/metalurgicapromet', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/metalurgicapromet', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/metalurgicapromet', label: 'LinkedIn' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-promet-blue text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="flex flex-col">
                <span className="font-sans font-bold text-2xl text-white tracking-tight">
                  PROMET
                </span>
                <span className="text-xs text-white/70 -mt-1 tracking-widest">
                  METALÚRGICA
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              60 años transformando metal en soluciones industriales. Calidad, precisión y compromiso en cada proyecto.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-promet-orange rounded-lg flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=Buenos+Aires"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/70 hover:text-white text-sm transition-colors"
                >
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>Av. Industrial 1234, Buenos Aires, Argentina</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+5411XXXXXXXX"
                  className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors"
                >
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <span>+54 11 XXXX-XXXX</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@metalurgicapromet.com.ar"
                  className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors"
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <span>info@metalurgicapromet.com.ar</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>
              &copy; {currentYear} Metalúrgica Promet. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
