// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Mientras el sitio vive en la vista previa de GitHub Pages:
//   SITE_URL=https://darko6324.github.io  BASE_PATH=/abogada-laura
// El día D (dominio propio):
//   SITE_URL=https://www.abogadalaura.com  BASE_PATH=/
// Ambos se definen como variables del repositorio en GitHub (Settings → Variables).
const SITE_URL = process.env.SITE_URL || 'https://darko6324.github.io';
const BASE_PATH = process.env.BASE_PATH || '/abogada-laura';
const MODO = process.env.PUBLIC_SITE_MODE || 'preview';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // En vista previa no se publica sitemap útil: todo va con noindex.
      filter: (page) => MODO === 'produccion' && !page.includes('/gracias'),
    }),
  ],
});
