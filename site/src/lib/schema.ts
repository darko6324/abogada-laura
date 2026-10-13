import { plano } from './texto';
import { url } from './url';

/** FAQPage solo sobre preguntas visibles en la página (estrategia §14). */
export function faqSchema(preguntas: { p: string; r: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((q) => ({
      '@type': 'Question',
      name: q.p,
      acceptedAnswer: { '@type': 'Answer', text: plano(q.r) },
    })),
  };
}

export function migasSchema(site: URL | undefined, migas: { nombre: string; ruta?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: migas.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.nombre,
      ...(m.ruta ? { item: new URL(url(m.ruta), site).href } : {}),
    })),
  };
}
