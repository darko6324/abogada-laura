# Receptor de leads

Google Apps Script desplegado como aplicación web en la cuenta de David. Guarda cada envío del formulario en el Google Sheet «Leads — Marca & Empresa» (compartido con Laura como editora) y le avisa a Laura por correo y por Telegram.

- `Codigo.gs`: el código. Validación, campo trampa, tope de 20 envíos por minuto, protección contra fórmulas en la hoja.
- `appsscript.json`: manifiesto (zona horaria Bogotá, permisos mínimos: hoja, envío de correo y llamadas externas (Telegram)).

El código vive en script.google.com; esta carpeta es la copia de referencia. Si se cambia allá, se copia aquí.
La URL `/exec` de la implementación se guarda en la variable del repo `PUBLIC_LEADS_ENDPOINT` (no es un secreto: es pública por diseño).

## Avisos por Telegram

Además del correo, cada lead llega como mensaje de Telegram (con enlace directo al WhatsApp de la persona y a la hoja).

1. En Telegram, con @BotFather: `/newbot` → nombre «Leads Marca & Empresa» → usuario terminado en `bot`. BotFather entrega el **token**.
2. En script.google.com → proyecto del receptor → Configuración del proyecto → **Propiedades del script** → `TELEGRAM_TOKEN` = el token. (Lo pega David; nunca va en el repo.)
3. Laura abre el bot en Telegram y toca **Iniciar** (`/start`). Si alguien más debe recibir avisos, hace lo mismo.
4. En el editor, ejecutar `conectarTelegram()`: guarda los chats en `TELEGRAM_CHAT_ID` y manda un mensaje de prueba.
5. Implementar → Gestionar implementaciones → editar la existente → **Nueva versión** (la URL `/exec` no cambia).

Si Telegram falla o falta la configuración, el lead igual se guarda y el correo igual sale.
