# Receptor de leads

Google Apps Script desplegado como aplicación web en la cuenta de David. Guarda cada envío del formulario en el Google Sheet «Leads — Marca & Empresa» (compartido con Laura como editora) y le avisa a Laura por correo.

- `Codigo.gs`: el código. Validación, campo trampa, tope de 20 envíos por minuto, protección contra fórmulas en la hoja.
- `appsscript.json`: manifiesto (zona horaria Bogotá, permisos mínimos: hoja y envío de correo).

El código vive en script.google.com; esta carpeta es la copia de referencia. Si se cambia allá, se copia aquí.
La URL `/exec` de la implementación se guarda en la variable del repo `PUBLIC_LEADS_ENDPOINT` (no es un secreto: es pública por diseño).
