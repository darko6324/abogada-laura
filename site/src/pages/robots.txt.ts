import type { APIRoute } from 'astro';
import { ES_PREVIEW } from '../config/site';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`, site).href;
  const cuerpo = ES_PREVIEW
    ? 'User-agent: *\nAllow: /\n# Vista previa: todas las páginas llevan noindex.\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(cuerpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
