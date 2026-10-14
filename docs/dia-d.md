# Día D · Paso a www.abogadalaura.com

Estado al 2026-10-14: el sitio está listo para producción (la guardia pasa) y el formulario guarda leads en el Sheet. Falta el DNS.

**Bloqueo:** `abogadalaura.com` no está en la cuenta de GoDaddy de David (solo aparece `laempanadaguerrera.com`). Hace falta entrar con la cuenta donde está el dominio (la de Laura o la de quien montó la v1) o que esa persona agregue a David como delegado (GoDaddy → Configuración → Acceso de delegado).

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
