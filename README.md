# abogadalaura.com — v2

Sitio web de Laura Riaño, abogada en Bogotá.

- **Vista previa:** https://darko6324.github.io/abogada-laura/ (sin indexar; muestra borradores)
- **Producción:** https://www.abogadalaura.com (sigue en la v1 hasta el día D)

## Estructura

```
site/                    sitio Astro
  src/content/           textos de servicios, FAQ y blog (Markdown)
  src/config/site.ts     teléfono, correo, Instagram
  src/lib/whatsapp.ts    mensajes de WhatsApp por página
  scripts/guardia.mjs    bloquea la publicación de contenido sin validar
docs/                    pendientes con Laura y decisiones
.github/workflows/       CI y despliegue a GitHub Pages
```

## Cómo se publica un cambio

1. Se edita el contenido o el código y se hace push a `main`.
2. GitHub Actions compila y publica en Pages en unos dos minutos.
3. Una página pasa de borrador a publicada solo cuando su archivo dice `estado: confirmado`.

Ver `CLAUDE.md` para las reglas del proyecto.
