// Guardia de publicación. Corre después de `astro build` sobre el HTML generado en dist/.
//
// En PRODUCCIÓN (PUBLIC_SITE_MODE=produccion) el build FALLA si alguna página publicada:
//   - contiene [CONFIRMAR] o [TARIFA]  (afirmaciones o valores que Laura no ha validado)
//   - está marcada como borrador        (data-estado="borrador")
//   - contiene una frase de la lista de veto de la marca (estrategia §3.4)
// En VISTA PREVIA solo informa: los borradores se pueden revisar ahí.

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const PRODUCCION = process.env.PUBLIC_SITE_MODE === 'produccion';

const MARCADORES = ['[CONFIRMAR', '[TARIFA'];
const VETO = [
  /excelencia jur[ií]dica/i,
  /soluciones jur[ií]dicas integrales/i,
  /garantiza(mos|ndo|r)?\b/i,
  /te aseguramos/i,
  /resultados garantizados/i,
  /ganamos tu caso/i,
  /tu marca quedar[aá] registrada/i,
  /sin riesgo/i,
  /nuestro equipo/i,
];

async function* html(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* html(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

/** Texto visible aproximado: sin <script>, <style> ni etiquetas. */
function textoVisible(src) {
  return src
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
}

const problemas = [];
let paginas = 0;

for await (const archivo of html(DIST)) {
  paginas++;
  const ruta = '/' + relative(DIST, archivo).replace(/index\.html$/, '');
  const src = await readFile(archivo, 'utf8');
  const texto = textoVisible(src);

  if (src.includes('data-estado="borrador"')) problemas.push(`${ruta} — página en borrador`);
  for (const m of MARCADORES) {
    const n = texto.split(m).length - 1;
    if (n) problemas.push(`${ruta} — ${n}× ${m}]`);
  }
  for (const re of VETO) {
    const m = texto.match(re);
    if (m) problemas.push(`${ruta} — frase vetada: «${m[0]}»`);
  }
}

console.log(`\nGuardia de publicación · modo ${PRODUCCION ? 'PRODUCCIÓN' : 'vista previa'} · ${paginas} páginas`);
if (!problemas.length) {
  console.log('✓ Sin borradores, marcadores ni frases vetadas.\n');
  process.exit(0);
}
for (const p of problemas) console.log(`  · ${p}`);

if (PRODUCCION) {
  console.error(`\n✗ ${problemas.length} problema(s). No se publica en producción hasta resolverlos.\n`);
  process.exit(1);
}
console.log(`\n(vista previa) ${problemas.length} pendiente(s). Se permiten aquí; bloquearían producción.\n`);
