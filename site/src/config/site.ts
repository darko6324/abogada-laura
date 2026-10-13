// Datos únicos del sitio. Si algo de esto cambia, se cambia AQUÍ y en ningún otro lugar.

export const MODO: 'preview' | 'produccion' =
  import.meta.env.PUBLIC_SITE_MODE === 'produccion' ? 'produccion' : 'preview';

/** En vista previa se muestran borradores (con aviso) y todo el sitio va con noindex. */
export const ES_PREVIEW = MODO === 'preview';

export const SITE = {
  marca: 'Laura Riaño',
  rol: 'Abogada',
  lema: 'El derecho de tu lado.',
  ciudad: 'Bogotá',
  pais: 'CO',
  // Número en formato internacional, sin +, espacios ni guiones.
  whatsapp: '573218180713',
  telefonoVisible: '+57 321 818 0713',
  correo: 'laurarianoabogada@gmail.com',
  instagram: 'https://www.instagram.com/dradepende/',
  instagramUsuario: '@dradepende',
} as const;

export const AVISO_GENERAL =
  'La información publicada en este sitio es de carácter general y orientativo. No constituye asesoría jurídica para un caso particular ni crea una relación abogado-cliente. Cada situación debe evaluarse de forma individual.';
