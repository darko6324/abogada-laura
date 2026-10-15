# Día D · Paso a www.abogadalaura.com

Estado al 2026-10-14: el sitio está listo para producción (la guardia pasa) y el formulario guarda leads en el Sheet. Falta el DNS.

El dominio está en otra cuenta de GoDaddy (no en la de David). David abrió sesión en ella el 2026-10-14.

**2026-10-14:** registro TXT creado y ya visible en DNS público (dns.google). GitHub todavía lo marca «Unverified»: su resolvedor guarda la respuesta negativa del primer intento; reintentar **Verify** en una o dos horas.
DNS actual: `A @ 216.198.79.1` y `CNAME www → …vercel-dns-017.com` (Vercel), TTL 1 h. Los CNAME `bounces.cloud*.em` y `sable.cloud*._domainkey` son del correo de GoDaddy: **no tocarlos**.

## 1. Verificar el dominio en GitHub (ya iniciado)
Registro TXT a crear en el DNS del dominio:

| Tipo | Nombre | Valor | TTL |
|---|---|---|---|
| TXT | `_github-pages-challenge-darko6324` | `6f51accd9050b1561192a059f054d2` | 600 s |

Luego: GitHub → Settings → Pages → `abogadalaura.com` → **Verify**.
Aprovechar para bajar a 600 s el TTL de los registros A y CNAME actuales.

## 2. Cambio (pedir confirmación final a David antes)
1. Variables del repo: `SITE_MODE=produccion`, `SITE_URL=https://www.abogadalaura.com`, `BASE_PATH=/`.
2. `site/public/CNAME` con `www.abogadalaura.com`.
3. Repo → Settings → Pages → Custom domain `www.abogadalaura.com`.
4. GoDaddy: borrar `A @ 216.198.79.1` (Vercel); crear `A @` 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 y `CNAME www → darko6324.github.io`.
5. Cuando GitHub emita el certificado: **Enforce HTTPS**.
6. Revisar todas las páginas y enviar el formulario desde el dominio.
7. Search Console: enviar `sitemap-index.xml`.
8. Vercel (cuenta aurorafemme): quitar el dominio del proyecto v1 y dejar el proyecto 1–2 semanas como respaldo.

## Estado 2026-10-14 (noche)
- ✅ Dominio verificado en GitHub. Dominio personalizado `www.abogadalaura.com` guardado en Pages.
- ✅ Build de producción publicado (`SITE_MODE=produccion`, raíz `/`, `CNAME`).
- ✅ GoDaddy: `A @` → 185.199.108.153 / .109 / .110 / .111; `CNAME www → darko6324.github.io`. Vercel ya no recibe tráfico del dominio.
- ⏳ Certificado HTTPS de GitHub en emisión; luego activar **Enforce HTTPS**.
- ⏳ Borrar el proyecto v1 en Vercel (cuenta aurorafemme): lo hace David, es irreversible.
- ⏳ Search Console: enviar `https://www.abogadalaura.com/sitemap-index.xml`.

Nota: en la interfaz de GitHub los botones «Save»/«Verify» no enviaban el formulario desde la automatización; se enviaron con el mismo formulario por `fetch` desde la página.
