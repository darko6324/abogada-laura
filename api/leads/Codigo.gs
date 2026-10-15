/**
 * Receptor de leads de Marca & Empresa (Google Apps Script, desplegado como aplicación web).
 *
 * El formulario del sitio envía un POST con JSON (Content-Type text/plain para evitar la consulta previa de CORS).
 * Cada envío válido queda como una fila en la hoja «Leads — Marca & Empresa» y se avisa a Laura por correo y por Telegram.
 *
 * Telegram: el token del bot y el chat de Laura viven en Propiedades del script (Configuración del proyecto →
 * Propiedades del script), nunca en este archivo: TELEGRAM_TOKEN y TELEGRAM_CHAT_ID. Ver conectarTelegram().
 *
 * Despliegue: Implementar → Nueva implementación → Aplicación web
 *   Ejecutar como: Yo (la cuenta dueña del Sheet) · Quién tiene acceso: Cualquier usuario
 * La URL /exec resultante va en la variable del repo PUBLIC_LEADS_ENDPOINT.
 */

const SHEET_ID = '1C4IEUll3zkszxaInyFVIjAYSVAWCGDtaNEN__zQzF4Y';
const AVISO_A = 'laurarianoabogada@gmail.com';
const MAX_POR_MINUTO = 20;          // tope global contra abuso
const SERVICIOS = {
  'registro-de-marca': 'Registrar mi marca',
  'crear-empresa': 'Crear mi empresa',
  contrato: 'Un contrato',
  socios: 'Un tema entre socios o accionistas',
  'asesoria-empresa': 'Asesoría para mi empresa',
  digital: 'Página web, marketing o automatización',
  personal: 'Un tema legal personal',
  otro: 'Otro',
};

function doPost(e) {
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Campo trampa: los bots lo llenan, las personas no lo ven.
    if (d.sitio_web) return responder({ ok: true });

    if (!limiteOk()) return responder({ ok: false, error: 'Demasiados envíos. Intenta en un minuto.' });

    const faltan = ['servicio', 'nombre', 'whatsapp', 'correo'].filter((k) => !String(d[k] || '').trim());
    if (faltan.length) return responder({ ok: false, error: 'Faltan campos: ' + faltan.join(', ') });
    if (d.autorizacion !== true) return responder({ ok: false, error: 'Falta la autorización de datos.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.correo))) return responder({ ok: false, error: 'Correo no válido.' });
    if (String(d.whatsapp).replace(/\D/g, '').length < 7) return responder({ ok: false, error: 'WhatsApp no válido.' });

    const fila = [
      new Date(),
      SERVICIOS[d.servicio] || texto(d.servicio, 60),
      texto(d.detalle, 120),
      texto(d.nombre, 120),
      texto(d.whatsapp, 40),
      texto(d.correo, 160),
      texto(d.mensaje, 2000),
      texto(d.origen, 200),
      texto(d.referrer, 300),
      'Sí',
      texto(d.autorizacion_texto, 400),
      'Nuevo',
    ];

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      SpreadsheetApp.openById(SHEET_ID).getSheets()[0].appendRow(fila);
    } finally {
      lock.releaseLock();
    }

    avisar(fila);
    avisarTelegram(fila);
    return responder({ ok: true });
  } catch (err) {
    console.error(err);
    return responder({ ok: false, error: 'No pudimos guardar tu mensaje.' });
  }
}

/** Para comprobar que la aplicación está publicada (GET a la URL /exec). */
function doGet() {
  return responder({ ok: true, servicio: 'leads-marca-y-empresa' });
}

