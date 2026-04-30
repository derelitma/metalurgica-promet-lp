export function UrgencyMarquee() {
  const items = [
    '🔥 Presupuesto sin cargo en 24hs',
    '✓ Calidad certificada ISO',
    '⚡ Entregas express disponibles',
    '🛡️ 60 años de garantía en servicio',
    '📞 Atención personalizada',
    '🔧 Servicio de emergencia 24/7',
  ]

  return (
    <div className="bg-promet-orange overflow-hidden py-3">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center mx-8 text-white font-semibold text-sm md:text-base"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
