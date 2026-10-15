# Medición, SEO y remarketing — www.abogadalaura.com

Todo vive en la cuenta de Google de David (david.guerrero.corp@gmail.com), en cuentas propias de Marca & Empresa, separadas de La Empanada Guerrera.

## Inventario

| Herramienta | Cuenta / propiedad | ID |
|---|---|---|
| Google Tag Manager | Cuenta «Abogada Laura» → contenedor `www.abogadalaura.com/` | `GTM-PTVKZWZD` (cuenta 6382780507, contenedor 267263111) |
| Google Analytics 4 | Cuenta «Marca & Empresa» (412086370) → propiedad `abogadalaura.com` (559064376) | Flujo web 16136395713 · `G-Q17JRREKSY` |
| Search Console | Propiedad de dominio `sc-domain:abogadalaura.com` | Verificada por TXT en GoDaddy. También es propietaria `aurorafemmecol@gmail.com` (sitio anterior). |
| GoDaddy | Cuenta donde vive el dominio (no la de David) | DNS: 4 registros A de GitHub Pages, `CNAME www → darko6324.github.io`, TXT de GitHub y de Search Console |

## Cómo funciona en el sitio

- `site/src/components/Medicion.astro` carga GTM **solo en producción** y con **Consent Mode v2**: todo arranca en `denied`; el aviso de cookies pasa a `granted` si la persona acepta. La elección queda en `localStorage` (`consentimiento-cookies`).
- Eventos al `dataLayer` (sin datos personales):

| Evento | Cuándo | Parámetros |
|---|---|---|
| `whatsapp_click` | Clic en cualquier botón de WhatsApp | `ubicacion` (nav, hero, sticky, footer, formulario, tarjeta, contacto, gracias), `servicio` |
| `phone_click` | Clic en «Llamar» | — |
| `email_click` | Clic en el correo | — |
| `cta_click` | Botones «Agenda tu asesoría» y similares | `posicion` |
| `segmento_click` | Puertas «negocio» / «personas» del menú móvil | `segmento` |
| `servicio_card_click` | Tarjetas de servicio | `servicio_destino` |
| `faq_open` | Abrir una pregunta frecuente | `pregunta` |
| `form_start` | Primer foco en el formulario | — |
| `form_submit` | Lead guardado en el Sheet | `servicio_seleccionado`, `respuesta_condicional` |
| `form_error` | Error de validación o de envío | `campo`, `tipo_error` |

Todos llevan `origen_pagina`.

## Tag Manager (versión 2 publicada, 2026-10-15)

- **Google tag - GA4 (G-Q17JRREKSY)** → activador *Initialization - All Pages*.
- **GA4 - Eventos del sitio** → evento `{{Event}}` con los parámetros de arriba (variables `DLV - …`), activador *Eventos del sitio (dataLayer)* (regex con los 10 eventos).
- Configuración exportada en `gtm-contenedor.json`. Para restaurarla: Administrador → Importar contenedor → Combinar.

## Analytics

- Retención de datos de eventos: **14 meses**.
- **Google Signals** activado (necesario para remarketing y datos demográficos).
- Medición mejorada: vistas, desplazamientos, clics de salida, búsqueda, vídeo y descargas. **Interacciones con formularios desactivada** porque usa los mismos nombres (`form_start`, `form_submit`) y duplicaría.
- Dimensiones personalizadas (evento): Servicio, Servicio del formulario, Ubicación del clic, Posición del botón, Pregunta frecuente, Segmento.
- Audiencias (duración máxima, 540 días):
  - Visitantes de Registro de marca (excluye a quien envió el formulario).
  - Visitantes de Crear empresa (excluye a quien envió el formulario).
  - Empezaron el formulario y no lo enviaron.
  - Contactaron (formulario o WhatsApp) — para excluir en campañas de captación.
- Vinculado con Search Console.
- **Pendiente:** marcar como eventos clave `form_submit`, `whatsapp_click` y `phone_click` (Administrar → Eventos → estrella). Analytics solo los deja marcar cuando ya los recibió.

## SEO

- Sitemap `https://www.abogadalaura.com/sitemap-index.xml` enviado a Search Console. `robots.txt` lo declara.
- Indexación solicitada para inicio, registro de marca, crear empresa, contratos y emprendedores.
- El sitio anterior solo tenía indexada la página de inicio, así que no hacen falta redirecciones.
- Cada página: un H1, title y description propios, canonical, Open Graph y JSON-LD (Attorney con dirección; Service, FAQPage y BreadcrumbList en las landings). `/gracias` y 404 con `noindex`.

## Remarketing: qué falta cuando se activen campañas

1. **Google Ads:** crear la cuenta (requiere medio de pago) y vincularla en GA4 → Vinculaciones con Google Ads. Las audiencias de arriba pasan solas a Ads. Importar `form_submit` como conversión.
2. **Meta (Facebook/Instagram):** crear el píxel en el Business Manager de @marcayempresa y pasar el ID. Se agrega en GTM con la plantilla de Meta Pixel, condicionado a `ad_storage = granted`.
3. Antes de activar cualquiera de los dos, actualizar la política de datos (ver `politica-ajuste-analitica.md`) con la aprobación de Laura.

## Observación del 2026-10-15

Desde el Chrome de David, varias peticiones a `analytics.google.com/g/collect` respondieron 503 y no llegaron a Analytics (solo llegó una visita de varias). Las etiquetas sí se disparan y la petición a `stats.g.doubleclick.net` responde 204. Probablemente es algo de esa conexión o navegador (bloqueador, DNS con filtro, VPN). Comprobar desde otro dispositivo y red (por ejemplo, el celular con datos móviles) en Analytics → Tiempo real.
