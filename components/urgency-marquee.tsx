export function UrgencyMarquee() {
  const items = [
    '✦ Portón entregado en City Bell',
    '✦ Escalera instalada en Villa Elisa',
    '✦ Techo terminado en Gonnet',
    '✦ Puerta blindada en La Plata Centro',
    '✦ Ventanas en Berisso',
    '✦ Portón corredizo en Ensenada',
    '✦ Estructura metálica en Los Hornos',
    '✦ Escalera exterior en Tolosa',
  ]

  return (
    <div className="bg-[#E8751A] overflow-hidden py-3">
      <div className="animate-marquee whitespace-nowrap flex" style={{ animationDuration: '45s' }}>
        {[...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center mx-8 text-[#111318] font-semibold text-sm md:text-base"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
