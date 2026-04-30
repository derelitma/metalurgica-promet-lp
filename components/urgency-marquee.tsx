export function UrgencyMarquee() {
  const items = [
    '◆ Portón entregado en City Bell',
    '◆ Escalera instalada en Villa Elisa',
    '◆ Techo terminado en Gonnet',
    '◆ Puerta blindada en La Plata Centro',
    '◆ Ventanas en Berisso',
    '◆ Portón corredizo en Ensenada',
    '◆ Estructura metálica en Los Hornos',
    '◆ Escalera exterior en Tolosa',
  ]

  return (
    <div className="bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#D97706] overflow-hidden py-3 border-t border-b border-[#B45309]/50">
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
