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
- **Textos legales aprobados (2026-10-14)** por David y Laura, con el nombre completo (Laura Valentina Riaño Pacheco) y la dirección de notificaciones (Carrera 76 # 80B-16, Minuto de Dios, Bogotá).
- **Receptor de leads publicado** como aplicación web de Apps Script (versión 1, acceso «Cualquiera», se ejecuta como David). Probado desde github.io: la fila llega al Sheet. La URL `/exec` quedó como valor por defecto en el workflow.
- **Zona horaria del Sheet** pasó a Bogotá (GMT-5). La fila de prueba conserva la hora anterior; las nuevas llegan bien.
- **Dominio:** verificación de `abogadalaura.com` iniciada en GitHub Pages. El dominio no está en la cuenta de GoDaddy de David; los pasos siguen en `docs/dia-d.md`.

## 2026-10-15 · Google Tag Manager
- **GTM `GTM-PTVKZWZD`** en todas las páginas, solo en producción (`src/components/Medicion.astro`).
- **Consent Mode v2:** todo arranca en `denied` y pasa a `granted` solo si la persona acepta en el aviso de cookies, como promete la política de datos («se te pedirá permiso antes de activarlas»). La elección se guarda en `localStorage` (`consentimiento-cookies`).
- **Eventos al dataLayer:** cada clic en un elemento con `data-evento` (whatsapp_click, phone_click, email_click, cta_click, segmento_click, servicio_card_click, faq_open) y los del formulario (form_start, form_submit, form_error). Sin datos personales.
- Pendiente con Laura: añadir a la política de datos (§6 encargados) a Google Analytics/Tag Manager cuando se configure la etiqueta de GA4.
- **GA4:** cuenta nueva «Marca & Empresa» (cuenta de David), propiedad `abogadalaura.com` (559064376), flujo web `G-Q17JRREKSY`, zona Colombia, pesos.
- **Contenedor GTM** importado desde `docs/medicion/gtm-contenedor.json`: etiqueta de Google (Initialization - All Pages) y «GA4 - Eventos del sitio» con un activador de evento personalizado y una variable de capa de datos por parámetro. Pendiente: publicarlo y marcar `form_submit` y `whatsapp_click` como eventos clave en GA4.

## 2026-10-15 · Día D completado
- Certificado emitido tras quitar y volver a poner el dominio personalizado (el chequeo DNS estaba atascado). **Enforce HTTPS** activo. `abogadalaura.com` redirige a `https://www.abogadalaura.com/`. Formulario con endpoint en producción.

## 2026-10-15 · Medición, SEO y remarketing
- Tag Manager publicado (v2). GA4 configurado: retención 14 meses, Google Signals, 6 dimensiones personalizadas, 4 audiencias, medición mejorada sin «interacciones con formularios» (duplicaba `form_start`/`form_submit`). Vinculado con Search Console.
- Search Console: propiedad de dominio verificada por TXT, sitemap enviado, indexación solicitada para las 5 páginas principales.
- Attorney JSON-LD con dirección completa (SEO local).
- Detalle y pendientes en `docs/medicion/README.md`. Ajuste de la política de datos para aprobación de Laura en `docs/medicion/politica-ajuste-analitica.md`.

## 2026-10-15 · Feed de Instagram en el home
- Feed propio en lugar de Elfsight (el plan gratis de Elfsight ya está ocupado por La Empanada Guerrera y tiene tope de 200 vistas).
- `site/scripts/instagram.mjs` trae las 6 últimas publicaciones de @marcayempresa con la API de Instagram (Instagram Login) y guarda las imágenes en `src/assets/instagram/`. El sitio no carga nada de Instagram al visitarlo: sin cookies de terceros y optimizado por `astro:assets`.
- El deploy corre una vez al día (cron 6:15 a. m. Bogotá) para refrescar el feed. Token en el secreto `IG_TOKEN`; sin token, la sección muestra solo el botón «Seguir en Instagram».
- Evento nuevo `instagram_click` (`ubicacion`: home-seguir / home-publicacion).
