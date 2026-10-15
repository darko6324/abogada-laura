// Trae las últimas publicaciones de @marcayempresa antes del build.
// Usa la API de Instagram (Instagram Login). El token va en el secreto IG_TOKEN de GitHub, nunca en el repo.
// Si no hay token o la API falla, deja los datos como estaban: el build nunca falla por Instagram.
//
//   IG_TOKEN=... node scripts/instagram.mjs            → descarga publicaciones e imágenes
//   IG_TOKEN=... node scripts/instagram.mjs --refrescar → renueva el token (dura 60 días) y lo imprime en stdout
import { writeFile, readdir, unlink, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const TOKEN = process.env.IG_TOKEN;
const CUANTAS = 6;
const API = 'https://graph.instagram.com';
const DIR_IMG = fileURLToPath(new URL('../src/assets/instagram/', import.meta.url));
const ARCHIVO = fileURLToPath(new URL('../src/data/instagram.json', import.meta.url));

async function pedir(url, ms = 15000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0, 200)}`);
    return r;
  } finally {
    clearTimeout(t);
  }
}

async function refrescar() {
  const r = await pedir(`${API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${TOKEN}`);
  const j = await r.json();
  process.stdout.write(j.access_token);
  console.error(`Token renovado. Vence en ${Math.round(j.expires_in / 86400)} días.`);
}

async function traer() {
  const campos = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const r = await pedir(`${API}/me/media?fields=${campos}&limit=${CUANTAS * 2}&access_token=${TOKEN}`);
  const { data = [] } = await r.json();

  await mkdir(DIR_IMG, { recursive: true });
  for (const f of await readdir(DIR_IMG)) if (f !== '.gitkeep') await unlink(DIR_IMG + f);

  const posts = [];
  for (const p of data) {
    if (posts.length >= CUANTAS) break;
    const fuente = p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url;
    if (!fuente) continue;
    try {
      const img = Buffer.from(await (await pedir(fuente, 20000)).arrayBuffer());
      const archivo = `${p.id}.jpg`;
      await writeFile(DIR_IMG + archivo, img);
      posts.push({
        id: p.id,
        tipo: p.media_type, // IMAGE | VIDEO | CAROUSEL_ALBUM
        enlace: p.permalink,
        texto: (p.caption ?? '').trim(),
        fecha: p.timestamp,
        imagen: archivo,
      });
    } catch (e) {
      console.warn(`Instagram: no pude bajar la imagen de ${p.id}: ${e.message}`);
    }
  }
  if (!posts.length) throw new Error('la API no devolvió publicaciones con imagen');
  await writeFile(ARCHIVO, JSON.stringify({ usuario: 'marcayempresa', actualizado: new Date().toISOString(), posts }, null, 2) + '\n');
  console.log(`Instagram: ${posts.length} publicaciones guardadas.`);
}

// Renueva el token en cada build para que no venza (dura 60 días; se puede renovar si tiene más de 24 h).
// Nunca imprime el token: solo dice cuántos días le quedan y si Meta devolvió el mismo valor.
async function mantenerVivo() {
  try {
    const r = await pedir(`${API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${TOKEN}`);
    const j = await r.json();
    const dias = Math.round(j.expires_in / 86400);
    const mismo = j.access_token === TOKEN;
    console.log(`Instagram: token renovado, vence en ${dias} días${mismo ? '' : ' (Meta devolvió un valor nuevo: actualizar IG_TOKEN)'}.`);
    if (!mismo) console.log('::warning::Meta devolvió un token nuevo. Genera uno en Meta for Developers y actualiza el secreto IG_TOKEN.');
  } catch (e) {
    console.log(`Instagram: no se pudo renovar el token todavía (${e.message.slice(0, 80)}).`);
  }
}

if (!TOKEN) {
  console.log('Instagram: sin IG_TOKEN, se usan los datos guardados.');
} else {
  try {
    if (process.argv.includes('--refrescar')) await refrescar();
    else { await traer(); await mantenerVivo(); }
  } catch (e) {
    console.warn(`Instagram: ${e.message}. Se usan los datos guardados.`);
    if (process.argv.includes('--refrescar')) process.exit(1);
  }
}
