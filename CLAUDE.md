# abogadalaura.com v2 — reglas del proyecto

Sitio de la abogada Laura Riaño (Bogotá). Lo construye David Guerrero con Claude.
La estrategia completa vive en el Project «Laura Abogada» (`estrategia-web-v2.md`) y el plan por fases en `plan-ejecucion-v2.md`. Las secciones citadas como §N se refieren a la estrategia.

## Stack
- `site/` — Astro 5, estático, desplegado en GitHub Pages por `.github/workflows/deploy-site.yml` en cada push a `main`.
- Contenido en Markdown dentro de `site/src/content/` (servicios, faq, blog). Sin CMS.
- `api/` (Fase 3) — endpoint de leads en Cloud Run; guarda en Google Sheets.
- Fuentes autoalojadas (@fontsource), imágenes por `astro:assets`. Nada de Google Fonts por `<link>`.

## Reglas que no se rompen
1. **Nada se publica sin validación de Laura.** Todo contenido nace con `estado: borrador`. Solo Laura lo pasa a `confirmado`.
2. **`[CONFIRMAR]` y `[TARIFA]`** marcan afirmaciones o valores sin validar. Nunca se inventa un valor, una cifra, un plazo ni un honorario. La guardia (`site/scripts/guardia.mjs`) hace fallar el build de producción si quedan en una página publicada.
3. **Lista de veto (§3.4):** nada de «garantizamos», «excelencia jurídica», «soluciones integrales», «sin riesgo», «tu marca quedará registrada», «nuestro equipo», ni alarmismo. Nunca prometer resultados ni plazos que dependan de una entidad.
4. **Voz:** tuteo siempre, primera persona de Laura, lenguaje sencillo. Cercana, clara, profesional.
5. **Accesibilidad:** `--dorado` (#C9A84C) solo decorativo sobre fondo claro; para texto, `--dorado-texto`. Objetivos táctiles de 44 px. Un solo H1 por página.
6. **WhatsApp:** siempre con `whatsappUrl()` de `src/lib/whatsapp.ts` y el mensaje de su página (§13). Nunca el número a mano.
7. **Enlaces internos:** siempre con `url()` de `src/lib/url.ts` (el sitio vive bajo `/abogada-laura/` hasta el día D).
8. **No enlazar a páginas que no existen** desde menú o footer.
9. **Sin secretos en el repo.** Es público. Credenciales solo en GitHub Secrets.
10. **No escribir textos legales** (política de datos, aviso legal): los redacta o aprueba Laura.

## Modos
- `PUBLIC_SITE_MODE=preview` (por defecto): muestra borradores con aviso, todo con `noindex`.
- `PUBLIC_SITE_MODE=produccion`: excluye borradores y falla ante cualquier pendiente.

## Comandos
```
cd site && npm install && npm run dev       # local
npm run build                               # build + guardia (vista previa)
PUBLIC_SITE_MODE=produccion npm run build   # simula producción
```

## Pendientes y decisiones
- `docs/pendientes-laura.md` — lo que falta confirmar con Laura (§23).
- `docs/decisiones.md` — registro de decisiones técnicas.
