import { SITE } from '../config/site';

/**
 * Mensajes precargados por origen (estrategia §13).
 * Cada página usa su propia clave: así Laura sabe de dónde viene el contacto desde el primer mensaje.
 */
export const MENSAJES = {
  general: 'Hola Laura, llegué a tu página y quisiera hacerte una consulta.',
  'crear-empresa': 'Hola Laura, estoy interesado/a en crear una empresa y quisiera conocer cómo funciona la asesoría.',
  'registro-de-marca': 'Hola Laura, quiero revisar la posibilidad de registrar mi marca.',
  'contratos-empresas': 'Hola Laura, necesito elaborar o revisar un contrato para mi negocio.',
  'acuerdo-de-socios': 'Hola Laura, quiero organizar las reglas con mis socios.',
  'negocios-digitales': 'Hola Laura, tengo un negocio digital y quiero organizar sus documentos legales.',
  'abogada-para-empresas': 'Hola Laura, me interesa el acompañamiento jurídico mensual para mi empresa.',
  'emprendedores-y-empresas': 'Hola Laura, tengo un negocio y quisiera asesoría legal. ¿Cómo funciona?',
  'tutelas-derechos-de-peticion': 'Hola Laura, necesito ayuda con una tutela o un derecho de petición.',
  'derecho-de-familia': 'Hola Laura, necesito asesoría en un tema de familia.',
  'consumidor-y-estafas': 'Hola Laura, tuve un problema como consumidor y quiero saber qué puedo hacer.',
  'acoso-laboral': 'Hola Laura, estoy viviendo una situación laboral difícil y quiero asesoría.',
} as const;

export type ClaveMensaje = keyof typeof MENSAJES;

/** Único lugar del sitio donde se arma un enlace a WhatsApp. Nunca escribir el número a mano. */
export function whatsappUrl(mensaje: string = MENSAJES.general): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export function mensajePara(clave?: string): string {
  return (clave && (MENSAJES as Record<string, string>)[clave]) || MENSAJES.general;
}
