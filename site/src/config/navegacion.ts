/**
 * Menú del sitio (estrategia §4.2). Regla: solo se enlaza lo que existe.
 * Cuando se construye una página nueva, se agrega aquí.
 */
export interface Enlace { texto: string; ruta: string }

export const NEGOCIO: Enlace[] = [
  { texto: 'Registro de marca', ruta: '/registro-de-marca' },
  { texto: 'Crear tu empresa', ruta: '/crear-empresa' },
  { texto: 'Contratos para tu negocio', ruta: '/contratos-empresas' },
  // Fase 3, tras confirmar alcance: /acuerdo-de-socios · /negocios-digitales · /abogada-para-empresas
];

export const PERSONAS: Enlace[] = [
  // Las landings individuales llegan después del lanzamiento; por ahora todo vive en el hub.
  { texto: 'Contratos y documentos', ruta: '/servicios-personas#contratos-personas' },
  { texto: 'Tutelas y derechos de petición', ruta: '/servicios-personas#tutelas-derechos-de-peticion' },
  { texto: 'Derecho de familia', ruta: '/servicios-personas#derecho-de-familia' },
  { texto: 'Consumidor y estafas', ruta: '/servicios-personas#consumidor-y-estafas' },
  { texto: 'Acoso y abuso laboral', ruta: '/servicios-personas#acoso-laboral' },
];

export const LEGALES: Enlace[] = [
  { texto: 'Aviso legal', ruta: '/aviso-legal' },
  { texto: 'Política de Tratamiento de Datos Personales', ruta: '/politica-de-tratamiento-de-datos' },
];
