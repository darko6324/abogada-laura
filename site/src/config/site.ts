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
  /** La abogada que lleva los casos. */
  abogada: 'Laura Riaño',
  ciudad: 'Bogotá',
  pais: 'CO',
  // Número en formato internacional, sin +, espacios ni guiones. [CONFIRMAR si Marca & Empresa usa otro número]
  whatsapp: '573218180713',
  telefonoVisible: '+57 321 818 0713',
  correo: 'laurarianoabogada@gmail.com',
  instagram: 'https://www.instagram.com/marcayempresa/',
  instagramUsuario: '@marcayempresa',
} as const;

export const AVISO_GENERAL =
  'La información publicada en este sitio es de carácter general y orientativo. No constituye asesoría jurídica para un caso particular ni crea una relación abogado-cliente. Cada situación debe evaluarse de forma individual.';
