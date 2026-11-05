// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Mientras el sitio vive en la vista previa de GitHub Pages:
//   SITE_URL=https://darko6324.github.io  BASE_PATH=/abogada-laura
// El día D (dominio propio):
//   SITE_URL=https://www.abogadalaura.com  BASE_PATH=/
// Ambos se definen como variables del repositorio en GitHub (Settings → Variables).
const SITE_URL = process.env.SITE_URL || 'https://darko6324.github.io';
const BASE_PATH = process.env.BASE_PATH || '/abogada-laura';
const MODO = process.env.PUBLIC_SITE_MODE || 'preview';

/**
 * El índice del blog existe siempre, pero mientras no haya ningún artículo
 * confirmado va vacío y con noindex. En ese estado no debe ir al sitemap:
 * Google lo rastrearía solo para descubrir que no debe indexarlo.
 */
const BLOG_CON_ARTICULOS = (() => {
  try {
    return readdirSync('./src/content/blog')
      .filter((f) => f.endsWith('.md'))
      .some((f) => /^estado:\s*confirmado\s*$/m.test(readFileSync(`./src/content/blog/${f}`, 'utf8')));
  } catch {
    return false;
  }
})();

/**
 * Los enlaces internos escritos en el cuerpo de los artículos —[texto](/ruta)— no pasan
 * por url(), así que hay que anteponerles la ruta base a mano. Sin esto funcionan en
 * producción (base /) pero se rompen en la vista previa, que vive en /abogada-laura/.
 */
function enlacesConBase() {
  const base = BASE_PATH.replace(/\/$/, '');
  return (arbol) => {
    if (!base) return;
    const visita = (n) => {
      if (n.type === 'element' && n.tagName === 'a') {
        const href = n.properties?.href;
        if (
          typeof href === 'string' &&
          href.startsWith('/') &&
          !href.startsWith('//') &&
          !href.startsWith(`${base}/`)
        ) {
          n.properties.href = `${base}${href}`;
        }
      }
      for (const h of n.children || []) visita(h);
    };
    visita(arbol);
  };
}

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  markdown: { rehypePlugins: [enlacesConBase] },
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // En vista previa no se publica sitemap útil: todo va con noindex.
      filter: (page) =>
        MODO === 'produccion' &&
        !page.includes('/gracias') &&
        (BLOG_CON_ARTICULOS || !/\/blog\/?$/.test(page)),
    }),
  ],
});
