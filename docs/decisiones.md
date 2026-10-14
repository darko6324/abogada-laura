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

## 2026-10-13 · Fase 2 (núcleo comercial en vista previa)

- **Landings con datos estructurados.** Cada servicio es un archivo en `site/src/content/servicios/` con los 11 bloques de §4.5 como campos. La plantilla `src/pages/[servicio].astro` los dibuja siempre en el mismo orden.
- **Solo se enlaza lo que existe.** Socios, negocios digitales y acompañamiento mensual no tienen página todavía: las situaciones y momentos que apuntaban ahí llevan al formulario, y la etapa «Crece» del ciclo aparece sin enlace («Muy pronto»). La guardia falla ante cualquier enlace interno roto.
- **Servicios para personas en una sola página** (`/servicios-personas`) con anclas y un mensaje de WhatsApp por servicio, hasta que existan sus landings.
- **Formulario:** guarda el lead en `PUBLIC_LEADS_ENDPOINT` y lleva a `/gracias`. Sin endpoint (vista previa) arma el mensaje y abre WhatsApp. La guardia bloquea producción si un formulario no tiene endpoint.
- **Ajuste de copy:** en `/registro-de-marca`, «Si alguien te garantiza el registro…» pasa a «Si alguien te asegura el registro…», para no usar una palabra de la lista de veto ni siquiera en negativo.
- **Recurso gratuito (checklist) pendiente** para la Fase 5: el bloque 8 de la home se omite hasta tener el PDF y el envío por correo.
- **Aviso legal y política de datos** existen como páginas en borrador con el marcador `[CONFIRMAR]`: el texto lo redacta o aprueba Laura.

## 2026-10-14 · Giro a Marca & Empresa

- **La marca del sitio pasa a ser Marca & Empresa.** Laura sigue como la abogada que lleva los casos: aparece en el hero, en su bloque y en `/sobre-laura`.
- **Identidad del manual** (`docs/marca-y-empresa/`): azul notarial #002870 del logo, cobalto #3346C8 como acento, fondo papel #F3F2EE, Libre Caslon Text para titulares (cursiva que plantea, negrita que afirma) y Montserrat para el texto.
- **Logo** horizontal azul en el encabezado y blanco en el footer; **favicon** con el monograma M&E blanco sobre azul notarial (ico 16/32/48, png 512 y apple-touch-icon).
- **Home nueva** con las tres líneas en el orden del manual (Marca → Empresa → Crecimiento digital), la pieza «Nombre, logo y marca no son lo mismo» con papel rasgado y la sección de personas como secundaria.
- **Crecimiento digital** (web, marketing, automatización) entra al formulario y a la home. Todavía no tiene landing.
- **Confirmado por David (2026-10-14):** Marca & Empresa usa el mismo WhatsApp y correo de Laura, y Laura presta todos los servicios, incluido el digital. El descriptor del logo («Soluciones integrales para tu negocio») se deja por ahora.
- **Favicon (2026-10-14):** pasa al isotipo M&E azul sobre fondo blanco, con archivos `isotipo-*.png`. Se cambió el nombre de los archivos porque Chrome seguía mostrando el ícono de Astro que se publicó en la Fase 1 como `favicon.ico`.

## 2026-10-14 · Confirmaciones y leads

- **Laura confirmó todo el contenido.** Las landings, la home, el hub, personas, contacto y sobre-laura pasan a `confirmado`. La tarjeta profesional no se publica; se la presenta como «abogada especialista» sin nombrar el área. Se retiró «Horario de atención» porque no hay uno definido.
- **Política de datos y aviso legal** redactados por Claude a pedido de David, en `borrador` hasta que David y Laura los aprueben. Falta la dirección física de notificaciones (Decreto 1377, art. 13).
- **Leads con Google Apps Script en lugar de Cloud Run.** Se puede montar sin proyecto de Cloud ni facturación y desde el navegador. Código en `api/leads/`. Guarda en el Sheet «Leads — Marca & Empresa» (cuenta de David, compartido con Laura como editora) y le avisa a Laura por correo. No registra la IP del visitante: la prueba de la autorización es fecha, hora, página y texto aceptado.
- El formulario envía `text/plain` para evitar la consulta previa de CORS que Apps Script no responde.
