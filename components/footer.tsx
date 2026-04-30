import Link from 'next/link'
import { Facebook, Instagram, MessageCircle, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  servicios: [
    { label: 'Portones', href: '#servicios' },
    { label: 'Puertas', href: '#servicios' },
    { label: 'Ventanas', href: '#servicios' },
    { label: 'Escaleras', href: '#servicios' },
    { label: 'Techos', href: '#servicios' },
  ],
  empresa: [
    { label: 'Quiénes somos', href: '#nosotros' },
    { label: 'Nuestros trabajos', href: '#trabajos' },
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Lo que dicen de nosotros', href: '#testimonios' },
    { label: 'Escribinos', href: '#contacto' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/MetalurgicaPromet/', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/metalurgicaprometlp', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://wa.me/5492213611947?text=Hola%20Promet!%20Vi%20su%20web%20y%20quiero%20pedir%20un%20presupuesto.', label: 'WhatsApp' },
  { icon: Mail, href: 'mailto:metalurgicaprometlp@gmail.com', label: 'Email' },
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
              60 años fabricando en La Plata. Calidad y palabra.
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
                  href="https://maps.google.com/?q=Calle+43+e/+148+y+149,+La+Plata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/70 hover:text-white text-sm transition-colors"
                >
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>Calle 43 entre 148 y 149, La Plata</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5492213611947?text=Hola%20Promet!%20Vi%20su%20web%20y%20quiero%20pedir%20un%20presupuesto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors"
                >
                  <MessageCircle className="h-5 w-5 flex-shrink-0" />
                  <span>+54 9 221 361-1947</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:metalurgicaprometlp@gmail.com"
                  className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors"
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <span>metalurgicaprometlp@gmail.com</span>
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
            <div>
              <p>
                &copy; {currentYear} Metalúrgica Promet. Todos los derechos reservados.
              </p>
              <p className="italic text-xs text-white/50 mt-1">
                60 años en La Plata no se improvisan.
              </p>
            </div>
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
