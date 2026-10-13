import { url } from './url';

/**
 * Texto enriquecido mínimo para los campos de contenido (frontmatter):
 *   **negrita**           → <strong>
 *   [texto](/ruta)        → enlace interno (respeta la ruta base)
 *   [texto](https://…)    → enlace externo con rel="noopener"
 * Todo lo demás se escapa. No admite HTML.
 */
export function t(fuente: string): string {
  const escapado = fuente
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escapado
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, texto: string, destino: string) =>
      destino.startsWith('/')
        ? `<a href="${url(destino)}">${texto}</a>`
        : `<a href="${destino}" target="_blank" rel="noopener">${texto}</a>`,
    );
}

/** Texto plano (para schema FAQPage): quita la sintaxis de t(). */
export function plano(fuente: string): string {
  return fuente.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}
