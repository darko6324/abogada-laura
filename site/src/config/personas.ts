// Servicios para personas (estrategia §7.8). Las landings individuales llegan después del lanzamiento;
// por ahora cada servicio vive como tarjeta en /servicios-personas con su propio mensaje de WhatsApp.
export const SERVICIOS_PERSONAS = [
  {
    id: 'contratos-personas',
    titulo: 'Contratos y documentos',
    texto: 'Arrendamiento, servicios, promesas de compraventa, acuerdos de separación de bienes y revisión antes de firmar.',
    mensaje: 'Hola Laura, necesito ayuda con un contrato o documento personal.',
  },
  {
    id: 'tutelas-derechos-de-peticion',
    titulo: 'Tutelas y derechos de petición',
    texto: 'Cuando una entidad no responde o te están vulnerando un derecho.',
    mensaje: 'Hola Laura, necesito ayuda con una tutela o un derecho de petición.',
  },
  {
    id: 'derecho-de-familia',
    titulo: 'Derecho de familia',
    texto: 'Conciliaciones, régimen de visitas y cuotas alimentarias.',
    mensaje: 'Hola Laura, necesito asesoría en un tema de familia.',
  },
  {
    id: 'consumidor-y-estafas',
    titulo: 'Consumidor y estafas',
    texto: 'Compras en línea que salieron mal, productos defectuosos y reclamos ante empresas.',
    mensaje: 'Hola Laura, tuve un problema como consumidor y quiero saber qué puedo hacer.',
  },
  {
    id: 'acoso-laboral',
    titulo: 'Acoso y abuso laboral',
    texto: 'Ambientes hostiles, discriminación y despidos.',
    mensaje: 'Hola Laura, estoy viviendo una situación laboral difícil y quiero asesoría.',
  },
] as const;
