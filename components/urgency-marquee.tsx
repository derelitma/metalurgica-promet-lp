export function UrgencyMarquee() {
  const items = [
    '✦ Racks para Hipermercado Nini',
    '✦ Rejas del Zoo de La Plata',
    '✦ Cabinas de seguridad La Plata',
    '✦ Corte y plegado para herreros',
    '✦ Perfiles especiales para barcos',
    '◆ Portón entregado en City Bell',
    '◆ Escalera instalada en Villa Elisa',
    '◆ Techo terminado en Gonnet',
    '◆ Puerta blindada en La Plata Centro',
    '◆ Estructura metálica en Los Hornos',
  ]

  return (
    <div className="bg-[#E8751A] overflow-hidden py-3">
      <div className="animate-marquee whitespace-nowrap flex" style={{ animationDuration: '45s' }}>
        {[...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center mx-8 text-white font-semibold text-sm md:text-base tracking-[0.02em]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