/** Texto limpio, recortado y sin fórmulas (evita inyección en la hoja). */
function texto(v, max) {
  let s = String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function limiteOk() {
  const cache = CacheService.getScriptCache();
  const clave = 'envios-' + Math.floor(Date.now() / 60000);
  const n = Number(cache.get(clave) || 0) + 1;
  cache.put(clave, String(n), 120);
  return n <= MAX_POR_MINUTO;
}

function avisar(f) {
  try {
    const cuerpo = [
      'Llegó una nueva solicitud desde la página.',
      '',
      'Servicio: ' + f[1] + (f[2] ? ' (' + f[2] + ')' : ''),
      'Nombre: ' + f[3],
      'WhatsApp: ' + f[4],
      'Correo: ' + f[5],
      'Mensaje: ' + (f[6] || '—'),
      'Página: ' + f[7],
      '',
      'Hoja de leads: https://docs.google.com/spreadsheets/d/' + SHEET_ID,
    ].join('\n');
    MailApp.sendEmail({ to: AVISO_A, subject: 'Nueva solicitud: ' + f[1] + ' — ' + f[3], body: cuerpo, replyTo: f[5] });
  } catch (err) {
    console.error('No se pudo enviar el aviso', err);
  }
}

/** Aviso por Telegram. Si falta configuración o Telegram falla, el lead igual queda guardado. */
function avisarTelegram(f) {
  try {
    const props = PropertiesService.getScriptProperties();
    const token = props.getProperty('TELEGRAM_TOKEN');
    const chats = String(props.getProperty('TELEGRAM_CHAT_ID') || '').split(',').map((c) => c.trim()).filter(String);
    if (!token || !chats.length) return;

    const numero = String(f[4]).replace(/\D/g, '');
    const wa = 'https://wa.me/' + (numero.length === 10 ? '57' + numero : numero);
    const html = [
      '<b>Nueva solicitud: ' + esc(f[1]) + '</b>' + (f[2] ? ' (' + esc(f[2]) + ')' : ''),
      '',
      '👤 ' + esc(f[3]),
      '📱 <a href="' + wa + '">' + esc(f[4]) + '</a> (abrir WhatsApp)',
      '✉️ ' + esc(f[5]),
      f[6] ? '\n💬 ' + esc(f[6]).slice(0, 1500) : '',
      '',
      '📄 Página: ' + esc(f[7]),
      '<a href="https://docs.google.com/spreadsheets/d/' + SHEET_ID + '">Abrir la hoja de leads</a>',
    ].filter((l) => l !== null).join('\n');

    chats.forEach((chat) => {
      const r = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({ chat_id: chat, text: html, parse_mode: 'HTML', disable_web_page_preview: true }),
        muteHttpExceptions: true,
      });
      if (r.getResponseCode() !== 200) console.error('Telegram respondió ' + r.getResponseCode() + ': ' + r.getContentText().slice(0, 200));
    });
  } catch (err) {
    console.error('No se pudo avisar por Telegram', err);
  }
}

function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Ejecutar desde el editor DESPUÉS de que Laura (y quien más deba recibir avisos) le escriba /start al bot.
 * Lee quién le ha escrito al bot, guarda esos chats en TELEGRAM_CHAT_ID y les manda un mensaje de prueba.
 * Requiere que TELEGRAM_TOKEN ya esté en Propiedades del script.
 */
function conectarTelegram() {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('TELEGRAM_TOKEN');
  if (!token) throw new Error('Falta TELEGRAM_TOKEN en Propiedades del script.');
  const r = JSON.parse(UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/getUpdates', { muteHttpExceptions: true }).getContentText());
  if (!r.ok) throw new Error('Telegram no aceptó el token: ' + r.description);

  const chats = {};
  (r.result || []).forEach((u) => {
    const m = u.message || u.my_chat_member;
    if (m && m.chat && m.chat.type === 'private') chats[m.chat.id] = [m.chat.first_name, m.chat.last_name].filter(String).join(' ');
  });
  const ids = Object.keys(chats);
  if (!ids.length) throw new Error('Nadie le ha escrito al bot todavía. Que Laura abra el bot en Telegram, toque Iniciar (/start) y vuelve a ejecutar esto.');

  props.setProperty('TELEGRAM_CHAT_ID', ids.join(','));
  ids.forEach((id) => {
    UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ chat_id: id, text: '✅ Listo. Aquí te llegará un aviso cada vez que alguien deje sus datos en abogadalaura.com.' }),
      muteHttpExceptions: true,
    });
  });
  console.log('Avisos de Telegram conectados para: ' + ids.map((id) => chats[id]).join(', '));
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Ejecutar una vez desde el editor para autorizar los permisos (hoja y correo). */
function autorizar() {
  SpreadsheetApp.openById(SHEET_ID).getName();
  MailApp.getRemainingDailyQuota();
  UrlFetchApp.fetch('https://api.telegram.org', { muteHttpExceptions: true });
}
