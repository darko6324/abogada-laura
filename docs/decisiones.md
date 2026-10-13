# Registro de decisiones

## 2026-10-13 · Arranque de la v2

- **Hosting en GitHub Pages** (repo `darko6324/abogada-laura`, público) en lugar de Vercel. Despliegue por GitHub Actions. El sitio v1 sigue en Vercel hasta el día D.
- **Sin Sanity.** El contenido vive en Markdown dentro del repo (`site/src/content/`). Si Laura necesita publicar el blog sin pasar por David, se reevalúa un CMS solo para eso.
- **Dos modos de build** (`preview` / `produccion`) controlados por la variable `SITE_MODE` del repo. La vista previa vive en `darko6324.github.io/abogada-laura/` con `noindex`.
- **Guardia de publicación** (`site/scripts/guardia.mjs`): en producción falla si hay borradores, `[CONFIRMAR]`, `[TARIFA]` o frases de la lista de veto.
- **CSS propio con tokens** en lugar de Tailwind: menos dependencias, y los tokens de §20 quedan en un solo archivo (`src/styles/global.css`).
- **Fuentes autoalojadas** con @fontsource (solo subconjunto latino) e **imágenes por `astro:assets`** (WebP, `srcset`), para el objetivo de LCP de §20.
- **Foto del hero:** `laura-3.jpeg`. `laura-1.jpeg` no se usa porque es una pieza promocional con texto incrustado.
- **Leads (Fase 3):** endpoint en Cloud Run que guarda en Google Sheets, desplegado desde `api/` por GitHub Actions.
