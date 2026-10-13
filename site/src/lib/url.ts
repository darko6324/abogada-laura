/**
 * Arma rutas internas respetando la ruta base (en la vista previa el sitio vive en /abogada-laura/).
 * Usar SIEMPRE para enlaces internos: url('/crear-empresa'), nunca '/crear-empresa' a mano.
 */
export function url(ruta = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const limpia = ruta.startsWith('/') ? ruta : `/${ruta}`;
  return `${base}${limpia}` || '/';
}
