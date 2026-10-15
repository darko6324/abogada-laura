// Datos únicos del sitio. Si algo de esto cambia, se cambia AQUÍ y en ningún otro lugar.

export const MODO: 'preview' | 'produccion' =
  import.meta.env.PUBLIC_SITE_MODE === 'produccion' ? 'produccion' : 'preview';

/** En vista previa se muestran borradores (con aviso) y todo el sitio va con noindex. */
export const ES_PREVIEW = MODO === 'preview';

export const SITE = {
  /** Nombre de la marca (manual: docs/marca-y-empresa/). */
  marca: 'Marca & Empresa',
  /** Descriptor corto para el encabezado y los títulos. */
  rol: 'Marca, empresa y crecimiento digital',
  lema: 'Primero proteges lo que construyes. Después lo haces crecer.',
  /** La abogada que presta todos los servicios: marca, empresa y crecimiento digital. */
  abogada: 'Laura Riaño',
  ciudad: 'Bogotá',
  pais: 'CO',
  // Número en formato internacional, sin +, espacios ni guiones. Marca & Empresa usa el mismo de Laura.
  whatsapp: '573218180713',
  telefonoVisible: '+57 321 818 0713',
  correo: 'laurarianoabogada@gmail.com',
  instagram: 'https://www.instagram.com/marcayempresa/',
  instagramUsuario: '@marcayempresa',
} as const;

/** Google Tag Manager. Solo se carga en producción y con Consent Mode: nada se mide sin permiso. */
export const GTM_ID = 'GTM-PTVKZWZD';

export const AVISO_GENERAL =
  'La información publicada en este sitio es de carácter general y orientativo. No constituye asesoría jurídica para un caso particular ni crea una relación abogado-cliente. Cada situación debe evaluarse de forma individual.';
