# abogadalaura.com v2 — reglas del proyecto

Sitio de **Marca & Empresa** (@marcayempresa): registro de marca, creación de empresa y crecimiento digital, con la abogada Laura Riaño (Bogotá) como responsable de la parte jurídica. Lo construye David Guerrero con Claude.
El manual de marca vive en `docs/marca-y-empresa/` (colores, tipografía, logos, voz). Ante cualquier duda de diseño o de tono, manda el manual.
La estrategia completa vive en el Project «Laura Abogada» (`estrategia-web-v2.md`) y el plan por fases en `plan-ejecucion-v2.md`. Las secciones citadas como §N se refieren a la estrategia.

## Stack
- `site/` — Astro 5, estático, desplegado en GitHub Pages por `.github/workflows/deploy-site.yml` en cada push a `main`.
- Contenido en Markdown dentro de `site/src/content/` (servicios, faq, blog). Sin CMS.
- `api/leads/` — receptor de leads en Google Apps Script (cuenta de David); guarda en el Sheet «Leads — Marca & Empresa» y avisa a Laura por correo. Su URL `/exec` está en `.github/workflows/deploy-site.yml` (se puede reemplazar con la variable del repo `LEADS_ENDPOINT`).
- Fuentes autoalojadas (@fontsource: Libre Caslon Text y Montserrat), imágenes por `astro:assets`. Nada de Google Fonts por `<link>`.
- Favicon: isotipo M&E azul sobre fondo blanco (`site/public/isotipo-*.png` y `favicon.ico`). Si se cambia, usar un nombre de archivo nuevo: los navegadores guardan el ícono en caché por nombre.

## Reglas que no se rompen
1. **Nada se publica sin validación de Laura.** Todo contenido nace con `estado: borrador`. Solo Laura lo pasa a `confirmado`.
2. **`[CONFIRMAR]` y `[TARIFA]`** marcan afirmaciones o valores sin validar. Nunca se inventa un valor, una cifra, un plazo ni un honorario. La guardia (`site/scripts/guardia.mjs`) hace fallar el build de producción si quedan en una página publicada.
3. **Lista de veto (§3.4):** nada de «garantizamos», «excelencia jurídica», «soluciones integrales», «sin riesgo», «tu marca quedará registrada», «nuestro equipo», ni alarmismo. Nunca prometer resultados ni plazos que dependan de una entidad.
4. **Voz:** tuteo siempre, lenguaje sencillo. La marca habla en plural neutro («registramos tu marca»); Laura habla en primera persona en las landings jurídicas y en su bloque. Sin alarmismo (manual, «Cómo suena»).
5. **Accesibilidad:** sobre fondos `--azul-notarial`, los acentos van en `--acento-claro` o `--hielo`, nunca en `--cobalto`. Objetivos táctiles de 44 px. Un solo H1 por página.
6. **WhatsApp:** siempre con `whatsappUrl()` de `src/lib/whatsapp.ts` y el mensaje de su página (§13). Nunca el número a mano.
7. **Enlaces internos:** siempre con `url()` de `src/lib/url.ts` (el sitio vive bajo `/abogada-laura/` hasta el día D).
8. **No enlazar a páginas que no existen** desde menú o footer.
9. **Sin secretos en el repo.** Es público. Credenciales solo en GitHub Secrets.
10. **Textos legales** (política de datos, aviso legal): cualquier cambio necesita la aprobación de Laura antes de publicarse.

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
