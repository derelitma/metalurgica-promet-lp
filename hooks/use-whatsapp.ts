'use client';

const WA_BASE = 'https://wa.me/5492215551234?text=';

const messages = {
  hero: 'Hola Promet! Vi su web y quiero pedir un presupuesto general.',
  portones: 'Hola Promet! Me interesa un portón a medida. ¿Pueden asesorarme?',
  puertas: 'Hola Promet! Necesito presupuesto para puerta/s metálicas.',
  ventanas: 'Hola Promet! Consulto por ventanas metálicas a medida.',
  escaleras: 'Hola Promet! Me interesa una escalera. ¿Me pueden cotizar?',
  techos: 'Hola Promet! Necesito presupuesto para techo/estructura metálica.',
  especiales: 'Hola Promet! Tengo un trabajo especial para consultar.',
  gallery: 'Hola! Vi los trabajos en su web y me gustaría algo similar.',
  testimonials: 'Hola Promet! Vi las recomendaciones y quiero pedir un presupuesto.',
  floating: 'Hola Promet! Vi su web y quiero consultar.',
  form_fallback: 'Hola Promet! Intenté mandar el formulario. ¿Me pueden ayudar?',
  mobile_footer: 'Hola! Quiero pedir un presupuesto.',
};

export function useWhatsApp(context: keyof typeof messages = 'floating') {
  const getWhatsAppLink = () => {
    const message = messages[context];
    const encoded = encodeURIComponent(message);
    return `${WA_BASE}${encoded}`;
  };

  const openWhatsApp = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    const link = getWhatsAppLink();
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return {
    link: getWhatsAppLink(),
    open: openWhatsApp,
    message: messages[context],
  };
}
