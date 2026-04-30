import Link from 'next/link'
import { Facebook, Instagram, MessageCircle, Mail, MapPin } from 'lucide-react'

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
    <footer className="bg-[#0F172A] text-white steel-texture">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-white tracking-[0.1em]">
                  PROMET
                </span>
                <span className="text-[10px] text-[#64748B] -mt-1 tracking-[0.2em] uppercase">
                  Metalúrgica
                </span>
              </div>
            </Link>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
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
                    className="w-10 h-10 bg-[#1E293B] border border-[#334155] hover:border-[#D97706] hover:bg-[#D97706]/10 rounded flex items-center justify-center transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5 text-[#94A3B8] group-hover:text-[#D97706]" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 tracking-[0.05em]">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#94A3B8] hover:text-[#D97706] text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 tracking-[0.05em]">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#94A3B8] hover:text-[#D97706] text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 tracking-[0.05em]">Contacto</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.google.com/maps/place/Promet+Metal%C3%BArgica+Promet/@-34.9487225,-57.9993909,17z/data=!3m1!4b1!4m6!3m5!1s0x95a2e8042fdd17f9:0x54d73dc1cd711452!8m2!3d-34.9487225!4d-57.9993909!16s%2Fg%2F1w8wc65x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[#94A3B8] hover:text-[#D97706] text-sm transition-colors group"
                >
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-[#D97706]" />
                  <span className="group-hover:underline underline-offset-2">Calle 43 entre 148 y 149, La Plata</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5492213611947?text=Hola%20Promet!%20Vi%20su%20web%20y%20quiero%20pedir%20un%20presupuesto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#94A3B8] hover:text-[#D97706] text-sm transition-colors"
                >
                  <MessageCircle className="h-5 w-5 flex-shrink-0 text-[#D97706]" />
                  <span>+54 9 221 361-1947</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:metalurgicaprometlp@gmail.com"
                  className="flex items-center gap-3 text-[#94A3B8] hover:text-[#D97706] text-sm transition-colors"
                >
                  <Mail className="h-5 w-5 flex-shrink-0 text-[#D97706]" />
                  <span>metalurgicaprometlp@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#334155]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#64748B]">
            <div>
              <p>
                &copy; {currentYear} Metalúrgica Promet. Todos los derechos reservados.
              </p>
              <p className="italic text-xs text-[#475569] mt-1">
                60 años en La Plata no se improvisan.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[#D97706] transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-[#D97706] transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
